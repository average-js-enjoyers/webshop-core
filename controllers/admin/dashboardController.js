const { validationResult } = require('express-validator');
const catchAsync = require('../../services/catchAsync');
const AppError = require('../../services/appError');
const dashboard = require('../../services/admin/dashboard');
const Order = require('../../models/order.model');
const factory = require('../handlerFactory');

exports.getAggregates = catchAsync(async (req, res, next) => {
  const elements = req.body;

  data = [];
  for (const element of elements) {
    const range = element.range;

    const numActiveUsers = await dashboard.numActiveUsers(
      range.startDate,
      range.endDate,
    );

    const numOrders = await dashboard.numOrders(range.startDate, range.endDate);

    const totalSales = await dashboard.totalSales(
      range.startDate,
      range.endDate,
    );

    const avgOrderValue = await dashboard.avgOrderValue(
      range.startDate,
      range.endDate,
    );

    const medianOrderValue = await dashboard.medianOrderValue(
      range.startDate,
      range.endDate,
    );

    data.push({
      range: {
        startDate: range.startDate,
        endDate: range.endDate,
      },
      aggregates: {
        numActiveUsers: numActiveUsers,
        numOrders: numOrders,
        totalSales: totalSales,
        avgOrderValue: avgOrderValue,
        medianOrderValue: medianOrderValue,
      },
    });
  }

  res.status(200).json({
    status: 'success',
    data: data,
  });
});

exports.getOpenOrders = factory.getAll(Order, {
  orderStatus: {
    $in: ['Pending', 'On hold', 'Payment confirmed', 'Processing', 'Shipped'],
  },
});
