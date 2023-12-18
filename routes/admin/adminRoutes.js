const express = require('express');
const authController = require('../../controllers/admin/authController');
const twoFactorController = require('../../controllers/admin/twoFactorController');
const dashboardRouter = require('./dashboardRoutes');
const orderRouter = require('./orderRoutes');
const productRouter = require('./productRoutes');
const productItemRouter = require('./productItemRoutes');
const propertyRouter = require('./propertyRoutes');
const variationRouter = require('./variationRoutes');
const shippingMethodRouter = require('./shippingMethodRoutes');
const addressRouter = require('./addressRoutes');
const userRouter = require('./userRoutes');
const categoryRouter = require('./categoryRoutes');
const authRoutes = require('./authRoutes');
const twoFactorRouter = require('./twoFactorRoutes');
const puppeteer = require('puppeteer');

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/util/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://puzsergenerator.hu/', {
      waitUntil: 'networkidle2',
    });

    // Click the generate button
    await page.click('#button_generate');

    await page.waitForTimeout(500);

    // Scrape the text content
    const text = await page.$eval('#generator_text', (el) => el.textContent);

    await browser.close();
    res.send(text);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during scraping');
  }
});

router.use(authController.protect);
router.use('/two-factor', twoFactorRouter);
router.use(twoFactorController.protect2fa);
router.use('/dashboard', dashboardRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/product-item', productItemRouter);
router.use('/property', propertyRouter);
router.use('/variation', variationRouter);
router.use('/shipping-method', shippingMethodRouter);
router.use('/address', addressRouter);
router.use('/user', userRouter);
router.use('/category', categoryRouter);

module.exports = router;
