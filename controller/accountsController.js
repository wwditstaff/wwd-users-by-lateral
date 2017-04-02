(function (angular) {
    angular
        .module("ublat")
        //
        // accountsController: vm.accounts is an array of objects
        // in the form:  { id: (customer Number), name: (customer name)
        //
        .controller('accountsController',
            ["$scope", "appSettings", "$http", "$routeParams", "authService",
                function ($scope, appSettings, $http, $routeParams, authService) {
                    var vm = this;

                    vm.versionInfo = appSettings.version;

                    vm.accounts = [];

                    // region Search Related Code
                    vm.search = {};
                    vm.saveSearch = saveSearch;
                    vm.clearSearch = clearSearch;

                    function loadSearch() {
                        var storedValue = "";
                        storedValue = localStorage.getItem("Customer");
                        if (storedValue) {
                            vm.search = storedValue;
                        } else {
                            clearSearch();
                        }
                    }

                    function clearSearch() {
                        vm.search = "";
                        saveSearch();
                    }

                    function saveSearch() {
                        console.log('saveSearch(', vm.search, ')');
                        if (!vm.search) {
                            localStorage.setItem("Customer", "");
                        } else {
                            localStorage.setItem("Customer", vm.search);
                        }
                    }

                    // endregion

                    // region Page Related Code
                    // Reference:
                    // https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination#working-with-asynchronous-data
                    vm.recordsPerPage = 10;
                    vm.pagination = {
                        current: 1
                    }

                    // Save current page into local db
                    vm.pageChanged = function (newPage) {
                        localStorage.setItem("CustomerPage", newPage);
                    };

                    function loadPageNumber() {
                        var storedVal = localStorage.getItem("CustomerPage");
                        if (isNaN(storedVal) || ( storedVal == undefined )) {
                            console.log('loadPageNumber no page found');
                            storedVal = 1;
                        }
                        console.log('loadPageNumber ', storedVal);
                        vm.pagination.current = storedVal;
                    }

                    $scope.$watch(
                        function watchCurrent($scope) {
                            return ( vm.pagination.current);
                        },
                        function handleChange(newVal, oldVal) {
                            $scope.$applyAsync();
                            console.log('Current: old(' + oldVal + '), new(' + newVal + ')');
                        });

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
                                    loadPageNumber();
                                    vm.accounts = data.data.value;
                                },
                                // Error
                                function (data) {
                                    console.log(data);
                                }
                            );
                    }

                    function doWork() {
                        loadSearch();
                        initData();
                    }

                    authService.isAuthenticated(doWork);
                }]);
}(window.angular));