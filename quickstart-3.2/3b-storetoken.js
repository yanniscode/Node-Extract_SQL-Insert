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
//                            3b - Store Token                                  //
//------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------
    3b - Stocker le jeton sur le disque afin qu'il puisse être utilisé pour les exécutions ultérieures du programme.
--------------------------------------------------------------------------------------------------------------------*/

"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/**
 * @param {Object} token Le jeton (fichier 'gmail-nodejs-quickstart.json') à stocker sur le disque.      // *** utilisé ici
*/



// *** Modules complémentaires NodeJs :
const fs = require('fs');

// *** Variables globales:
let TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials-api/';        // *** répertoire (modifiable au besoin) où est automatiquement enregistré le jeton d'accès (fichier 'gmail-nodejs-quickstart.json') nécessaire pour accéder à l'API Gmail (chez moi : '/home/yanniscode/.credentials-api' sur 'Lubuntu' et 'D:\Users\isen-user\.credentials-api' sur Windows)
let TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';



module.exports = {


    storetoken: function storeToken(token) {


        if (typeof token !== 'object' || !(token instanceof Object) || token instanceof Array) { // *** check du paramètre: type Object (!= valeur primitive 'null' ou type 'tableau')
            throw token +'\n3b - Erreur: Le paramètre token n\'est pas un objet!';   // *** levée d'une exception sur le type
        }
        
        else {

            try {

                fs.mkdirSync(TOKEN_DIR);

            } catch (err) {

                if (err.code != 'EEXIST') {
                    return err;
                }

            }

            try {

                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => { // *** écriture du fichier 'gmail-nodejs-quickstart.json' contenant le jeton d'authentification

                    if (err) {
                        console.error(err + '\n3b - erreur d\'écriture du fichier...');
                    }

                    else {

                        console.log('3b - Fichier écrit avec succès ici:\n'+ TOKEN_PATH);

                        console.log('3b - Contenu de celui-ci:\n'); 
                        console.log(fs.readFileSync(TOKEN_PATH, "utf8"));

                    }
                
                }); 

            } catch(e) {
                console.error(e);
            }

        } // *** fin de 'else'


    }   // fin de fonction 'storeToken'


};  // fin de 'module.exports'