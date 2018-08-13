const Client = require('../models/client');
const User = require('../models/user');
module.exports = function(app){
    app.get('/clients',User.checkAuthentication,(req, res)=>{
        Client.getClients((err,data)=>{
            res.status(200).json(data);
        })
    });
    app.post('/clients',(req,res)=>{
        const clientData ={
            nombre : req.body.nombre,
            tipo_identificacion : req.body.tipo_identificacion,
            numero_identificacion : req.body.numero_identificacion
        };
        Client.insertClient(clientData,(err,data)=>{
            console.log(data);
            if (data){
                res.json({
                    success: true,
                    msg : 'Cliente insertado',
                    data : data
                }) 
            }else {
             res.status(500).json({
                 success : false,
                 msg : 'Error'
             })       
            }
        })
    });
    app.put('/clients/:id',(req,res)=>{
        const clientData ={
            id : req.params.id,
            nombre : req.body.nombre,
            tipo_identificacion : req.body.tipo_identificacion,
            numero_identificacion : req.body.numero_identificacion
        };
        Client.updateCliente(clientData,(err,data)=>{
            if (data){
                res.json(data);
            } else{
                res.json({
                    success : false,
                    msg : 'Error'
                })
            }
        })
    });
    app.delete('/clients/:id',(req,res)=>{
        Client.deleteClient(req.params.id,(err,data)=>{
            if (data){
                res.json(data);
            } else {
                res.json({
                    success: false,
                    msg:'Error'
                })
            }
        })
    });  
}
