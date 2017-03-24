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
                            vm.authtoken = data.data.value[0].result;
                            console.log("vm.authtoken:" , vm.authtoken);
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
                    var newid = uid(20);
                    $localForage.setItem("token", newid );
                } else {
                    $location.path('/login');
                }
            }

                function uid(len) {
                    len = len || 7;
                    return Math.random().toString(35).substr(2, len);
                }
        }]);
}(window.angular));