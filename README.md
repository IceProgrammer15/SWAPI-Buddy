# SWAPI Buddy 
Reac.js & Express.js appication for searching Star Wars charachters using [SWAPI](https://swapi.co/).



<p align="center">
  <img src="swbuddy.gif" alt="SWAPI Buddy" >
</p>

[Watch it in Action: (screen capture .gif)](swbuddy.gif)

## Project Structure

1. [client](client) Front-end project in react.js
2. [server](client) Server project in Express.js




## Approach
Data transformation and SWAPI api calls happen on the server side in [server/service/swclient.js](server/service/swclient.js) module.
I also used Goolge Image Search API to retreive relevant images according to the search.




## Installation (Development)

1. Cloning the repository
    ```bash          
    #Clone this repository:
    $ git clone https://github.com/IceProgrammer15/SWAPI-Buddy.git
    ```

2. Starting the server
    ```bash          
    
    #Go into the repository/server folder
    $ cd SWAPI-Buddy/server

    #Install dependencies
    $ npm install

    #start the server
    npm start
    ```
> Server will be running on port 5000 by default    

3. Running the client
    ```bash          
    
    #Go into the repository/client folder
    $ cd SWAPI-Buddy/client

    #Install dependencies
    $ npm install

    #Start the client app
    npm start
    ```
> Keep both Client and Server app running. Front-end will use the server via local proxy 

4-Visit: http://localhost:3000





## Installation (Production)
>Install dependencies for both client and the server as explained in previous section.

>[Gulp](https://gulpjs.com/) is required to build the project


#### Building the project: 

  ```bash            
    #Go into the repository/client folder
    $ cd SWAPI-Buddy/client

    #run build-all script
    $ npm run build-all
  ```
>After successful build, server folder will contain entire project (both front-end and back-end).




## Live on the Cloud

### Microsoft Azure:  https://swapi-buddy.azurewebsites.net

### Google Cloud: http://35.227.83.148



