//Libs
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Services
const _StudentModel = require('student.model');
const _AppMiddlewareService = require('../../../utility/app.middleware');
//Utilities
const appUtils = require('../../../utility/app.utils');
const appConst = require('../../../app.constants');
const authConfig = require('../../../config/auth.config');

const StudentRouter = express.Router();
StudentRouter.use(bodyParser.json());
StudentRouter.use(_AppMiddlewareService.verifyToken);

StudentRouter.route('/register')
.post(_AppMiddlewareService.verifyAccess([0]), (req, res) => {
    let dataout = new appUtils.DataModel();
    let decodedToken = jwt.decode(req.headers['x-access-token']);
    _StudentModel.create(
        {})});