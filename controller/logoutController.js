(function(angular) {
    angular
        .module("ublat")
        .controller('logoutController',["appSettings","$location",
            function(appSettings, $location) {
                var vm = this;
                vm.title = appSettings.title;
                vm.versionInfo = appSettings.version;

                vm.goHome = function() {
                    $location.path('/');
                }

                function wipeToken() {
                    localStorage.removeItem("token");
                }

                wipeToken();
            }]);
}(window.angular));