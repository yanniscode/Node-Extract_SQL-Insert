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


/*------------------------------------------------------------------------//
//                                                                        //
//                          MODULE QUICKSTART 3.2:                        //
//                                                                        //
//                          1 - Authentification                          //
//------------------------------------------------------------------------*/


// DERNIERES MODIFICATIONS : (24/09/2019)

// ~~~~~~ la date d'origine (internalDate de l'API Gmail) récupérée, parsée et ajoutée au nom de fichier 'whitform.xlsx' sauvegardé et dans la BDD - tables 'mail_infos'(pour la comparer à celle de notre tâche Cron)


// *************** EN COURS : *********************************************************************************************

// ~~~~~~ révision de la gestion d'erreurs

// ~~~~~~ Relecture du code globale



// *************** A FAIRE : *********************************************************************************************

// ~~~~~~  Fonctionnement avec MariaDB -> nécessaire ??



/*---------------------------------------------------------------------------------------------------------//
//                                                                                                         //
//               MODULE DE TÉLÉCHARGEMENT DE LA PIÈCE JOINTE D'UN MAIL AU MOYEN DE L'API GMAIL             //
//                                                                                                         //
//---------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------
    1 - Charger les identifiants secrets du client à partir d'un fichier local ('client_secret.json').
---------------------------------------------------------------------------------*/

console.log('\n  *****************************************************************************************************');
console.log('   ***                                      Départ de QUICKSTART 3.2                                ***');
console.log('  *****************************************************************************************************\n');


"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)


/**
 * @param {Object} credentials Les informations d'identification du client d'autorisation.      // *** utilisé ici
*/



// *** Modules de Quickstart-3-2:
const authorizefile = require('./2-authorize');


// *** Modules complémentaires NodeJs:
const fs = require('fs');


try {

    fs.readFile('../client_secret/client_secret.json', function processClientSecrets(err, content) { // *** ATTENTION ! chemin relatif

        if (err) {
            throw "*** err : "+ err +'\n\n1 - Erreur du chargement du fichier \'client_secret.json\': Vérifiez son existence dans le répertoire "./client_secret".\n';
        }
        
        else {

            /*------------------------------------------------------------------------
                1 - Autorisez un client avec les informations d'identification chargées, 
                puis appelez la fonction listMails du fichier '4-listmails'.
                Le cas échéant, solliciter un nouveau jeton d'authentification 'Gmail'
            -------------------------------------------------------------------------*/

            console.log('1 - Chargement du fichier \'client_secret.json\' (API Gmail). -------------------------------------------------------------------');
            console.log('1 - content = '+ content);

            let credentials = JSON.parse(content);

            try {

                authorizefile.authorize(credentials);

            } catch (e) {   // *** Note: on attrape les exceptions levées dans la fonction 'authorize' (les 'throw') 
            
                // *** Attention: si pas de 'catch, le 'throw' semble bloquant pour le code...
                console.error(e);
            }

        }

    });

} catch (e) {
    console.error(e);
}