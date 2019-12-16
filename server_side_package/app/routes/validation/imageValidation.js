'use strict'
/*
*   VALIDATION: IMAGE
*
*   In this file functions are defined that uses the joi package to
*   check if a given data object has the required input
*   for creating/updating an image entry
*
*/
const joi = require('@hapi/joi');

const createValidation = data => {

    const schema = joi.object({
        title:       joi
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

const updateValidation = data => {

    const schema = joi.object({

        title:       joi
                    .string(),

        location:   joi
                    .string(),

        tags:       joi
                    .string(),

        comments:   joi
                    .string()
    });
    return schema.validate(data)
}

module.exports.createValidation = createValidation
module.exports.updateValidation = updateValidation