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
//                            3a - Get new Token                                //
//------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------
    3a - Récupérer et enregistrer un nouveau jeton (fichier 'gmail-nodejs-quickstart.json'),  
    après avoir demandé l'autorisation de l'utilisateur, puis tenté de nouveau l'authentification 
    par 'callback' (rappel du client OAuth2 autorisé).
-------------------------------------------------------------------------------------------------*/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** utilisé ici
*/

/**
 * @param {Object} token Le jeton (fichier 'gmail-nodejs-quickstart.json') à stocker sur le disque.      // *** utilisé ici
*/



// *** Modules de Quickstart-3.2:
const storetokenfile = require('./3b-storetoken');

// *** Modules complémentaires NodeJs:
const readline = require('readline');

// *** Variables (globales):
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];



module.exports = {


    getnewtoken: function getNewToken(oauth2Client) {


        if (typeof oauth2Client !== 'object' || !(oauth2Client instanceof Object) || oauth2Client instanceof Array) { // *** Check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')
            
            throw oauth2Client +'\n3a - Erreur: Le paramètre oauth2Client n\'est pas un objet...';   // *** Levée d'une exception sur le type
        }
        // else if (typeof listmails === "function") {

        //     throw listmails +'\n3a - Erreur: Le paramètre listmails n\'est pas une fonction...';
        // }
        
        else {
 
            let authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES
            });

            console.log('3a - Autoriser cette application en visitant cette url: \n', authUrl + '\n');

            
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });



            try {

                rl.question('3a - Entrez le code de cette page ici: \n', function (code) {

                    try {

                        rl.close();

                    } catch(e) {
                        console.error(e);
                    }

                    try {

                        oauth2Client.getToken(code, function (err, token) {

                            if (err) {  
                                throw 'err: '+ err +'\n3a - Erreur lors de la tentative de récupération du jeton d\'accès... \n';
                            }

                            else {

                                try {

                                    console.log('\n3a - jeton d\'accès récupéré ! \n');
                                    
                                    oauth2Client.credentials = token;
                                    console.log('3a - '+ token);

                                    storetokenfile.storetoken(token, oauth2Client);

                                }
                                catch (e) {
                                    console.error(e);
                                }

                            };
                            
                        });

                    } catch(e) {
                        console.error(e);
                    }
            
                });

            } catch(e) {
                console.error(e);
            }

        }   //  *** fin de 'else'

        
    } // fin de fonction 'getNewToken'


}; // fin de 'module.exports'