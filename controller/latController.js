(function (angular) {
    angular
        .module("ublat")
        .controller('latController',
            ["appSettings", "$http", function (appSettings, $http) {
            var vm = this;

            vm.versionInfo = appSettings.version;

            vm.laterals = [];
            vm.search = {};
            vm.saveSearch = saveSearch;
            vm.clearSearch = clearSearch;

            function loadSearch() {
                var storedval = "";
                storedval = localStorage.getItem("LatName");
                if ( storedval ) {
                    vm.search.LatName = storedval;
                } else {
                    clearSearch();
                }
            }

            function clearSearch() {
                vm.search.LatName = "";
                saveSearch();
            }

            function saveSearch() {
                console.log('saveSearch(', vm.search.LatName, ')');

                if ( ! vm.search ) {
                    localStorage.setItem("LatName", "" );
                } else {
                    localStorage.setItem("LatName", vm.search.LatName );
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

            initLateralList();
            loadSearch();
        }]);
}(window.angular));