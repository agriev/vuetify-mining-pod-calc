# vuetify-mining-calc

> Calculator for mining profitability and POD distribution
> Based on VUE, will not work without deployed backend. It's necessary to enable CORS to whattomine.org 

## Installation instructions

Actually you will need an Nginx, Node.js already set up. Please consider consulting the docs

```bash
cd /var/www
git clone https://github.com/agriev/vuetify-mining-pod-calc.git calc-frontend
git clone https://github.com/agriev/vuetify-mining-pod-calc-backend.git calc-backend
cd calc-frontend
vim src/App.vue 
```
In App.vue change 
```json
BASE_API_URL: 'http://localhost:3000/',
# Replace localhost with your host, keep the port number
```
Then :wq to save and exit vim
```bash
npm install
npm run build
```
Setup your Nginx or Apache document-root like
```apacheconfig
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name _;

        root /var/www/calc-frontend/dist;
        index index.html;

        location / {
                try_files $uri $uri/ =404;
        }
}
```    
Then reload Nginx
```bash
sudo service reload nginx
# Now we'll lanch little cors avoiding proxy:
cd ../calc-backend
npm install
npm start
```

Now you can open your browser and have fun

If you want to help - any suggestions necessary.
I'm only couple of days with Vue and frontend development, 
so If you find out the way to reduce shitcode here - just make a pull request

Star it if you like it :)
Anyway this little calc is a good example of how vue, vuetify, axios and etc. works

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
