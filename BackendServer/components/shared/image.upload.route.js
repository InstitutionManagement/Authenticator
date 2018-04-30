const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const upload = require('express-fileupload');

const _AppMiddlewareService = require('../../utility/app.middleware');
const appConstants = require('../../app.constants');
const appUtils = require('../../utility/app.utils');
const _SuperAdminModel = require('../super-admin/super.admin.model');
const _TrustAdminModel = require('../trust/trust-admin/trust.admin.model');
const _UserAuthModel = require('../shared/user.auth.model');

const imageUploadRouter = express.Router();
imageUploadRouter.use(upload());
imageUploadRouter.use(_AppMiddlewareService.verifyToken);
imageUploadRouter.route('/upload')

.post(function (req, res) {
    let auth_id = appUtils.DecodeToken(req.headers['x-access-token']).id;
    let dataout = new appUtils.DataModel();
    let displayPic = req.files.displayPic;
    let _id = req.body._id;
    _UserAuthModel.findById(auth_id, (err,user) => {
        if(err){
            dataout.error = err;
            res.json(dataout);
        } else if (user.registered_id != _id){
            dataout.error = appConstants.AUTHENTICATION_FAILURE;
            res.json(dataout);
        } else {
            let user_ype = req.body.user_type;
            let _path = path.join(__dirname,'../../images', _id + path.extname(displayPic.name));
            if(displayPic){
                displayPic.mv(_path, (err) => {
                    if(err){
                        console.log(err);
                        res.json(err);
                    } else{
                        let url = path.join("http://localhost:3005/displayimage/", _id + path.extname(displayPic.name));
                        switch(user_ype){
                            case "SuperAdmin": {
                                _SuperAdminModel.findByIdAndUpdate(
                                    _id,
                                    {
                                        $set:{
                                            image_url: url
                                        }
                                    },
                                    (err, success) => {
                                        if(err){
                                            dataout.error = err;
                                            res.json(dataout);
                                        } else {
                                            dataout.data = appConstants.SUPER_ADMIN_UPDATE_SUCCESS;
                                            res.json(dataout);
                                        }
                                    }
                                )
                            }
                            break;
                            default: {
                                dataout.error = "Failed";
                                res.json(dataout);        
                            }
                        }
                    }
                });
            } else {
                dataout.error = "Failed";
                res.json(dataout);  
            }
        }
    });
});

module.exports = imageUploadRouter;