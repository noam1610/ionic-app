'use strict';
var controllername = 'login';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [app.name + '.instagram', app.name + '.userData', '$state', '$ionicPopup', '$ionicPlatform', '$window', '$cordovaNetwork', '$ionicLoading'];

    function controller(instagram, userData, $state, $ionicPopup, $ionicPlatform, $window, $cordovaNetwork, $ionicLoading) {
        var vm = this;
        vm.controllername = fullname;
        vm.login = function() {
            // var Connection = $cordovaNetwork.getNetwork();
            if (window.Connection) {
                if (navigator.connection.type === window.Connection.NONE) {
                    $ionicPopup.confirm({
                            title: 'Internet Disconnected',
                            content: 'The internet is disconnected on your device.'
                        })
                        .then(function(result) {
                            if (!result) {
                                window.ionic.Platform.exitApp();
                            }
                        });
                } else {
                    instagram.getToken().then(function(token) {
                        alert('here');
                        userData.access_token = token;
                        $state.go('tab.current');
                        $ionicLoading.show({
                            template: 'loading'
                        });
                    });
                }
            } else {
                instagram.getToken().then(function(token) {

                    userData.access_token = token;
                    $state.go('tab.current');
                    $ionicLoading.show({
                        template: 'loading'
                    });
                });
            }

        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
