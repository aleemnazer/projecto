angular.
  module('signUp').
  component('signUp', {
    templateUrl: 'signup/signup.template.html',
    controller: function signupController($http, $scope, $state) {
      $scope.signup = function() {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        url = "http://localhost:3000/api/signup"
        $http({
          url: url,
          method: "POST",
          data: 'name='+$scope.name+'&email='+$scope.email+'&password='+$scope.password
        })
        .then(function(response) {
          $scope.message = response.data.message;
          $state.go('login')
        }, function(error){
          $scope.message = error.data.error.message;
        });
      }
    }
  });
