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
//                              Mysql Restaure                                    //
//------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------
            Programme de Restauration de la Base de données
                
            *** IMPORTANT: ***

        Il est nécessaire d'avoir exécuté au moins une tâche Cron fructueuse auparavant,
        qui sert de repère pour retrouver le dernier fichier de backup enregistré.
        
        Sinon, il vous faudra effectuer un 'backup' manuel.
--------------------------------------------------------------------------------------------------*/

// *** restauration de la BDD MySQL - cf: https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js



"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



// *** Modules de Quickstart :
const { exec } = require('child_process');
// *** Connexion sans "pool", ici:
const connectionfile = require('./db_config/database_connection');


// *** Fonction qui importe le fichier "dump" dans la BDD:
const importDumpFile = ((err) => {

    const sql = 'SELECT max(cron_date) AS cron_date FROM cron_infos';

    if (err) {
        throw err;
    }

    else {

        try {

            connectionfile.connection.connect();

        } catch(e) {
            console.error(e);
        }

        try {
        
            connectionfile.connection.query(sql, function (err, results) {

                if (results[0].cron_date === null) {

                    throw err = '\nVérifiez qu\'une date existe bien dans la table \'cron_infos\'.\nSinon, il semble que celle-ci n\'existe pas...Vous devrez, dans ce cas, importer directement le script \'.sql\' de récupération (s\'il est présent, dans \'bdd_mysql/backup\'), dans \'phpmyadmin\', ou bien dans un terminal, sous \'mysql\ (commande shell : \"mysql -u <Nom_Utilisateur> -p<Votre_Passe> <Nom_de_BDD>\")';
                }

                else {

                    const dumpFileName = results[0].cron_date;

                    let d = dumpFileName; // *** date au format: 2020-10-01T18:50:33.278Z

                    let today = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear(); // *** conversion en date simple sous forme de string (ex: 30_09_2020)

                    try {

                        exec('mysql dataviz_fish_uk < ~/node-extract_sql-insert-p-clean/bdd_mysql/backup/'+ today +'.dump.sql', (error, stdout, stderr) => {    // *** Note: ici, utilisation (plus sécurisée) du fichier '.my.cnf' de '/Home' (= données utilisateur et mot de passe)

                            if (error) {
                                console.error(`error: ${error.message}`);
                            }

                            if (stderr) {
                                console.error(`stderr: ${stderr}`);
                            }

                            // console.log(`stdout:\n${stdout}`);

                        });

                    } catch (e) {
                        console.error(e);
                    }

                }

            });


        } catch (e) {
            console.error(e);
        }


        try {

            connectionfile.connection.end();

        } catch (e) {
            console.error(e);
        }

    }   // *** fin de 'else'

});


try {

    // *** Appel de la fonction de 'dump':
    importDumpFile();

} catch (e) {
    console.error(e);
}