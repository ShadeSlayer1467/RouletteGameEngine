@echo off
REM Batch script to create the Node.js project structure for the roulette game server

echo Creating directories...
mkdir roulette-game-server
cd roulette-game-server
mkdir src public test
cd src
mkdir api config models routes services utils
cd api
mkdir controllers
cd ..\public
mkdir css js
cd ..\..

echo Creating files...
type nul > .env
type nul > .gitignore
type nul > README.md
type nul > package.json
cd src
type nul > app.js
type nul > server.js
cd api\controllers
type nul > gameController.js
type nul > userController.js
cd ..\..
cd config
type nul > db.js
type nul > index.js
cd ..\models
type nul > userModel.js
type nul > gameModel.js
type nul > transactionModel.js
cd ..\routes
type nul > gameRoutes.js
type nul > userRoutes.js
cd ..\services
type nul > authService.js
type nul > gameService.js
type nul > userService.js
cd ..\utils
type nul > logger.js
type nul > helpers.js
cd ..\..
cd public
echo Your HTML content here > index.html
cd css
echo /* CSS styles here */ > style.css
cd ..\js
echo // JavaScript code here > script.js
cd ..\..
cd test
type nul > game.test.js
type nul > user.test.js

echo Structure creation complete!
