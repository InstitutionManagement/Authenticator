module.exports = {
  API_ACCESS_CODE: {
    'superadmin/register': [0, 12],
    'superadmin/getAllSuperAdmins': [0, 11, 12],
    'superadmin/deleteSuperAdmin/:userid': [0, 12],
    'superadmin/updateSuperAdmin': [0, 11, 12, 13],
    'superadmin/newGroupPolicy': [0, 11],
    'superadmin/updateGroupPolicy': [0, 11],
    'superadmin/getAllGroupPolicy': [0, 11],
    'superadmin/removeGroupPolicy': [0, 11],
    'superadmin/setgroup': [0, 12],

    'trust/deleteTrust/:trustId': [0, 13],
    'trust/register': [0, 13],
    'trust/getAllTrusts': [0, 13],
    'trust/updateTrust': [0, 13],

    'trustadmin/register': [0, 13],
    'trustadmin/deleteTrustAdmin/:userid': [0, 13],
    'trustadmin/updateTrustAdmin': [0, 21, 22],
    'trustadmin/getAllTrustAdmin': [0, 13],
    
  },
  USER_ERROR: {
    u001: {
      error_code: 'u001',
      message: 'username alredy exits'
    },
    u002: {
      error_code: 'u002',
      message: 'Username or password is wrong'
    },
    u003: {
      error_code: 'u003',
      message: 'Required data not provided'
    }
  },
  DB_PERMISSIONS: {
    create: '+c',
    find: '+f',
    update: '+u',
    delete: '+d'
  },
  DB_CODES: {
    db001: {
      message: "User doesn't exist!!!"
    },
    db002: {
      message: 'Successfully removed user'
    },
    db003: {
      message: 'Group policy not found'
    },
    db004: {
      message: 'Successfully removed the group policy'
    },
    db005: {
      message: 'Trust not found'
    },
    db006: {
      message: 'User Successfully Restored'
    }
  },
  SUPER_ADMIN_CREATION_SUCCESS:{
    message: "Successfully created new Super Admin !!!"
  },
  USER_CREATION_SUCCESS : {
    message: "Successfully created user"
  },
  
  ACCESS_ERRORS: {
    a001: {
      error_code: 'a001',
      message: 'Action is not permitted'
    }
  },
  USER_SETTINGS: {
    push_root: false
  }
};
