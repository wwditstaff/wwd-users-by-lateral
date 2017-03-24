(function(angular) {
    angular
        .module("ublat")
        .service('authService',["$localForage","$location",function($localForage, $location) {
            var vm = this;
            vm.isAuthenticated = checkAuthAndRedirect;
            vm.isUserAuthenticated = isUserAuthenticated;

            function checkAuthAndRedirect(success) {
                $localForage.getItem("token")
                    .then(
                        // Success
                        function(value) {
                            if ( value ) {
                                console.log('user Authorized', value );
                                success();
                            } else {
                                console.log('user Not Authorized, redirecting to /login');
                                $location.path('/login');
                            }
                        },
                        // Failure
                        function() {
                            $location.path('/login');
                        });
            }

            function isUserAuthenticated(success, failure) {
                $localForage.getItem("token")
                    .then(
                        // Success
                        function(value) {
                            if ( value ) {
                                console.log('user Authorized (auth:34)');
                                success();
                            } else {
                                console.log('user !Authorized (auth:37)');
                                failure();
                            }
                        },
                        // Failure
                        function() {
                            console.log('user !Authorized (auth:43)');
                            failure();
                        });
            }
        }]);
}(window.angular));