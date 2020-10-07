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
//                              Child Helper                                    //
//------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------

                *** CHILD HELPER.JS: Module complémentaire pour Quickstart 3.2 ***

                    spawn a child process and execute shell command
                    borrowed from https://github.com/mout/mout/ build script
                    author Miller Medeiros
                    released under MIT License
                    version: 0.1.0 (2013/02/01)

                    Execute a single shell command where "cmd" is a string
--------------------------------------------------------------------------------------------------*/



"use strict"; // With strict mode, you can not, for example, use undeclared variables. (cf: https://www.w3schools.com/js/js_strict.asp)



try {

    exports.exec = function(cmd, cb) {


        // this would be way easier on a shell/bash script :P
        let child_process = require('child_process');
        let parts = cmd.split(/\s+/g);
        let p = child_process.spawn(parts[0], parts.slice(1), { stdio: 'inherit' });


        try {

            p.on('exit', function(code) {


                let err = null;

                if (code) {

                    err = new Error('command "'+ cmd +'" exited with wrong status code "'+ code +'"');
                    err.code = code;
                    err.cmd = cmd;

                    console.log('err.message: '+ err.message);
                }

                if (cb) {
                    cb(err);
                }


            });

        } catch (e) {
            console.error(e);
        }
    };


} catch (e) {
    console.error(e);
}

try {

    // execute multiple commands in series:
    // this could be replaced by any flow control lib
    exports.series = function(cmds, cb) {

        let execNext = function() {

            exports.exec(cmds.shift(), function(err) {

                if (err) {

                    try {

                        cb(err);

                    } catch (e) {
                        console.error(e);
                    }

                } else {

                    if (cmds.length) {

                        try {

                            execNext();

                        } catch (e) {
                            console.error(e);
                        }
                    }
                    else {

                        try {

                            cb(null);

                        } catch (e) {
                            console.error(e);
                        }

                    }

                }

            });
        };

        try {

            execNext();

        } catch (e) {
            console.error(e);
        }

        
    };


} catch (e) {
    console.error(e);
}