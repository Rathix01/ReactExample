app.service( 'userProvider', [ "$http", function( $http ) { 

    var getUsers = function( callback ) {

        var dummyRemoteResult = localStorage.getItem( "users" );
        if ( dummyRemoteResult === null ) callback( null );

        callback( JSON.parse( dummyRemoteResult ) );
    }

    var getUser = function ( userQuery, callback ) {

        var data = JSON.stringify( { "username": userQuery.email, "password": userQuery.password } );

        var userPromise = $.ajax( {
            
            type: 'POST',
            url: 'http://bluebin.sdk.co.nz/backend/api/login', 
            xhrFields: { withCredentials: true },
            data: data, 
            contentType: "application/json",
            dataType: 'json'

        } );

        // this is a nasty work around to compensate for
        // not having a body in the response from the server.
        userPromise.always( function() {
            callback( data );
        } )
    }

    var addUser = function( user, callback ) {

        var data = { "username": user.email, "password": user.password }

        $http( { 
                method: 'POST', 
                url: 'http://bluebin.sdk.co.nz/backend/api/register',
                data: data

            } ).then(function(response, status, headers, config) {

                callback( response.data )
            } )
    }

    return {
        getUser:  getUser,
        getUsers: getUsers,
        addUser: addUser
    }    
   
}] );