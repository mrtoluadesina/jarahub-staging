import users from './data/users';
import products, { createCategories } from './data/products';
import User from '../../models/user.model';
import Product from '../../models/product.model';
import admin from './data/admin';
import Admin from '../../models/admin.model';
import algoliaClient from '../../algolia';

const cleanDatabase = async () => {
  try {
    await User.db.dropCollection('users');
    await Product.db.dropCollection('products');
    await Admin.db.dropCollection('admin');
    return console.log('Successfully cleared database');
  } catch (error) {
    console.log('An error occured: ', error.message);
    return error.message;
  }
};

export const seedUsers = async () => {
  try {
    const allUsers = users.map(async user => {
      const newUser = new User(user);
      return newUser.save();
    });
    const res = await Promise.all(allUsers);
    return res;
  } catch (err) {
    return err;
  }
};

export const seedAdmin = async () => {
  try {
    const allAdmin = admin.map(async admin => {
      const newAdmin = new Admin(admin);
      return newAdmin.save();
    });
    const res = await Promise.all(allAdmin);
    return res;
  } catch (err) {
    return err;
  }
};

export const seedProducts = async () => {
  try {
    await createCategories();

    const allProducts = products.map(async product => {
      const newProduct = new Product(product);
      const index = algoliaClient.initIndex('products');

      index.setSettings({
        searchableAttributes: [
          'name',
          'description',
          'specification',
          'brandName',
          'categoryNames',
          'images',
        ],
        customRanking: ['desc(quantity)', 'desc(orderCount)'],
        attributesForFaceting: ['brandName'],
      });
      index
        .saveObject(
          {
            ...product,
            id: newProduct._id.toString(),
            objectID: newProduct._id.toString(),
            price: JSON.stringify(newProduct.price),
          },
          {
            autoGenerateObjectIDIfNotExist: true,
          },
        )
        //@ts-ignore
        .then(({ objectID }) => {
          console.log(objectID + 'was indexed');
        })
        //@ts-ignore
        .catch(err => console.log(err.message));

      newProduct.categoryNames!.map(category => {
        const categoryIndex = algoliaClient.initIndex(category);
        categoryIndex.setSettings({
          searchableAttributes: [
            'name',
            'description',
            'specification',
            'brandName',
            'categoryNames',
            'images',
          ],
          customRanking: ['desc(quantity)', 'desc(orderCount)'],
          attributesForFaceting: ['brandName'],
        });

        categoryIndex
          .saveObject(
            {
              ...product,
              objectID: newProduct._id.toString(),
              price: JSON.stringify(newProduct.price),
            },
            {
              autoGenerateObjectIDIfNotExist: true,
            },
          )
          .then(() => {})
          //@ts-ignore
          .catch(err => console.log(err.message));
      });

      return newProduct.save();
    });
    const res = await Promise.all(allProducts);
    return res;
  } catch (error) {
    return error.message;
  }
};

const seed = () => {
  cleanDatabase()
    .then(() => {
      return seedUsers();
    })
    .then(() => {
      return seedAdmin();
    })
    .then(() => {
      return seedProducts();
    })
    .then(res => {
      console.log(`Database has been seeded with ${res.length} products`);
    })
    .catch(err => {
      console.log('An error occured: ', err.message);
    });
};

export default seed;
