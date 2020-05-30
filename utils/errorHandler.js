const notFound = (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const asyncHandler = (promise) =>
  promise
    .then((data) => [null, data])
    .catch((err) => Promise.resolve([err, null]));

module.exports = {
  notFound,
  asyncHandler,
};
