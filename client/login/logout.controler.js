angular.module('login').controller('logoutController', function($scope, $http, Auth, $state){
    $scope.logout = function(){
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        url = "http://localhost:3000/logout"
        $http({
            url: url,
            method: "POST",
            headers: { "Authorization": "Bearer "+ Auth.getToken()}
        })
        .then(function(response) {
            Auth.setToken(null);
            $state.go('login');
        }, function(error){
            $scope.message = error.data.error;
        });
    }
})