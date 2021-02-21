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



/*------------------------------------------------------------------------//
//                                                                        //
//                        MODULE CRON_LAUNCHER-2.0                        //
//                                                                        //
//------------------------------------------------------------------------*/


/*------------------------------------------------------------------------
                Lancement du plannificateur de tâches 'Cron'

Planificateur de tâches Cron - cf: https://github.com/wahengchang/nodejs-cron-job-must-know

Module de planification de tâche (crontab) pour Node.js, et dans notre cas : QUICKSTART-X.X.js
CRON_LAUNCHER-1.4: Module de planification de tâche (crontab) pour Node.js, et dans notre cas : QUICKSTART-X.X.js

DERNIERES MODIFICATIONS (25/10/2020):
Utilisation de PM2 pour le lancement d'un daemon persistant (lancement indirect des scripts NodeJs), avec changement dans la gestion des 
unités temporelles pour l'interface...

Note: Planificateur de tâches Cron (infos):

Ordre des unités temporelles : (à revoir, si nécessaire...) 
minute / heure / numéro du mois / jour du mois / jour de la semaine

cron.schedule('0 15 * * 2-5', function() { // ex :version dont les dates pourrait convenir à notre projet : déclencher le script du Mardi au Vendredi, à 15h 00min 00s  // *** à tester

cron.schedule('*`/1 * * * *', function() { // ex: test à chaque minute (seconde 1)

-------------------------------------------------------------------------*/


"use strict"; // *** With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


const pm2 = require("pm2");

const readline = require('readline');
const connectionfile = require('./db_config/database_connection');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let d = new Date();

let today = '\n*** Date (sur le serveur): On est le '+ d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ". Il est actuellement: " + d.getHours() + " heure " + d.getMinutes() + " minutes et "+ d.getSeconds() +' secondes... ***';


// *** Méthode d'exécution du la tâche 'Cron' - définition du moment de lancement par l'utilisateur:
const cronLauncherExec = (() => {

    console.log('\n  *****************************************************************************************************');
    console.log('   ***                                      Départ de CRON LAUNCHER 2.0                           ***');
    console.log('  *****************************************************************************************************\n');


    try {

        console.log('Hello ! \n'+ today +'\n');

        rl.question('\n*** Cron Launcher: Entrez votre moment de lancement du planificateur de tâches ici ***\n\n*** ATTENTION: A RETESTER AVEC NOUVEAU CRON, PAR PM2 * = par défaut] ***\n\n*** Ex: 0 15 * * 2-5 = déclencher le script du Mardi au Vendredi, à 15h 00min 00s ***\n\n*** C\'est à vous: ', function (momentvalue) {

            if (momentvalue === '') {
                throw err = '\nCron_Launcher: Choix du moment de lancement non (ou mal) indiqué... Aucune action n\'a été effectuée.\nRelancez le programme si vous le souhaitez...';
            }

            else {


                try {

                    rl.close();

                } catch(e) {
                    console.error(e);
                }


                try {



                    pm2.connect(function(err) {

                        if (err) {
                            console.error(err);
                            process.exit(2);
                        }

                        console.time('Cron_launcher: Temps de réponse');


                        pm2.start(
                            {
                                name: "pm2ManageDatabaseBackup",
                                script: "./mysql_backup.js",
                                watch: true,
                                instances: 1,
                                exec_mode: "fork",
                                cron_restart: momentvalue, // ex: cron_restart: "*/1 * * * *", // restart every minute (used for testing)
                                autorestart: false // this is the problem here [when 'true'...]
                            },
                            
                            function(err, apps) {

                                if (err) throw err;

                                console.log("pm2 started ");

                                console.time('Database Backup: Temps de réponse');

                                pm2.disconnect(); // Disconnects from PM2

                            }
                        );


                        pm2.start(
                            {
                            name: "pm2ManageQuickstart",
                            script: "./1-authentification.js",
                            watch: true,
                            instances: 1,
                            exec_mode: "fork",
                            cron_restart: momentvalue,
                            autorestart: false
                            },
                            
                            function(err, apps) {
            
                                if (err) throw err;

                                console.time('Quickstart: Temps de réponse');

                                pm2.disconnect();
            
                            }
                        );


                        pm2.start(
                            {
                            name: "pm2ManageCronDateRecord",
                            script: "./cron_date_record.js",
                            watch: true,
                            instances: 1,
                            exec_mode: "fork",
                            cron_restart: momentvalue,
                            autorestart: false
                            },
                            
                            function(err, apps) {
            
                                if (err) throw err;

                                console.time('Cron Date: Temps de réponse');

                                pm2.disconnect();
            
                            }
                        );


                    });


                } catch (e) {
                    console.error(e);
                    connectionfile.connection.end();
    
                }


            }
            
        });

    } catch(e) {
        console.error(e);
    }

}); // *** fin de 'cronLauncherExec()'



try {

    // *** Appel de la fonction pour exécution du planificateur de tâches 'cron_launcher':
    cronLauncherExec();

} catch(e) {
    console.error(e);
}
