(function (angular) {
    angular
        .module("ublat")
        .controller('latController',
            ["appSettings", "$http", "$localForage", "$location",
                function (appSettings, $http, $localForage, $location) {
                    var vm = this;

                    vm.versionInfo = appSettings.version;

                    vm.laterals = [];
                    vm.search = {};
                    vm.saveSearch = saveSearch;
                    vm.clearSearch = clearSearch;

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

                    function isAuthenticated(next) {
                        var token = "";
                        $localForage.getItem("token")
                            .then(function (data) {
                                token = data;
                                if (token) {
                                    next();
                                } else {
                                    $location.path('/login');
                                }
                            }, function () {
                                $location.path('/login');
                            });
                    }

                    isAuthenticated( dowork );

                    function dowork() {
                        initLateralList();
                        loadSearch();
                    }
                }]);
}(window.angular));