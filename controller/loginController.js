(function(angular) {
    angular
        .module("ublat")
        .controller('loginController',["appSettings","$localForage","$http", "$location",
            function(appSettings, $localForage, $http, $location) {
            var vm = this;
            vm.title = appSettings.title;

            vm.versionInfo = appSettings.version;
            vm.username = "";
            vm.password = "";
            vm.authtoken = "";

            vm.loginclick = function() {
                console.log('username = ', vm.username );
                console.log('password = ', vm.password );
                try2auth(vm.username, vm.password );

            }

            function try2auth(user, pass) {
                var url =
                    appSettings.apiUrlBase + '/wp-sp-authorize/'

                var formData = {
                    username: user,
                    userpass: pass
                };

                var config = {
                    headers: {
                        'x-cdata-authtoken': appSettings.apiAuth
                    }
                };

                $http.post(url, formData, config)
                    .then(
                        // Success
                        function (data) {
                            vm.authtoken = data.data.value;
                            process_result();
                        },
                        // Error
                        function (data) {
                            console.log(data);
                        }
                    );
            }

            function process_result() {
                if ( vm.authtoken == "authorized") {
                    $localForage.setItem("token", 'OK Authorized...' );
                } else {
                    $location.path('/login');
                }
            }
        }]);
}(window.angular));