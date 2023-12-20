@echo off
echo Opening web browser...

cd /d C:\Users\PC\Application\V2.0\restroom\webapp
pm2 start --name "webapp" index.js

timeout /t 5