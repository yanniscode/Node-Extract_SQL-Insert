/**         Quickstart-3.2 :
 * 
 *      By means of the Gmail API, this Programme permits to insert into MySQL tables
 *      selected datas parsed from ‘xlsx’ files, and converted into ‘csv’ files.
 * 
 *      QUICKSTART.JS - Version 3.2 - Copyright [2018-2020] [Seb, yanniscode, DarKaweit, stevlg, Nad, Code.bzh]
 * 
 *      This program is free software: you can redistribute it and/or modify
 *      it under the terms of the GNU General Public License as published by
 *      the Free Software Foundation, either version 3 of the License, or
 *      (at your option) any later version.
 * 
 *      This program is distributed in the hope that it will be useful,
 *      but WITHOUT ANY WARRANTY; without even the implied warranty of
 *      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *      GNU General Public License for more details.
 * 
 *      You should have received a copy of the GNU General Public License
 *      along with this program. If not, see <https://www.gnu.org/licenses/>.
 * 
*/


/*------------------------------------------------------------------------------//
//                                                                              //
//                          MODULE QUICKSTART 3.2:                              //
//                                                                              //
//                           Pool Database Connection                           //
//------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------
        Connexion à la base de données (Mysql) par Pool (permet de 
        lancer plusieurs connexions sans couper les précédentes, 
        pour la même tâche -> plus efficace)
-----------------------------------------------------------------------*/


"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


// *** Load modules:
const PoolManager = require('mysql-connection-pool-manager');

const options = {
  idleCheckInterval: 1000,
  maxConnextionTimeout: 30000,
  idlePoolTimeout: 3000,
  errorLimit: 5,
  preInitDelay: 50,
  sessionTimeout: 60000,
  onConnectionAcquire: () => { console.log("Acquire"); },
  onConnectionConnect: () => { console.log("Connect"); },
  onConnectionEnqueue: () => { console.log("Enqueue"); },
  onConnectionRelease: () => { console.log("Release"); },
  mySQLSettings: {
      host     : '',
      user     : '',
      password : '',
      database : '',
      port: '3306',
      socketPath: '/var/run/mysqld/mysqld.sock',
      charset: 'utf8',
      multipleStatements: true,
      connectTimeout: 15000,
      acquireTimeout: 10000,
      waitForConnections: true,
      connectionLimit: 50,  // ?? 1000 - temps à redéfinir ??
      queueLimit: 5000,     // ?? 5000 - temps à redéfinir ??
      debug: false
  }
}


const pool = PoolManager(options);

module.exports = pool;


