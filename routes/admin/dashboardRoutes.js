const express = require('express');
const dashboardController = require('../../controllers/admin/dashboardController');
const dashboardValidator = require('../../validators/admin/dashboardValidator');

const router = express.Router();

router.post(
  '/aggregates',
  dashboardValidator.aggregates,
  dashboardController.getAggregates,
);

router.get(
  '/open-orders',
  dashboardValidator.openOrders,
  dashboardController.getOpenOrders,
);

module.exports = router;
