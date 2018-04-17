const jwt = require('jsonwebtoken');
DecodeToken = token => {
  return jwt.decode(token);
};

class DataModel {
  constructor(_error, _data) {
    this.error = null;
    this.data = {};
  }
}

IsEmpty = obj => {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== 'object') return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }

  return true;
};

class SuperAdminModel {
  constructor(_superadmin, option){
    this.superadmin_id = _superadmin._id;
    this.name = _superadmin.name;
    this.email = _superadmin.email;
    this.phone = _superadmin.phone;
    this.address = _superadmin.address;
    this.auth_id = _superadmin.auth_id;
    this.usename = _superadmin.username;
    this.image_url = _superadmin.image_url;
    if(option && option === "STATUS_REQUIRED") {
      this.status = _superadmin.status;
    }
  }
}

module.exports = {
  DecodeToken: DecodeToken,
  DataModel: DataModel,
  IsEmpty: IsEmpty,
  SuperAdmin : SuperAdminModel
};

