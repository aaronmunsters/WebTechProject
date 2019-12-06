'use strict'
/*
*   VALIDATION: LAYOUT
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating a layout entry
*
*/
const joi = require('@hapi/joi');

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