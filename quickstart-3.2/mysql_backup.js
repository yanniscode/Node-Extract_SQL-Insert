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
//                              Mysql Backup                                    //
//------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------
            Programme de Sauvegarde (Backup) de la Base de données
---------------------------------------------------------------------------*/

// *** Mysqldump - cf: https://www.npmjs.com/package/mysqldump


"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


// *** Modules NodeJS utilisés :

const fs = require('fs');
const spawn = require('child_process').spawn;


// *** Modules de Quickstart :

// *** Connexion sans "pool", ici:
const connectionfile = require('./db_config/database_connection');

    
// *** "dump" le résultat dans un fichier:
const getlastcrondatefunction = (() => {

    const sql = 'SELECT max(cron_date) AS cron_date FROM cron_infos';

    try {

        connectionfile.connection.connect();

    } catch (e) {
        console.error(e);
    }


    try {

        connectionfile.connection.query(sql, function (err, results) {

            if (results[0].cron_date === null) {

                throw err = '\nErreur de sauvegarde (backup):\nIl semble que la table \'cron_infos\' est vide... Vérifiez qu\'il existe bien un fichier de restauration.\nSi c\'est le cas, Restaurez manuellement la BDD via le fichier script \'/bdd_mysql/backup/XX_XX_XXXX.dump.sql\' Sinon, vous pouvez restaurer une base vierge (Option 4)\n';

            }

            else {
          
                const dumpFileName = results[0].cron_date;

                let d = dumpFileName;

                let today = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear(); // *** conversion de 'Date' (ISO 8601) -> date simple sous forme de string (ex: '30_09_2020')


                try {
                    
                    const writeStream = fs.createWriteStream('../bdd_mysql/backup/'+ today +'.dump.sql');


                    try {

                        const dump = spawn('mysqldump', [   // *** Note: les informations de connexion sont à créer sur un fichier à créer '~/.my.cnf'
                            // '-u',
                            // '',  // *** user
                            // '-pPasse',    // *** mot de passe
                            'dataviz_fish_uk',
                        ]);


                        try {

                            dump
                                .stdout
                                .pipe(writeStream)
                                .on('finish', function () {
                                    console.log('Backup de la BDD \'dataviz_fish_uk\' effectué.')
                                })
                                .on('error', function (err) {
                                    console.log(err)
                                });
                        
                        } catch (e) {
                            console.error(e);
                        }


                    } catch (e) {
                        console.error(e);
                    }


                } catch (e) {
                    console.error(e);
                }

            }   // *** fin de 'else'

        });

    } catch (e) {
        console.error(e);
    }


    try {

        connectionfile.connection.end();

    } catch (e) {
        console.error(e);
    }

});
 


try {

    // *** Appel de la fonction pour son exécution:
    getlastcrondatefunction();

} catch(e) {
    console.error(e);
}