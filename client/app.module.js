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
    templateUrl: 'home.template.html',
    resolve: { authenticate: authenticate }
  }
  var tab1State = {
    name: 'home.tab1',
    url: '/tab1',
    template: '<p> Comments... </p>',
  }
  var tab2State = {
    name: 'home.tab2',
    url: '/tab2',
    template: '<p> History... </p>',
  }

  var tab3State = {
    name: 'home.tab3',
    url: '/tab3',
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
  }

  var projectTab2State = {
    name: 'projects.tab2',
    url: '/history',
    template: '<p> Project History... </p>',
  }

  var projectTab3State = {
    name: 'projects.tab3',
    url: '/followers',
    template: '<p> Project Follower... </p>',
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
