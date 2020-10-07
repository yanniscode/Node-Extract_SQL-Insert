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
//                            11 - Mail Insert                                  //
//------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------
                11 - Insertion de l'ID des mails en BDD (MySQL)
-------------------------------------------------------------------------*/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



/**
* @param {string} whitForMailNbrString Identifiant du mail dans l'API Gmail     // *** utilisé ici
*/

/**
* @param {number} internalDateNbr Date du mail (interne à l'API Gmail).     // *** utilisé ici
*/



// *** Modules complémentaires NodeJS :
const mysql2 = require('mysql2');


// *** Modules de Quickstart :
// *** Connexion par 'pool' (si inserts par intervals, le 'pool' permet, normalement, de garder la connexion active...)
const poolfile = require('./db_config/pool_database_connection');




module.exports = {


    mailidinsert: function mailIdInsert(whitForMailNbrString, internalDateNbr) {

        if (typeof whitForMailNbrString !== 'string' && whitForMailNbrString !== undefined) {

            throw whitForMailNbrString +'\n11 - Erreur: Le paramètre \'whitForMailNbrString\' n\'est pas une \'string\'...';   // *** Levée d'une exception sur le type
        }
        else if (typeof internalDateNbr !== 'number' && internalDateNbr !== undefined) {

            throw internalDateNbr +'\n11 - Erreur: Le paramètre \'internalDateNbr\' n\'est pas un \'number\'...';   // *** Levée d'une exception sur le type
        }

        else {

            let md = new Date(internalDateNbr);     // *** date au format 'Date' (ISO 8601 en UTC, sans time-zone: Z à la place...): '2020-10-01T18:50:33.278Z'

            let mailDateTime = md.getFullYear() + '-' + (md.getMonth() + 1) + '-' + md.getDate() +' '+ md.getHours() +':'+ md.getMinutes() +':'+ md.getSeconds();   // *** de format 'Date' (ISO 8601) > string (JJ-MM-AAAA HH:MN:SS)  -> date de format 'datetime' dans 'MySQL': '2010-04-02 15:28:22' (type = string)
            

            let whiteForMailValues = [
                whitForMailNbrString,
                mailDateTime,
            ]

            let sql = `INSERT INTO mail_infos (mail_number, mail_date, id_cron) VALUES (?, (SELECT MAX(id_cron) FROM cron_infos))`;

            let query = mysql2.format(sql, [whiteForMailValues]);


            try {
            
                poolfile.query(query, (res, msg) => {

                    if (res === undefined || res === null || res === '') {
                        throw err = "\n11 - erreur: réponse vide...\n";
                    }

                    else {
                        
                        console.log('11 - '+ query);          
                        console.log('11 - res: '+ res +'\n- msg: '+ msg);

                    }

                });

            } catch (e) {
                console.error(e);
            }

        };  // *** fin de 'else'



    }, // fin de fonction 'mailIdInsert'


}; // fin de 'module.exports'
