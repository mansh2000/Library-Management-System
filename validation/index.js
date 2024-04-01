const validator = (schema) => async (req, res, next) => {
  try {
    const options = {
      errors: {
        wrap: {
          label: false
        }
      }
    };
    const result = await schema.body.validateAsync(req.body, options);
    req.body = result;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = validator;
