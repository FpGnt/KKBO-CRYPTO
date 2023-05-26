var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: ""
});

function Insert_connections(address, token){
    connection.query(`INSERT INTO kkbopro_crypto.connections (address, token,datetime) VALUES ('${address}','${token}',NOW())`, function (error, results, fields) {
      if (error) throw error;
    });
    }
    
    function select_fb_vaults(code){
      return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM reporting.fb_vaults WHERE code IN ('${code}')`, function (error, results, fields) {  
          resolve(results)
        });
      });
        }

        function update_fb_vaults(amount, code){
          connection.query(`UPDATE reporting.fb_vaults SET balance = '${amount}' WHERE code = '${code}';`, function (error, results, fields) {
            if (error) throw error;
          });
          }

          function updateaddress_fb_vaults(address, code){
            connection.query(`UPDATE reporting.fb_vaults SET address = '${address}' WHERE code = '${code}';`, function (error, results, fields) {
              if (error) throw error;
            });
            }

            function select_fb_vaults_address_null(){
              return new Promise((resolve, reject) => {
                connection.query(`SELECT * FROM reporting.fb_vaults WHERE address = 'null'`, function (error, results, fields) {  
                  resolve(results)
                });
              });
                }
        module.exports = {Insert_connections}
