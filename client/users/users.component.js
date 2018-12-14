angular.
    module('users').
    component('users', {
        templateUrl: 'users/users.template.html',
        controller: function usersController($http, $scope, Auth, $state){
            $http({
                    method: 'GET',
                    url: 'http://localhost:3000/users',
                    headers: { Authorization: 'Bearer '+ Auth.getToken() }
                }).
                then(function(users){
                    $scope.users = users.data;
                }, function(err){
                    if (err.data == "Unauthorized")
                        $state.go('login')
                    else
                        $scope.error = err.data.error;
                });
        }
    });