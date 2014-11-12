var FormStore = ( function () {

	var updatePageNumber = function( existingPageNumber, direction ) {
		return direction === "forward"
			     ? ( existingPageNumber + 1 )
			     : ( existingPageNumber - 1 );
	}

	var forwardIsEnabled = function( pageData ) {
		return pageData.number < pages.length && pageData.number < pageData.max;
	}

	var backwardIsEnabled = function( pageData ) {
		return pageData.number > 0;
	}

	var updateButtons = function( pageData ) {
		buttonStream.push( { 
		  forwardIsEnabled: forwardIsEnabled( pageData ),
		  backwardIsEnabled: backwardIsEnabled( pageData )			
		} );
	}

	var getMaxNumber = function( exisiting, pageNumber ) {
		return ( exisiting.max >= pageNumber )
			? exisiting.max
			: pageNumber
	}

	getPageMaximum = function( existing, pageNumber ) {
		return { number: pageNumber, max: getMaxNumber( existing, pageNumber ) }
	}

	var updateFormPage = function( pageNumber ) {
		formStream.push( pages[ pageNumber ] );
	}

	var handleValidPages = function( validPage ) {
		if( validPage.isValid ) {
			console.log( 'page-complete', validPage.template )
			FormStore.buttonStream.push( { forwardIsEnabled: true } );
		}
	}

	var fieldIsEmpty = function ( template, key ) {
		var field = ramda.prop( key, template );
		return !ramda.is( Object, field ) || field.data === true; // need to also check for bacon errors.
	}

	var pageValidAndComplete = function( template ) {
	  return {
	    template: template,
		isValid: ( ramda.filter( fieldIsEmpty.bind( this, template ), ramda.keys( template ) ).length === 0 )
	  }
	}

	var pageAction = function(payload) { 
      if (payload.actionType === 'page-change') {
	    pageChangeStream.push( payload.template )
	  }
	}

	var buttonAction = function(payload) {
	  if( payload.actionType === 'left-button-click' ) {
	  	internalButtonStream.push('backward')
	  }
	  if( payload.actionType === 'right-button-click' ) {
	  	internalButtonStream.push('forward')
	  }
	}

	// dummyData in an array, a bunch of buses to other parts of the application.
	var pages = [ dummyData.page1, dummyData.page2, dummyData.page3, dummyData.page4 ];
	
	// push out.
	var formStream = new Bacon.Bus;
	var updateStream = new Bacon.Bus;
	var buttonStream = new Bacon.Bus;

	//internal
	var pageChangeStream = new Bacon.Bus;
	var internalButtonStream = new Bacon.Bus;

	// dispatcher tokens. These can be taken 
	var buttondispatchToken = formDispatcher.register( buttonAction );
	var pagedispatchToken =   formDispatcher.register( pageAction );

	// update the page number.
	var pageNumberStream = internalButtonStream.scan( 0, updatePageNumber )
	  
	// on page number update, update the page
	pageNumberStream.onValue( updateFormPage )
	
	// on page number update get the maximum number of complete pages.
	// use this data to set the button state correctly.
	pageNumberStream.scan( {}, getPageMaximum )
	  .onValue( updateButtons )

	// validate pages. If a page is valid
	// do stuff...
	// currently used to log complete+valid pages.
	pageChangeStream
	  .map( pageValidAndComplete )
	  .onValue( handleValidPages )

	return {
		formDataStream: formStream,
		buttonStream: buttonStream,
		updateStream: updateStream,
		buttondispatchToken: buttondispatchToken,
		buttondispatchToken: buttondispatchToken
	}

} () )