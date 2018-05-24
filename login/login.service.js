
const _UserAuthModel = require('../models/userAuth.model');
const _AppUtil = require('../utility');
const _AppConstants = require('../login/login.constants');

const bcrypt = require('bcryptjs');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxy();
const axios = require('axios');

const findOnewithUsername = (_username) => {
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

const isPasswordCorrect = (_password, _hashedPassword) =>{
    return bcrypt.compareSync(_password, _hashedPassword);
}

const fetchUserDetails = (baseurl, route, query = {})=>{
    let _url = _AppUtil.CreateURL(baseurl,route);
    console.log("_url : "+ _url);
    return Axios.post(_url, query)
        
}


module.exports = {
    findOnewithUsername: findOnewithUsername,
    isPasswordCorrect: isPasswordCorrect,
    fetchUserDetails: fetchUserDetails
}