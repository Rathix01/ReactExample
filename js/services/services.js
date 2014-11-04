
app.service('coverOptions', [ '$timeout', function( $timeout ) { 
    
    var options = [
        { 
            name: "Option One",
            price: "$100",
            description: "Standard Option 1",
            benefits: [
                { name: "benefit 1" },
                { name: "benefit 2" },
                { name: "benefit 3" }
            ]
        },
        { 
            name: "Option Two",
            price: "$100",
            description: "Improved Option 2",
            benefits: [
                { name: "benefit 1" },
                { name: "benefit 2" },
                { name: "benefit 3" },
                { name: "benefit 4" }
            ]
        },
        { 
            name: "Option Three",
            price: "$100",
            description: "Complete Option 3",
            benefits: [
                { name: "benefit 1" },
                { name: "benefit 2" },
                { name: "benefit 3" },
                { name: "benefit 4" },
                { name: "benefit 5" }
            ]
        },
        { 
            name: "Option Four",
            price: "$100",
            description: "Total Option 4",
            benefits: [
                { name: "benefit 1" },
                { name: "benefit 2" },
                { name: "benefit 3" },
                { name: "benefit 4" },
                { name: "benefit 5" },
                { name: "benefit 6" },
                { name: "benefit 7" },
            ]
        },
    ]

    
    var optionStream = new Bacon.Bus();
    var optionSelect = new Bacon.Bus();

    var deselectOption = function( option ) {
        option.selected = false;
    }

    var deselectAll = function() {
        ramda.forEach( deselectOption, options );
    }
    
    var selectOption = function( option ) {
        deselectAll();
        option.selected = true;
    }

    //options will come from a server, this is a dummy for the request.
    $timeout( function () { optionStream.push( options ); }, 500 );

    // optionSelect expects and option which is passed to selectOption.    
    optionSelect.onValue(selectOption)

    // whenever optionSelect changes, resend options to listeners.
    optionStream.plug( optionSelect.map( options ) );

    return {
        
        options: optionStream,
        optionSelect: optionSelect

    }    
   
}]);

app.service('applicationData', [  function() { 




   
   
}]);


app.service('validation', [ function( ) { 

    var nonEmpty = function (x) { return x.length > 0 }

    var isDate = function( date ) { 
        if( moment( date.year + "-" + date.month + "-" + date.day, "YYYY-MM-DD" ).isValid() ) return date 
        else return new Bacon.Error("Date Not Valid");
    }

    var isNumber = function( val ) {
        return ramda.is( Number, parseInt(val) ) && nonEmpty( val ) ? val : new Bacon.Error( "Value must be a number" );
    }

    return {
        
        nonEmpty: nonEmpty,
        isDate: isDate,
        isNumber: isNumber

    }
   
}]);


app.service('ui', [ function( ) { 

    /* end validation service */

    var getValue = function ( element ) { return $( element.target ).val(); }

    var getElement = function( inputEvent ) { return $( inputEvent.target ); }

    var getId = function( element ) { return element.prop( "id" );  }

    //var doLocalValidation = function () {  /* ... here we will do validation by type ..*/ }

    var getInputStream = function( selector, event ) { return $( selector ).asEventStream( event ).map( getValue ) /* .map( doLocalValidation ) */ }

    var confirmFields = function( template ) {

        var isGood = true;
        for( var field in template ) {
            if( template.hasOwnProperty( field ) ) {
                if( template[field].hasOwnProperty("error") ) isGood = false;
            }
        }

        return isGood;
    }

    return {

        getId: getId,
        getValue: getValue,
        getElement: getElement,
        getInputStream: getInputStream,
        confirmFields: confirmFields

    }

   
   
}]);