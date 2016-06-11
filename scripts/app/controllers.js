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
