'use strict'
/*
*   VALIDATION: IMAGE
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating an image entry
*
*/
const joi = require('@hapi/joi');

const validation = data => {

    const schema = joi.object({
        id:         joi
                    .string()
                    .required(),

        extension:  joi
                    .string()
                    .required(),

        title:       joi
                    .string()
                    .required(),

        filepath:   joi
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

module.exports = validation