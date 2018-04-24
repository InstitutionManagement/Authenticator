//Libs
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Services
const _UserAuthModel = require('./user.auth.model');
const _SuperAdminModel = require('../super-admin/super.admin.model');
const _TrustAdminModel = require('../trust/trust-admin/trust.admin.model');

//Utilities
const appUtils = require('../../utility/app.utils');
const appConst = require('../../app.constants');
const authConfig = require('../../config/auth.config');

const loginRouter = express.Router();
loginRouter.use(bodyParser.json());

loginRouter.route('/').post((req, res, next) => {
  let dataout = new appUtils.DataModel();
  _UserAuthModel.findOne({ username: req.body.username }, (err, auth) => {
    if (err) {
      dataout.error = err;
      res.json(dataout);
    }
    if (!appUtils.IsEmpty(auth)) {
      if (bcrypt.compareSync(req.body.password, auth.password)) {
        dataout.data.token = jwt.sign({ id: auth._id, username: auth.username }, authConfig.secret, {
          expiresIn: 86400
        });
        switch (auth.user_type) {
          case 'SuperAdmin':
            _SuperAdminModel.findById(auth.registered_id, (err, user) => {
              if (err) {
                dataout.data.token = null;
                dataout.data.error = err;
                res.json(dataout);
              } 
              else if(user.status.tag == "DELETED"){
                dataout.data.token = null;
                dataout.data.error = appConst.DB_CODES.db001;
                res.json(dataout);
              }
              else {
                dataout.data.user =  new appUtils.SuperAdmin(user);
                res.json(dataout);
              }
            });
            break;
          case 'TrustAdmin':
            _TrustAdminModel.findById(auth.registered_id, (err, user) => {
              if (err) {
                dataout.data.token = null;
                dataout.data.error = err;
                res.json(dataout);
              }
              else if(user.status.tag == "DELETED"){
                dataout.data.token = null;
                dataout.data.error = appConst.DB_CODES.db001;
                res.json(dataout);
              } 
              else {
                dataout.data.user = new appUtils.TrustAdmin(user);
                res.json(dataout);
              }
            });
            break;
          default:
            dataout.error.message = "This type of user doesn't exist";
            res.json(dataout);
        }
      } else {
        dataout.error = appConst.USER_ERROR.u002;
        res.json(dataout);
      }
    } else {
      dataout.error = appConst.USER_ERROR.u002;
      res.json(dataout);
    }
  });
});

loginRouter.route('/username/isexist').post((req, res, next) => {
  res.json('API NOT READY');
});

module.exports = loginRouter;
