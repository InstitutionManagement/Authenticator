//Libs
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Services
const _UserAuthModel = require('../../shared/user.auth.model');

//Utilities
const appUtils = require('../../utility/app.utils');
const appConst = require('../../app.constants');
const authConfig = require('../../config/auth.config');

const loginRouter = express.Router();
loginRouter.use(bodyParser.json());
