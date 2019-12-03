'use strict'

// Expects user.name to be in request --> after verifyUser middelware
module.exports = function add_editor_if_needed(mod, req){
    if('editor' in mod){
        mod.editor = req.user.name
    }
}