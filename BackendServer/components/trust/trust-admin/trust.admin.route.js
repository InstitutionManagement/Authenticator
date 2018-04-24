//Libs
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
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
    let decodedToken = jwt.decode(req.headers['x-access-token']);
    // Create the user in TrustAdmin Model
    _TrustAdminModel.create(
      {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        parent_trust_id: req.body.parentTrustId,
        status: {
          tag: 'ACTIVE',
          toggled_by: {
            username: decodedToken.username,
            userAuth_id: decodedToken.id
          }
        }
      },
      (err, trustadmin) => {
        if (err) {
          dataout.error = err;
          res.json(dataout);
        }
        else{
          _UserAuthModel.create(
            {
              username: req.body.username,
              password: bcrypt.hashSync(req.body.password, authConfig.saltRounds),
              registered_id: trustadmin._id,
              user_type: 'TrustAdmin',
              status: {
                tag: 'ACTIVE',
                toggled_by: {
                  username: decodedToken.username,
                  userAuth_id: decodedToken.id
                }
              }
            },
            (err, user) => {
              if (err) {
                dataout.error = err;
                res.json(dataout);
              }
              // If success then return the required data
              else {
                _TrustAdminModel.findByIdAndUpdate(
                  trustadmin._id,
                  {
                    $set:{
                      auth_id: user._id
                    }
                  },
                  (err, success) => {
                    if (err) {
                      dataout.error = err;
                      res.json(dataout);
                    } else {
                      dataout.data = appConst.TRUST_ADMIN_CREATION_SUCCESS;
                      res.json(dataout);
                    }
                  });
              }
            }
          );
        }
      }
    );
  });

trustAdminRouter
  .route('/getTrustAdmin')
  .post(_AppMiddlewareService.verifyAccess(appConst.API_ACCESS_CODE['trustadmin/getAllTrustAdmin']),
    (req, res, next) => {
      
    }
  )
module.exports = trustAdminRouter;
