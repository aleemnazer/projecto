angular.module('login')
    .component('login', {
        templateUrl: 'login/login.template.html',
        controller: function loginController($http, $scope, Auth, $state){
            $scope.login = function(){
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                url = "http://localhost:3000/login"
                $http({
                    url: url,
                    method: "POST",
                    data: 'email='+$scope.email+'&password='+$scope.password
                })
                .then(function(response) {
                    token = response.data.message;
                    Auth.setToken(token);
                    $state.go('users');
                }, function(error){
                    Auth.setToken('');
                    $scope.message = error.data.error;
                });
            }
        }
    });
