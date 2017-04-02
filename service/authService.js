(function (angular) {
    angular
        .module("ublat")
        .service('authService',
            ["$location", function ($location) {
                var vm = this;
                vm.isAuthenticated = checkAuthAndRedirect;
                vm.isUserAuthenticated = isUserAuthenticated;

                function checkAuthAndRedirect(success) {
                    var value = localStorage.getItem("token");
                    var tsNow = Date.parse(new Date(Date.now()));
                    if (value) {
                        var obj = JSON.parse(value);
                        // we have a value, check time stamp
                        var tsparse = Date.parse(obj.ts);
                        if (tsNow < tsparse) {
                            if (obj.token > '')
                                console.log('user Authorized');
                            success();
                        } else {
                            $location.path('/login');
                        }
                    } else {
                        $location.path('/login');
                    }
                }

                function isUserAuthenticated(success, failure) {
                    var value = localStorage.getItem("token");
                    if (value) {
                        console.log('user Authorized (auth:39)');
                        success();
                    } else {
                        console.log('user !Authorized (auth:42)');
                        failure();
                    }
                }
            }]);
}(window.angular));