title 'Web Server'
@echo off

echo 'NPM Version'
call npm -v
echo 'If this returned an error, please check if you have node.js installed'

echo 'Downloading npm dependencies..'
call npm i
echo 'Complete!'

echo 'Bower Version'
call bower -v
echo 'If this returned error, please check if you have bower installed globally'

echo 'Downloading bower dependencies..'
call bower i
echo 'Complete!

echo 'Starting server..'
cd task
gulp server
cd ..