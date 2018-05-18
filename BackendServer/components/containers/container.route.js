//Lib
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Queue = require('queue-fifo');
//Services
const _AppMiddlewareService = require('../../utility/app.middleware');
const _AppUtils = require('../../utility/app.utils');
const _InstituteAdminModel = require('../institute/institute-admin/institute.admin.model');
const _AppConstants = require('../../app.constants');
const _UserAuthModel = require('../shared/user.auth.model');
const _ContainerModel = require('./container.model');

const containerRouter = express.Router();
containerRouter.use(bodyParser.json())
containerRouter.use(_AppMiddlewareService.verifyToken);
//_AppMiddlewareService.verifyAccess([0]),
//API Calls
containerRouter.route('/register')
.post(_AppMiddlewareService.verifyAccess([0]),(req, res, next)=>{
    let decodedToken = jwt.decode(req.headers['x-access-token']);
    let dataout = new _AppUtils.DataModel();
    fetchInstitutionAdminId(decodedToken.id).then((institutionadmin_id)=> {
        fetchInstituteId(institutionadmin_id).then((parentIds)=> {
            breadthfirstPush(req.body, parentIds).then((accumulator_flag)=> {
                return res.json(req.body);
            }).catch(err=>{
                return res.json(err);
            })
        })
    })
});

containerRouter.route('/getContainers')
.get((req, res, next)=>{
    let decodedToken = jwt.decode(req.headers['x-access-token']);
    let dataout = new _AppUtils.DataModel();
    fetchInstitutionAdminId(decodedToken.id).then((institutionadmin_id)=> {
        fetchInstituteId(institutionadmin_id).then((parentIds)=> {

        })
    })
})

//Service function
const fetchInstituteId = (institution_id)=>{
    return new Promise((resolve, reject)=>{
        _InstituteAdminModel.findById(
            institution_id,
            (err, instituteadmin) =>{
                if(err){
                    reject(err);
                }else if(_AppUtils.IsEmpty(instituteadmin)){
                    reject(_AppConstants.INSTITUTE_ADMIN_DOESNOT_EXIST);
                }else{
                    resolve(
                        {
                            institute_id : instituteadmin.parent_institute_id,
                            trust_id : instituteadmin.parent_trust_id
                        }
                    );
                }
            }
        )
    })
}

const fetchInstitutionAdminId = (auth_id)=>{
    return new Promise((resolve, reject)=>{
        _UserAuthModel.findById(
            auth_id,
            (err, user) =>{
                if(err) {
                    reject(err);
                } else if(_AppUtils.IsEmpty(user)){
                    reject(_AppConstants.USER_DOESNOT_EXIST);
                } else{
                    resolve(user.registered_id);
                }
            }
        )
    })
}
/*
    push the bfs nodes into the pushList and 
*/

async function breadthfirstPush(data, parentIds){
    level = 0;
    let q = new Queue();
    data.level = 0;
    let accumulator_flag = true;
    data.value.trust_id = parentIds.trust_id;
    data.value.institution_id = parentIds.institute_id; 
    data.value.parent_entity_id = parentIds.institute_id;
    q.enqueue(data);
    let pushList = [];
    while(!q.isEmpty()){
      let container = q.dequeue();
      if(container.level != level){
          level = container.level;
          accumulator_flag = accumulator_flag && await Promise.all(pushList.map(registerContainer)).then(data => {
                                                            return true;
                                                        }).catch(err => {
                                                            //Will never come here
                                                            return false;
                                                        });
          pushList = [];
      }
      pushList.push(container);       
      for(let i = 0; i < container.children.length; i++){
          container.children[i].level = container.level + 1;
          container.children[i].value.trust_id = parentIds.trust_id;
          container.children[i].value.institution_id = parentIds.institute_id; 
          q.enqueue(container.children[i])
      }
    }
    accumulator_flag = accumulator_flag && await Promise.all(pushList.map(registerContainer)).then(data => {
                                                        return true;
                                                    }).catch(err => {
                                                        //Will never come here
                                                        return false;
                                                    });
    return accumulator_flag;
}
  
const registerContainer = (_param) => {
    return new Promise((resolve, reject) => {
        _ContainerModel.create(
            _param.value,
            (err, container) => {
                if(err){
                    _param.error = true;
                    reject();
                } else {
                    _param.error = false;
                    _param.value._id = container._id;
                    for(let i = 0; i < _param.children.length; i++){
                        _param.children[i].value.parent_entity_id = _param.value._id
                    }
                    resolve();
                }
            }
        )
    }).catch(err => {
        return err;
    })
}

const fetchContainers = (parentIds) => {
    return new Promise((resolve, reject)=>{
        _ContainerModel.find(
            {
                trust_id: parentIds.trust_id,
                institution_id: parentIds.institute_id 
            },
            (err, containers) => {
                if(err){
                    reject(err);
                } else {
                    resolve(containers);
                }
            }
        )
    });
}

const organizeContainers = (containers, institute_id)=>{

}
module.exports = containerRouter;