const connection =require('./connection');

let clientModel = {};
clientModel.getClients = (callback)=>{
if (connection){
    connection.query('SELECT * FROM clientes ORDER BY id',
(err,rows)=>{
    if (err){
        //throw err;
        console.log(err);
    } else{
        callback(null,rows);
    }
});
}
};
clientModel.insertClient =(clientData,callback)=>{
    if(connection){
        connection.query('INSERT INTO clientes SET ?',clientData,(err, resutl) =>{
            if (err){
                //throw err;
                console.log(err);
            }else{
                callback(null,{
                    'insertId:':resutl.insertId
                })
            }
        });
    }
}
clientModel.updateCliente =(clientData, callback)=>{
    if(connection){
        const sql =`
        UPDATE clientes SET 
            nombre = ${connection.escape(clientData.nombre)},
            tipo_identificacion = ${connection.escape(clientData.tipo_identificacion)},
            numero_identificacion = ${connection.escape(clientData.numero_identificacion)}
            WHERE id =${connection.escape(clientData.id)}
        `;
        connection.query(sql,(err,resutl)=>{
            if(err){
                //throw err;
                console.log(err);
            } else {
                callback(null,{
                    msg : 'Success'
                })
            }
        })
    }
}
clientModel.deleteClient =(id,callback)=>{
    if(connection){

        let sql =`DELETE FROM clientes WHERE id =${connection.escape(id)}
        `;
        connection.query(sql,(err,result)=>{
            if (err){
                console.log(err);
            } else{
                callback(null,{
                    msg : 'Success'
                })
            }
        })
    }
}
module.exports = clientModel;