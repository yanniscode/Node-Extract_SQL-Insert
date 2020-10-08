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
//                              2 - Authorize                                   //
//------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------
     2 - Autorisation d'un client 'OAuth2' par son jeton d'authentification (fichier 'gmail-nodejs-quickstart.json')
---------------------------------------------------------------------------------------------------------------------*/



"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/**
 * @param {Object} credentials Les informations d'identification du client.  // *** utilisé ici
*/

/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** utilisé ici
*/

/**
 * @param {Object} token Le jeton (fichier 'gmail-nodejs-quickstart.json') à stocker sur le disque.      // *** utilisé ici
*/




// *** Modules de Quickstart-3.2 :
const getnewtokenfile = require('./3a-getnewtoken');
const listmailsfile = require('./4-listmails');

// *** Modules complémentaires NodeJs :
const googleAuth = require('google-auth-library');
const fs = require('fs');



/*------------------------------------------------------------------------------
Si vous modifiez ces étendues, supprimez vos informations d'identification 
précédemment enregistrées sur '~/.credentials-api/gmail-nodejs-quickstart.json'
-------------------------------------------------------------------------------*/


let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials-api/';            // *** Note: répertoire (modifiable au besoin) où est automatiquement enregistré le jeton d'accès nécessaire pour accéder à l'API Gmail (ex: '~/.credentials-api' sur 'Lubuntu' et 'D:\Users\isen-user\.credentials-api' sur Windows)
let TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';


module.exports = {


    authorize: function authorize(credentials) {


        if (typeof credentials !== 'object' || !(credentials instanceof Object) || credentials instanceof Array) { // *** Check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')
                
            throw 'err: '+ err +' '+ credentials +'\n2 - Erreur: Le paramètre \'credentials\' n\'est pas un objet...';   // *** levée d'une exception sur le type
        }

        else {
        
            let clientId = credentials.installed.client_id;
            let clientSecret = credentials.installed.client_secret;
            let redirectUrl = credentials.installed.redirect_uris[0];
            
            let auth = new googleAuth();
            let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

            

            /*------------------------------------------------------------------------
                            Vérifiez si nous avons déjà stocké un jeton.
            -------------------------------------------------------------------------*/


            fs.readFile(TOKEN_PATH, function (err, token) {

                if (err) {

                    console.error('2 - Allez récupérer un nouveau jeton d\'identification Gmail... \n');

                    try {

                        getnewtokenfile.getnewtoken(oauth2Client);

                    } catch (e) {
                        console.error(e);
                    }

                } 
                
                else {

                    console.log('2 - Jeton d\'identification Gmail actuel utilisé ! \n');
                    
                    try {

                        oauth2Client.credentials = JSON.parse(token);

                        listmailsfile.listmails(oauth2Client);
                    
                    } catch (e) {
                        console.error(e);
                    }
                }

            });
            


        } // *** fin de fonction 'authorize()'


    } // *** fin de 'else'


}; // *** fin de 'module.exports'