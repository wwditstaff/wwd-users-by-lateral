(function (angular) {
    angular
        .module("ublat")
        //
        // accountsController: vm.accounts is an array of objects
        // in the form:  { id: (customer Number), name: (customer name)
        //
        .controller('accountsController',
            ["$scope", "appSettings", "$http", "$localForage", "$routeParams", "authService",
                function ($scope, appSettings, $http, $localForage, $routeParams, authService) {
                    var vm = this;

                    vm.versionInfo = appSettings.version;

                    vm.accounts = [];

                    // region Search Related Code
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
                    // endregion

                    // region Page Related Code
                    // Reference:
                    // https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination#working-with-asynchronous-data
                    vm.recordsPerPage = 10;
                    vm.pagination = {
                        current : 1
                    }

                    // Save current page into local db
                    vm.pageChanged = function(newPage) {
                        $localForage.setItem("CustomerPage", newPage);
                    };

                    function loadPageNumber() {
                        $localForage.getItem("CustomerPage", function(storedVal) {
                            if ( isNaN( storedVal) || ( storedVal == undefined ) ) {
                                storedVal = 1;
                            }
                            vm.pagination.current = storedVal;
                        },
                        function() {
                            vm.pagination.current = 1;
                        });
                    }

                    // endregion

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
                        loadPageNumber();
                        loadSearch();
                        initData();
                    }

                    $scope.$watch('vm.pagination.current', function() {
                        console.log('Current Page Changed:', vm.pagination.current );
                    });

                    authService.isAuthenticated(doWork);
                }]);
}(window.angular));