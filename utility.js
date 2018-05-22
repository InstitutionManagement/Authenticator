
import{ URL } from 'url';
export const IsWordLengthValid = word => {
    return String(word).length < 10;
}


export const IsEmpty = obj => {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== 'object') return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  };
  
export const IsValidWord = (req, res, next) => {
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

export const ProxyRules = (() => {

})();

export const CreateURL = (baseURL, route, queryParam) => {
    let _url = new URL(route,baseURL);
    for(var key in queryParam){
        _url.searchParams.set(key, queryParam[key]);
    }
    return _url;
}