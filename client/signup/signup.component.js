angular.
  module('signUp').
  component('signUp', {
    templateUrl: 'signup/signup.template.html',
    controller: function signupController($http, $scope) { 
      $scope.signup = function() {
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        url = "http://localhost:3000/signup"
        $http({
          url: url,
          method: "POST",
          data: 'name='+$scope.name+'&role='+$scope.role+'&username='+$scope.username+'&password='+$scope.password
        })
        .then(function(response) {
          $scope.message = response.data.message;
        });
      }
    }
  });
