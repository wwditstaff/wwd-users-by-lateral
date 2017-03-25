(function (angular) {
    angular
        .module("ublat")
        //
        // accountsController: vm.accounts is an array of objects
        // in the form:  { id: (customer Number), name: (customer name)
        //
        .controller('accountsController',
            ["appSettings", "$http", "$localForage", "$routeParams", "authService",
                function (appSettings, $http, $localForage, $routeParams, authService) {
                    var vm = this;

                    vm.versionInfo = appSettings.version;

                    vm.accounts = [];
                    vm.search = {};
                    vm.saveSearch = saveSearch;
                    vm.clearSearch = clearSearch;
                    vm.page = 1;
                    vm.pageSize = 10;
                    vm.pageStart = function() {
                        return ((( vm.page - 1 ) * pageSize) + 1 );
                    };

                    function loadSearch() {
                        var storedval = "";
                        $localForage.getItem("Customer")
                            .then(function (data) {
                                "use strict";
                                storedval = data;
                                if (storedval) {
                                    vm.search.Customer = storedval;
                                } else {
                                    clearSearch();
                                }
                            }, function () {
                                clearSearch();
                            });
                    }

                    function clearSearch() {
                        vm.search.Customer = "";
                        saveSearch();
                    }

                    function saveSearch() {
                        console.log('saveSearch(', vm.search.Customer, ')');
                        if (!vm.search) {
                            $localForage.setItem("Customer", "");
                        } else {
                            $localForage.setItem("Customer", vm.search.Customer);
                        }
                    }

                    function initData() {
                        var url = appSettings.apiUrlBase + '/wmis-accountlist';
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
                        var accts = inp.value;
                        for (var i = 0; i < accts.length; i++) {
                            var account = {
                                id: accts[i].id,
                                name: accts[i].FullName
                            }
                            vm.accounts.push(account);
                        }
                    }

                    function doWork() {
                        clearSearch();
                        initData();
                    }

                    authService.isAuthenticated(doWork);
                }]);
}(window.angular));