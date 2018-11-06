const express = require('express'),
    app = express(),
    port = process.env.PORT || 4000,
    mongoose = require('mongoose'),
    User = require('./app/models/user'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    config = require('./config');

const helmet = require('helmet');
app.use(helmet());
app.use(express.static("./public"));

const router = express.Router();
//connect to mongoDB
//mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//
app.use(morgan('dev'));

//routes

//GET /api/setup - Setup initial User
router.get('/setup', function(req, res) {
    var till = new User({
        name: 'Till',
        password: 'test',
        admin: true
    });
    till.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully');
        res.json({success: true});
    })
});

//GET /api/ - Basic GetRequest
router.get('/', function(req, res) {
    res.json({message: 'users api'});
});

//POST /api/users - Create new User
router.post('/users', function (req,res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
    }).catch(next);
});

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

//PUT /api/users/:id - Update User
router.put('/users/:id', function (req,res, next) {
    User.findByIdAndUpdate({_id: req.params.id},req.body).then(function(){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        })
    });
});

//DELETE /api/users/:id - Delete User
router.delete('/users/:id', function (req,res, next) {
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
        res.send(user);
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

//listen on Port
app.listen(port, function () {
    console.log('RESTful API listing on port: ' + port);
});