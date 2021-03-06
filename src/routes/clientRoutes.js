const Client = require('../models/client');
const User = require('../models/user');
module.exports = function(app){
    app.get('/clients',User.checkAuthentication,(req, res)=>{
        Client.getClients((err,data)=>{
            res.status(200).json(data);
        })
    });
    app.post('/clients',User.checkAuthentication,(req,res)=>{
        const clientData ={
            nombre : req.body.nombre,
            tipo_identificacion : req.body.tipo_identificacion,
            numero_identificacion : req.body.numero_identificacion
        };
        Client.insertClient(clientData,User.checkAuthentication,(err,data)=>{
            if (data){
                res.json({
                    success: true,
                    msg : 'Cliente insertado',
                    data : data
                }) 
            }else {
             res.status(500).json({
                 success : false,
                 msg : err
             })       
            }
        })
    });
    app.put('/clients/:id',User.checkAuthentication,(req,res)=>{
        const clientData ={
            id : req.params.id,
            nombre : req.body.nombre,
            tipo_identificacion : req.body.tipo_identificacion,
            numero_identificacion : req.body.numero_identificacion
        };
        Client.updateCliente(clientData,User.checkAuthentication,(err,data)=>{
            if (data){
                res.json(data);
            } else{
                res.json({
                    success : false,
                    msg : err
                })
            }
        })
    });
    app.delete('/clients/:id',User.checkAuthentication,(req,res)=>{
        Client.deleteClient(req.params.id,(err,data)=>{
            if (data){
                res.json(data);
            } else {
                res.json({
                    success: false,
                    msg: err
                })
            }
        })
    });  
}
