//
const User = require('../models/user');

//Create User - POST - /users/signup
exports.signup_user = function (req, res, next) {
    const newUser = new User({
        name:req.body.name,
        password:req.body.password
    });
    newUser.save(function (err) {
       if(err) throw err;
       res.json(newUser);
    });
};

//Alter User - PUT - /users/:id
exports.update_user = function (req, res) {
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
        User.findOne({_id: req.params.id}).then(function (user) {
            res.send(user);
        })
    });
};

//Delete User - DELETE - /users/:id
exports.delete_user = function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}).then(function (user) {
        res.send(user);
    });
};

//Signin User - POST - /users/signin
exports.signin_user = function (req, res) {
    User.findOne({
       name: req.body.name 
    }, function (err, user) {
        if(err) throw err;
        if(!user){
            res.json({success: false, message: 'Authentication failed. User not found.'});
        }else if(user){
            //does not work as expected; isPasswordValid returns not the correct value
            if(user.isPasswordValid(req.body.password)){
                res.json({success:true, message:'Authentication sucessful'});
            }else{
                res.json({success:false, message:'Authentication failed. Wrong password.'});
            }
        }
    });
};

/*


 //POST /api/authenticate - Authenticate User with name + password
 router.post('/authenticate', function(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if(err) throw err;
        if(!user){
            res.json({success: false, message: 'Authentication failed. User not found.'});
        }else if (user){
            if(user.password != req.body.password){
                res.json({success:false, message:'Authentication failed. Wrong password.'});
            } else {
                console.log('auth successful');
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn : 1440
                });

                res.json({
                    success: true,
                    message: 'You are now authenticated',
                    token: token
                });
            }
        }
    });
});

 //protect routes
 router.use(function(req,res,next) {
    var token = req.body.token || req.query.token || req.header['x-access-token'];
    if(token){
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if(err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                console.log('token valid');
                req.decoded = decoded;
                res.json({
                    "success" : true,
                    "message" : 'token is valid'
                });
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }
});

 app.use('/api', router);

 */