(function (angular) {
    angular
        .module("ublat")
        .controller('meterController',
            [   "appSettings", "$http", "$routeParams", "$window", "authService",
                function (appSettings, $http, $routeParams, $window, authService) {
                var vm = this;

                vm.versionInfo = appSettings.version;
                vm.meterid = $routeParams.id;

                vm.lateralname = "Loading ...";

                vm.meter = [{name: "Meter ID", val: "Loading .... "} ];
                vm.accounts = [{account: "Loading...", name:""}];
                vm.gps = "";

                // region Request Data
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
                // endregion Request Data

                // region Prepare Data
                function formatData(inp) {
                    vm.meter = [];
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
                    //
                    // https://moz.com/ugc/everything-you-never-wanted-to-know-about-google-maps-parameters
                    //
                    vm.gps = 'https://www.google.com/maps?' +
                        'q=' + inp.Latitude +',' + inp.Longitude +
                        '&z=22&t=h';
                    loadAccounts();
                }

                function loadAccounts() {
                    var url = appSettings.apiUrlBase + '/wp-sp-meterAccounts/';
                    var formData = {
                        meterid: vm.meterid
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
                                vm.accounts = data.data.value;
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }
                // endregion Prepare Data

                function doWork() {
                    initData();
                }

                authService.isAuthenticated(doWork);
            }]);
}(window.angular));