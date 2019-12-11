'use strict'
/*
*   VALIDATION: LAYOUT
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating/updating a layout entry
*
*/
const joi = require('@hapi/joi');

const createValidation = function(data, update) {

    const schema = joi.object({
        title:              joi
                            .string()
                            .required(),

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

        brand:              joi
                            .string()
                            .required(),

        navcontent:         joi
                            .string()
                            .required(),

        footer:             joi
                            .number()
                            .required(),
        
        footcontent:        joi
                            .string()
                            .required(),

        followstyle:        joi
                            .number()
                            .required(),
        
        description:        joi
                            .string()
                            .required(),

        pages:              joi
                            .string()
                            .required()
    });
    return schema.validate(data)
}

const updateValidation = data => {

    const schema = joi.object({
        title:              joi
                            .string(),

        columnType:         joi
                            .string(),

        backgroundType:     joi
                            .string(),

        backgroundColor:    joi
                            .string(),

        backgroundPicture:  joi
                            .string(),

        navbar:             joi
                            .number(),

        brand:              joi
                            .string(),

        navcontent:         joi
                            .string(),

        footer:             joi
                            .number(),
        
        footcontent:        joi
                            .string(),

        followstyle:        joi
                            .number(),
                
        description:        joi
                            .string()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation