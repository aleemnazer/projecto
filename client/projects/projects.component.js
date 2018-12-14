angular.
    module('projects').
    component('projects', {
        templateUrl: 'projects/projects.template.html',
        controller: function projectsController($http, $scope, Auth, $state){
            $http({
                    method: 'GET',
                    url: 'http://localhost:3000/projects',
                    headers: { Authorization: 'Bearer '+ Auth.getToken() }
                }).
                then(function(projects){
                    $scope.projects = projects.data;
                }, function(err){
                    if (err.data == "Unauthorized")
                        $state.go('login')
                    else
                        $scope.error = err.data.error;
                });
        }
    });