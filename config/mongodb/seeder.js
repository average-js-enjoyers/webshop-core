const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Users
const User = require('../../models/user.model');
const Address = require('../../models/address.model');

// Products
const Product = require('../../models/product.model');
const Category = require('../../models/category.model');
const Property = require('../../models/property.model');
const Variation = require('../../models/variation.model');
const ProductItem = require('../../models/productItem.model');
const Order = require('../../models/order.model');
const ShippingMethod = require('../../models/shippingMethod.model');
const Review = require('../../models/review.model');

// Admins
const Admin = require('../../models/admin.model');

const users = require('./data/users');
const addresses = require('./data/addresses');
const categories = require('./data/categories');
const products = require('./data/products');
const properties = require('./data/properties');
const variations = require('./data/variations');
const productItems = require('./data/productItems');
const orders = require('./data/orders');
const shippingMethods = require('./data/shippingMethods');
const reviews = require('./data/reviews');

const admins = require('./data/admins');

const connectDB = require('./db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear out all existing data in the database
    await User.deleteMany();
    await Address.deleteMany();

    await Category.deleteMany();
    await Property.deleteMany();
    await Variation.deleteMany();
    await Product.deleteMany();
    await ProductItem.deleteMany();
    await Order.deleteMany();
    await ShippingMethod.deleteMany();
    await Review.deleteMany();

    await Admin.deleteMany();

    const sampleAddresses = addresses.map((address) => ({
      _id: new mongoose.Types.ObjectId(address._id), // Generate a new ObjectId for each address
      city: address.city,
      region: address.region,
      vatID: address.vatID,
      type: address.type,
      isActive: address.isActive,
      company: address.company,
      addressLine: address.addressLine,
      zip: address.zip,
      name: address.name,
      country: address.country,
      phoneNumber: address.phoneNumber,
    }));

    // Get all users
    const sampleUsers = users.map((user) => ({
      _id: new mongoose.Types.ObjectId(user._id),
      emailAddress: user.emailAddress,
      phoneNumber: user.phoneNumber,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      registrationDate: user.registrationDate,
      role: user.role,
      twoFactorEnabled: user.twoFactorEnabled,
      active: user.active,
      addresses: user.addresses,
      emailConfirmed: user.emailConfirmed,
      hasPassword: true,
    }));

    const sampleAdmins = admins.map((admin) => ({
      _id: new mongoose.Types.ObjectId(admin._id),
      emailAddress: admin.emailAddress,
      password: admin.password,
      firstName: admin.firstName,
      lastName: admin.lastName,
      registrationDate: admin.registrationDate,
    }));

    // Get all categories from the categories array and add the admin user to each category
    const sampleCategories = categories.map((category) => ({
      _id: new mongoose.Types.ObjectId(category._id),
      categoryName: category.categoryName,
      parentCategory: new mongoose.Types.ObjectId(category.parentCategory),
    }));

    // Get all categories from the categories array and add the admin user to each category
    const sampleProperties = properties.map((property) => ({
      _id: new mongoose.Types.ObjectId(property._id),
      key: property.key,
      value: property.value,
      categoryID: new mongoose.Types.ObjectId(property.category_id),
    }));

    // Get all categories from the categories array and add the admin user to each category
    const sampleVariations = variations.map((variation) => ({
      _id: new mongoose.Types.ObjectId(variation._id),
      key: variation.key,
      value: variation.value,
      categoryID: new mongoose.Types.ObjectId(variation.category_id),
    }));

    // Get all products from the products array and add the admin user to each product
    const sampleProducts = products.map((product) => ({
      _id: new mongoose.Types.ObjectId(product._id),
      name: product.name,
      description: product.description,
      categoryID: new mongoose.Types.ObjectId(product.category_id),
      properties: product.properties,
      images: product.images,
      reviews: product.reviews,
    }));

    // Get all products from the products array and add the admin user to each product
    const sampleProductItems = productItems.map((productItem) => ({
      _id: new mongoose.Types.ObjectId(productItem._id),
      sku: productItem.sku,
      qtyInStock: productItem.qty_in_stock,
      priceNet: productItem.price_net,
      taxPercentage: productItem.tax_percentage,
      variations: productItem.variations,
    }));

    const sampleShippingMethods = shippingMethods.map((shippingMethod) => ({
      _id: new mongoose.Types.ObjectId(shippingMethod._id),
      name: shippingMethod.name,
      priceNet: shippingMethod.price_net,
      taxPercentage: shippingMethod.tax_percentage,
    }));

    const sampleOrders = orders.map((order) => ({
      _id: new mongoose.Types.ObjectId(order._id),
      userID: new mongoose.Types.ObjectId(order.user_id),
      orderDate: order.order_date,
      paymentMethod: order.payment_method,
      isPaid: order.is_paid,
      shippingAddressID: new mongoose.Types.ObjectId(order.shipping_address_id),
      billingAddressID: new mongoose.Types.ObjectId(order.billing_address_id),
      shippingMethodID: new mongoose.Types.ObjectId(order.shipping_method_id),
      orderTotalNet: order.order_total_net,
      orderTotalVat: order.order_total_vat,
      orderTotalGross: order.order_total_gross,
      orderStatus: order.order_status,
      orderLines: order.order_lines.map((orderLine) => ({
        productItemID: new mongoose.Types.ObjectId(orderLine.product_item_id),
        qty: orderLine.qty,
        priceNet: orderLine.price_net,
        taxPercentage: orderLine.tax_percentage,
      })),
    }));

    const sampleReviews = reviews.map((review) => ({
      _id: new mongoose.Types.ObjectId(review._id),
      userID: new mongoose.Types.ObjectId(review.userID),
      rating: review.rating,
      title: review.title,
      content: review.content,
      createdAt: review.createdAt,
      isHidden: review.isHidden,
    }));

    await User.create(sampleUsers);
    await Address.insertMany(sampleAddresses);
    await Category.insertMany(sampleCategories);
    await Property.insertMany(sampleProperties);
    await Variation.insertMany(sampleVariations);
    await Product.insertMany(sampleProducts);
    await ProductItem.insertMany(sampleProductItems);
    await Order.insertMany(sampleOrders);
    await ShippingMethod.insertMany(sampleShippingMethods);
    await Review.insertMany(sampleReviews);

    await Admin.create(sampleAdmins);

    /* await ProductCategory.create(...sampleCategories);
    await Product.create(...sampleProducts); */

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear out all existing data in the database
    await User.deleteMany();
    await Address.deleteMany();

    await Product.deleteMany();
    await Property.deleteMany();
    await Variation.deleteMany();
    await Category.deleteMany();
    await ProductItem.deleteMany();
    await Order.deleteMany();
    await ShippingMethod.deleteMany();
    await Review.deleteMany();

    await Admin.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// console.log(process.argv);

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
