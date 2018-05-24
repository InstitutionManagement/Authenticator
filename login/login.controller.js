const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const _LogInConstants = require('./login.constants');
const _LogInService = require('./login.service');
const _AppUtils = require('../utility');
const _UserModelConfig = require('../config').UserModelConfig;

const loginRouter = express.Router();
loginRouter.use(_AppUtils.IsValidWord);


loginRouter.route('/')
.post((req, res)=> {
    _LogInService.findOnewithUsername(req.username).then(userAuth => {
        if(_LogInService.isPasswordCorrect(req.password, userAuth.password)){
                let query = {
                    auth_id: userAuth._id
                }
                _LogInService.fetchUserDetails(_UserModelConfig.baseURL, _UserModelConfig.Routes.fetchUser, query)
                .then(user=> {
                    
                })
                .catch(e => {

                })
        }
    }).catch(e => {

    })
})