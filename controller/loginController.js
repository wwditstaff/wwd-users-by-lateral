(function(angular) {
    angular
        .module("ublat")
        .controller('loginController',["appSettings","$http", "$location",
            function(appSettings, $http, $location) {
            var vm = this;
            vm.title = appSettings.title;

            vm.versionInfo = appSettings.version;
            vm.username = "";
            vm.password = "";
            vm.authtoken = "";

            vm.loginclick = function() {
                try2auth(vm.username, vm.password );
            }

            function try2auth(user, pass) {
                var url =
                    appSettings.apiUrlBase + '/wp-sp-authorize/'

                var formData = {
                    username: user,
                    userpass: pass,
                    app: 'users by lateral'
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
                    var newid = randomString(60);
                    var oneDayinMS = 1000 * 60 * 60 * 24;
                    //               1 sec  sec  min  hrs
                    var timeStamp = new Date(Date.now() + (oneDayinMS * 30) );
                    var obj = {
                        "token": newid,
                        "ts": timeStamp
                    }
                    localStorage.setItem("token", JSON.stringify(obj) );

                    $location.path('/');

                } else {
                    $location.path('/login');
                }
            }

                function randomString(len) {
                    len = len || 7;
                    var r1 = Math.random().toString(35);
                    var r2 = Math.random().toString(35);
                    return ( r1 + r2 ).substr(2, len);
                }
        }]);
}(window.angular));