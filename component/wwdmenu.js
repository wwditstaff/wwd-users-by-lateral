(function (angular) {
    angular
        .module("ublat")
        // ns maps to navigationService
        .controller("menuController",
            ["appSettings", "authService", "$timeout",
                function (appSettings, authService, $timeout ) {
            var vm = this;
            vm.title = appSettings.title;

            vm.menu = [ ];
            vm.checkAuth = checkAuth;

            function loadMenu() {
                vm.menu = [];
                vm.menu.push({name: 'Laterals', path:"/lat", type:'menu'});
                vm.menu.push({name: 'Accounts', path:"/accounts", type:'menu'});
                vm.menu.push({name: '', path:"/", type:'auth'});
            }

            function checkAuth() {

                authService.isUserAuthenticated(
                    // Success - Authenticated
                    function () {
                        for(var i=0; i<vm.menu.length; i++ ) {
                            if ( vm.menu[i].type == 'auth' ) {
                                vm.menu[i].name = 'Logout';
                                vm.menu[i].path = '/logout';
                            }
                        }
                    },
                    // Failure - Not Authenticated.
                    function () {
                        for(var i=0; i<vm.menu.length; i++ ) {
                            if ( vm.menu[i].type == 'auth' ) {
                                vm.menu[i].name = 'Login';
                                vm.menu[i].path = '/login';
                            }
                        }
                    }
                );
            }

            var menuUpdate = function() {
                checkAuth();
                $timeout( menuUpdate, 2000 );
            }

            loadMenu();
            $timeout( menuUpdate, 2000 );
        }])
        .component("wwdmenu", {
            templateUrl: "component/wwdmenu.html",
            controller: "menuController",
            controllerAs: "vm"
        });
}(window.angular));
