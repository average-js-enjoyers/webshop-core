const User = require('../../models/user.model');
const Order = require('../../models/order.model');

exports.numActiveUsers = async (startDate, endDate) => {
  return await User.count({
    active: true,
    registrationDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });
};

exports.numOrders = async (startDate, endDate) => {
  return await Order.count({
    orderDate: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });
};

exports.totalSales = async (startDate, endDate) => {
  const orderTotalGross = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        orderTotalGross: { $sum: '$orderTotalGross' },
      },
    },
  ]);
  const totalSales =
    orderTotalGross.length > 0 ? orderTotalGross[0].orderTotalGross : 0;

  return totalSales;
};

exports.avgOrderValue = async (startDate, endDate) => {
  const avgTotalGross = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        avgTotalGross: { $avg: '$orderTotalGross' },
      },
    },
  ]);
  const avgOrderValue =
    avgTotalGross.length > 0 ? avgTotalGross[0].avgTotalGross : 0;

  return Number(avgOrderValue.toFixed(2));
};

exports.medianOrderValue = async (startDate, endDate) => {
  const median = await Order.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        orderTotalGross: { $push: '$orderTotalGross' },
      },
    },
    {
      $project: {
        median: {
          $avg: {
            $cond: [
              { $eq: [{ $mod: [{ $size: '$orderTotalGross' }, 2] }, 0] },
              {
                $avg: [
                  {
                    $arrayElemAt: [
                      '$orderTotalGross',
                      {
                        $floor: {
                          $divide: [{ $size: '$orderTotalGross' }, 2],
                        },
                      },
                    ],
                  },
                  {
                    $arrayElemAt: [
                      '$orderTotalGross',
                      {
                        $ceil: {
                          $divide: [{ $size: '$orderTotalGross' }, 2],
                        },
                      },
                    ],
                  },
                ],
              },
              {
                $arrayElemAt: [
                  '$orderTotalGross',
                  { $floor: { $divide: [{ $size: '$orderTotalGross' }, 2] } },
                ],
              },
            ],
          },
        },
      },
    },
  ]);
  const medianOrderValue = median.length > 0 ? median[0].median : 0;
  return medianOrderValue;
};
