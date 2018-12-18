angular.
    module('users').
    component('users', {
        templateUrl: 'users/users.template.html',
        controller: function usersController($http, $scope, Auth, $state){
            $scope.tab = 1
            $scope.isSet = function(tab){
                return $scope.tab == tab;
            }

            $scope.setTab = function(tab){
                $scope.tab = tab;
            }
            $http({
                    method: 'GET',
                    url: 'http://localhost:3000/api/users',
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