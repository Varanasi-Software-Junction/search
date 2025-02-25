const mysql = require('mysql'); 
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'Punit@5768', database: 'u498669757_MyDB' }); 
connection.connect((err) => { if (err) { 
    console.error('Error connecting to the database:', err.stack); 
    return; } 
    console.log('Connected to the database as id', connection.threadId); }); 
    connection.query('SELECT * FROM your_table_name', (err, results, fields) => 
        { if (err) { console.error('Error executing query:', err.stack); 
            return; } console.log('Query results:', results); });
             connection.end((err) => { if (err) { 
                console.error('Error closing the connection:', err.stack);
                 return; } console.log('Connection closed.'); }); 
