(function(angular) {
    angular
        .module("ublat")
        .controller('logoutController',["appSettings","$localForage","$location",
            function(appSettings, $localForage, $location) {
                var vm = this;
                vm.title = appSettings.title;
                vm.versionInfo = appSettings.version;

                vm.goHome = function() {
                    $location.path('/');
                }

                function wipeToken() {
                    $localForage.removeItem("token");
                }

                wipeToken();
            }]);
}(window.angular));