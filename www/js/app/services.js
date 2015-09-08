angular.module('app.services', [])

    .service('AppService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

        }])
    .directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function($scope, $element, attrs) {
                $element.addClass("ng-hide-remove");
                $element.on('load', function() {
                    $element.addClass("ng-hide-add");
                });
            }
        };
    })

    .factory('PersonService', function($http){
      var BASE_URL = "http://api.randomuser.me/";
      var items = [];
      
      return {
        GetFeed: function(){
          return $http.get(BASE_URL+'?results=6').then(function(response){
            items = response.data.results;
            return items;
          });
        },
        GetNewUsers: function(){
          return $http.get(BASE_URL+'?results=6').then(function(response){
            items = response.data.results;
            return items;
          });
        },
        GetOldUsers: function(){
          return $http.get(BASE_URL+'?results=6').then(function(response){
            items = response.data.results;
            return items;
          });
        }
      }
    })

    .factory('$localStorage', ['$window', function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
    
    .factory('geoLocation', function ($localStorage) {
        return {
            setGeolocation: function (latitude, longitude) {
                var _position = {
                    latitude: latitude,
                    longitude: longitude
                }
                $localStorage.setObject('geoLocation', _position)
            },
            getGeolocation: function () {
                return glocation = {
                    lat: $localStorage.getObject('geoLocation').latitude,
                    lng: $localStorage.getObject('geoLocation').longitude
                }
            }
        }
    });
