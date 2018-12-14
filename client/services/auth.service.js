angular.module('projecto').factory('Auth', function($cookieStore){
    var auth = {}
    auth.setToken = function(token){
        $cookieStore.put('token', token)
    }
    auth.getToken = function(){
        return $cookieStore.get('token');
    }
    auth.isLoggedIn = function(){
        token = $cookieStore.get('token');
        return (token != "undefined" && token != null)
    }
    return auth;        
});
