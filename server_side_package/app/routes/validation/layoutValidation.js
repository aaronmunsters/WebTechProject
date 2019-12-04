const joi = require('@hapi/joi');

// Layout input validation
const validation = data => {

    const schema = joi.object({
        columnType:         joi
                            .string()
                            .required(),

        backgroundType:     joi
                            .string()
                            .required(),

        backgroundColor:    joi
                            .string()
                            .required(),

        backgroundPicture:  joi
                            .string()
                            .required(),

        navbar:             joi
                            .number()
                            .required(),

        navcontent:         joi
                            .string()
                            .required(),

        footer:             joi
                            .number()
                            .required(),
        
        footcontent:        joi
                            .string()
                            .required()
    });
    return schema.validate(data)
}

module.exports = validation