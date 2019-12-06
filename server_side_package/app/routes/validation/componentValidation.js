'use strict'
/*
*   VALIDATION: COMPONENT
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating a component entry
*
*/
const joi = require('@hapi/joi');

const validation = data => {

    const schema = joi.object({
        
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