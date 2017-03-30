(function (angular) {
    angular
        .module("ublat")
        .controller('latController',
            ["appSettings", "$http", "$localForage", "$location", "authService",
                function (appSettings, $http, $localForage, $location, authService) {
                    var vm = this;

                    console.log('latController Start.');

                    vm.versionInfo = appSettings.version;

                    vm.laterals = [];
                    vm.search = {};
                    vm.saveSearch = saveSearch;
                    vm.clearSearch = clearSearch;

                    // region Search
                    function loadSearch() {
                        var storedval = "";
                        $localForage.getItem("LatName")
                            .then(function (data) {
                                storedval = data;
                                if (storedval) {
                                    vm.search.LatName = storedval;
                                } else {
                                    clearSearch();
                                }
                            }, function () {
                                clearSearch();
                            });
                    }

                    function clearSearch() {
                        vm.search.LatName = "";
                        saveSearch();
                    }

                    function saveSearch() {
                        console.log('saveSearch(', vm.search.LatName, ')');

                        if (!vm.search) {
                            $localForage.setItem("LatName", "");
                        } else {
                            $localForage.setItem("LatName", vm.search.LatName);
                        }
                    }
                    // endregion Search

                    function initLateralList() {
                        var url =
                            appSettings.apiUrlBase + '/wp-lat/'

                        var config = {
                            headers: {
                                'x-cdata-authtoken': appSettings.apiAuth
                            }
                        };

                        $http.get(url, config)
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

                    function dowork() {
                        initLateralList();
                        loadSearch();
                    }

                    authService.isAuthenticated(dowork);
                }]);
}(window.angular));