var FormStateStore = ( function () {

	var initialState = { fields: {}, payload: {} }
	var internalStateStream = new Bacon.Bus();

	// setData
	// keeps a state object that holds all the state for all
	// the form fields that have produced state.

	var setData = function( state, payload ) {
		state.fields[ payload.state.id ] = payload.state;
		state.payload = payload;
		return state;
	}

	// formAction
	// this is the function we will register with the dispacther.
	// we are interested in form-field-change events.

	var formAction = function(payload) {
	  if( payload.actionType === 'form-field-change' ) {
	  	internalStateStream.push( payload )
	  }
	}

	// for dispatcher waitFor calls.
	var dispatchToken = formDispatcher.register( formAction );

	// when state is pushed in, add it to the state object kept by the scan function.
	// this causes stateStream to be a Bacon.Property

	var stateStream = internalStateStream.scan( initialState, setData );

	return {
		stateStream: stateStream,
		dispatchToken: dispatchToken
	}

} () )