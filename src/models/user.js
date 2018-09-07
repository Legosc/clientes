const request = require("request");
let userModel = {};
let apiUrl = "https://crlibre.vitechd.com/api.php";
userModel.login =(userData,callback)=>{
    const postData = {
        "w": "users",
        "r": "users_log_me_in",
        "userName": userData.userName,
        "pwd": userData.pwd };
    const postOptions ={
        url: apiUrl,
        method: 'POST',
        headers: { 
            'postman-token': '4f967f3e-459a-dce6-ea8f-5274bdb27489',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
        formData: postData
    }
    var result = request(postOptions,function(err,res,body){
        if(!err && res.statusCode ==200){
            err =HasErros(body);
            callback(err,JSON.parse(body));
        }else{
            console.log(err)
        }
    
    });
}
userModel.logout =(userData,callback)=>{
    const postData = {
        "w": "users",
        "r": "users_log_me_out",
        "sessionKey": userData.sessionKey,
        "iam": userData.userName };
    const postOptions ={
        url: apiUrl,
        method: 'POST',
        headers: { 
            'postman-token': '4f967f3e-459a-dce6-ea8f-5274bdb27489',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
        formData: postData
    }
    var result = request(postOptions,function(err,res,body){
        if(!err && res.statusCode ==200){
            err =HasErros(body);
            callback(err,JSON.parse(body));
        }else{
            callback(err,JSON.parse(body));
        }
    
    });
}
userModel.validateUser=(userData,callback)=>{
    const postData = {
        "w": "users",
        "r": "users_confirm_session_vilidity",
        "sessionKey": userData.sessionKey,
        "iam": userData.userName };
    const postOptions ={
        url: apiUrl,
        method: 'POST',
        headers: { 
            'postman-token': '4f967f3e-459a-dce6-ea8f-5274bdb27489',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
        formData: postData
    }
    request(postOptions,function(err,res,body){
        if(!err && res.statusCode ==200){
            err =HasErros(body);
            callback(err,JSON.parse(body));
        }else{
            callback(err,JSON.parse(body));
        }
    
    });
}
userModel.checkAuthentication=(req,res,next)=>{
    const postData = {
        "w": "users",
        "r": "users_confirm_session_vilidity",
        "sessionKey": req.query.sessionKey,
        "iam": req.query.userName };
    const postOptions ={
        url: apiUrl,
        method: 'POST',
        headers: { 
            'postman-token': '4f967f3e-459a-dce6-ea8f-5274bdb27489',
            'cache-control': 'no-cache',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
        formData: postData
    }
    console.log(postOptions);
    request(postOptions,function(err,resApi,body){
        if(!err && res.statusCode ==200){
            err =HasErros(body);
            console.log(body);
            if (err){
                res.json({
                    success : false,
                    msg : err
                })
            } else{
                next();
            }
        }else{
            res.json({
                success : false,
                msg : err
            })
        }
        
    
    });
}
function HasErros(body){
    const codes = ["-300","-301","-302","-303","-304"];
    jCodes = [
        {code:"-300",msg:"ERROR_USERS_NO_VALID"},
        {code:"-301",msg:"ERROR_USERS_WRONG_LOGIN_INFO"},
        {code:"-302",msg:"ERROR_USERS_NO_VALID_SESSION"},
        {code:"-303",msg:"ERROR_USERS_ACCESS_DENIED"},
        {code:"-304",msg:"ERROR_USERS_EXISTS"}]
    const result = JSON.parse(body);
    if (codes.includes(result.resp)){
        return jCodes.filter(function(jCodes){return jCodes.code == result.resp});
    }
    return null;


}
module.exports = userModel;