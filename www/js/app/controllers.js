/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])

    .controller('AppCtrl', function($state, $scope, $ionicLoading, $cordovaCamera, $localStorage) {
        //$scope.image='';
        //$scope.croppedImage='';
        $scope.uploadPicture = function() {
            var options = {
                quality : 50,
                destinationType : Camera.DestinationType.FILE_URI,
                sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.PNG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.image2 = imageData;
                $state.go('image-crop');
            }, function(error) {
                //alert("Camera Error");
            });
        }

        $scope.takePicture = function() {
            var options = {
                quality : 50,
                destinationType : Camera.DestinationType.FILE_URI,
                sourceType : Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.PNG,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.image2 = imageData;
                $state.go('image-crop');
            }, function(error) {
                //alert("Camera Error");
            });
        }
    })

    //

    .controller('ImageCropCtrl', function($state, $scope, $rootScope, imageStore, $ionicLoading, $cordovaCamera, $localStorage, $timeout, $ionicPopup) {
        $scope.image = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
        $scope.croppedImage = '';
        alert('sup m8');
        
        $scope.beginLoad = function() {
            alert('loadin');
            $ionicLoading.show({
              template:'Loading...'
            });
        };

        $scope.endLoad = function() {
            $ionicLoading.hide();
        };

        $scope.setCrop = function() {
            imageStore.store('cropImage', $scope.croppedImage);
            //$scope.croppedImage = imageStore.get('cropImage');
        }
    })

    .controller('ImageEditCtrl', function($state, $scope, $rootScope, imageStore, $ionicLoading, $cordovaCamera, $localStorage, $timeout, $ionicPopup) {
        //$scope.croppedImage = imageStore.get('cropImage');
        var img = document.getElementById('editImage');
        //$scope.croppedImage = $rootScope.croppedImage; //imageStore.get('cropImage');
        //img.src = $scope.croppedImage;
        //alert(JSON.stringify($rootScope.croppedImage));

        var options = {
            onError: function() {
                alert('ERROR');
            }
        };

        var vinImg = new VintageJS(img, options, null);

        $scope.Button1 = function(){
            
            var effect = {
                vignette: 0.6,
                sepia: true
            };

            vinImg.vintage(effect);
            console.log(JSON.stringify(effect));
        }
        $scope.Button2 = function(){
            
            var effect = {
                vignette: 0.9,
                noise: 20
            };

            vinImg.vintage(effect);
        }
        $scope.Button3 = function(){
            
            var effect = {
                vignette: 0.8,
                screen: {r:120, g:120, b:0, a:0.7}
            };

            vinImg.vintage(effect);
        }
    })

    .controller('CategoryImageGridCtrl', function($scope, $ionicLoading, $timeout, $ionicModal, PersonService) {
      $scope.items = [];
      $scope.newItems = [];
      $scope.hide_black = false;
        

      $scope.loadingIndicator = $ionicLoading.show({
          content: 'Loading Data',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 500
      });

      PersonService.GetFeed().then(function(items){
        $ionicLoading.hide();
        $scope.items = items;
      });
      
      $scope.doRefresh = function() {
        if($scope.newItems.length > 0){
          //$scope.items = $scope.newItems.concat($scope.items);
          PersonService.GetFeed().then(function(items){
            $scope.items = items;
          });
            
          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
          
          $scope.newItems = [];
        } else {
          //PersonService.GetNewUsers().then(function(items){
          PersonService.GetFeed().then(function(items){
            $scope.items = items;
            //$scope.items = items.concat($scope.items);
            
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
          });
        }
      };
      
      $scope.loadMore = function(){
        PersonService.GetOldUsers().then(function(items) {
          $scope.items = $scope.items.concat(items);
        
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };

      //Modal shit
      $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      
      $scope.openDetails = function(index) {        
        $scope.currentItem = $scope.items[index];
        $scope.modal.show();
      };
      
      

      //click events

      $scope.clickEvent = function() {
        alert('clicked');
      }
    })

    .controller('CategoryCtrl', function($state, $scope, $ionicLoading, PersonService) {
        $scope.categories = [];

        $scope.loadingIndicator = $ionicLoading.show({
              content: 'Loading Data',
              animation: 'fade-in',
              showBackdrop: false,
              maxWidth: 200,
              showDelay: 500
          });

        PersonService.GetFeed().then(function(categories){
            $ionicLoading.hide();
            $scope.categories = categories;
          });


    })

    .controller('AccountCtrl', function($state, $scope, $ionicLoading, PersonService) {
        //var img = document.getElementById('editImage');
        /*
        $scope.croppedImage='';

        var options = {
            onError: function() {
                alert('ERROR');
            }
        };

        var vinImg = new VintageJS(img, options, null);

        $scope.Button1 = function(){
            
            var effect = {
                vignette: 0.6,
                sepia: true
            };

            vinImg.vintage(effect);
            console.log(JSON.stringify(effect));
        }
        $scope.Button2 = function(){
            
            var effect = {
                vignette: 0.9,
                noise: 20
            };

            vinImg.vintage(effect);
        }
        $scope.Button3 = function(){
            
            var effect = {
                vignette: 0.8,
                screen: {r:120, g:120, b:0, a:0.7}
            };

            vinImg.vintage(effect);
        }*/
    })

    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            $scope.dataList = ["One", "Two", "Three"];


            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };


        }])
    .controller('TestAccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }]);
