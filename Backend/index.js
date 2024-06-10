const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;

//Create mysql pool
const pool = mysql.createPool({
	host: 'localhost',
	user:'root',
	password:'',
	database:'FiftyStatesDB',
	waitForConnections: true,
	connectionLimit:10,
	queryLimit: 0
});

//Get request
app.get('/states',(req,res)=>{
	pool.query('SELECT name FROM states',(err,results)=>{
		res.json(results);
	})
});

//ERR
app.on('error',(err) => {
	console.error('Error Event:',err);
})

//Start Server
app.listen(port,()=>{
	console.log('Server running at http://localhost:${port}/states');
});