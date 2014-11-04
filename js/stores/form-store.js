var FormStore = ( function () {

	var formStepIndex = 0;
	var pages = [ dummyData.page1, dummyData.page2, dummyData.page3, dummyData.page4 ];
	var formStream = new Bacon.Bus;
	var buttonStream = new Bacon.Bus
	var completedPage = null;
	var maxIndex = 0;

	var updateButtons = function() {
		FormStore.buttonStream.push( { forwardIsEnabled: formStepIndex < maxIndex } )
	}

	var nonNegativeIndex= function( index ) {
		var i = index < 0 ? 0 : index;
		return i;
	}

	var stepBack = function() {

		if( ramda.is( Array, pages[ formStepIndex - 1 ] ) ) {
			formStepIndex -= 1;
			return pages[ nonNegativeIndex( formStepIndex ) ];
		} else {
			formStepIndex -= 1;	
			return stepBack()
		}
	}

	var getUpdateData = function ( direction ) {
		return direction === "forward"
			     ? pages[ formStepIndex ]
			     : stepBack( [] )
	}

	var updateForm = function( direction ) {
		FormStore.formDataStream.push( getUpdateData( direction ) );
	}


	var forwardStep = function() {
		if( (pages.length - 1) > formStepIndex ) {
			formStepIndex += 1;
			maxIndex = maxIndex > formStepIndex ? maxIndex : formStepIndex;
			updateButtons();
			updateForm('forward');			
		}
	}

	var backwardStep = function() {
		if( formStepIndex > 0 ) {
			updateButtons();
			updateForm('backward');	
		}
	}

	var formAction = function(payload) {

	  if (payload.actionType === 'page-complete') {

	    completedPage = payload
	    FormStore.buttonStream.push( { forwardIsEnabled: true });
	    FormValueStore.setValueStream.push( payload.template )
	  }

	  if( payload.actionType === 'left-button-click' ) {
	  	backwardStep();
	  	var forwardEnabled = formStepIndex < maxIndex;
	  	FormStore.buttonStream.push( { backwardIsEnabled: formStepIndex !== 0, forwardIsEnabled: forwardEnabled, } );
	  }

	  if( payload.actionType === 'right-button-click' ) {
		forwardStep();

		var forwardEnabled = formStepIndex < maxIndex;
		FormStore.buttonStream.push( { forwardIsEnabled: forwardEnabled,  backwardIsEnabled: true });
	  }

	//   if( payload.actionType === 'form-field-change' ) {
			// check for field type.
	//   }
	 }

	dispatchToStream.register( formAction );

	return {
		formDataStream: formStream,
		buttonStream: buttonStream
	}

} () )


var FormValueStore = ( function () {

	var setValueStream = new Bacon.Bus();
	var getValueStream = setValueStream.toProperty();

	return {
		setValueStream: setValueStream,
		getValueStream: getValueStream
	}

} () )