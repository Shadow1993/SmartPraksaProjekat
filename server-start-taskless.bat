title 'Web Server'
@echo off

echo 'Starting server..'
cd server
nodemon server.js
cd ..