//Libs
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

//Services
const _UserAuthModel = require('../shared/user.auth.model');
const _SuperAdminModel = require('../super-admin/super.admin.model');
const _AppMiddlewareService = require('../../utility/app.middleware');
const _GroupPolicyModel = require('../shared/group.policy.model');
const _TrustModel = require('../trust/trust.model');

//Utility
const authConfig = require('../../config/auth.config');
const appUtils = require('../../utility/app.utils');
const appConst = require('../../app.constants');

const trustRouter = express.Router();
trustRouter.use(bodyParser.json());
trustRouter.use(_AppMiddlewareService.verifyToken);

//Register a Trust
trustRouter.route('/register').post(_AppMiddlewareService.verifyAccess([0, 1]), (req, res, next) => {
  let dataout = new appUtils.DataModel();
  _TrustModel.create(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      created_by: req.body.created_by,
      website: req.body.website,
      document_link: req.body.document_link
    },
    (err, trust) => {
      if (err) {
        dataout.error = err;
        res.json(dataout);
      } else {
        dataout.data = trust;
        res.json(dataout);
      }
    }
  );
});

//Update trust
trustRouter.route('/update').post(_AppMiddlewareService.verifyAccess([0, 1]), (req, res, next) => {
  let dataout = new appUtils.DataModel();
  _TrustModel.update(
    {
      _id: req.body._id
    },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        created_by: req.body.created_by,
        website: req.body.website,
        document_link: req.body.document_link
      }
    },
    (err, trust) => {
      if (err) {
        dataout.error = err;
        res.json(dataout);
        return;
      } else {
        dataout.data = trust;
        res.json(dataout);
      }
    }
  );
});

//get all trusts
trustRouter.route('/getAllTrusts').post(_AppMiddlewareService.verifyAccess([0, 1]), (req, res, next) => {
  let dataout = new appUtils.DataModel();
  let condition = {};
  if (!appUtils.IsEmpty(req.body.condition)) {
    condition = req.body.condition;
  }
  _TrustModel.find(condition, (err, trusts) => {
    if (err) {
      dataout.error = err;
      res.json(dataout);
    } else {
      dataout.data = trusts;
      res.json(dataout);
    }
  });
});

/*
//Delete a trust
trustRouter.route('/deleteTrust/:trustid')
.delete(_AppMiddlewareService.verifyAccess(appConst.API_ACCESS_CODE["trust/deleteTrust/:trustId"]),(req, res, next) => {
  let dataout = new appUtils.DataModel();
  let trustid = req.params.trustId
  _TrustModel.findByIdAndRemove(trustid, (err, trust) => {
    if(err){
      dataout.error = err;
      res.json(dataout);
    } 
    else if(!trust){
      dataout.error = appConst.DB_CODES.db005;
      res.json(dataout);
    }
    else{
      
    }
  })
})*/

module.exports = trustRouter;
