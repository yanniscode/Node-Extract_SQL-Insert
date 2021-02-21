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



/*------------------------------------------------------------------------//
//                                                                        //
//                        MODULE CRON_LAUNCHER-1.4                        //
//                                                                        //
//------------------------------------------------------------------------*/


/*------------------------------------------------------------------------
                Lancement du plannificateur de tâches 'Cron'

Planificateur de tâches Cron - cf: https://github.com/wahengchang/nodejs-cron-job-must-know

Module de planification de tâche (crontab) pour Node.js, et dans notre cas : QUICKSTART-X.X.js
CRON_LAUNCHER-1.4: Module de planification de tâche (crontab) pour Node.js, et dans notre cas : QUICKSTART-X.X.js

DERNIERES MODIFICATIONS (02/10/2020):
Adaptation à l'interface de Quickstart (planificateur de tâche désormais interactif sur le choix du moment de lancement)

Note: Planificateur de tâches Cron (infos):

Ordre des unités temporelles : 
seconde / minute / heure / numéro du mois / jour du mois / jour de la semaine (de 1 à 7)

cron.schedule('0 0 15 * * 2-5', function() { // version dont les dates pourrait convenir à notre projet : déclencher le script du Mardi au Vendredi, à 15h 00min 00s

cron.schedule('50 22 17 6 6 6', function() { // test à un instant précis

-------------------------------------------------------------------------*/


"use strict"; // *** With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



// *** Modules NodeJS utilisés :
const cron = require('node-cron'); // *** Module de planification de tâche (crontab)
const readline = require('readline');


// *** Variables (globales) :

// *** Connexion sans "pool", ici:
const connectionfile = require('./db_config/database_connection');
const shellfile = require('./annexes/child_helper/child_helper');   // *** fichier "child_helper" nécessaire

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let d = new Date();
let today = '\n*** Date (sur le serveur): On est le '+ d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + ".\nIl est actuellement: " + d.getHours() + " heure " + d.getMinutes() + " minutes et "+ d.getSeconds() +' secondes... ***';


// *** Méthode d'exécution du la tâche 'Cron' - définition du moment de lancement par l'utilisateur:
const definecrontime = (() => {


    try {

        console.log('\nHello ! \n'+ today +'\n');

        rl.question('\n*** Cron Launcher: Entrez votre moment de lancement du planificateur de tâches ici ***\n\n*** format: "seconde / minute / heure / numéro du mois / jour du mois / jour de la semaine (de 1 à 7)"\n [séparés par des espaces - valeur * = par défaut] ***\n\n*** Ex: 0 0 15 * * 2-5 = déclencher le script du Mardi au Vendredi, à 15h 00min 00s ***\n\n*** C\'est à vous: ', function (momentvalue) {

            if (momentvalue === '') {
                throw err = '\nCron_Launcher: Choix du moment de lancement non (ou mal) indiqué... Aucune action n\'a été effectuée.\nRelancez le programme si vous le souhaitez...';
            }

            else {

                try {

                    rl.close();

                } catch(e) {
                    console.error(e);
                }

                // *** Appel de la méthode d'exécution du planificateur de tâches 'cron_launcher' :

		try {
                    executecronlauncher(momentvalue);
		}
		catch(e){
		    console.error(e);
		    connectionfile.connection.end();
		}

	    }

        });

    } catch(e) {
        console.error(e);
    }

}); // *** fin de 'definecrontime()'



// *** Méthode d'exécution du la tâche Cron:
const executecronlauncher = ((momentvalue) => {


    console.log('\n  *****************************************************************************************************');
    console.log('   ***                                      Départ de CRON LAUNCHER 1.4                            ***');
    console.log('  *****************************************************************************************************\n');


    try {

        cron.schedule(momentvalue, function(err) {


            let commandList = [     // *** liste de commandes, si l'on veut lancer plusieurs scripts en même temps
                "node ./mysql_backup.js",
                "node ./1-authentification.js"
            ];


            const sql = ('INSERT INTO cron_infos (id_cron) VALUE (NULL)');


	    try {

		shellfile.series(commandList, function(err, result) { // *** resultat de la commande groupee (apres avoir lance plusieurs scripts en meme temps)

		    console.time('Cron_launcher: Temps de reponse');


		    if(err) {
			throw err;
		    }

		    else {

		    	try {

                	     connectionfile.connection.connect();

			} catch(e){
			    console.error(e);
			}

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

				console.log('sql + result: \n'+ sql + result);


                                setTimeout(() => {

                                    console.log('\nTransaction effectuée via \'cron_launcher-1.4.js\'.\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n');

				    console.timeEnd('Cron_launcher: Temps de reponse');

                                }, 1000);

                            };

                        });     // *** fin de connectionfile.connection.query()

                    } catch (e) {
                        console.error(e);
                    }

                });     // *** fin de shellfile.series()


            } catch (e) {
                console.error(e);
            }

        });     // *** fin de 'cron.schedule'


    } catch (e) {
        console.error(e);
    }


});     // *** fin de 'executecronlauncher()'


try {

    // *** Appel de la première fonction pour l'exécution du planificateur de tâches 'cron_launcher':
    definecrontime();

} catch(e) {
    console.error(e);
}
