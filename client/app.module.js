'use strict';
angular.module('projecto', [
  'ui.router',
  'signUp',
  'login'
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
    template: '<h1> welcome user </h1>'
  }

  $stateProvider.state(loginState);
  $stateProvider.state(signUpState);
  $stateProvider.state(homeState);
  $locationProvider.html5Mode({enabled: true, requireBase: false});
});