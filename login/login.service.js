import Axios from 'axios';

const _UserAuthModel = require('../models/userAuth.model');
const _AppUtil = require('../utility');
const _AppConstants = require('../login/login.constants');

const bcrypt = require('bcryptjs');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxy();
const axios = require('axios');

export const findOnewithUsername = (_username) => {
    return new Promise((resolve, reject)=>{
        _UserAuthModel.findOne(
            {
                username : _username
            },
            (err, user)=> {
                if(err){
                    reject(err);
                }else if(_AppUtil.IsEmpty(user)){
                    reject(_AppConstants.WRONG_USERNAME_PASSWORD);
                }else{
                    resolve(user);
                }
            }
        )
    })
}

export const isPasswordCorrect = (_password, _hashedPassword) =>{
    return bcrypt.compareSync(_password, _hashedPassword);
}

export const fetchUserDetails = async(_queryString, baseurl, route)=>{
    return Axios.get('')
}