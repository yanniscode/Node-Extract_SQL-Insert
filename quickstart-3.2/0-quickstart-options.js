/**         Quickstart-3.3 :
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
//                          MODULE QUICKSTART 3.3                         //
//                                                                        //
//                         0 - Quickstart options                         //
//------------------------------------------------------------------------*/



// 0: Lancement du programme \'Quickstart 3.3\'
// 1: Lancement du planificateur de tâches \'cron_launcher-2.0\'
// 2: Sauvegarde (back-up) de la Base de Données \'dataviz_fish_uk\' (MySQL)
// 3: Restauration de la BDD \'dataviz_fish_uk\' (et des données de la dernière sauvegarde)
// 4: Ré-initialisation de la BDD \'dataviz_fish_uk\' (vide) et suppression des fichier \'.xlsx\' et \'.csv\''
// 5: Suppression des fichiers \'.csv\' et \'.xlsx\'
// 6: Quitter\n


"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


// *** Modules complémentaires NodeJs :
const readline = require('readline');


// *** Modules de Quickstart :
let shell = require('./annexes/child_helper/child_helper'); // *** fichier "child_helper" nécessaire


// *** Variables (globales) :
let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let rlvalidation = null;

// *** liste (tableau) de commandes (qui permet, si l'on veut, de lancer plusieurs scripts en même temps):
let quickstartCommandList = [
    "node ./1-authentification.js"
];

let cronCommandList = [
    "node ./cron_launcher-b.js"
];

let backupCommandList = [
    "node ./mysql_backup.js"
];

let restaurationCommandList = [
    "node ./mysql_restaure.js"
];

let creationCommandList = [
    "node ./annexes/suppress_files.js",
    "node ./annexes/generate_database.js"
];

let suppressionCommandList = [
    "node ./annexes/suppress_files.js"
];

let quitterCommandList = [
    "pm2 stop cron_launcher.js"
]


console.log(`\n ------------------------------------------------------------------------------------------------------\n`);                     
console.log(`                                 ~~~~~~    QUICKSTART.JS 3-3    ~~~~~~                                   `);   

console.log('\n ------------------------------------------------------------------------------------------------------\n');

console.log(' *** QUICKSTART.JS - Version 3.3 - Copyright (C) 2018-2020                                          ***\n');
console.log(' *** (Seb, yanniscode, DarKaweit, stevlg, Nad, Code.bzh)                                                  ***\n');
console.log(' *** https://github.com/yanniscode, https://github.com/darkaweit, https://github.com/StevLG         ***\n');
console.log(' *** This program comes with ABSOLUTELY NO WARRANTY. This is free software, and you are welcome     ***\n');
console.log(' *** to redistribute it under certain conditions; type \'../LICENCES.md\' for details.                ***');

console.log(`\n ------------------------------------------------------------------------------------------------------\n\n`);

console.log('\n  *****************************************************************************************************');
console.log('   ***                                           Liste des options                                 ***');
console.log('  *****************************************************************************************************\n');
console.log('  |          0: Lancement du programme \'Quickstart 3.3\'                                              |');
console.log('             1: Lancement du planificateur de tâches \'Cron Launcher 2.0\'                              ');
console.log('  |          2: Sauvegarde (back-up) de la Base de Données \'dataviz_fish_uk\' (MySQL)                 |');
console.log('             3: Restauration de la BDD \'dataviz_fish_uk\' (et des données de la dernière sauvegarde)   ');
console.log('  |          4: Ré-initialisation de la BDD \'dataviz_fish_uk\' (vide) et suppression                  |');
console.log('                des fichier \'.xlsx\' et \'.csv\'                                                   ');
console.log('  |          5: Suppression des fichiers \'.csv\' et \'.xlsx\'                                           |');
console.log('             6: Quitter                                                                               ');
console.log('\n  *****************************************************************************************************\n');
                    


