angular.module('projects').controller('newProject', function($scope, $http, Auth, $state){
    $scope.create =  function(){
        $http({
            method: 'POST', 
            url: 'http://localhost:3000/projects',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer "+ Auth.getToken() },
            data: 'title='+$scope.title+'&description='+$scope.description
        }).then(function(success){
            $scope.project = success.data;
            $state.go('projects');
        }, function(error){
            $scope.message = error.data.error;
        });
    }
});
