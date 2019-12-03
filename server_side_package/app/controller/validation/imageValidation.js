const joi = require('@hapi/joi');

// Image input validation
const validation = data => {

    const schema = joi.object({
        name:       joi
                    .string()
                    .required()
    });
    return schema.validate(data)
}

module.exports = validation