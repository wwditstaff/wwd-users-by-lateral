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

                    function loadSearch() {
                        var storedValue = "";
                        $localForage.getItem("Customer")
                            .then(function (data) {
                                storedValue = data;
                                if (storedValue) {
                                    vm.search = storedValue;
                                } else {
                                    clearSearch();
                                }
                            }, function () {
                                clearSearch();
                            });
                    }

                    function clearSearch() {
                        vm.search = "";
                        saveSearch();
                    }

                    function saveSearch() {
                        console.log('saveSearch(', vm.search, ')');
                        if (!vm.search) {
                            $localForage.setItem("Customer", "");
                        } else {
                            $localForage.setItem("Customer", vm.search);
                        }
                    }

                    function initData() {
                        var url = appSettings.apiUrlBase + '/wmis-accountlist';
                        var config = {
                            headers: {
                                'x-cdata-authtoken': appSettings.apiAuth
                            }
                        };
                        console.log('Loading Data');

                        $http.get(url, config)
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

                    function doWork() {
                        initData();
                        loadSearch();
                    }

                    authService.isAuthenticated(doWork);
                }]);
}(window.angular));