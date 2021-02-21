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
//                           Database Connection                                //
//------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------
                Connexion à la base de données (Mysql)
-------------------------------------------------------------------------*/

const mysql = require('mysql2');

module.exports = {

    // *** Note: connexion à la BDD sans 'pool', ici:
    connection: mysql.createConnection ({
        host: "",
        user: "",
        password: "",
        database: "",
    })

}
