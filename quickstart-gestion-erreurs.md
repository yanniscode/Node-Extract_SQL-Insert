API GMAIL (résolution des problèmes d'installation)

- liste des erreurs lors du git clone :


A> ERREURS D'INSTALLATION:

1/

internal/modules/cjs/loader.js:573
    throw err;     ^
Error: Cannot find module 'googleapis'

>>>installer les modules complémentaires ('node modules'):
npm install


2/

found 25 vulnerabilities (2 low, 21 moderate, 2 high)

>> Réparation des Vulnérabilités :
npm audit
npm audit fix
npm audit fix --force (au besoin ??)

>>puis réparations manuelles si possible :
npm update
modifier le numéro de version dans 'package-lock.json' (attention si on refait un 'npm audit fix', il peut remettre l'ancienne version avec vulnérabilité)
npm update --save hoek (exemple d'update individuel)
npm outdated
npm install npm@6.2.0


3/

-"TypeError: googleAuth is not a constructor"
 at authorize (/home/yanniscode_bzh/Documents/code.bzh/projets/sakana/Node-Extract_SQL_Insert-b/quickstart-2.1.js:135:16)

>>> mise à jour de Node.js (npm i npm) et de certains modules :

npm install googleapis --save
npm install google-auth-library@0.* --save

******************

TypeError: googleAuth is not a constructor

1 - Chargement du fichier "client secret" (API Gmail). -------------------------------------------------------------------
/home/yannis/Bureau/node-extract_sql-insert-g-update/quickstart-3.1/2-authorize.js:37
    let auth = new googleAuth();
               ^

TypeError: googleAuth is not a constructor

>> Solution (temporaire ??) > problème de version :

rester à celle-ci :

"google-auth-library": "~0.12.0"




B> ERREURS DE CONFIGURATION :


1/

59 - Erreur du chargement du fichier "client secret": Error: ENOENT: no such file or directory, open 'client_secret.json'

>>> après création ou sélection d'un projet existant, récupérer le fichier 'client-secret' (format json) sur l'api Gmail et le placer à la racine du projet


2/

events.js:167
      throw er; // Unhandled 'error' event
      ^
Error: Unknown database 'test_sakana'
    at Packet.asError (/home/yanniscode_bzh/Documents/code.bzh/projets/sakana/Node-Extract_SQL_Insert-b/node_modules/mysql2/lib/packets/packet.js:716:13)

>>> créer la base de donnée MySQL en copiant/collant le fichier 'datafishuk.sql' dans la console ou Phpmyadmin


3/

fs.js:110
    throw err;
    ^
Error: ENOENT: no such file or directory, open '/home/yanniscode_bzh/Documents/code.bzh/projets/sakana/Node-Extract_SQL_Insert-b/Tableaux/xlsx/fichier-sakana-whitform-22_7_2018-20__1.xlsx'
    at Object.fs.openSync (fs.js:545:3)
    at Object.fs.readFileSync (fs.js:451:33)
    at read_binary (/home/yanniscode_bzh/Documents/code.bzh/projets/sakana/Node-Extract_SQL_Insert-b/node_modules/xlsx/xlsx.js:1891:44)

>>> création des répertoires 'csv' et 'xlsx' dans le dossier 'Tableaux' -> désormais 'tableaux' (06_10_2020)



*****************

NOUVELLES ERREURS :

-Dans le module 'quickstart-3.1.js' de 'ukquota.dataviz.fish' - status = irrésolu

(node:5233) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'length' of undefined
    at /home/yannis/Bureau/node-extract_sql-insert-g-update/quickstart-3.1/4-listmails.js:84:64

> pas d'enregistrement des fichiers dans les répertoires > question de droits ?? - 21/07/2018 (sous Windows: Attention à l'antivirus, en conflit avec Node.js -> le désactiver temporairement pour pouvoir écrire...)

**********

-erreur de version de librairie "googleapis":

/media/yanniscode/887006f9-aed3-4b9e-9452-9e471042a8301/yanniscode/Documents/projets_web-perso/sakana/node-extract/node-extract_sql-insert-j-users_table/node_modules/google-auth-library/lib/auth/oauth2client.js:346
        callback(err, result, response);


rester à celle-ci :
"googleapis": "^27.0.0" -> Mais vulnérabilité des version inférieures à 39.1.0

***

>> nouvelle erreur (09/2020): results = null (problème de connexion à l'API ?? (refaire un projet ??) -> ok (24/09/2020): recréer le fichier '/home/yanniscode/.credentials-api/gmail-nodejs-quickstart.json' (Linux) semble marcher (pb de credentials obsolète)







