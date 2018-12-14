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

  $stateProvider.state(loginState);
  $stateProvider.state(signUpState);
  $stateProvider.state(homeState);
  $stateProvider.state(usersState);
  $stateProvider.state(projectsState);
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
