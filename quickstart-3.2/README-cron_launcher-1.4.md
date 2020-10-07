
README - Cron Launcher 1.4

Gestionnaire de planification de tâche 'Cron' pour Node.js. (le 07/10/2020)

Référence : `https://github.com/wahengchang/nodejs-cron-job-must-know`



Ce module permet l'exécution automatique de `quickstart-3.2.js`, mais peut exécuter plusieurs scripts simultanément (à insérer dans la liste).
Ses paramètres sont réglables selon l'ordre suivant:

Secondes, minutes, heures, jour du mois, mois, jour de la semaine :

Exemple :
	`cron.schedule('15 * * * * *')`  // à chaque minute (seconde 15)

(*** Attention, cependant : le faire à un intervalle si réduit peut poser problème lors 
de la récupération des données... ***)

Pour le lancement(shell):
	cd quickstart-3.2
	node cron_launcher-1.4.js

ou bien : utiliser la nouvelle interface de lancement:
	cd quickstart-3.2
	node 0-quickstart-options.js


Modules utilisées:
	node-cron
	mysql2

Répertoires supplémentaires requis:
	child_helper


Un grand merci à tous les participants de SakanaPoisson !


Collaborators:
Sakana Consultants, DarKaweit, Yanniscode, StevenLg, Nad, Code.bzh.

# Extract-Node-Insert-SQL


----------------------------------------------------------------------------------------------------------------------


This file is part of Quickstart.js.


Quickstart.js is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.


Quickstart.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.


You should have received a copy of the GNU General Public License
along with Quickstart.js.  If not, see <https://www.gnu.org/licenses/>.


-----------------------------------------------------------------------------------------------------------------------


