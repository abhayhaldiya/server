const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const EMIPlan = require('./models/EMIPlan');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await EMIPlan.deleteMany({});
    console.log('Cleared existing data');

    // Product 1: iPhone 17 Pro
    const iphone = await Product.create({
      name: 'Apple iPhone 17 Pro',
      slug: 'iphone-17-pro',
      baseVariant: 'Silver, 256GB',
      variants: {
        colors: [
          { 
            type: 'color', 
            label: 'Silver', 
            value: 'silver', 
            priceModifier: 0, 
            image: '/images/products/iphone-silver.jpg' 
          },
          { 
            type: 'color', 
            label: 'Space Black', 
            value: 'space-black', 
            priceModifier: 0, 
            image: '/images/products/iphone-black.jpg' 
          },
          { 
            type: 'color', 
            label: 'Gold', 
            value: 'gold', 
            priceModifier: 0, 
            image: '/images/products/iphone-gold.jpg' 
          },
          { 
            type: 'color', 
            label: 'Deep Purple', 
            value: 'deep-purple', 
            priceModifier: 0, 
            image: '/images/products/iphone-purple.jpg' 
          }
        ],
        storage: [
          { type: 'storage', label: '128 GB', value: '128gb', priceModifier: -10000 },
          { type: 'storage', label: '256 GB', value: '256gb', priceModifier: 0 },
          { type: 'storage', label: '512 GB', value: '512gb', priceModifier: 15000 },
          { type: 'storage', label: '1 TB', value: '1tb', priceModifier: 30000 }
        ]
      },
      mrp: 134900,
      price: 129900,
      image: '/images/products/iphone-silver.jpg',
      images: [
        '/images/products/iphone-silver.jpg',
        '/images/products/iphone-black.jpg',
        '/images/products/iphone-gold.jpg',
        '/images/products/iphone-purple.jpg'
      ]
    });

    const iphoneEMIPlans = await EMIPlan.create([
      {
        monthlyAmount: 43300,
        tenureMonths: 3,
        interestRate: 0,
        cashback: null,
        productId: iphone._id
      },
      {
        monthlyAmount: 21650,
        tenureMonths: 6,
        interestRate: 0,
        cashback: '₹500 cashback',
        productId: iphone._id
      },
      {
        monthlyAmount: 15100,
        tenureMonths: 9,
        interestRate: 10.5,
        cashback: null,
        productId: iphone._id
      },
      {
        monthlyAmount: 11800,
        tenureMonths: 12,
        interestRate: 12,
        cashback: '₹1000 cashback',
        productId: iphone._id
      }
    ]);

    iphone.emiPlans = iphoneEMIPlans.map(plan => plan._id);
    await iphone.save();

    // Product 2: Samsung S24 Ultra
    const samsung = await Product.create({
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-s24-ultra',
      baseVariant: 'Black, 512GB',
      variants: {
        colors: [
          { 
            type: 'color', 
            label: 'Black', 
            value: 'black', 
            priceModifier: 0, 
            image: '/images/products/samsung-black.png' 
          },
          { 
            type: 'color', 
            label: 'Gray', 
            value: 'gray', 
            priceModifier: 0, 
            image: '/images/products/samsung-gray.png' 
          },
          { 
            type: 'color', 
            label: 'Purple', 
            value: 'purple', 
            priceModifier: 0, 
            image: '/images/products/samsung-purple.png' 
          }
        ],
        storage: [
          { type: 'storage', label: '256 GB', value: '256gb', priceModifier: -10000 },
          { type: 'storage', label: '512 GB', value: '512gb', priceModifier: 0 },
          { type: 'storage', label: '1 TB', value: '1tb', priceModifier: 20000 }
        ]
      },
      mrp: 129999,
      price: 119999,
      image: '/images/products/samsung-black.png',
      images: [
        '/images/products/samsung-black.png',
        '/images/products/samsung-gray.png',
        '/images/products/samsung-purple.png'
      ]
    });

    const samsungEMIPlans = await EMIPlan.create([
      {
        monthlyAmount: 40000,
        tenureMonths: 3,
        interestRate: 0,
        cashback: null,
        productId: samsung._id
      },
      {
        monthlyAmount: 20000,
        tenureMonths: 6,
        interestRate: 0,
        cashback: '₹600 cashback',
        productId: samsung._id
      },
      {
        monthlyAmount: 13900,
        tenureMonths: 9,
        interestRate: 10.5,
        cashback: null,
        productId: samsung._id
      },
      {
        monthlyAmount: 10900,
        tenureMonths: 12,
        interestRate: 12,
        cashback: '₹1200 cashback',
        productId: samsung._id
      }
    ]);

    samsung.emiPlans = samsungEMIPlans.map(plan => plan._id);
    await samsung.save();

    console.log('✅ Seed data created successfully!');
    console.log(`Created ${await Product.countDocuments()} products`);
    console.log(`Created ${await EMIPlan.countDocuments()} EMI plans`);
    
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => seedData());
