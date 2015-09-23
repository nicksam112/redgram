// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',
    [
        'ionic',
        'app.controllers',
        'app.services',
        'user.controllers',
        'user.services',
        'ng-mfb',
        'vintagejs',
        'ngCordova',
        'ngImgCrop'
    ]
)
/**
 * see documentation: https://www.parse.com/apps/quickstart#parse_data/web/existing
 *
 * SET THESE VALUES IF YOU WANT TO USE PARSE, COMMENT THEM OUT TO USE THE DEFAULT
 * SERVICE
 *
 * parse constants
 */
    .value('ParseConfiguration', {
        applicationId: "",//ask nick
        javascriptKey: ""//ask nick
    })
/**
 *
 */
    .config(function ($stateProvider, $urlRouterProvider) {

        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            // create account state
            .state('app-signup', {
                url: "/signup",
                templateUrl: "templates/user/signup.html",
                controller: "SignUpController"
            })
            // login state that is needed to log the user in after logout
            // or if there is no user object available
            .state('app-login', {
                url: "/login",
                templateUrl: "templates/user/login.html",
                controller: "LoginController"
            })

            // setup an abstract state for the tabs directive, check for a user
            // object here is the resolve, if there is no user then redirect the
            // user back to login state on the changeStateError
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html",
                resolve: {
                    user: function (UserService) {
                        var value = UserService.init();
                        return value;
                    }
                }
            })

            // Each tab has its own nav history stack:
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.html',
                controller: 'CategoryCtrl'
            })

            .state('category-image-grid', {
                url: '/categories/:categoryId',
                templateUrl: 'templates/category-image-grid.html',
                controller: 'CategoryImageGridCtrl'
            })

            .state('comments', {
                url: '/categories/:categoryId/comments',
                templateUrl: 'templates/comments.html',
                controller: 'CommentsCtrl'
            })

            .state('account', {
                url: '/account/:accountId',
                templateUrl: 'templates/account.html',
                controller: 'AccountCtrl'
            })

            .state('image-crop', {
                url: '/image/crop',
                templateUrl: 'templates/image-crop.html',
                controller: 'ImageCropCtrl'
            })

            .state('image-edit', {
                url: '/image/edit',
                templateUrl: 'templates/image-edit.html',
                controller: 'ImageEditCtrl'
            })

            .state('settings', {
                url: '/settings',
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl'
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/categories');

    })
    .run(function ($ionicPlatform, $rootScope, $state) {


        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {

                debugger;

                console.log('$stateChangeError ' + error && (error.debug || error.message || error));

                // if the error is "noUser" the go to login state
                if (error && error.error === "noUser") {
                    event.preventDefault();

                    $state.go('app-login', {});
                }
            });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
