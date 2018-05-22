const express = require('express');
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const _LogInConstants = require('./login.constants');
const _LogInService = require('./login.service');

import { IsValidWord } from '../utility';


const loginRouter = express.Router();
loginRouter.use(IsValidWord);


loginRouter.route('/')
.post((req, res)=> {
    
})