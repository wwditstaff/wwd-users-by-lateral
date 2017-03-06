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
                    var url = appSettings.apiUrlBase + '/wp-v-wtr-asset(' + vm.meterid + ')';
                    var config = {
                        headers: {
                            'x-cdata-authtoken': appSettings.apiAuth
                        }
                    };

                    $http.get(url, config)
                        .then(
                            // Success
                            function (data) {
                                formatData(data.data);
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }

                function formatData(inp) {

                    vm.meter.push( {name: "Meter ID", val: inp.meter_id});
                    vm.meter.push( {name: "Geo", val: inp.Geo });
                    vm.meter.push( {name: "Area", val: inp.Area});
                    vm.meter.push( {name: "Lateral", val: inp.Lateral});
                    vm.meter.push( {name: "Status", val: inp.status});
                    vm.meter.push( {name: "Address", val: inp.address});
                    vm.meter.push( {name: "Serial No", val: inp.serial_no});
                    vm.meter.push( {name: "Mfg", val: inp.Manufacturer});
                    vm.meter.push( {name: "Longitude", val: inp.Longitude});
                    vm.meter.push( {name: "Latitude", val: inp.Latitude});
                    vm.meter.push( {name: "Special Access", val: inp.specialaccess});

                }

                initData();
            }]);
}(window.angular));