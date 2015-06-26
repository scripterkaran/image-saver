angular.module('image-saver', [])
    .directive('imageSaver', function (FileService, $cordovaNetwork,$timeout) {
        function link(scope, element, attr) {
            var fileName = attr.name.split('//').pop().split('/').pop();
            if ($cordovaNetwork.isOnline()) {
                FileService.CheckThenDownloadFile(attr.name, fileName, attr.directory)
                    .then(function (res) {
                        element.attr('src', res);
                        $timeout(function () {
                            scope.$apply()
                        });
                    }, function (err) {
                        //error
                    })
            }else{
                FileService.getOfflineData(fileName, attr.directory).then(function (res) {
                    element.attr('src',res);
                    $timeout(function () {
                        scope.$apply()
                    })
                })
            }
        }
        return {
            restrict: 'A',
            scope: {
                name: '@',
                directory: '@'
            },
            link: link

        }
    })

    .factory('FileService', function ($q, $cordovaFile, $cordovaFileTransfer) {
           var StorageDirectory = cordova.file.cacheDirectory;
           function DownloadFileAsync(url,StorageDirectory,directory,options,AllowAllHost){
               var q = $q.defer();
               $cordovaFileTransfer.download(url,StorageDirectory+directory+'/'+file,options,AllowAllHost).then(function () {
                   var path = StorageDirectory+directory+'/'+file;
                   q.resolve(path)
               }, function (err) {
                   q.reject(err);
               });
               return q.promise
           }
           return {
                CheckThenDownloadFile: function (url, file, directory) {
                    var q = $q.defer();
                    $cordovaFile.checkDir(cordova.file.cacheDirectory, directory).then(function () {
                         $cordovaFile.checkFile(StorageDirectory+directory+'/',file).then(function () {
                            var path  = StorageDirectory+directory+'/'+file;
                            q.resolve(path)
                         }, function () {
                             //download file if not exist
                             var options = {create : true, exclusive: false};
                             DownloadFileAsync(url,StorageDirectory,directory,file,options,true).then(function (res) {
                                q.resolve(res); //resolving path of local file that downloaded
                             }, function (err) {
                                //error Download
                                 q.reject(err)
                             })
                         })
                    }, function () { //create dir (for first time)
                        var options = {create : true, exclusive: false};
                        $cordovaFile.createDir(StorageDirectory,directory,true).then(function () {
                            DownloadFileAsync(url,StorageDirectory,directory,file,options,true).then(function (res) {
                                q.resolve(res)
                            }, function () {
                                q.reject()
                            })
                        })
                    });
                    return q.promise
                },
                getOfflineData: function (file, directory) {
                    var q = $q.defer();
                    $cordovaFile.checkDir(StorageDirectory, directory).then(function () {
                        $cordovaFile.checkFile(StorageDirectory+directory+'/', file).then(function () { //file exists
                            var path = StorageDirectory+directory+'/'+file;
                            q.resolve(path)
                        }, function (err) {
                            q.reject(err)
                        })
                    }, function (err) {
                        q.reject(err)
                    });
                    return q.promise
                }
           }
    });
