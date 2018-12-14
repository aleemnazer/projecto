angular.
    module('users').
    component('users', {
        templateUrl: 'users/users.template.html',
        controller: function usersController($http, $scope, Auth){
            $http({
                    method: 'GET',
                    url: 'http://localhost:3000/users',
                    headers: { Authorization: 'Bearer '+ Auth.getToken() }
                }).
                then(function(users){
                    $scope.users = users.data;
                }, function(err){
                    $scope.error = err.data.error;
                });
        }
    });