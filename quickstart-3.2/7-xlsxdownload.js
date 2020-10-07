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
//                            7 - Xlsx Download                                 //
//------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------
            7 - Téléchargement des pièces jointes (.xlsx) :
--------------------------------------------------------------------------------------*/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** utilisé ici
*/

/** 
 * @param  {string} attachmentId Identifiant de la pièce-jointe dans l'API Gmail    // *** utilisé ici
*/

/**
* @param {number} mailIndex Index du mail dans la liste (de notre boucle 'for')     // *** utilisé ici
*/

/**
* @param {string} whitForMailNbrString Identifiant du mail dans l'API Gmail     // *** pas utilisé ici
*/

/**
 * @param {number} internalDateNbr Date du mail (interne à l'API Gmail).     // *** pas utilisé ici
*/

/**
* @param {string} mailDate Date du mail (interne à l'API Gmail) sous forme de 'string'.     // *** utilisé ici
*/

/** 
 * @param  {string} userId User's email address. The special value 'me'     // *** utilisé ici
 *  can be used to indicate the authenticated user.
*/


// Modules de Quickstart :
const parsexlsxfile = require('./8-parsexlsx');

// Modules complémentaires NodeJS :
const {google} = require('googleapis');
const fs = require('fs');

// variables supplémentaires (globales):
let d = new Date();     // *** date au format (ISO 8601 en UTC, sans time-zone = 'Z' à la place...): 2020-10-01T18:50:33.278Z



module.exports = {


    xlsxdownload: function xlsxDownload(oauth2Client, attachmentId, mailIndex, whitForMailNbrString, internalDateNbr, mailDate) {
    
        console.log('\n\n\n\n7 - Récupération des données d\'une pièce jointe "fichier-sakana-whitform.xlsx". -------------------- \n\n');
;

        if (typeof oauth2Client !== 'object' || !(oauth2Client instanceof Object) || oauth2Client instanceof Array) { // *** Check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')

            throw oauth2Client +'\n7 - Erreur: Le paramètre \'oauth2Client\' n\'est pas un objet...';   // *** Levée d'une exception sur le type
        }
        else if (typeof attachmentId !== 'string' && attachmentId !== undefined) {

            throw attachmentId +'\n7 - Erreur: Le paramètre \'attachmentId\' n\'est pas une \'string\'...';
        }
        else if (typeof mailIndex !== 'number' && mailIndex !== undefined) {

            throw mailIndex +'\n7 - Erreur: Le paramètre \'mailIndex\' n\'est pas un \'number\'...';
        }
        else if (typeof whitForMailNbrString !== 'string' && whitForMailNbrString !== undefined) {

            throw whitForMailNbrString +'\n7 - Erreur: Le paramètre \'whitForMailNbrString\' n\'est pas une \'string\'...';
        }
        else if (typeof internalDateNbr !== 'number' && internalDateNbr !== undefined) {

            throw internalDateNbr +'\n11 - Erreur: Le paramètre \'internalDateNbr\' n\'est pas un \'number\'...';
        }
        else if (typeof mailDate !== 'string' && mailDate !== undefined) {

            throw mailDate +'\n7 - Erreur: Le paramètre \'mailDate\' n\'est pas une \'string\'...';
        }

        else {

            let gmail = google.gmail('v1');

            if (typeof gmail !== 'object' || !(gmail instanceof Object) || gmail instanceof Array) { // *** Check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')

                throw gmail +'\n7 - Erreur: Le paramètre \'gmail\' n\'est pas un objet...';   // Levée d'une exception sur le type
            }

            else {

                // *** date du jour (même date que pour le Cron) pour le nom de fichier:
                let today = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();


                gmail.users.messages.attachments.get({
                    'auth': oauth2Client,
                    'userId': 'me',
                    'id': attachmentId,         // *** Note: 'id' et 'messageId' = nécessaires ici
                    'messageId': attachmentId,
                },                
                function WriteXlsx(err, results) {
            
                    if (err) {

                        console.log('\n7 - WriteXlsx "results": '+ results);
                        console.error(err +'\n7 - Aucun nouveau fichier à récupérer.\n');
                    
                    } else {

                        console.log('\n7 - WriteXlsx "results": '+ results);
                        console.log('\n7 - le fichier "sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.xlsx" va a présent être téléchargé à cette adresse :\n');

                        try {

                            // *** Téléchargement effectif des données de la pièce-jointe (results.data):
                            fs.writeFile(__dirname +'/../tableaux/xlsx/fichier-sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.xlsx', results.data, 'base64', function (err) {

                                if (err) {
                                    throw err +'\n7 - Le téléchargement à échoué. Vérifiez les paramètres.\n';
                                };

                                console.log('\n7 -> Téléchargement de pièce jointe... Enregistrées sous : "fichier-sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.xlsx" dans le dossier "./tableaux/xlsx". \n\n');                


                                try {
                                                
                                    parsexlsxfile.parsexlsx(oauth2Client, attachmentId, mailIndex, whitForMailNbrString, internalDateNbr, mailDate);

                                }
                                catch (e) {
                                    console.error(e);
                                }

                                

                            });

                        } catch(e) {
                            console.error(e);
                        }    
                        
                    }


                });     // *** fin de fonction 'WriteXlsx()'

            }   // *** fin de 'else'

        }   // *** fin de 'else'


    }   // *** fin de fonction 'xlsxDownload()'


}; // fin de 'module.exports'
