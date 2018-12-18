'use strict';
angular.module('projecto', [
  'ui.router',
  'signUp',
  'login',
  'projects',
  'users',
  'ngCookies',
])
.config(function($locationProvider, $stateProvider) {
  var loginState = {
    name: 'login',
    url: '/login',
    component: 'login',
    resolve: {
      authenticate: skipIfAuthenticated
    }
  }

  var logoutState = {
    name: 'logout',
    url: '/logout',
    controller: 'logoutController',
    resolve: { authenticate: authenticate },
    template: '<button ng-click = "logout()">Logout</button>'
  }

  var signUpState = {
    name: 'signup',
    url: '/sign-up',
    component: 'signUp',
    resolve: {
      authenticate: skipIfAuthenticated
    }
  }

  var homeState = {
    name: 'home',
    url: '/',
    cache: false,
    templateUrl: 'home.template.html',
    resolve: { authenticate: authenticate }
  }
  var tab1State = {
    name: 'home.tab1',
    url: 'home/tab1',
    resolve: { authenticate: authenticate },
    template: '<p> Comments... </p>',
  }
  var tab2State = {
    name: 'home.tab2',
    url: 'home/tab2',
    resolve: { authenticate: authenticate },
    template: '<p> History... </p>',
  }

  var tab3State = {
    name: 'home.tab3',
    url: 'home/tab3',
    resolve: { authenticate: authenticate },
    template: '<p> Followers... </p>'
  }

  var usersState = {
    name: 'users',
    url: '/users',
    component: 'users',
    resolve: { authenticate: authenticate }
  }

  var projectsState = {
    name: 'projects',
    url: '/projects',
    component: 'projects',
    resolve: { authenticate: authenticate }
  }

  var projectTab1State = {
    name: 'projects.tab1',
    url: '/comments',
    template: '<p> Project Comments... </p>',
    resolve: { authenticate: authenticate },
  }

  var projectTab2State = {
    name: 'projects.tab2',
    url: '/history',
    template: '<p> Project History... </p>',
    resolve: { authenticate: authenticate },
  }

  var projectTab3State = {
    name: 'projects.tab3',
    url: '/followers',
    template: '<p> Project Follower... </p>',
    resolve: { authenticate: authenticate },
  }

  var newprojectsState = {
    name: 'newproject',
    url: '/newproject',
    controller: 'newProject',
    templateUrl: './projects/newproject.template.html',
    resolve: { authenticate: authenticate }
  }

  $stateProvider.state(loginState);
  $stateProvider.state(signUpState);
  $stateProvider.state(homeState);
  $stateProvider.state(tab1State);
  $stateProvider.state(tab2State);
  $stateProvider.state(tab3State);
  $stateProvider.state(usersState);
  $stateProvider.state(projectsState);
  $stateProvider.state(projectTab1State);
  $stateProvider.state(projectTab2State);
  $stateProvider.state(projectTab3State);
  $stateProvider.state(newprojectsState);
  $stateProvider.state(logoutState);
  $locationProvider.html5Mode({enabled: true, requireBase: false});

  function skipIfAuthenticated($q, Auth) {
    if (Auth.isLoggedIn()) {
      return $q.reject()
    } else {
      $q.resolve()
    }
    return $q.promise;
  }
  function authenticate($q, Auth, $state, $timeout) {
    if (Auth.isLoggedIn()) {
      return $q.when()
    } else {
      $timeout(function() {
        $state.go('login')
      });
      return $q.reject()
    }
  }
}).controller('homeController',function($scope,$state,Auth){
   $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
    };
}); ;
