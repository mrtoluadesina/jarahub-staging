import users from './data/users';
import products, { createCategories } from './data/products';
import User from '../../models/user.model';
import Product from '../../models/product.model';
import admin from './data/admin';
import Admin from '../../models/admin.model';
import Category from '../../models/category.model';
import algoliaClient from '../../algolia';

const cleanDatabase = async () => {
  try {
    await User.db.dropCollection('users');
    await Product.db.dropCollection('products');
    await Admin.db.dropCollection('admin');
    await Category.db.dropCollection('categories');
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

      const splittedName = product.name
        .replace(/[$@#!%^&*()]/gi, ' ')
        .split(' ');

      splittedName.forEach(_word => {
        const index = algoliaClient.initIndex('products');

        index.setSettings({
          searchableAttributes: ['name', 'description', 'specification'],
          customRanking: ['desc(isInStock)', 'desc(orderCount)'],
        });
        index
          .saveObject(
            { ...product, id: newProduct._id.toString() },
            {
              autoGenerateObjectIDIfNotExist: true,
            },
          )
          .then(({ objectID }) => {
            console.log(objectID + 'was indexed');
          })
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
