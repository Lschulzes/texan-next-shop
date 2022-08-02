# Next.js Texan Shop

Running Locally:
```
docker-compose up -d
``` 

## Configure the envs
Rename  __.env.example__ as __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/texandb
```

* Nextjs Common startup
```
yarn install
yarn dev
```


## Fill in some dummy data

Post request to:
```
http://localhost:3000/api/seed
```

To run the production version
```
yarn build
yarn start
```
It builds all the static paths and makes everything run as fast as possible.
