const URL = require('url').URL;

const IsWordLengthValid = word => {
    return String(word).length < 10;
}


const IsEmpty = obj => {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== 'object') return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  };

const IsValidWord = (req, res, next) => {
    if(!IsEmpty(req.body) && !IsEmpty(req.body.username) && !IsEmpty(req.body.password)){
        if(IsWordLengthValid(req.body.username) && IsWordLengthValid(req.body.password)){
            next();
        } else{
            return res.json(_LogInConstants.WRONG_USERNAME_PASSWORD);
        }
    } else{
        return res.json(_LogInConstants.USERNAME_PASSWORD_NOT_PROVIDED);
    }
}

const ProxyRules = (() => {

})();

const CreateURL = (baseURL, route) => {
    let _url = new URL(route,baseURL);
    return _url;
}


module.exports = {
    IsWordLengthValid: IsWordLengthValid,
    IsEmpty: IsEmpty,
    IsValidWord: IsValidWord,
    ProxyRules: ProxyRules,
    CreateURL: CreateURL
}