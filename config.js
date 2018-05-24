 const DatabaseConfig = {
    MongoURL: 'mongodb://adwz007:700zwda@ds119268.mlab.com:19268/schooldb',
};
const UserModelConfig = {
    baseURL: 'localhost:3006/users',
    Routes:{
        fetchUser: '/get'
    }
}


module.exports = {
    DatabaseConfig: DatabaseConfig,
    UserModelConfig: UserModelConfig
}