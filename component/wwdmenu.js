(function (angular) {
    angular
        .module("ublat")
        // ns maps to navigationService
        .controller("menuController", ["appSettings", "authService", function (appSettings, authService) {
            var vm = this;
            vm.title = appSettings.title;
            var prefix = "/wwd-ublat/";

            vm.menu = [
                {name: 'Laterals', path: prefix + "lat"},
                {name: 'Accounts', path: prefix + "accounts"}
            ];

            authService.isUserAuthenticated(
                // Success - Authenticated
                function () {
                    vm.menu.push({name: 'Logout', path: '/logout'});
                },
                // Failure - Not Authenticated.
                function () {

                }
            );
        }])
        .component("wwdmenu", {
            templateUrl: "component/wwdmenu.html",
            controller: "menuController",
            controllerAs: "vm"
        });
}(window.angular));
