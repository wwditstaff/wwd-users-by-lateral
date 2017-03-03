(function(angular) {
    angular
        .module("ublat")
        // ns maps to navigationService
        .controller("menuController",["appSettings", function(appSettings) {
            var vm = this;

            vm.title = appSettings.title;
            vm.menu = [
                {name: 'Home', path: '/'},
                {name: 'Laterals', path: '/lat'}
            ];
        }])
        .component("menu", {
            templateUrl  : "component/menu.html",
            controller   : "menuController",
            controllerAs : "vm"
        });
} (window.angular));
