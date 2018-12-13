angular.module('projecto').factory('Auth', function($cookieStore){
    var auth = {}
    var _token = ''
    auth.setToken = function(token){
        $cookieStore.put('token', token)
    }
    auth.getToken = function(){
        return $cookieStore.get('token');;
    }
    
    return auth;        
});