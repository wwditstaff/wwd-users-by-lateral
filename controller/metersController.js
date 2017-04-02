(function (angular) {
    angular
        .module("ublat")
        .controller('metersController',
            ["appSettings", "$http", "$routeParams", "$window", "authService",
                function (appSettings, $http, $routeParams, $window, authService) {
                    var vm = this;

                    vm.versionInfo = appSettings.version;
                    vm.meters = [];

                    vm.search = {Value: ""};
                    vm.saveSearch = saveSearch;
                    vm.clearSearch = clearSearch;

                    // region Search
                    function loadSearch() {
                        var storedVal = "";
                        storedVal = localStorage.getItem("Meters");
                        if (storedVal) {
                            vm.search.Value = storedVal;
                        } else {
                            clearSearch();
                        }
                    }

                    function clearSearch() {
                        vm.search.Value = "";
                        saveSearch();
                    }

                    function saveSearch() {
                        console.log('saveSearch(', vm.search.Value, ')');

                        if (vm.search.Value == "") {
                            localStorage.setItem("Meters", "");
                        } else {
                            var s = vm.search.Value;
                            localStorage.setItem("Meters", s);
                            vm.search.Value = s;
                        }
                    }

                    // endregion Search

                    // region Request Data
                    function initData() {
                        var url = appSettings.apiUrlBase + '/wp-sp-meters';
                        var formData = {};
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

                    // endregion Request Data

                    function doWork() {
                        vm.search.Value = "";
                        loadSearch();
                        initData();
                    }

                    authService.isAuthenticated(doWork);
                }]);
}(window.angular));