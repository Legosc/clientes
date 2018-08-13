const User = require('../models/user');
module.exports = function(app){
  app.post('/login',(req,res)=>{

    const clientData ={
      userName : req.body.userName,
      pwd : req.body.pwd
    };
    User.login(clientData,(err,data)=>{
        if (err){
            res.status(500).json({
                success: false,
                data : err
            }) 
        }
        else {
        res.json({
            success: true,
            msg : 'Session iniciada',
            data : data
        })       
      }
  })
    
});
app.post('/logout',(req,res)=>{

    const clientData ={
      userName : req.body.userName,
      sessionKey : req.body.sessionKey
    };
    User.logout(clientData,(err,data)=>{
    if (err){
        res.status(500).json({
            success: false,
            data : err
        }) 
    }
    else {
    res.json({
        success: true,
        msg : 'Muchas Gracias',
        data : data
    })
    }
  })
});
app.post('/validateUser',(req,res)=>{

    const clientData ={
      userName : req.body.userName,
      sessionKey : req.body.sessionKey
    };
    User.validateUser(clientData,(err,data)=>{
    if (err){
        res.status(500).json({
            success: false
        }) 
    }
    else {
    res.json({
        success: true
    })
    }
  })
});
}