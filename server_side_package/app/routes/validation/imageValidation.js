const joi = require('@hapi/joi');

// Image input validation
const validation = data => {

    const schema = joi.object({
        id:         joi
                    .string()
                    .required(),

        extension:  joi
                    .string()
                    .required(),

        title:       joi
                    .string()
                    .required(),

        filepath:   joi
                    .string()
                    .required(),

        location:   joi
                    .string(),

        tags:       joi
                    .string(),

        comments:   joi
                    .string()
    });
    return schema.validate(data)
}

module.exports = validation