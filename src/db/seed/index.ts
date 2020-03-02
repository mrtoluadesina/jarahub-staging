import users from './data/users';
import products, { createCategories } from './data/products';
import User from '../../models/user.model';
import Product from '../../models/product.model';
import elasticSearch from '../../elasticsearch/config';
import admin from './data/admin';
import Admin from '../../models/admin.model';
import Category from '../../models/category.model';

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

    let bulk: any[] = [];
    const allProducts = products.map(async product => {
      const newProduct = new Product(product);

      product.name.split(' ').forEach(async word => {
        bulk.push({
          index: {
            _index: word.toLowerCase(),
            _type: 'product',
            _id: newProduct._id.toString(),
          },
        });
        bulk.push({
          name: product.name,
          description: product.description,
          categoryId: product.categoryId,
          sku: product.sku,
          specification: product.specification,
          quantity: product.quantity,
          totalStock: product.totalStock,
          price: product.price,
          images: product.images,
          isDeleted: product.isDeleted,
          inStock: product.isInStock,
          discountId: product.discountId,
          tags: product.tags,
        });
      });

      return newProduct.save();
    });
    elasticSearch.bulk({ body: bulk, refresh: true }, function(err, _response) {
      if (err) {
        console.log('Error: ', err);
      }
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
