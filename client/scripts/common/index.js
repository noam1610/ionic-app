'use strict';
require('angular-ui-router');
require('angular-sanitize');
require('angular-animate');
require('ionic');
require('ionic-angular');
require('ng-cordova');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic', 'ngCordova']);
    // inject:folders start
    require('./controllers')(app);
    require('./directives')(app);
    require('./services')(app);
    require('./values')(app);
    // inject:folders end

    app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider',
        function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
            // $ionicConfigProvider.views.transition('ios');

            $ionicConfigProvider.tabs.position('bottom');
            $stateProvider
                .state('tab', {
                    url: '/tab',
                    abstract: true,
                    template: require('./views/tabs.html')
                })
                .state('tab.games', {
                    url: '/games',
                    views: {
                        'tab-games': {
                            template: require('./views/games.html'),
                            controller: fullname + '.games as vm'
                        }
                    }
                })
                .state('tab.game', {
                    url: '/game/:id',
                    views: {
                        'tab-games': {
                            template: require('./views/descriptif.html'),
                            controller: fullname + '.game as vm'
                        }
                    }
                })
                .state('tab.pictures', {
                    url: '/pictures',
                    views: {
                        'tab-pictures': {
                            template: require('./views/Pictures.html'),
                            controller: fullname + '.pictures as vm'
                        }
                    }
                })
                .state('tab.current', {
                    url: '/current',
                    views: {
                        'tab-current': {
                            template: require('./views/current.html'),
                            controller: fullname + '.current as vm'
                        }
                    }
                })
                .state('tab.slideBoxSuccess', {
                    url: '/slideBoxSuccess/:id',
                    views: {
                        'tab-current': {
                            template: require('./views/slideBoxSuccess.html'),
                            controller: fullname + '.slideBox as vm'
                        }
                    }
                })
                .state('tab.slideBoxResult', {
                    url: '/slideBoxResult/:id',
                    views: {
                        'tab-current': {
                            template: require('./views/slideBoxResult.html'),
                            controller: fullname + '.slideBox as vm'
                        }
                    }
                })
                // .state('tab.result', {
                //     url: '/result/:id',
                //     views: {
                //         'tab-current': {
                //             template: require('./views/result.html'),
                //             controller: fullname + '.result as vm'
                //         }
                //     }
                // })
                // .state('tab.success', {
                //     url: '/success/:id',
                //     views: {
                //         'tab-current': {
                //             template: require('./views/success.html'),
                //             controller: fullname + '.result as vm'
                //         }
                //     }
                // })
                .state('tab.instagram', {
                    url: '/instagram',
                    views: {
                        'tab-instagram': {
                            template: require('./views/instagram.html'),
                            controller: fullname + '.instagram as vm'

                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    template: require('./views/login.html'),
                    controller: fullname + '.login as vm'
                });
            $urlRouterProvider.otherwise('login');
        }
    ]);

    var configIonicDeps = ['$ionicConfigProvider'];
    var configIonic = function($ionicConfigProvider) {
        if (window.ionic.Platform.isAndroid()) {
            $ionicConfigProvider.scrolling.jsScrolling(false);
        }
    };
    configIonic.$inject = configIonicDeps;
    app.config(configIonic);

    return app;
};
