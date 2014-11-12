var FormStateStore = ( function () {

	var initialState = { fields: {}, payload: {} }
	var setStream = new Bacon.Bus();


	var setData = function( state, payload ) {

		var id = payload.field.id;
		var currentField = state.fields[ id ];

		if( payload.actionType === 'form-field-register' && !ramda.is( Object, currentField ) ) {
			state.fields[ id ] = true;
		} else if ( payload.actionType === 'form-field-change' ) {
			state.fields[ id ] = payload.field;
		}

		state.payload = payload;
		return state;
	}

	var sendFieldState = function ( id, state ) {
		FormStore.updateStream.push( { 
          target: id, 
		  state: state, 
		  actionType: 'set-state' 
		} );
	}

	setStream.scan( initialState, setData ).onValue( function ( state ) {

		

		var allFields = state.fields;
		var data = state.payload.field


		if( state.payload.actionType === 'form-field-register' ) {

			//there is a bug causing the 'data' field to nest itself.
			if ( allFields[ data.id ].data && allFields[ data.id ].data.data ) allFields[ data.id ].data = allFields[ data.id ].data.data;
			sendFieldState( data.id, allFields[ data.id ] )
		}

		if( state.payload.actionType === 'form-field-change' ) {
			// todo, publish updates that are the result of business rules.
		}
	})

	var formAction = function(payload) {

	  if( payload.actionType === 'form-field-register' ) {
	  	setStream.push( payload )
	  }

	  if( payload.actionType === 'form-field-change' ) {
		setStream.push( payload )
	  }

	}

	var dispatchToken = formDispatcher.register( formAction );

	return {
		setStream: setStream,
		dispatchToken: dispatchToken
	}

} () )