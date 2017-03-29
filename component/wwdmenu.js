(function (angular) {
    angular
        .module("ublat")
        // ns maps to navigationService
        .controller("menuController", ["appSettings", "authService", function (appSettings, authService) {
            var vm = this;
            vm.title = appSettings.title;
            var prefix = "/";
            vm.authenticated = false;

            vm.menu = [
                {name: 'Laterals', path: prefix + "lat"},
                {name: 'Accounts', path: prefix + "accounts"}
            ];

            authService.isUserAuthenticated(
                // Success - Authenticated
                function () {
                    vm.authenticated = true;
                },
                // Failure - Not Authenticated.
                function () {
                    vm.authenticated = false;
                }
            );
        }])
        .component("wwdmenu", {
            templateUrl: "component/wwdmenu.html",
            controller: "menuController",
            controllerAs: "vm"
        });
}(window.angular));
