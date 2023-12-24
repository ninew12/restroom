@echo off
echo Starting Node.js server...

cd /d C:\Users\PC\Application\V2.0\restroom\appserver
pm2 start --name "server" index.js


timeout /t 2
