const jwt = require('jsonwebtoken');
const _TrustModel = require('../components/trust/trust.model');
const _TrustAdminModel = require('../components/trust/trust-admin/trust.admin.model');
const _UserAuthModel = require('../components/shared/user.auth.model');
const appConst = require('../app.constants');
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
    this.username = _superadmin.username;
    this.image_url = _superadmin.image_url;
    this.user_type = "SuperAdmin";
    if(option && option === "STATUS_REQUIRED") {
      this.status = _superadmin.status;
    }
  }
}

class TrustAdminModel {
  constructor(_trustadmin, option){
    this.trustadmin_id = _trustadmin._id;
    this.name = _trustadmin.name;
    this.email = _trustadmin.email;
    this.phone = _trustadmin.phone;
    this.address = _trustadmin.address;
    this.auth_id = _trustadmin.auth_id;
    this.username = _trustadmin.username;
    this.image_url = _trustadmin.image_url;
    this.parent_trust_id = _trustadmin.parent_institute_id;
    this.user_type = "TrustAdmin";
    if(option && option.status_required && option.status_required === "STATUS_REQUIRED") {
      this.status = _trustadmin.status;
    }
    if(option && option.trust_name){
      this.trust_name = option.trust_name
    }
  }
}

class TrustModel {
  constructor(_trust, option){
    this.trust_id = _trust._id;
    this.name = _trust.name;
    this.email = _trust.email;
    this.phone = _trust.phone;
    this.address = _trust.address;
    this.website = _trust.website;
    if(option && option === "STATUS_REQUIRED") {
      this.status = _trust.status;
    }
  }
}

class IdSet{
  constructor(_registered_id, _auth_id){
    this._id = _registered_id;
    this.auth_id = _auth_id;
  }
}


class InstitutionAdminModel {
  constructor(_instituteadmin, option){
    this.instituteadmin_id = _instituteadmin._id;
    this.name = _instituteadmin.name;
    this.email = _instituteadmin.email;
    this.phone = _instituteadmin.phone;
    this.address = _instituteadmin.address;
    this.auth_id = _instituteadmin.auth_id;
    this.username = _instituteadmin.username;
    this.image_url = _instituteadmin.image_url;
    this.parent_trust_id = _instituteadmin.parent_trust_id;
    this.parent_institute_id = _instituteadmin.parent_institute_id;
    this.user_type = "InstitutionAdmin";
    if(option && option === "STATUS_REQUIRED") {
      this.status = _instituteadmin.status;
    }
  }
}

class InstituteModel {
  constructor(_institute, option){
    this.name = _institute.name;
    this.parent_trust_id = _institute.parent_trust_id;
    this.email = _institute.email;
    this.phone = _institute.phone;
    this.address = _institute.address;
    this.website = _institute.website;
    if(option && option.status_required && option.status_required === "STATUS_REQUIRED") {
      this.status = _institute.status;
    }
    if(option && option.trust_name){
      this.trust_name = option.trust_name;
    }
  }
}


module.exports = {
  DecodeToken: DecodeToken,
  DataModel: DataModel,
  IsEmpty: IsEmpty,
  SuperAdmin : SuperAdminModel,
  TrustAdmin : TrustAdminModel,
  Trust : TrustModel,
  IdSet: IdSet,
  InstitutionAdmin : InstitutionAdminModel, 
  Institute : InstituteModel
};

