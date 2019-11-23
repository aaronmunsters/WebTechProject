const joi = require('@hapi/joi');

// Page input validation
const validation = data => {

    const schema = joi.object({
        title:          joi
                        .string()
                        .required(),

        author:         joi
                        .string()
                        .min(2)
                        .required(),

        published:      joi
                        .number()
                        .required(),

        comps:          joi
                        .required(),

        url:            joi
                        .string()
                        .required()
    });
    return schema.validate(data)
}

module.exports = validation