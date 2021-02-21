/**         Quickstart-3.3 :
 * 
 *      By means of the Gmail API, this Programme permits to insert into MySQL tables
 *      selected datas parsed from ‘xlsx’ files, and converted into ‘csv’ files.
 * 
 *      QUICKSTART.JS - Version 3.3 - Copyright [2018-2020] [Seb, yanniscode, DarKaweit, stevlg, Nad, Code.bzh]
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
//                          MODULE QUICKSTART 3.3:                              //
//                                                                              //
//                            Cron Date Record                                  //
//------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------
      Programme (désormais séparé) d'insertion de la date du dernier Cron 
                            dans la table 'cron_infos'
-----------------------------------------------------------------------------*/

"use strict"; // *** With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)

const connectionfile = require('./db_config/database_connection');

// *** "dump" le résultat dans un fichier:
const insertLastCronDateFunction = (() => {

    const sql = ('INSERT INTO cron_infos (id_cron) VALUE (NULL)');

    try {

        connectionfile.connection.connect();

    } catch (e) {
        console.error(e);
    }

    try {

        connectionfile.connection.query(sql, function (err, result) { // *** début de connexion à la Base de Données MySQL

            if (err) { 

                try {

                    connectionfile.connection.rollback(function() {
                        throw err;
                    });

                } catch (e) {
                    console.error(e);
                }

            }

            else {

                console.log('sql + result :\n'+ sql +' '+ result);


                setTimeout(() => {

                    console.log('\nTransaction effectuée via \'cron_date_record.js\'.\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n');

                }, 1000);

            };
            
        });     // *** fin de connectionfile.connection.query() 


    } catch (e) {
        console.error(e);
    }


});

try {

    // *** Appel de la fonction pour son exécution:
    insertLastCronDateFunction();

} catch(e) {
    console.error(e);
}
