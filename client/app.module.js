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
    component: 'login'
  }

  var logoutState = {
    name: 'logout',
    url: '/logout',
    controller: 'logoutController',
    template: '<button ng-click = "logout()">Logout</button>'
  }

  var signUpState = {
    name: 'signup',
    url: '/sign-up',
    component: 'signUp'
  }

  var homeState = {
    name: 'home',
    url: '/',
    cache: false,
    template: '<h1> welcome user </h1>',
    resolve: { authenticate: authenticate }
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
  $stateProvider.state(usersState);
  $stateProvider.state(projectsState);
  $stateProvider.state(newprojectsState);
  $stateProvider.state(logoutState);
  // $locationProvider.html5Mode({enabled: true, requireBase: false});

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
});
