/* =====================================================================
   File: js/99-start.js
   Purpose: Starts the app (shows the login page)
   Note: files load in number order (see index.html). They share one global scope.
   ===================================================================== */
initDb();   // connect the database (after every file has loaded)
login();   // show the login page
