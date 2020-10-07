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
//                            8 - Parse 'Xlsx' to 'Csv'                         //
//------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------
            8 - Module de conversion 'node-xlsx' (du format '.xlsx' au '.csv')
-------------------------------------------------------------------------------*/

// inspiration pour le module : https://stackoverflow.com/questions/34342425/convert-xls-to-csv-on-the-server-in-node

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



/**
 * @param {google.auth.OAuth2} oauth2Client Le client (fichier 'client_secret.json') OAuth2, pour obtenir un jeton (fichier 'gmail-nodejs-quickstart.json').     // *** pas utilisé ici
*/

/** 
 * @param  {string} attachmentId Identifiant de la pièce-jointe dans l'API Gmail    // *** pas utilisé ici
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
 * @param  {string} mailDate Date du mail (interne à l'Api Gmail), mais cette fois sous forme de 'string'       // *** utilisé ici
*/



// Modules de Quickstart :
const parsecsvfile = require('./9-parsecsv');

// Modules complémentaires NodeJS :
const fs = require('fs');
const xlsx = require('node-xlsx');

let d = new Date();
let today = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();



module.exports = {


    parsexlsx: function parseXlsx(oauth2Client, attachmentId, mailIndex, whitForMailNbrString, internalDateNbr, mailDate) {


        if (typeof oauth2Client !== 'object' || !(oauth2Client instanceof Object) || oauth2Client instanceof Array) { // *** check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')

            throw oauth2Client +'\n8 - Erreur: Le paramètre \'oauth2Client\' n\'est pas un objet...';
        }
        else if (typeof attachmentId !== 'string' && attachmentId !== undefined) {

            throw attachmentId +'\n8 - Erreur: Le paramètre \'attachmentId\' n\'est pas une \'string\'...';
        }
        else if (typeof mailIndex !== 'number' && mailIndex !== undefined) {

            throw mailIndex +'\n8 - Erreur: Le paramètre \'mailIndex\' n\'est pas un \'number\'...';
        }
        else if (typeof whitForMailNbrString !== 'string' && whitForMailNbrString !== undefined) {

            throw whitForMailNbrString +'\n8 - Erreur: Le paramètre \'whitForMailNbrString\' n\'est pas une \'string\'...';
        }
        else if (typeof internalDateNbr !== 'number' && internalDateNbr !== undefined) {
            
            throw internalDateNbr +'\n11 - Erreur: Le paramètre \'internalDateNbr\' n\'est pas un \'number\'...';
        }
        else if (typeof mailDate !== 'string' && mailDate !== undefined) {

            throw mailDate +'\n8 - Erreur: Le paramètre \'mailDate\' n\'est pas une \'string\'...';
        }

        else {
        
            console.log('\n\n8 - Analyse et parsage du tableau. -- \n');
            console.log(' \n-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- \n\n');


            // *** Parsage (= analyse) d'une feuille '.xslx' avant sa conversion en fichier '.csv':
            const xlsxSheet = xlsx.parse(__dirname + '/../tableaux/xlsx/fichier-sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.xlsx'); // *** Parser un fichier EXCEL --> référence de la pièce-jointe indiquée ici.

            let sheet = {};
            let row = [];
            let writeStr = "";
            


            // *** Boucle traversant les feuilles '.xlsx' (xlsxSheet[i] = 1 feuille '.xlsx') à parser (analyser)
            // *** La variable 'sheet' contient donc toutes les lignes d'un tableau '.xlsx' :
            
            // *** On s'arrêtera dans un premier temps à la feuille 1, sinon : remplacer i par 'xlsxSheet.length': 
            for (let i = 0; i < 1; i++) {
            // for(let i = 0; i < xlsxSheet.length; i++) {

                sheet = xlsxSheet[i];

                // *** Boucle imbriquée ('j' = 1 ligne ou sheet['data'][j]) traversant toutes les lignes d'un fichier .xlsx'
                
                // *** On s'arrêtera dans un premier temps à la ligne 68,  sinon : remplacer i par 'sheet['data'].length':
                for (let j = 0; j < 68; j++) {
                // for(let j = 0; j < sheet['data'].length; j++) {

                    // *** ajoute les données sélectionnées au fichier '.csv':      
                    row.push(sheet['data'][j]);

                }

            };

            
            // *** ECRITURE du fichier '.xlsx'' dans le fichier (temporaire ?) '.csv': 
            // *** les champs sont séparés par des "|", et les retours à la ligne indiqués par "\n"
            // ??? QUESTION EN SUSPEND : on décidera peut-être d'envoyer le CSV dans une réponse au lieu d'un fichier ??
            
            // *** Boucle imbriquée ('i' = 1 cellule ou row[i]) traversant toutes les lignes d'un fichier '.xlsx'
            
            // *** On s'arrêtera dans un premier temps à la ligne 68 (= fin de la feuille 1), sinon : remplacer i par 'row.length'  
            for (let i = 0;  i < 68; i++) { 

                writeStr += row[i].join("|") + ("\n");

            };

            try {

                fs.writeFile(__dirname + '/../tableaux/csv/fichier-sakana-whitform-'+ mailDate +'-'+ today + '-'+ mailIndex +'.csv', writeStr, function(err) {                

                    if (err) {
                        throw err +'\n8 - erreur de parsage de ligne CSV : \n';
                    }
                    
                    else {
                        console.log('"8 - fichier-sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.csv" a été sauvegardé dans le répertoire courant \n\n');

                        parsecsvfile.parsecsv(mailIndex, whitForMailNbrString, internalDateNbr, mailDate)

                    }


                });

            } catch(e) {
                console.error(e);
            }


        }   // *** fin de 'else'

    }, // fin de fonction parseXlsx //


}; // fin de 'module.exports'
