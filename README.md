
README - API Gmail - Quickstart-3.2 (NodeJs / API Gmail)

Extraction d'une pièce jointe de mail, au moyen de l'API Gmail, afin de récupérer un fichier ('.xlsx') qui sera parsé au format '.csv', et insérer des données ciblées en BDD MySQL.

*** ATTENTION : Cet outil est encore en phase de tests. Utilisez le en connaissance de cause... ***
        

        
Note du 5 Octobre 2020:

Vous pouvez désormais utiliser le programme Quickstart-3.2. Celui-ci permet de récupérer automatiquement des pièces-jointes extraites de mails différents.

Installation:

Vous devez au préalable installer une base de donnée MySQL (avec les informations de connexions - `./quickstart-3.2/db_config/README-database-connection.html`), et créer (ou sélectionner) un projet sur l'API Gmail.

Vous pouvez cloner le projet sur `https://github.com/yanniscode/Node-Extract_SQL-Insert` et installer les modules (librairies) nécessaires au moyen de NPM:

        	git clone https://github.com/yanniscode/Node-Extract_SQL-Insert.git
        	npm install --save

Lancement de l'application:
        
	cd quickstart-X-X  // à partir de la racine du projet (X.X correspondant au numéro de version de Quickstart - ex: 'quickstart-3.2' dans notre cas...)
	node node 0-quickstart-options.js
        
Vous pouvez désormais choisir ces options de démarrage:

Liste des options:

	0: Lancement du programme 'Quickstart 3.2'
	1: Lancement du planificateur de tâches 'Cron Launcher 1.4'
	2: Sauvegarde (back-up) de la Base de Données 'dataviz_fish_uk' (MySQL)
	3: Restauration de la BDD 'dataviz_fish_uk' (et des données de la dernière sauvegarde)
	4: Ré-initialisation de la BDD 'dataviz_fish_uk' (vide) et suppression des fichier '.xlsx' et '.csv'
	5: Suppression des fichiers '.csv' et '.xlsx'
	6: Quitter


Dans un premier temps le programme va se connecter à l'aide du fichier `client_secret.json`, que vous téléchargerez sur `https://console.cloud.google.com/apis/`(console de l'API Gmail). Renommez-le au besoin, et déplacez ce fichier dans répertoire `./client_secret`.

Quickstart va par la suite chercher un mail contenant `whitform.xlsx` comme chaîne de caractères. Une fois le mail trouvé, il va récupérer l'ID qui correspond à la pièce jointe afin de prendre les données en 'base64'.

Les modules de parsage nous servirons à découper le fichier '.xlsx' vers du '.csv', puis à l'insertion des contenus ciblés en base de données MySQL.

Modules utilisées:


	Extraction:
		google-auth-library
		node-schedule
		googleapis
		readline


	Parsage et insertion en MySQL:
		body-parser
		csv-parse
		node-xlsx
		fs
		mysql
		cron
		


 Note:

Un gestionnaire de tâches planifiées permettant d'automatiser le lancement du programme a été intégré.Voir à ce sujet: `./quickstart-3.2/README-cron_launcher-1.4.md`.


Enfin, voici une liste de bugs: le fichier `./quickstart-gestion-erreurs.md` (en cours ou résolus), que vous pourrez avoir en cours d'installation avec, quand possible des éléments de résolution (testés sous Linux et Windows)


Un grand merci à tous les participants de SakanaPoisson !


Collaborators:

	Sakana Consultants, DarKaweit, Yanniscode, StevenLg, Nad, Code.bzh.
	# Extract-Node-Insert-SQL

-------------------------------------------------------------------------------------------------------------------------------------------------------


This file is part of Quickstart.js.


Quickstart.js is free software: 

You can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Quickstart.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.


You should have received a copy of the GNU General Public License
along with Quickstart.js.  If not, see <https://www.gnu.org/licenses/>.


---------------------------------------------------------------------------------------------------------------------------------------------------------


