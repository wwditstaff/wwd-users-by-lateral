(function (angular) {
    angular
        .module("ublat")
        .controller('loginController',
            ["appSettings", "$http", "$routeParams", function (appSettings, $http, $routeParams) {
                var vm = this;

                vm.versionInfo = appSettings.version;
                vm.accountid = $routeParams.id;

                vm.account = [];
                vm.contacts = [];

                function initData() {
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
                                for ( var i = 0; i < c.length; i++ ) {
                                    var x = {};
                                    vm.contacts.push( {
                                        name: c[i].fullname,
                                        val: c[i].method,
                                        type: c[i].type
                                    });
                                }
                            },
                            // Error
                            function (data) {
                                console.log(data);
                            }
                        );
                }

                initData();
            }]);
}(window.angular));