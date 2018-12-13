angular.module('login')
    .component('login', {
        templateUrl: 'login/login.template.html',
        controller: function loginController($http, $scope){
            $scope.login = function(){
                $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
                url = "http://localhost:3000/login"
                $http({
                    url: url,
                    method: "POST",
                    data: 'username='+$scope.username+'&password='+$scope.password
                })
                .then(function(response) {
                    console.log(response.data);
                    $scope.token = response.data.message;
                });
            }
        }
    })