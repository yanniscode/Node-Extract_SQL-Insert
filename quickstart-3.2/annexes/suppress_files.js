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
//           Suppress '.xlsx' and '.csv' Files from their repertories           //
//------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------
            Programme pour suppression des fichiers téléchargés précédemment de leur répertoire
-------------------------------------------------------------------------------------------------------*/



"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



// *** Modules complémentaires 'NodeJs':
const fs = require('fs');
const path = require('path');


// *** Variables (globales):
// *** Note: répertoire (modifiable au besoin) des tableaux '.xlsx' et '.csv' (ex : '~' sur 'Lubuntu'):
let TABLES_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/node-extract_sql-insert-p-clean/tableaux';


try {

    let XLSX_TABLES_PATH = TABLES_DIR + '/xlsx';
    let xlsx_files = fs.readdirSync(XLSX_TABLES_PATH);
    
    // *** Suppression des fichiers dans le répertoire '/tableaux/xlsx':
    xlsx_files.forEach(element => {

        fs.unlinkSync(path.join(XLSX_TABLES_PATH, element));

    });

} catch (e) {
    console.error('message d\'erreur: '+ e);
};


try {

    let CSV_TABLES_PATH = TABLES_DIR + '/csv';    
    let csv_files = fs.readdirSync(CSV_TABLES_PATH);

    // *** Suppression des fichiers dans le répertoire '/tableaux/csv':
    csv_files.forEach(element => {

        fs.unlinkSync(path.join(CSV_TABLES_PATH, element));

    });

} catch (e) {
    console.error('message d\'erreur: '+ e);
};