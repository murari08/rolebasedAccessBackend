const mysql = require('mysql2')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'roleBase',
    password:''
})

db.connect((err)=>{
    if(err){
        return  console.log('database connection failed')
       
    }
        console.log('database connected')
    
})

module.exports = db;
