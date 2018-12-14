angular.
    module('projects').
    component('projects', {
        templateUrl: 'projects/projects.template.html',
        controller: function projectsController($http, $scope, Auth){
            $http({
                    method: 'GET',
                    url: 'http://localhost:3000/projects',
                    headers: { Authorization: 'Bearer '+ Auth.getToken() }
                }).
                then(function(projects){
                    $scope.projects = projects.data;
                }, function(err){
                    $scope.error = err.data.error;
                });
        }
    });