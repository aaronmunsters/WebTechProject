'use strict'
/*
*   VALIDATION: PAGE
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating a page entry
*
*/
const joi = require('@hapi/joi');

const validation = data => {

    const schema = joi.object({
        title:          joi
                        .string()
                        .required(),

        published:      joi
                        .number()
                        .required(),

        comps:          joi
                        .required(),

        url:            joi
                        .string()
                        .required()
    });
    return schema.validate(data)
}

module.exports = validation