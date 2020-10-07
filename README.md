<!DOCTYPE html>
<html>

    <head>

        <title>README - API Gmail</title>

        <meta http-equiv="content-type" content="text/html; charset=UTF-8" name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="mystyle_c.css" rel=" stylesheet " type="text/css"/>	

    </head>
	
    <body>

        <charset utf-8>
        <h1>Quickstart-3.2 (NodeJs / API Gmail)</h1>

        <hr>
        <strong>Extraction d'une pièce jointe de mail, au moyen de l'API Gmail, afin de récupérer un fichier ('.xlsx') qui sera parsé au format '.csv', et insérer des données ciblées en BDD MySQL.</strong>
        <hr>
        <br />
        <i>ATTENTION : Cet outil est encore en phase de tests. Utilisez le en connaissance de cause...</i>
        
        <br /><br /><br />
        
        <i><b>Note du 5 Octobre 2020:</b><br />Vous pouvez désormais utiliser le programme <b>Quickstart-3.2</b>. Celui-ci permet de récupérer automatiquement des pièces-jointes extraites de mails différents.</i>

        <br /><br />

        <b><ul><li>Installation:</li></ul></b>
         <br />
        Vous devez au préalable installer une base de donnée MySQL (avec les informations de connexions - voir <a href="./quickstart-3.2/db_config/README-database-connection.html"><b>ici</b></a>), et créer (ou sélectionner) un projet sur l'API Gmail.
        <br />
        Vous pouvez cloner le projet <a href="https://github.com/yanniscode/Node-Extract_SQL-Insert"><b>ici</b></a> et installer les modules (librairies) nécessaires au moyen de NPM:
        <br /><br />
        <pre>git clone https://github.com/yanniscode/Node-Extract_SQL-Insert.git</pre>
        <pre>npm install --save</pre>

        <br />

        <b><ul><li>Lancement de l'application:</b>
        </li></ul>
        <br />
        <pre>cd quickstart-X-X  // à partir de la racine du projet (X.X correspondant au numéro de version de Quickstart - ex: 'quickstart-3.2' dans notre cas...)</pre>
        <pre>node node 0-quickstart-options.js</pre>
        <br /><br />
        Vous pouvez désormais choisir ces options de démarrage:

        <ul>
            <p><strong>Liste des options:</strong></p>
            <li>0: Lancement du programme 'Quickstart 3.2'</li>
            <li>1: Lancement du planificateur de tâches 'Cron Launcher 1.4' </li>
            <li>2: Sauvegarde (back-up) de la Base de Données 'dataviz_fish_uk' (MySQL)</li>
            <li>3: Restauration de la BDD 'dataviz_fish_uk' (et des données de la dernière sauvegarde)</li>
            <li>4: Ré-initialisation de la BDD 'dataviz_fish_uk' (vide) et suppression des fichier '.xlsx' et '.csv'</li>
            <li>5: Suppression des fichiers '.csv' et '.xlsx'</li>
            <li>6: Quitter</li>
            <br>
        </ul>

        <br />

        Dans un premier temps le programme va se connecter à l'aide du fichier "client_secret.json", que vous téléchargerez sur la <a href="https://console.cloud.google.com/apis/"><b>console de l'API Gmail</b></a>. Renommez-le au besoin, et déplacez ce fichier dans répertoire './client_secret'.<br /><br />

        Quickstart va par la suite chercher un mail contenant "whitform.xlsx" comme chaîne de caractères. Une fois le mail trouvé, il va récupérer l'id qui correspond à la pièce jointe afin de prendre les données en 'base64'.

        Les modules de parsage nous servirons à découper le fichier '.xlsx' vers du '.csv', puis à l'insertion des contenus ciblés en base de données MySQL.

        <br><br>

        <br>
        <b><ul><li>Modules utilisées:</li></ul></b>

        <ul>
            <p><strong>Extraction:</strong></p>
            <li>google-auth-library</li>
            <li>node-schedule</li>
            <li>googleapis</li>
            <li>readline</li>
            <br>

            <p> <strong>Parsage et insertion en MySQL:</strong></p>
            <li>body-parser</li>
            <li>csv-parse</li>
            <li>node-xlsx</li>
            <li>fs</li>
            <li>mysql</li>
            <li>cron</li>
        </ul>

        <br />
        <b>Note:</b>
        <br /><br :>
        Un gestionnaire de tâches planifiées permettant d'automatiser le lancement du programme a été intégré.<br>Voir à ce sujet: <a href= './quickstart-3.2/README-cron_launcher-1.4.md'><b>README-cron_launcher-1.4.md</b></a>.

        <br><br><br>

        <i>Enfin, voici une liste de bugs: le fichier <a href="./quickstart-gestion-erreurs.md"><b>quickstart-gestion-erreurs.md</b></a> (en cours ou résolus), que vous pourrez avoir en cours d'installation avec, quand possible des éléments de résolution (testés sous Linux et Windows)</i>
        <br /><br /><br />

        Un grand merci à tous les participants de SakanaPoisson !

        <br />
        <b><ul><li>Collaborators:</li></ul></b>
        Sakana Consultants, DarKaweit, Yanniscode, StevenLg, Nad, Code.bzh.</i>
        <br /><br />
        # Extract-Node-Insert-SQL

        <br /><br />
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        <br /><br />
        <i>This file is part of <b>Quickstart.js</b>.
        <br /><br />

        Quickstart.js is free software: you can redistribute it and/or modify
        it under the terms of the GNU General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version.
        <br /><br />

        Quickstart.js is distributed in the hope that it will be useful,
        but WITHOUT ANY WARRANTY; without even the implied warranty of
        MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
        GNU General Public License for more details.
        <br /><br />

        You should have received a copy of the GNU General Public License
        along with Quickstart.js.  If not, see <https://www.gnu.org/licenses/>.</i>

        <br /><br />
        ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------<br /><br />
    </body>

</html>
