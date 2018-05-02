//Libs
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

//Services
const _AppMiddlewareService = require('../../utility/app.middleware');
const _InstituteModel = require('../institute/institute.model');

//Utility
const appUtils = require('../../utility/app.utils');

const instituteRouter = express.Router();
instituteRouter.use(bodyParser.json());
instituteRouter.use(_AppMiddlewareService.verifyToken);

//register an institute
instituteRouter.route('/register').post(_AppMiddlewareService.verifyAccess([0, 1]), (req, res, next) => {
  let dataout = new appUtils.DataModel();
  let decodedToken = appUtils.DecodeToken(req.headers['x-access-token'])
  _InstituteModel.create(
    {
      name: req.body.name,
      parent_trust_id: req.body.parent_trust_id,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      created_by: req.body.created_by,
      website: req.body.website,
      document_link: req.body.document_link,
      status: {
        tag: 'ACTIVE',
        toggled_by: {
          username: decodedToken.username,
          userAuth_id: decodedToken.id
        }
      }
    },
    (err, institute) => {
      if (err) {
        dataout.error = err;
        res.json(dataout);
      } else {
        dataout.data = institute;
        res.json(dataout);
      }
    }
  );
});

//get all institutes
instituteRouter.route('/getAllInstitutes').post(_AppMiddlewareService.verifyAccess([0, 1]), (req, res, next) => {
  let dataout = new appUtils.DataModel();
  let condition = {};
  if (!appUtils.IsEmpty(req.body.condition)) {
    condition = req.body.condition;
  }
  _InstituteModel.find(condition, (err, institutes) => {
    if (err) {
      dataout.error = err;
      res.json(dataout);
    } else {
      dataout.data = [];
      institutes.forEach(institute => {
        dataout.data.push(new appUtils.Institute(institute, "STATUS_REQUIRED"))
      });
      res.json(dataout);
    }
  });
});

module.exports = instituteRouter;