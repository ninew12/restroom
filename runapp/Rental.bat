@echo off
echo Starting Node.js server...
cd /d C:\Users\PC\Application\V2.0\restroom\appserver
pm2 start --name "server" server.js



start "" "http://localhost:3889/login"  REM Replace with your actual server URL
exit
