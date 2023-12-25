@echo off
echo Starting Node.js server...
cd /d C:\Users\PC\Application\V2.0\restroom\appserver
pm2 start index.js --name "server"



start "" "http://localhost:3889/login"  REM Replace with your actual server URL
exit
