(function(angular) {
    angular
        .module("ublat")
        .controller('latHomeController',["appSettings",function(appSettings) {
            var vm = this;
            vm.title = appSettings.title;

            vm.versionInfo = appSettings.version;
        }]);
}(window.angular));