try {

    rl.question('0 - Entrez votre choix ici:\n', function (option) {

        try {

            rl.close();

        } catch(e) {
            console.error(e);
        }


        let choice = '';

        if (
            option !== '0' 
            && option !== '1' 
            && option !== '2' 
            && option !== '3' 
            && option !== '4'
            && option !== '5'
            && option !== '6'

        ) {
            console.log('\n0 - Choix indéfini... Aucune action effectuée. Relancez le programme si vous le souhaitez...');
        }

        else {


            switch (option) {

                case '0':

                    console.time("0 - Temps de réponse");
                    choice = 'Lancement du programme \'Quickstart 3.3\' (via script)';
                    console.log(choice);

                    setTimeout(() => {

                        try {

                            shell.series(quickstartCommandList , function(err, result) {  // *** Note: résultat de la commandes groupée (après avoir lancé plusieurs scripts en même temps)

                                if (err) {
                                    console.error('0 - Erreur de transaction.\n' + err);
                                }

                                else {

                                    console.log('\n0 - Transaction effectuée via \'Quickstart 3.3\'.\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n');
                                    console.timeEnd("0 - Temps de réponse");

                                };

                            });

                        } catch(e) {
                            console.error(e);
                        }

                    }, 1000);

                break;


                case '1':

                    choice = '1: Lancement programme \'Quickstart 3.3\' (via planificateur de tâches \'cron_launcher-2.0\')';
                    console.log(choice);

                    setTimeout(() => {

                        try {

                            shell.series(cronCommandList , function(err, result) {

                                if (err) {
                                    console.error('0 - Erreur de transaction.\n'+ err);       
                                } 
                                
                                else {

                                    // *** Note: Les console.log() de fin de transaction sont dans 'cron_launcher.js'

                                };

                            });

                        } catch(e) {
                            console.error(e);
                        }

                    }, 1000);

                break;


                case '2':

                    console.time("0 - Temps de réponse");
                    choice = "Sauvegarde (back-up) de la Base de Données \'dataviz_fish_uk\' (MySQL)";
                    console.log(choice);
                
                    setTimeout(() => {

                        try {

                            shell.series(backupCommandList , function(err) {

                                if (err) {
                                    console.error('0 - Erreur de sauvegarde de la BDD.\n'+ err);       
                                } 
                                
                                else {

                                    console.log('\n0 - Sauvegarde (\'backup/.dump.sql\') effectué.\n(Sakana Consultants, Yanniscode, DarKaweit and co)');
                                    console.timeEnd("0 - Temps de réponse");

                                };

                            });

                        } catch(e) {
                            console.error(e);
                        }

                    }, 1000);

                break;


                case '3':

                    console.time("0 - Temps de réponse");
                    choice = "Restauration de la BDD \'dataviz_fish_uk\' (et des données de la dernière sauvegarde)";
                    console.log(choice);

                    rlvalidation = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

                    try {

                        rlvalidation.question('\n*** Etes-vous sûr(e) de votre choix ? (o, n)\n', function (validate) {
                    
                            rlvalidation.close();

                            if (validate !== 'o' && validate !== 'n') {
                                console.log('\n0 - Choix indéfini... Aucune action effectuée.\n');
                            }

                            else {
                    
                                switch (validate) {

                                    case 'o':

                                        setTimeout(() => {

                                            try {

                                                shell.series(restaurationCommandList , function(err) {
                                
                                                    if (err) {
                                                        console.error('\n0 - Erreur de Restauration de la BDD.\n'+ err);       
                                                    } 
                                                    
                                                    else {
                                    
                                                        console.log('\n0 - Restauration de la BDD effectuée.\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n');
                                                        console.timeEnd("0 - Temps de réponse");

                                                    };
                                    
                                                });

                                            } catch(e) {
                                                console.error(e);
                                            }
                                
                                        }, 1000);

                                        break;

                                    case 'n':

                                        console.log('\nRestauration de la BDD non-effectuée.\n');
                                            
                                    break;

                                }

                            } // *** fin de 'else'
                        
                        });

                    } catch (e) {
                        console.error(e);
                    }

                break;


                case '4':

                    console.time("0 - Temps de réponse");
                    choice = 'Ré-initialisation de la BDD \'dataviz_fish_uk\' (vide) et suppression des fichier \'.xlsx\' et \'.csv\'';
                    console.log(choice);

                    rlvalidation = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

                    try {

                        rlvalidation.question('\n*** Etes-vous sûr(e) de votre choix ? (o, n)\n*** ATTENTION: l\'option \'Restauration\'(3) ne sera plus utilisable avant d\'avoir de nouveau exécuté une \'tâche Cron\'(1) fructueuse et effecté une nouvelle \'Sauvegarde\'(2)) ***\n', function (validate) {
                    
                            rlvalidation.close();

                            if (validate !== 'o' && validate !== 'n') {
                                console.error('\n0 - Choix indéfini... Aucune action effectuée.\n');
                            }

                            else {
                        
                                switch (validate) {

                                    case 'o':

                                        setTimeout(() => {

                                            try {

                                                shell.series(creationCommandList , function(err) {
                                
                                                    if (err) {
                                                        console.error('\n0 - Erreur de recréation de la BDD ou de supression des fichiers \'.xlsx\' et \'.csv\'...\n' + err);       
                                                    } 
                                                    
                                                    else {
                                    
                                                        console.error('\n0 - Création de la BDD effectuée et fichiers \'.xlsx\' et \'.csv\' supprimés.\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n');
                                                        console.timeEnd("0 - Temps de réponse");

                                                    };
                                    
                                                });

                                            } catch(e) {
                                                console.error(e);
                                            }
                                
                                        }, 1000);

                                        break;


                                    case 'n':

                                        console.log('\nCréation de la BDD non-effectuée.\n');
                                            
                                    break;

                                }

                            } // *** fin de 'else'
                        
                        });

                    } catch (e) {
                        console.error(e);
                    }

                break;


                case '5':

                    console.time("0 - Temps de réponse");
                    choice = "Suppression des fichiers \'.csv\' et \'.xlsx\'\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n";
                    console.log(choice);

                    rlvalidation = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });

                    try {

                        rlvalidation.question('\n*** Etes-vous sûr(e) de votre choix ? (o, n)\n', function (validate) {
                    
                            rlvalidation.close();

                            if (validate !== 'o' && validate !== 'n') {

                                console.log('\n0 - Choix indéfini... Aucune action effectuée.\n');
                                  

                            }

                            else {
                    
                                switch (validate) {

                                    case 'o':

                                        setTimeout(() => {

                                            try {

                                                shell.series(suppressionCommandList , function(err, result) {
                                
                                                    if (err) {
                                                        console.error('0 - Erreur de Suppression de la BDD.\n'+ err);       
                                                    } 
                                                    
                                                    else {
                                    
                                                        console.log('\n0 - Suppression de la BDD effectuée.\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n');
                                                        console.timeEnd("0 - Temps de réponse");
                                                        
                                                    };
                                    
                                                });

                                            } catch(e) {
                                                console.error(e);
                                            }
                                
                                        }, 1000);

                                        break;


                                    case 'n':

                                        console.log('\nSuppression de la BDD non-effectuée.\n');
                                            
                                    break;

                                }

                            } // *** fin  de 'else'
                        
                        });

                    } catch (e) {
                        console.error(e);
                    }

                break;


                case '6':

                    setTimeout(() => {

                        try {

                            shell.series(quitterCommandList , function(err, result) {
            
                                if (err) {
                                    console.error('0 - Erreur de fermeture de l\'application.\n'+ err);       
                                } 
                                
                                else {
                                    choice = '\n0 - A la prochaine...\n(Sakana Consultants, Yanniscode, DarKaweit and co)\n';
                                    console.log(choice);                             
                                };
                
                            });

                        } catch(e) {
                            console.error(e);
                        }
            
                    }, 1000);

                    break;


            } // *** fin de 'switch case'

        }  // *** fin de 'else' 


    }); // *** fin de fonction rl.question()


} catch (e) {
    console.error(e);
}
