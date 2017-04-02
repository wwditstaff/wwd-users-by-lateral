(function (angular) {
    angular
        .module("ublat")
        .controller('latOneController',
            ["appSettings", "$http", "$routeParams", "$window", "authService",
                function (appSettings, $http, $routeParams, $window, authService) {
                    var vm = this;

                    vm.versionInfo = appSettings.version;
                    vm.latid = $routeParams.id;
                    vm.lateralname = "Loading ...";

                    vm.meters = [];
                    vm.search = {};
                    vm.saveSearch = saveSearch;
                    vm.clearSearch = clearSearch;

                    // region Search
                    function loadSearch() {
                        var storedval = "";
                        storedval = localStorage.getItem("Meter");
                        if (storedval) {
                            vm.search.searchfield = storedval;
                        } else {
                            clearSearch();
                        }
                    }

                    function clearSearch() {
                        vm.search.searchfield = "";
                        saveSearch();
                    }

                    function saveSearch() {
                        console.log('saveSearch(', vm.search.searchfield, ')');

                        if (!vm.search) {
                            localStorage.setItem("Meter", "");
                        } else {
                            var s = vm.search.searchfield;
                            localStorage.setItem("Meter", s);
                            vm.search.meter = s;
                            vm.search.geo = s;
                            vm.search.account = s;
                            vm.search.fullname = s;
                        }
                    }

                    // endregion Search

                    // region Request Data
                    function initData() {
                        var url = appSettings.apiUrlBase + '/wp-meterbylat/';
                        var formData = {
                            lateral: vm.latid
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
                                    vm.meters = data.data.value;
                                    if (( vm.meters ) && ( vm.meters.length > 0)) {
                                        vm.lateralname = vm.meters[0].lateral;
                                    } else {
                                        vm.lateralname = "--";
                                    }

                                },
                                // Error
                                function (data) {
                                    console.log(data);
                                }
                            );
                    }

                    // endregion Request Data

                    function doWork() {
                        initData();
                        loadSearch();
                    }

                    authService.isAuthenticated(doWork);
                }]);
}(window.angular));