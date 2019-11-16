const joi = require('@hapi/joi');

// Page input validation
const validation = data => {

    const schema = joi.object({
        pageId:         joi
                        .string()
                        .min(2)
                        .required(),

        title:          joi
                        .string()
                        .min(4)
                        .required(),

        creatorName:   joi
                        .min(2)
                        .required(),

        published:      joi
                        .bool()
                        .required(),

        comps:          joi
                        .required()
    });
    return schema.validate(data)
}

module.exports = validation