//Libs
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

//Services
const _UserAuthModel = require('../../shared/user.auth.model');
const _AppMiddlewareService = require('../../../utility/app.middleware');
const _TrustAdminModel = require('./trust.admin.model');
//Utility
const authConfig = require('../../../config/auth.config');
const appUtils = require('../../../utility/app.utils');
const appConst = require('../../../app.constants');

const trustAdminRouter = express.Router();
trustAdminRouter.use(bodyParser.json());

trustAdminRouter.use(_AppMiddlewareService.verifyToken);

//Register a trust admin
trustAdminRouter
  .route('/register')
  .post(_AppMiddlewareService.verifyAccess(appConst.API_ACCESS_CODE['trustadmin/register']), (req, res, next) => {
    let dataout = new appUtils.DataModel();
    // Create the user in TrustAdmin Model
    _TrustAdminModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        parent_trust_id: req.body.parentTrustId
      },
      (err, trustadmin) => {
        if (err) {
          dataout.error = err;
          res.json(dataout);
        }
        _UserAuthModel.create(
          {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, authConfig.saltRounds),
            registered_id: trustadmin._id,
            user_type: 'TrustAdmin'
          },
          (err, user) => {
            if (err) {
              dataout.error = err;
              res.json(dataout);
            }
            // If success then return the required data
            dataout.data.name = trustadmin.name;
            dataout.data.email = trustadmin.email;
            dataout.data.phone = trustadmin.phone;
            dataout.data.address = trustadmin.address;
            dataout.data.username = user.username;
            dataout.data.imageUrl = trustadmin.image_url;
            dataout.data.privilage = user.privilage_code;
            dataout.data.userid = user._id;
            res.json(dataout);
          }
        );
      }
    );
  });

module.exports = trustAdminRouter;
