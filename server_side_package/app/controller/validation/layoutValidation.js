const joi = require('@hapi/joi');

// Layout input validation
const validation = data => {

    const schema = joi.object({
        layoutId:           joi
                            .string()
                            .min(2)
                            .required(),

        coltype:            joi
                            .string()
                            .min(2)
                            .required(),

        backgroundColor:    joi
                            .string()
                            .min(2)
                            .required(),

        navBar:             joi
                            .string()
                            .min(2)
                            .required()
    });
    return schema.validate(data)
}

module.exports = validation