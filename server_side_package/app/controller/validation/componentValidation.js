const joi = require('@hapi/joi');

// Component input validation
const validation = data => {

    const schema = joi.object({
        componentId:    joi
                        .string()
                        .min(2)
                        .required(),

        author:         joi
                        .string()
                        .min(4)
                        .required(),

        content:        joi
                        .required(),

        pages:          joi
                        .required()
    });
    return schema.validate(data)
}

module.exports = validation