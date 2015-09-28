angular.module('tw.services.fileReader', []);

angular.module('tw.services.fileReader').factory('twFileReader', ['$q', '$window', '$rootScope', function($q, $window, $rootScope) {
  var FileReader = $window.FileReader;

  return {
    readAsDataURL: function readAsDataURL(file, scope) {
      var scope = scope || $rootScope;

      return $q(function(resolve, reject) {
        var reader = new FileReader();

        reader.onload = function onload() {
          scope.$apply(function() {
            resolve(reader.result);
          });
        };

        reader.onerror = function onerror() {
          scope.$apply(function() {
            reject(reader.error);
          });
        };

        reader.readAsDataURL(file);
      });
    }
  };
}]);
