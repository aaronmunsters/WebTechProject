const joi = require('@hapi/joi');

// Component input validation
const validation = data => {

    const schema = joi.object({
        author:         joi
                        .string()
                        .min(2)
                        .required(),
        
        title:          joi
                        .string()
                        .required(),

        tags:           joi
                        .required(),
        
        type:           joi
                        .required(),

        content:        joi
                        .required(),

        pages:          joi
                        .required()
    });
    return schema.validate(data)
}

module.exports = validation