(function (angular) {
    angular
        .module("ublat")
        .controller('meterController',
            ["appSettings", "$http", "$routeParams", "$window", function (appSettings, $http, $routeParams, $window) {
                var vm = this;

                vm.versionInfo = appSettings.version;
                vm.meterid = $routeParams.id;

                vm.lateralname = "Loading ...";

                vm.meter = [];

                function initData() {
                    var url = appSettings.apiUrlBase + '/wp-meterbylat/';
                    var formData = {
                        lateral: vm.latid
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
                                vm.meters = data.data.value;
                                if (( vm.meters ) && ( vm.meters.length > 0)) {
                                    vm.lateralname = vm.meters[0].lateral;
                                } else {
                                    vm.lateralname = "--";
                                }

                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }

                initData();
                loadSearch();
            }]);
}(window.angular));