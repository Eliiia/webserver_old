webserver
---

hiya! 
this is my re-write of [my old webserver](https://github.com/Eliiia/site-old/), cause a lot of things annoyed me with how it was written

# Modules
The core part of the webserver is the "loader" (`src/loader.js`), which loads in all the modules. At the time of writing, they are:
- api (`src/modules/api/main.js`); https server for the `api.` subdomain. Serves various JSON information.
- website (`src/modules/website/main.js`); https static file server (the files of which are in [my www repository](https://github.com/Eliiia/www/))