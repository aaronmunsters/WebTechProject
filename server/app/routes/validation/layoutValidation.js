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
        
        description:        joi
                            .string()
                            .required(),

        pages:              joi
                            .string(),

        customIcon:         joi
                            .number()
                            .required(),

        iconId:             joi
                            .string()
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
                
        description:        joi
                            .string(),
                    
        pages:              joi
                            .string(),
                            
        customIcon:         joi
                            .number(),

        iconId:             joi
                            .string()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation
