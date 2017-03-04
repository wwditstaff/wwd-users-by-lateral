(function (angular) {
    angular
        .module("ublat")
        .controller('latOneController',
            ["appSettings", "$http", "$routeParams", "$window", function (appSettings, $http, $routeParams, $window) {
                var vm = this;

                vm.versionInfo = appSettings.version;
                vm.latid = $routeParams.id;
                vm.lateralname = "Loading ...";

                vm.meters = [];
                vm.search = {};
                vm.saveSearch = saveSearch;
                vm.clearSearch = clearSearch;

                function loadSearch() {
                    var storedval = "";
                    storedval = localStorage.getItem("Meter");
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
                    console.log('saveSearch(', vm.search.Meter, ')');

                    if ( ! vm.search ) {
                        localStorage.setItem("Meter", "" );
                    } else {
                        localStorage.setItem("Meter", vm.search.Meter );
                    }
                }

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

                initData();
                loadSearch();
            }]);
}(window.angular));