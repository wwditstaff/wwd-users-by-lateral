(function (angular) {
    angular
        .module("ublat")
        // ns maps to navigationService
        .controller("menuController", ["appSettings", "authService", function (appSettings, authService) {
            var vm = this;
            vm.title = appSettings.title;

            vm.menu = [
                {name: 'Laterals', path: '/lat'},
                {name: 'Accounts', path: '/accounts'}
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
