const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const upload = require('express-fileupload');

const appConstants = require('../../app.constants');
const appUtils = require('../../utility/app.utils');
const _SuperAdminModel = require('../super-admin/super.admin.model');
const _TrustAdminModel = require('../trust/trust-admin/trust.admin.model');
const imageUploadRouter = express.Router();
imageUploadRouter.use(upload());

imageUploadRouter.route('/upload')
.post(function (req, res) {
    let dataout = new appUtils.DataModel();
    let displayPic = req.files.displayPic;
    let _id = req.body._id;
    let user_ype = req.body.user_type;
    let _path = path.join(__dirname,'../../images', _id + path.extname(displayPic.name));
    if(displayPic){
        displayPic.mv(_path, (err) => {
            if(err){
                console.log(err);
                res.json(err);
            } else{
                let url = path.join("localhost:3005/displayimage/", _id + path.extname(displayPic.name));
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
    
});

module.exports = imageUploadRouter;