// const path = require("path");
// const express = require("express");
// const app = express(); // create express app

// // add middlewares
// app.use(express.static(path.join(__dirname, ".", "dist")));
// app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, ".", "dist", "index.html"));
// });

// // start express server on port 5000
// app.listen(3889, () => {
//   console.log("server started on port 3889");
// });
var exec = require('child_process').exec;
exec('npm run dev', {windowsHide: true});