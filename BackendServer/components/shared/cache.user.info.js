const NodeCache = require( "node-cache" );
const userAuthCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const storeUserInfo = function(id , username){
    cacheObj = { id: id , username: username };
    userAuthCache.set( "userCache", cacheObj , function( err, success ){
    if( !err && success ){
        console.log( 'success' );
        //dataout.data.cacheMessage = "Value Cached";
      }
    else{
        console.log("error");
        //dataout.data.cacheMessage = "Value not Cached";
      }
    });
}

const returnUserInfo =  function(){
    userAuthCache.get( "usercache", function( err, value ){
          if( !err ){
            if(value == undefined){

              console.log("key not found");
              // key not found
            }else{
              console.log( value );
              //{ my: "Special", variable: 42 }
              // ... do something ...
            }
          }
        });
        /*value = userAuthCache.get("usercache");
        console.log(value);
        return value;*/
    }


module.exports = {
    returnUserInfo: returnUserInfo,
    storeUserInfo: storeUserInfo
  };
  