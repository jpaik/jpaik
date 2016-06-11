'use strict';
var app = angular.module('jpaik', ['angular-loading-bar','ngAnimate', 'ngRoute']);

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}]);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/index.html',
      controller: 'HomeCtrl'
    })
    .when('/portfolio',{
      templateUrl: 'views/portfolio.html',
      controller: 'PortfolioCtrl'
    })
    .when('/contact',{
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .when('/test',{
      templateUrl: 'views/test.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
  if(window.history && window.history.pushState){
    $locationProvider.html5Mode({
      enabled: true
    });
  }
});

app.controller('HomeCtrl', function ($scope, $http, $timeout, cfpLoadingBar) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };


  $scope.complete = function () {
    cfpLoadingBar.complete();
  };
  $scope.start();
  $timeout(function() {
    $scope.complete();
    $('body').removeClass();
  }, 1000);
});

app.controller('PortfolioCtrl', function($scope, $http, $timeout, cfpLoadingBar) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };
  $scope.start();
  $timeout(function() {
    $scope.complete();
    $('body').removeClass().addClass("gradone");
  }, 1000);
});

app.controller('ContactCtrl', function($scope, $http, $timeout, cfpLoadingBar) {
  $scope.start = function() {
    cfpLoadingBar.start();
  };

  $scope.complete = function () {
    cfpLoadingBar.complete();
  };
  $scope.start();
  $timeout(function() {
    $scope.complete();
  }, 1000);
});
