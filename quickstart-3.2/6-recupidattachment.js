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
//                         6 - Recup Id Attachment                              //
//------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------
                6 - Récupération de l'id de la pièce jointe.
-------------------------------------------------------------------------*/


"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


// /**
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.    // *** utilisé ici
// */

/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** utilisé ici
*/

/**
 * @param {string} whitForMailNbrString Identifiant du mail dans l'API Gmail     // *** utilisé ici
*/

/**
 * @param {number} mailIndex Index du mail dans la liste (de notre boucle 'for')     // *** pas utilisé ici
*/

/**
 * @param {number} internalDateNbr Date du mail (interne à l'API Gmail).     // *** utilisé ici
*/

/**
* @param {string} mailDate Date du mail (interne à l'API Gmail) sous forme de 'string'.     // ***      utilisé ici
*/

/** 
 * @param  {string} userId User's email address. The special value 'me'     // *** utilisé ici
 *  can be used to indicate the authenticated user.
*/



// Modules de Quickstart-3.2 :
const xlsxdownloadfile = require('./7-xlsxdownload');

// Modules complémentaires NodeJS :
const {google}  = require('googleapis');     // accolades ajoutées (nouveau type d'écriture)


module.exports = {



    recupidattachment: function recupIdAttachment(oauth2Client, whitForMailNbrString, mailIndex) {


        if (typeof oauth2Client !== 'object' || !(oauth2Client instanceof Object) || oauth2Client instanceof Array) { // *** check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')

            throw oauth2Client +'\n6 - Erreur: Le paramètre \'oauth2Client\' n\'est pas un objet...';   // levée d'une exception sur le type
        }
        else if (typeof whitForMailNbrString !== 'string'  && whitForMailNbrString !== undefined) {

            throw whitForMailNbrString +'\n6 - Erreur: Le paramètre \'whitForMailNbrString\' n\'est pas une \'string\'...';   // levée d'une exception sur le type
        }
        else if (typeof mailIndex !== 'number' && mailIndex !== undefined)  {

            throw mailIndex +'\n6 - Erreur: Le paramètre \'mailIndex\' n\'est pas un \'number\'...';   // levée d'une exception sur le type
        }
        
        else {

            console.log(' \n ---');
            console.log('\n\n [2] 6 -- Recherche des IDs de pièces jointes "fichier-sakana-whitform"... ------------------------------------------');
            console.log(' \n ---');


            const gmail = google.gmail('v1');

            let internalDate = '';


            if (typeof gmail !== 'object' || !(gmail instanceof Object) || gmail instanceof Array) { // *** Check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')

                throw err = '\n6 - Erreur: Le paramètre \'gmail\' n\'est pas un objet...';   // *** Levée d'une exception sur le type            
            }
            
            else {

                gmail.users.messages.get({  // *** Accéder aux informations
                    'auth' : oauth2Client,          // *** Utiliser l'authentification Oauth 
                    'userId' : 'me',        // *** Charger le fichier 'client_secret.json'
                    'id' : whitForMailNbrString,
                },
                function selectAttachments(err, results) {

                    if (err) {

                        console.log('\n6 - Attachment "results": '+ results);
                        console.error(err +'\n6 - Echec de votre connexion au(x) mail(s). Par exemple: vérifiez les paramètres de connexion sur "quickstart.js"... \nOu bien: Nombre limité de connexions à l\'Api Gmail...\n'); // *** 'throw' bloquant, ici...
                        
                    } else {

                        console.log('\n 6 -------- Connexion réussie à un mail : \n\n');

                        internalDate = results.internalDate;    // *** Note: Date interne donnée par l'API Gmail (string)

                        let internalDateNbr = parseInt(internalDate);   // *** internalDate de type 'string' -> date de type 'int'
                
                        // ici: pour test date:
                        let mdate = new Date(internalDateNbr);     // *** date parsée au format Date (ISO 8601 étendu en UTC, sans time-zone: Z à la place...): 2020-10-01T18:50:33.278Z
                       
                        let mailDate = mdate.getFullYear() + "_" + (mdate.getMonth() + 1) + "_" + mdate.getDate();   // type Date ISO 8601 > type string (JJ_MM_AAAA)

                        console.log(' ------------------------------------------------------------------------------------\n   ----------- SELECTION DES MAILS CONTENANT UNE OU PLUSIEURS PIECES JOINTES  "fichier-sakana-whitform"--------------------------------------------------------------------------');
                        console.log('\n\n [1] 4 -- Sélection d\'une pièce-jointe "whitform.xlsx". -- \n\n');


                        let attachmentId = results.payload.parts[1].body.attachmentId;  // *** index simple (sans boucle) semble supprimer les doublons

                        try {

                            xlsxdownloadfile.xlsxdownload(oauth2Client, attachmentId, mailIndex, whitForMailNbrString, internalDateNbr, mailDate);

                        }
                        catch (e) {
                            console.error(e);
                        }

                    }   // *** fin de 'else'
                
                });     // *** fin de fonction 'selectAttachments()'

            }   // *** fin de 'else'

        }   // *** fin de 'else'


    }       // *** fin de fonction 'recupIdAttachment()'


};      // *** fin de 'module.exports'