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
//                            9 - Parse Csv                                     //
//------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------
                9 - Module de parsage du fichier '.csv' précédemment créé (csv-parse) :
------------------------------------------------------------------------------------------------*/

//---- voir : https://github.com/adaltas/node-csv-parse/issues/166:


"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



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
 * @param  {string} mailDate Date du mail (interne à l'APi GMAIL), mais cette fois sous forme de 'string'       // *** utilisé ici
*/



// *** Modules de Quickstart :
const insertdatasqlfile = require('./10-insertdatasql');
const mailidinsertfile = require('./11-mailidinsert');


// *** Déclaration des modules NodeJS complémentaires :
const parse = require('csv-parse');
const fs = require('fs');


// *** Déclaration de variables supplémentaires :
let d = new Date();
let today = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear();




module.exports = {



    parsecsv: function parseCsv(mailIndex, whitForMailNbrString, internalDateNbr, mailDate) {


        if (typeof mailIndex !== 'number' && mailIndex !== undefined) {

            throw mailIndex +'\n8 - Erreur: Le paramètre \'mailIndex\' n\'est pas un \'number\'...';   // *** Levée d'une exception sur le type
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

            let csvData = [];    // *** ATTENTION ! Variable locale, ici, car si au dessus de la fonction 'parseCsv' (globale), un seul tableau est pris en compte        
            
            // *** Options de parsage :
            const config = {
                parserOptions: 
                {
                    delimiter: '|', // *** délimiteur de champs
                    trim: true,     // *** option permettant de supprimer les blancs en début et fin de cellules
                    relax_column_count: true // *** ignore les colonnes inconsistantes
                }
            };
            


            try {


                // *** Parsage (= analyse) du fichier '.csv' avant son intégration en BDD:
                fs.createReadStream(__dirname + '/../tableaux/csv/fichier-sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.csv')

                // *** Prise en compte des options déclarées :     
                .pipe(parse(config.parserOptions))

                // *** Prise en compte des données parsées et conversion en données de tableau Javascript : 
                .on('data', function (csvrow, err) {    
                    
                    if (err) {
                        console.error(err +'\n9 - Erreur de parsage en CSV : '); 
                    }

                    else {
                        
                        try {

                            csvData.push(csvrow);

                        } catch (e) {
                            console.error(e);
                        }

                    }

                })

                // *** Ecriture en BDD des données parsées à partir du fichier '.csv' (converties en tableau lisible par MySQL):
                .on('end', function readCsv () {
                
                    try {

                        console.log('\n9 - "fichier-sakana-whitform-'+ mailDate +'-'+ today +'-'+ mailIndex +'.csv" a été parsé (analysé) avant insertion en BDD.\n');

                        insertdatasqlfile.insertdatasql(csvData);
                        mailidinsertfile.mailidinsert(whitForMailNbrString, internalDateNbr); // *** appel de la méthode d'insertion des identifiants des mails

                    } catch (e) {
                        console.error(e +'\n9 - erreur d\'insertion des données du fichier \'.csv\n en BDD...\n');
                    }

                });

            } catch(e) {
                console.error(e);
            }


        };  // *** fin de 'else'

    }, // *** fin de "function parse.Csv"


}; // *** fin de 'module.exports'
