webserver
---

hiya! 
this is my re-write of [my old webserver](https://github.com/Eliiia/site-old/), cause a lot of things annoyed me with how it was written

# Modules
The core part of the webserver is the "loader" (`src/loader.js`), which loads in all the modules. At the time of writing, they are:
- api (`src/modules/api/main.js`); https server for the `api.` subdomain. Serves various JSON information.
- website (`src/modules/website/main.js`); https static file server (the files of which are in [my www repository](https://github.com/Eliiia/www/))

# Deploy
*this is correct at the time of writing, may not be when youre reading it*
to deploy, you'll need to:
- [get genius API token](https://genius.com/api-clients)
- clone this repo, duh
- clone [my www repo](https://github.com/Eliiia/www/) into src/modules/website/www/
- pull npm packages
- get the ssl keys/certs youll need
- create `logs/` folder
- put the below code block in `src/config.json` and fill the fields in yourself
- configure nginx with the config in `scripts/nginx.conf` *(not necessary)*
- get permissions to write in `logs/` (not sure why you need to, but i needed to each time) *only on linux*
- use `scripts/start.sh` or `scripts/dev-start.sh` or whatever you want to start the program

```json
{
    "ssl": {
        "websiteKey": "../ssl/private.key", // location of website domain ssl key
        "websiteCert": "../ssl/certificate.crt", // location of website domain ssl cert
        "apiKey": "../ssl/private.key", // location of api domain ssl key
        "apiCert": "../ssl/certificate.crt" // location of api domain ssl cert
    },
    "ports": {
        "http": 80,
        "https": 443,
        "api": 3000
    },
    
    "web": {
        "hostname": "127.0.0.1", // hostname. can be "127.0.0.1", "localhost", "0.0.0.0", or your hostname 
        "domain": "elia.cam" // the domain youre using to host the file webserver; isnt used at the time of writing
    },
    "api": {
        "hostname": "127.0.0.1", // hostname. can be "127.0.0.1", "localhost", "0.0.0.0", or your hostname 
        "domain": "api.elia.cam", // the domain youre using to host the api; isnt used at the time of writing
        "geniusToken": "<GENIUS_TOKEN>", // token from step 1
        "tokenSecret": "<TOKEN_SECRET>" // for generating tokens
    }
}