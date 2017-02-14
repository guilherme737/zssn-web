# Installation Guide: (Ubuntu 16.04 LTS)

Web Project Zombie Survivor Social Network Evaluation of Codiminer42.


## Install

### Install NGINX

```sh
$ sudo apt-get install nginx
```

### Install GIT

```sh
$ sudo apt-get install git
```

### Install Node.js

```sh
$ sudo apt-get update
$ sudo apt-get install nodejs nodejs-legacy npm
```

### Install Webpack

```sh
$ sudo npm install -g webpack
```

### Clone project zssn-web na pasta desejada

```sh
$ git clone https://github.com/guilherme737/zssn-web.git
```

### Install the project libs and run the build

```sh
$ cd zssn-web
$ npm install
$ npm run build
```

### Edit file twds.conf (nginx.conf)

```sh
$ gedit twds.conf
```
* In the 'root' attribute of the 'location /' object, change the value with the correct path of the '/app/' folder of the web project (with '/' at the end)
* In the 'alias' attribute of the 'location /node_modules/' object, change the value with the correct path of the web project '/node_modules/' folder (with '/' at the end)

### Copy the file for NGINX

```sh
$ sudo cp twds.conf /etc/nginx/conf.d/
```

### Restart the web server NGINX

```sh
$ sudo service nginx restart
```

### Edit the Linux hosts file to add the application host

```sh
$ sudo gedit /etc/hosts
```
* "127.0.0.1	guiga.twds.com" - Add text in quotation marks just below existing hosts

