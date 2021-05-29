# Anomaly Detection WebApp

The project provides an **API** that support the following options:
- upload training and test (csv files).
- detect anomalies using on of the 2 detection algorithems (Linear Regression or Hybrid that uses a minimal circle algorithem)
- Get data from a given csv header (from a test file).

  The detection algorithem implemented using native Addon in the context of the Node.js is a binary file that is compiled from a low-level language like C and C++
Addons are dynamically-linked shared objects written in C++
Node-API (formerly N-API) is an API for building native Addons
node-addon-api is an NPM module that provides napi.h header file. 
This header file contains C++ wrapper classes for N-API and it is officially maintained along with the N-API.
our target was to creat Node Modules written in C++ language
by using napi.h API we could connect local C++ classes to make the anomally and study the data we recieve from the clients.

In this project we implement the API for GUI web application that support an easy way to present and analyze the detected anomlies.
### Special features
- An interface that include file upload and an option to select a detection algorithm.
- An interface for choosing the correlated features to present on a graph.
- A graph that shows only the time ranges when an anomaly acurred each (each dot on the graph represent an anomaly)
the graph also allows the user to view only one feature by pressing the outher feature title to hide it and it will focus on the desired feature.
- A table to view all of the detected anomalies sorted in order.


![UML IMAGE](https://i.ibb.co/vL3NFB4/image.png)


### A hierarchy of folders
- ANOMALYDETECTIONWEBAPP_MAIN - The main folder.
- server.js: This is express server that can listen to clients and execute the API commands 
- controller: Use the API that the server implements. With this API the moudle calculate the
  anomalies and send them to the view. 
- node_modules - extern libreries and installitions. 
- build: This folder contain the detection algorithems (model).
- src: A folder of the anomaly detection algorithems source files.
- view: This part present the web page with all the buttons and charts.Its made by html and css.
- binding.gyp: file that help to build the addon.

### Installition requirements
download python from: https://www.python.org/downloads/
download lts version of npm and node.js from: https://www.npmjs.com/get-npm
> if the installation is on windows add all the additional attributes.

##### From the shell execute:
- sudo npm install -g node-gyp
- npm install chart.js
- npm install node-addon-api
- node-gyp rebuild
- node server.js

##### Video
https://youtu.be/yE7MqifG6I8
##### UML
![UML IMAGE](https://i.ibb.co/s32m8VD/image.jpg)



