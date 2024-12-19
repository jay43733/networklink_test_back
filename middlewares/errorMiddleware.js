module.exports = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(500).json({ error: err.message });
};
