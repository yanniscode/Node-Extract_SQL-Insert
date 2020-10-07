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
//                            4 - List Mails                                    //
//------------------------------------------------------------------------------*/


// *** Accès aux mails (API Gmail) - cf : https://www.codediesel.com/nodejs/how-to-access-gmail-using-nodejs-and-the-gmail-api/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** utilisé ici
*/

/** 
 * @param  {string} userId User's email address. The special value 'me'     // *** utilisé ici
 *  can be used to indicate the authenticated user.
*/

/**
* @param {number} mailIndex Index du mail dans la liste (de notre boucle 'for') // *** défini et utilisé ici
*/


// Modules complémentaires NodeJS :
const {google} = require('googleapis');     // accolades ajoutées (nouveau type d'écriture)

// Modules de Quickstart-3.2 :
const mailcheckfile = require('./5-mailcheck');



module.exports = {



    listmails: function listMails(oauth2Client) {


        console.log('4 - paramètre "oauth2Client" : '+ oauth2Client +'\n');

        if (typeof oauth2Client !== 'object' || !(oauth2Client instanceof Object) || oauth2Client instanceof Array) { // *** Check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau') 
            throw err ='\n4 - Erreur: Le paramètre oauth2Client est indéfini...';   // *** Levée d'une exception sur le type
        }

        else {

            const gmail = google.gmail({version: 'v1', oauth2Client});


            gmail.users.threads.list({ // *** Récupération du mail par la 'thread' (fil de discussion), plutôt que le 'message' lui-même
                'auth': oauth2Client, 
                userId: 'me', 
                // 'maxResults': 1,  // ?? Désormais Nécessaire pour supprimer les doublons ?? - Only get the recent email - 'maxResults' parameter
            },
            {
                qs: {   // ***  la propriété 'qs' prend en compte de multiples requêtes
                    q: 'subject:WHITEFISH REPORT -{AMENDED FINAL}', // *** contraintes des requêtes à l'API Gmail: tous les messages 'whitefish report' ne contenant pas 'amend' et 'final'
                }
            },
            function selectMails(err, results) {

                if (err) {
                    throw '\nErreur de l\'API Gmail:\n'+ err;
                }

                else {

                    // *** Boucle sur les mails présents (dans la boîte Gmail):
                    for(let mailIndex = 0; mailIndex < results.threads.length; mailIndex++) {  
                        console.log('4 - index du mail : '+ mailIndex +'\n');

                        let whitForMailNbrString = results.threads[mailIndex].id;

                        try {

                            mailcheckfile.mailcheck(oauth2Client, whitForMailNbrString, mailIndex);

                        } catch (e) {
                            console.error(e);
                        }


                    } // *** fin de boucle 'for'

                }   // fin de 'else'

            }); // *** Fin de 'selectMails()'


        }   // *** fin de 'ListMails()'

    } // *** fin de 'else'

}