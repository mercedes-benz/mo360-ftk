# Guide for creating a WebApp using the FTK

This is a guide how to create a WebApp using simple command line commands.

## Requirements

* Admin rights on your local machine
* NPM installed

## Guide

Assuming you want to name your app `my-app` run:

1. Create a **new** `npm` project

    ```sh
    mkdir my-app
    cd my-app
    npm init -y
    ```

2. Install the FTK boilerplate as your first dependency

    ```sh
    npm install @daimler/ftk-boilerplate
    ```

    > Once the boilerplate installation is finished you will find all necessary project files in your project folder.  
    > Now the 3rd party dependencies can be installed.

3. Install 3rd party dependencies

    ```sh
    npm install
    ```

4. Start developing

   ```sh
   npm start
   ```

**Happy coding!**
