(function (angular) {
    var appSettings = {
        title   : "Meters and Accounts by Lateral",
        version : 1.0,
        author  : "Jim Carter",
        apiUrlBase : 'https://cdata.api.wwddata.com/api.rsc',
        apiAuth: "7v9E0i9g7Q2i2v7V5d3t",
    };

    angular
        .module("ublat", ["ngRoute", "LocalForageModule"])
        .constant("appSettings", appSettings)
        .config(
            function ($locationProvider, $routeProvider) {
                $locationProvider.html5Mode(true);

                $routeProvider
                    .when("/login", {
                        templateUrl: "/partials/login.html",
                        controller: "loginController",
                        controllerAs: "vm"
                    })
                    .when("/lat", {
                        templateUrl: "/partials/lat.html",
                        controller: "latController",
                        controllerAs: "vm"
                    })
                    .when("/lat/:id", {
                        templateUrl: "/partials/latone.html",
                        controller: "latOneController",
                        controllerAs: "vm"
                    })
                    .when("/meter/:id", {
                        templateUrl: "/partials/meter.html",
                        controller: "meterController",
                        controllerAs: "vm"
                    })
                    .when("/account/:id", {
                        templateUrl: "/partials/acct.html",
                        controller: "acctController",
                        controllerAs: "vm"
                    })
                    .otherwise({
                        templateUrl: "/partials/home.html",
                        controller: "latHomeController",
                        controllerAs: "vm"
                    });
            });

    // TODO add service worker code here
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function() { console.log('Service Worker Registered'); });
    };

} (window.angular));
