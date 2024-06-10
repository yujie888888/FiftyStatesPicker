const express = require('express');
const app = express();
const mysql = require('mysql2');
const port = 3010;

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
	pool.query('SELECT name FROM states;',(err,results)=>{
		if(err){
			console.error('Database query error:',err);
			res.status(500).json({error:'Database query error'});
		}
		res.json(results);
	})
});

//ERR
app.on('error',(err) => {
	console.error('Error Event:',err);
})

//Start Server
app.listen(port,()=>{
	console.log(`Server running at http://192.168.1.160:${port}/states`);
});