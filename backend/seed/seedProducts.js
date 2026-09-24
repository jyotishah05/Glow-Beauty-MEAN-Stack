// Run with: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  { name: 'Foundation, Mascara, Lipsticks, Face Primer Kit', brand: 'MAC', category: 'Makeup', features: ['Foundation', 'Mascara', 'Lipsticks', 'Face Primer'], price: 4999, image: 'assets/images/kit.jpg' },
  { name: 'Skin Care Essentials', brand: "L'Oreal", category: 'Skincare', features: ['Sheet Mask', 'Face Wash', 'Sun Protection Cream', 'Face Serum'], price: 1699, image: 'assets/images/skin.jpg' },
  { name: 'Hair Care Essentials', brand: 'Dove', category: 'Hair Care', features: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'], price: 1000, image: 'assets/images/hair.jpg' },
  { name: 'Body Care & Fragrance Set', brand: 'Jo Malone', category: 'Body Care & Fragrances', features: ['Body Scrub', 'Feel Alive Mist', 'Shower Gel', 'Perfume'], price: 2500, image: 'assets/images/frag.jpg' },
  { name: 'Fit Me Makeup Set', brand: 'Maybelline', category: 'Makeup', features: ['Fit Me Foundation', 'Concealer', 'Compact Powder', 'Setting Spray'], price: 1200, image: 'assets/images/maybelline.png' },
  { name: 'Eyeshadow & Contour Set', brand: 'Huda Beauty', category: 'Makeup', features: ['Eyeshadow Palette', 'Liquid Lipstick', 'Contour Palette', 'Highlighter'], price: 2720, image: 'assets/images/huda.jpeg' },
  { name: 'Face & Nail Essentials', brand: 'Lakme', category: 'Makeup', features: ['Primer', 'CC Cream', 'Kajal', 'Nail Polish'], price: 1099, image: 'assets/images/lakme.jpg' },
  { name: 'Lip & Face Set', brand: 'Nykaa', category: 'Makeup', features: ['Lip Crayon', 'Compact Powder', 'Face Mist', 'Blush'], price: 1200, image: 'assets/images/nyka.avif' },
  { name: 'Vitamin C Skincare Set', brand: 'Mamaearth', category: 'Skincare', features: ['Vitamin C Face Wash', 'Face Serum', 'Moisturizer', 'Sunscreen SPF 50'], price: 599, image: 'assets/images/maearth.jpg' },
  { name: 'Body Care Set', brand: 'The Body Shop', category: 'Body Care & Fragrances', features: ['Body Butter', 'Body Scrub', 'Shower Gel', 'Hand Cream'], price: 2999, image: 'assets/images/body.png' },
  { name: 'Active Skincare Set', brand: 'Minimalist', category: 'Skincare', features: ['Niacinamide Serum', 'Salicylic Acid Cleanser', 'Vitamin C Serum', 'Moisturizer'], price: 999, image: 'assets/images/mini.avif' },
  { name: 'Soft Glam Makeup Set', brand: 'Rare Beauty', category: 'Makeup', features: ['Soft Pinch Blush', 'Liquid Highlighter', 'Lip Oil', 'Setting Powder'], price: 4500, image: 'assets/images/rare.jpg' }
];

(async () => {
  await connectDB();
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Products seeded successfully!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
})();
