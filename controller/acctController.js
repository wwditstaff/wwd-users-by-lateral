(function (angular) {
    angular
        .module("ublat")
        .controller('acctController',
            [   "appSettings", "$http", "$routeParams", "authService",
                function (appSettings, $http, $routeParams, authService) {
                var vm = this;

                vm.versionInfo = appSettings.version;
                vm.accountid = $routeParams.id;

                vm.account = [];
                vm.contacts = [];

                vm.laterals = [];
                vm.meters = [];

                // region Get Account Data
                function getAccountData() {
                    var url = appSettings.apiUrlBase + '/wmis-account(' + vm.accountid + ')';
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
                                loadContacts(data.data.NAME_ID );
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }

                function formatData(inp) {
                    var x = vm.account;

                    x.push( {name: "Account", val: inp.NAME_ID});
                    x.push( {name: "Name", val: inp.FullName });
                    x.push( {name: "Address", val: inp.Address1 + ', ' + inp.Address2 + ', ' + inp.Address3  });
                    x.push( {name: "City, State Zip", val: inp.City + ', ' + inp.State + ' ' + inp.Zip });
                }

                function loadContacts( id ) {
                    var url = appSettings.apiUrlBase + '/wp-sp-api-acctcontacts';
                    var formData = {
                        account: id
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
                                var c = data.data.value;
                                var saveName = "";
                                for ( var i = 0; i < c.length; i++ ) {
                                    var x = new Object({
                                        name: c[i].fullname,
                                        displayName: c[i].fullname,
                                        val: c[i].method,
                                        type: c[i].type
                                    });
                                    if ( saveName == x.name ) {
                                        x.displayName = "";
                                    } else {
                                        saveName = x.name;
                                    }
                                    vm.contacts.push(x);
                                }
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }
                // endregion

                // region Get Lateral Data for Account
                function getLateralData() {
                    var url = appSettings.apiUrlBase + '/wp-sp-accountlats';
                    var formData = { account: vm.accountid };
                    var config = {headers: {'x-cdata-authtoken': appSettings.apiAuth}};

                    $http.post(url, formData, config)
                        .then(
                            // Success
                            function (data) {
                                vm.laterals = data.data.value;
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }
                // endregion

                // region Get Meters Data for Account
                function getMeterData() {
                    var url = appSettings.apiUrlBase + '/wp-sp-accountMeters';
                    var formData = { account: vm.accountid };
                    var config = {headers: {'x-cdata-authtoken': appSettings.apiAuth}};

                    $http.post(url, formData, config)
                        .then(
                            // Success
                            function (data) {
                                vm.meters = data.data.value;
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }
                // endregion

                function doWork() {
                    getAccountData();
                    getLateralData();
                    getMeterData();
                }

                authService.isAuthenticated(doWork);

            }]);
}(window.angular));