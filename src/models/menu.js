let menuModel = {};
menuModel.getMenus = (data,callback)=>{
    connection.getConnection(function(err,connect){
        console.log(data.userName);
        if(err){
            callback(err,null);
        }else{
            const sql =`
            SELECT menu.*
                FROM menu 
                LEFT JOIN menu_permisos p ON menu.id = p.id_menu
                LEFT JOIN users u ON p.settings = u.settings
                WHERE u.userName =${connection.escape(data.userName)}
            `;
            connect.query(sql,
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
module.exports = menuModel;