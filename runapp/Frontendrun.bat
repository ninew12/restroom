@echo off
echo Opening web browser...

cd /d C:\Users\newyear\Documents\restroom\webapp
pm2 start --name "webapp" index.js

timeout /t 5