const express = require ('express');
const app = express();
const port = 3003;
const bodyParser = require ('body-parser')
const mysql = require('mysql');

//!Connect Database

const ConnectDb = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"messange"
})
ConnectDb.connect((error)=>{
    if(error){console.log("failed connection")}
    else{console.log("Succes Connect to database")}
})

//!Custom Response

const CustomResponse = (Status_Code,data,res) =>{
    res.json(Status_Code,[
        {
            Status_Code,
            data,
        }
  ])
}


app.use(bodyParser.json())


// ! Router

app.get('/Api',(req,res)=>{ 
    const sql = "SELECT * FROM messangegabaut"
    ConnectDb.query(sql,(err,response)=>{
        if(err){ CustomResponse(404,"Not Found",res)}
        else{CustomResponse(200,response,res)}
    })
})

app.get('/Api/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM messangegabaut WHERE id=${id}`
    ConnectDb.query(sql,(err,response)=>{
        if(err){CustomResponse(500,0,0,0,"eror server",res)}
        if(id <= 4 ){CustomResponse(200,response,res)}
        else{(CustomResponse(404,"not found",res))}
    })
})

app.post('/Api',(req,res)=>{
    const {Nama_Anda,Messange} = req.body
    const sql = `INSERT INTO messangegabaut (Nama_Anda,Messange) VALUES ('${Nama_Anda}','${Messange}')`

    ConnectDb.query(sql,(err,response)=>{
       if(err) {CustomResponse(404,"can't input data",res)}
       else{CustomResponse(200,response.insertId,res)}
    })
})

app.put('/Api',(req,res)=>{
    const {Nama_Anda,Messange}=req.body
    const sql = `UPDATE messangegabaut SET Nama_Anda='${Nama_Anda}',Messange = '${Messange}' WHERE Nama_Anda= '${Nama_Anda}'`

    ConnectDb.query(sql,(err,response)=>{
       if(err){CustomResponse(404,"can't put data",res)}
       else{CustomResponse(200,response.changedRows,res)}
    })
})

app.delete('/Api',(req,res)=>{
    const {Nama_Anda} = req.body
    const sql = `DELETE FROM messangegabaut WHERE Nama_Anda='${Nama_Anda}'`

    ConnectDb.query(sql,(err,response)=>{
        if(err) {CustomResponse(500,0,0,0,"server error",res)}

        if(response.affectedRows !== 0){CustomResponse(200,response.affectedRows,res)}
        else{(CustomResponse(404,"data sudah terhapus",res))}
    })
})
app.listen(port,()=> {
    console.log(`connect succes to port ${port}`)})