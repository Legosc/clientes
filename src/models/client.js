let clientModel = {};
clientModel.getClients = (callback)=>{
    connection.getConnection(function(err,connect){
        if(err){
            callback(err,null);
        }else{
            connect.query('SELECT * FROM clientes ORDER BY id',
        (err,rows)=>{
            if (err){
                //throw err;
                callback(err,null);
            } else{
                callback(null,rows);
            }
        });
        }
    });
};
clientModel.insertClient =(clientData,callback)=>{
    connection.getConnection(function(err,connect){
        if(err){
            callback(err,null);
        }else{
            connect.query('INSERT INTO clientes SET ?',clientData,
            (err,resutl)=>{
                if (err){
                    //throw err;
                    callback(err,null);
                } else{
                    callback(null,{
                        'insertId:':resutl.insertId
                    });
                }
            });
        }
    });
}
clientModel.updateCliente =(clientData, callback)=>{
    connection.getConnection(function(err,connect){
        if(err){
            callback(err,null);
        }else{
            const sql =`
            UPDATE clientes SET 
                nombre = ${connection.escape(clientData.nombre)},
                tipo_identificacion = ${connection.escape(clientData.tipo_identificacion)},
                numero_identificacion = ${connection.escape(clientData.numero_identificacion)}
                WHERE id =${connection.escape(clientData.id)}
            `;
            connect.query(sql,
            (err,resutl)=>{
                if (err){
                    //throw err;
                    callback(err,null);
                } else{
                    callback(null,{
                        msg : 'Success'
                    });
                }
            });
        }
    });
    
}
clientModel.deleteClient =(id,callback)=>{
    connection.getConnection(function(err,connect){
        if(err){
            callback(err,null);
        }else{
            let sql =`DELETE FROM clientes WHERE id =${connect.escape(id)}
                `;
            connect.query(sql,
            (err,resutl)=>{
                if (err){
                    //throw err;
                    callback(err,null);
                } else{
                    callback(null,{
                        msg : 'Success'
                    });
                }
            });
        }
    });
}
module.exports = clientModel;