const Menu = require('../models/menu');
const User = require('../models/user');
module.exports = function(app){
    app.get('/menus',User.checkAuthentication,(req, res)=>{
        const data ={
            userName : req.query.userName,
        };
        Menu.getMenus(data,(err,resutl)=>{
            res.status(200).json(resutl);
        })
    });
}