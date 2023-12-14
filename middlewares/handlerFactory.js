const catchAsync = require('../services/catchAsync');
const AppError = require('../services/appError');
const APIFeatures = require('../services/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = (Model, filter = {}) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    const totalItems = await Model.countDocuments(
      new APIFeatures(Model.find(filter), req.query).filter().query,
    );
    const totalPages = Math.ceil(totalItems / features.limit);

    // Calculate the URL for the next and last pages
    const baseUrl = `${req.protocol}://${req.get('host')}${
      req.originalUrl.split('?')[0]
    }`;

    const previousPage =
      features.page > 1
        ? `${baseUrl}?page=${Number(features.page) - 1}&limit=${features.limit}`
        : null;

    const nextPage =
      features.page < totalPages
        ? `${baseUrl}?page=${Number(features.page) + 1}&limit=${features.limit}`
        : null;

    const lastPage = `${baseUrl}?page=${totalPages}&limit=${features.limit}`;

    // Set the response headers
    res.set(
      'Link',
      `<${previousPage}>; rel="previous", <${nextPage}>; rel="next", <${lastPage}>; rel="last"`,
    );
    res.set('X-Total-Count', totalItems);

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      pagination: {
        currentPage: features.page,
        limit: features.limit,
        totalItems: totalItems,
        totalPages: totalPages,
      },
      data: doc,
    });
  });
