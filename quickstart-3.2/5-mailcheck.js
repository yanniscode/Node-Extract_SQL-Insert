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
//                            5 - Mail Check                                    //
//------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------
            5 - Vérification des mails (s'ils existent déjà en Base de Données, 
            on ne les prend pas.)
--------------------------------------------------------------------------------*/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** pas utilisé ici
*/

/**
* @param {string} whitForMailNbrString Identifiant du mail dans l'API Gmail // *** utilisé ici - *** Note: le seul paramètre utilisé ici (les autres doivent seulement passer dans le fichier suivant)
*/

/**
* @param {number} mailIndex Index du mail dans la liste (de notre boucle 'for') // *** pas utilisé ici
*/



// *** Modules complémentaires NodeJS :
const mysql2 = require('mysql2'); // *** semble mieux marcher que le module 'mysql'


// *** Modules de Quickstart:
const recupidattachmentfile = require('./6-recupidattachment');
const poolfile = require('./db_config/pool_database_connection');



module.exports = {

    mailcheck: function mailCheck(oauth2Client, whitForMailNbrString, mailIndex) {


        if (typeof oauth2Client !== 'object' || !(oauth2Client instanceof Object) || oauth2Client instanceof Array) { // *** check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')

            throw oauth2Client +'\n5 - Erreur: Le paramètre \'oauth2Client\' n\'est pas un objet...';   // *** levée d'une exception sur le type
        }
        else if (typeof whitForMailNbrString !== 'string') {

            throw whitForMailNbrString +'\n5 - Erreur: Le paramètre \'whitForMailNbrString\' n\'est pas une \'string\'...';
        }
        else if (typeof mailIndex !== 'number') {

            throw mailIndex +'\n5 - Erreur: Le paramètre \'mailIndex\' n\'est pas un \'number\'...';
        }
        
        else {

            let sql = `SELECT mail_number AS mail_nbr FROM mail_infos WHERE mail_number = ?`;

            let query = mysql2.format(sql, whitForMailNbrString);


            try {

                poolfile.query(query, function(rows, err, fields) {

                    
                    if (err) {
                        throw err +'\nErreur de connexion à Mysql. Check du mail impossible...';
                    }
                    else if (rows.length > 0) {

                        // *** console.log('rows = '+ rows[0].mail_nbr);
                        console.error("\n5 - la donnée est déjà présente...");    // *** Attention: thow bloquant (si un mail est déjà présent...)

                    }

                    else {

                        console.log("5 - Nouveau mail indexé ! Récupération de nouvelles données...");

                        try {

                            recupidattachmentfile.recupidattachment(oauth2Client, whitForMailNbrString, mailIndex);    

                        }
                        catch (e) {
                            console.error(e);
                        };

                    }   // *** fin de 'else'


                }); // *** fin de 'poolfile.query'

            } catch(e) {
                console.error(e);
            }

        }   // *** fin de 'else'
                
    } // *** fin de fonction mailCheck


}; // *** fin de 'module.exports'