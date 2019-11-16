'use strict'

// Register route
module.exports = function(app){
    const user = require("../controller/userController");
  
    // Routes
    app.route('/user')
      .get(user.list_all_users)
      .post(user.create_a_user);
  
    app.route('/user/:email')
      .get(user.read_a_user)
      .put(user.update_a_user)
      .delete(user.delete_a_user);
  };


/* Login route
router.post('/login', async (req, res) => {
    
    // Validate data before logging in
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if given email is already in database
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email/password is wrong!');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) res.status(400).send('Email/password is wrong!');
    
    // Create and assign token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});
*/