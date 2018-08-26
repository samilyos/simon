angular.module('app.controllers', [])
  
.controller('cryptoCurrencyCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.onSwipeLeft = function () {
        $state.go('tabsController.fOREX');
    };


$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$scope.input = {};

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

$scope.doRefresh = function() {

$scope.numberOfItemsToDisplay = 10;

$http.get("https://elhakeemapp.com/sw/get.php")
  .success(function (response) {$ionicLoading.hide(); $scope.get = response.records;});

  $scope.loadMore = function() {
          $scope.numberOfItemsToDisplay += 5; // load 10 more items
          $scope.$broadcast('scroll.infiniteScrollComplete');
      };
  $scope.$broadcast('scroll.refreshComplete');



};

}])
   
.controller('iQOptionsCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.onSwipeLeft = function () {
        $state.go('tabsController.send');
    };

$scope.onSwipeRight = function () {
        $state.go('tabsController.fOREX');
    };


}])
   
.controller('fOREXCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.onSwipeLeft = function () {
        $state.go('tabsController.iQOptions');
    };

$scope.onSwipeRight = function () {
        $state.go('tabsController.cryptoCurrency');
    };

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$scope.input = {};

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

$scope.doRefresh = function() {

$scope.numberOfItemsToDisplay = 10;

$http.get("https://elhakeemapp.com/sw/get.php")
  .success(function (response) {$ionicLoading.hide(); $scope.get = response.records;});

  $scope.loadMore = function() {
          $scope.numberOfItemsToDisplay += 5; // load 10 more items
          $scope.$broadcast('scroll.infiniteScrollComplete');
      };
  $scope.$broadcast('scroll.refreshComplete');



};

}])
      
.controller('sendCtrl', ['$scope', '$state', '$ionicLoading', '$http', '$cordovaCamera', '$cordovaFile', '$cordovaFileTransfer', '$cordovaDevice', '$ionicPopup', '$cordovaActionSheet', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $ionicLoading, $http, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet) {

  $scope.onSwipeLeft = function () {
        $state.go('tabsController.about');
    };

$scope.onSwipeRight = function () {
        $state.go('tabsController.iQOptions');
    };

  $scope.doRefresh = function() {
  location.reload();
  $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.image = null;

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

  $scope.loadImage = function() {
  var options = {
    title: 'Select Image Source',
    buttonLabels: ['Load from Library', 'Use Camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
  });
};

$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false
  };

  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');

    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";

    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }

        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};

$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + image;
  }
};

$scope.uploadImage = function() {


$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0
  });

  // Destination URL
  var url = "https://elhakeemapp.com/sw/upload.php";

  // File for Upload
  var targetPath = $scope.pathForImage($scope.image);

  // File name only
  var filename = $scope.image;;

  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };

  $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {$ionicLoading.hide();
    $scope.showAlert('Success', 'Image upload finished.');
  });
}



    $scope.message = {};

      $scope.send = function() {

    $http({
        url: "https://elhakeemapp.com/sw/send.php",
        method: "POST",
        data: {
            'name': $scope.message.name,
            'section': $scope.message.section,
            'message': $scope.message.message,
            'image': $scope.image
        }
    });

};

}])
   
.controller('aboutCtrl', ['$scope', '$state', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams) {



$scope.onSwipeRight = function () {
        $state.go('tabsController.send');
    };


}])
   
.controller('thankYouCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('forexNewsCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 3000
  });  

}])
 
.controller('forexEventsCalendarCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 3000
  });  

}])

.controller('forexChartsCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 3000
  });  

}])

.controller('forexTechAnalysisCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 10000
  });  

}])

.controller('cryptoNewsCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 3000
  });  

}])
 
.controller('cryptoEventsCalendarCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 3000
  });  

}])

.controller('cryptoChartsCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 3000
  });  

}])

.controller('cryptoTechAnalysisCtrl', ['$scope', '$state', '$http', '$interval', '$ionicLoading', '$ionicScrollDelegate', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $http, $interval, $ionicLoading, $ionicScrollDelegate) {

$scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

$ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: false,
    maxWidth: 200,
    showDelay: 0,
    duration: 10000
  });  

}])