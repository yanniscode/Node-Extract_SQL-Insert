/**         Quickstart-3.2 :
 * 
 *      By means of the Gmail API, this Programme permits to insert into MySQL tables
 *      selected datas parsed from ‘xlsx’ files, and converted into ‘csv’ files.
 * 
 *      QUICKSTART.JS - Version 3.3 - Copyright [2018-2020] [Seb, yanniscode, DarKaweit, stevlg, Nad, Code.bzh]
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
//                        10 - Insert Data from SQL                             //
//------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------
                    10 - Module d'insertion en BDD Mysql :
-------------------------------------------------------------------------*/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/** 
 * @param  {string[]} csvData Date du mail (interne à l'APi GMAIL), mais cette fois sous forme de 'string'      // *** utilisé ici
*/



// *** Modules complémentaires NodeJS :
const mysql2 = require('mysql2');

// *** Modules de Quickstart :
const poolfile = require('./db_config/pool_database_connection');




module.exports = {



    insertdatasql: function insertDataSql(csvData) {

        console.log('\n10 - insertdatasql!');


        // *** Traitement de la cellule Date pour MySQL:
        let datesvalues = "";

        if (csvData[0] !== undefined) {

            datesvalues = [
                csvData[1][1],
            ];
            
            if (datesvalues == "") {   
                datesvalues = null;
            }

        }
       

        // *** On passe d'une date au format '.xlsx' (ex: 43453 = le nombre de jours passées depuis le '01-01-1900') à la date voulue au format GMT (ex: 'Sat Oct 03 2020 15:14:10 GMT+0200 (GMT+02:00)'):
        let formatdates = new Date((datesvalues - (25567 + 2)) * 86400 * 1000); 
        
        // *** on passe la date(GMT) au format 'YYYY-MM-DD' (string) :
        let reformatdates = formatdates.getFullYear() +"-"+ (parseInt(formatdates.getMonth()) + 1) +"-"+ formatdates.getDate();   


        let sql = `INSERT INTO fishing (id_fishzone_join, date, value_landing, value_quota) VALUES (?, ?, ?, ?);`;


        for (let i = 1; i <= 17 ; i ++) {   // *** index i = 1 (selon l'incrémentation des fichiers '.csv'- Attention pour le repérage des cellules : csv-parse = avec option 'trim' (voir '9-parsecsv.js') = suppression des espaces blancs...)


            let landing_specie;

            if (csvData[i] !== undefined) {

                landing_specie = csvData[i + 7][13];

                // *** gestion d'erreur: cellules vides ('not defined') des fichiers '.csv':
                if (landing_specie == "" || landing_specie == null) {

                    landing_specie = 0;

                };

            }  



            let quota_specie;

            if (csvData[i] !== undefined) {
                
                quota_specie = csvData[i + 7][15];

                if (quota_specie == "" || quota_specie == null) {

                    quota_specie = 0;

                };

            }



            let query = mysql2.format(sql,[i, reformatdates, landing_specie, quota_specie]);


            try {

                poolfile.query(query, (res, msg) => {

                    console.log('10 - '+ sql);              
                    console.log('10 - res: '+ res +'\n- msg: '+ msg);

                });

            } catch (e) {
                console.error(e);
            }


        } // *** fin de boucle 'for';



        for (let i = 18; i <= 32 ; i ++) {


            let landing_specie;

            if (csvData[i] !== undefined) {

                landing_specie = csvData[i + 9][13];

                if (landing_specie == "" || landing_specie == null) {

                    landing_specie = 0;
    
                };

            }  


            let quota_specie;

            if (csvData[i] !== undefined) {
                
                quota_specie = csvData[i + 9][15];

                if (quota_specie == "" || quota_specie == null) {

                    quota_specie = 0;
    
                };    

            }



            let query = mysql2.format(sql,[i, reformatdates, landing_specie, quota_specie]);


            try {
            
                poolfile.query(query, (res, msg) => {

                    console.log('10 - '+ sql);              
                    console.log('10 - res: '+ res +'\n- msg: '+ msg);

                });

            } catch (e) {
                console.error(e);
            }


        } // *** fin de boucle 'for';



        for (let i = 33; i <= 39 ; i ++) {


            let landing_specie;
    
            if (csvData[i] !== undefined) {
    
                landing_specie = csvData[i + 11][13];

                if (landing_specie == "" || landing_specie == null) {
    
                    landing_specie = 0;
        
                };
    
            }  
    
    
    
            let quota_specie;
    
            if (csvData[i] !== undefined) {
                
                quota_specie = csvData[i + 11][15];

                if (quota_specie == "" || quota_specie == null) {
    
                    quota_specie = 0;
        
                };
    
            }
    

    
            let query = mysql2.format(sql,[i, reformatdates, landing_specie, quota_specie]);
    

            try {

                poolfile.query(query, (res, msg) => {
        
                    console.log('10 - '+ sql);              
                    console.log('10 - res: '+ res +'\n- msg: '+ msg);
        
                });

            } catch (e) {
                console.error(e);
            }
    
    
        } // *** fin de boucle 'for';



        for (let i = 40; i <= 43 ; i ++) {


            let landing_specie;
    
            if (csvData[i] !== undefined) {
    
                landing_specie = csvData[i + 24][13];

                if (landing_specie == "" || landing_specie == null) {
    
                    landing_specie = 0;
        
                };

            }  
    
    
    
            let quota_specie;
    
            if (csvData[i] !== undefined) {
                
                quota_specie = csvData[i + 24][15];

                if (quota_specie == "" || quota_specie == null) {
    
                    quota_specie = 0;
        
                };
    
            }
    

    
            let query = mysql2.format(sql,[i, reformatdates, landing_specie, quota_specie]);
    
            
            try {

                poolfile.query(query, (res, msg) => {
        
                    console.log('10 - '+ sql);              
                    console.log('10 - res: '+ res +'\n- msg: '+ msg);
        
                });

            } catch (e) {
                console.error(e);
            }
    
    
        } // *** fin de boucle 'for';

        

    } // *** fin de boucle 'insertdatasql';



} // *** fin de 'module.export';