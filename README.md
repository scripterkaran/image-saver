## Saving Images to local file system = saving Data usage, Ionic-Way!

##  image-saver
Ionic directive for saving remote images to local file system in HTML mobile Apps.

If you have _remote images_ served from a external server and you need to save them to your device to 
- avoid downloading them again and again, consuming more data

This module is created for the very same reason 
All image files are stored in a Folder (cache folder) and **NOT** in the localStorage.

## **Installation**

This plugin is dependent on 3 cordova plugins:
- [cordova-plugin-file](http://ngcordova.com/docs/plugins/file/)
- [cordova-plugin-file-transfer](http://ngcordova.com/docs/plugins/fileTransfer/)
- [cordova-plugin-network-information](http://ngcordova.com/docs/plugins/network/)

You would need to install ngCordova also.

    bower install ngCordova

	bower install image-saver
    

Include _ngCordova.js_ and _imageSaver.js_ in your index.html, and place it as an angular-dependency

    angular.module('yourAwesomeApp', ['ionic','ngCordova','image-saver']
    
## **Usage**

`image-saver` is a directive that is included on a `<img>` tag.
required attributes
- 1. name (remote-server url ) **REQUIRED** 
- 2. directory (name of the directory you want to store your images) **REQUIRED**

## **Example:**

     <img image-saver name="{{your scope variable to bind the URL of remote Image URL}}" directory="Images">
if your image url is `http://bower.io/img/bower-logo.png`

The Image will be stored with name: _bower-logo.png_ (the last segment of the url path)

_Note_: **`src`** tag on `<img>` is not required, instead give **`_src_`** to **`_name_`** attribute.

This directive creates a directory in _cache_ folder, if not exsit, and downloads the file. Next time if apps open up, the directive checks for existing file and it uses that instead of doing HTTP request again.


## **Future To-dos**
1. Give developer option to which cordova directory he/she wants to store images to.









