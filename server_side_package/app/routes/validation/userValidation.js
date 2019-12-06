'use strict'
/*
*   VALIDATION: USER
*
*   In this file a function is defined that uses the joi package to
*   check if a given data object has the required input
*   for creating a user entry OR logging a user in
*
*/
const joi = require('@hapi/joi');

// Register input validation
const registerValidation = data => {

          const schema = joi.object({
            name:       joi
                        .string()
                        .min(2)
                        .required(),
    
            email:      joi
                        .string()
                        .min(4)
                        .required()
                        .email(),
                        
            password:   joi
                        .string()
                        .min(6)
                        .required()
        });
        return schema.validate(data)
}


// Login input validation
const loginValidation = data => {

    const schema = joi.object({

        email:      joi
                    .string()
                    .min(4)
                    .required()
                    .email(),

        password:   joi
                    .string()
                    .min(6)
                    .required()
                    .max(1024)
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;