const handleError = (err, req, res, next) => {
  console.log(
    `Error at ${new Date().toISOString()}\nOn path ${req.path}\n`,
    err
  );
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: err.details.map((detail) => detail.message) });
  }

  return res.status(500).json({
    message: err?.message || "Something went wrong",
    error: err
  });
};

module.exports = { handleError };
