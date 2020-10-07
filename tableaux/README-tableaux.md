
README - Répertoires des fichiers '.xlsx' et '.csv'


C'est le répertoire de sauvegarde des fichiers intitulés 'whitform.xlsx' et 'whitform.csv' récupérés au moyen de l'API Gmail.

La date du jour (de récupération) et des numéros d'index (mail et pièce jointe) leur seront également attribués afin de mieux les distinguer.
Format du nom de fichier :

    (ex: `fichier-sakana-whitform-2018_10_17-5_10_2020-99.csv`)

[ fichier-sakana-whitform-Date de Gmail (internalDate - YYYY-MM-DD)-Date du jour d'intégration en BDD (DD-MM-YYYY)-Index du mail dans la liste 
(de notre boucle 'for' du fichier `4-listmails.js`).xlsx ]

(et idem pour les fichiers '.csv')

Pour notre programme `quickstart.js`, les deux sous-dossiers 'xlsx' et 'csv' contiendront les fichiers téléchargés et parsés. 

Note:
            
Droits des deux répertoires 'xlsx' et 'csv': 700, mais cela ne semble pas s'appliquer aux mails téléchargés, en droits 740 pour leur part...

------------------------------------------------------------------------------------------------------------------------------------


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


------------------------------------------------------------------------------------------------------------------------------------------

