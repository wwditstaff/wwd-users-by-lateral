(function (angular) {
    var appSettings = {
        title   : "User's by Lateral",
        version : 1.0,
        author  : "Jim Carter",
        apiUrlBase : 'https://cdata.api.wwddata.com/api.rsc',
        apiAuth: "7v9E0i9g7Q2i2v7V5d3t",
        apiMap: "AIzaSyA8GYa_nDEZM7hWfZ46dlepNaT6wYdoDVM"
    };

    angular
        .module("ublat", ["ngRoute", "LocalForageModule", "angularUtils.directives.dirPagination"])
        .constant("appSettings", appSettings)
        .config(
            function ($locationProvider, $routeProvider) {
                $locationProvider.html5Mode(true);
                var prefix = "/";

                $routeProvider
                    .when(prefix + "login", {
                        templateUrl: "/partials/login.html",
                        controller: "loginController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "logout", {
                        templateUrl: "/partials/logout.html",
                        controller: "logoutController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "lat", {
                        templateUrl: "/partials/lat.html",
                        controller: "latController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "lat/:id", {
                        templateUrl: "/partials/latone.html",
                        controller: "latOneController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "meter/:id", {
                        templateUrl: "/partials/meter.html",
                        controller: "meterController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "account/:id", {
                        templateUrl: "/partials/acct.html",
                        controller: "acctController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "accounts", {
                        templateUrl: "/partials/accounts.html",
                        controller: "accountsController",
                        controllerAs: "vm"
                    })
                    .when(prefix + "meters", {
                        templateUrl: "/partials/meters.html",
                        controller: "metersController",
                        controllerAs: "vm"
                    })
                    .otherwise({
                        templateUrl: "/partials/home.html",
                        controller: "latHomeController",
                        controllerAs: "vm"
                    });
            });

    // TODO add service worker code here
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker
    //         .register('./service-worker.js')
    //         .then(function() { console.log('Service Worker Registered'); });
    // };

} (window.angular));
