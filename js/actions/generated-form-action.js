//TODO - refactor as Actions.register( "GeneratedFormActions", React.createClass({ ... }) )

var formDispatcher = new Dispatcher();

var GeneratedFormActions = (function() {

	// Form fields use the registrationStream to register themselves.
	// Registered fields can broadcast state to the rest of the application
	// This is done on registration, on value/state changes, and together as
	// templates that represent pages.

	var registrationStream = new Bacon.Bus();

	// publishRegistrationEvent
	// publishes to the rest of the application the fact that this form field has been registered.

	var publishRegistrationEvent = function( field ) {
		formDispatcher.dispatch( { actionType: 'form-field-register', field: field } );
		return field;
	}

	// setUpValueStreamListener
	// Sets up the listener which will call the publishFieldChangeEvent function when any 
	// state is pushed through the field.valueStream.
	// the field.valueStream will recieve data when the registering component's state changes.

	var setUpValueStreamListener = function( field ) {
		field.valueStream.onValue( publishFieldChangeEvent.bind( this, field.id ) );
		return field;
	}

	// publishFieldChangeEvent
	// dispatches to the rest of the application the form-field-change event.
	// the state we dispatch is the state for the form component that pushed to the valuestream ( see above function ).

	var publishFieldChangeEvent = function( fieldId, value ) {
		formDispatcher.dispatch( { actionType: 'form-field-change', field: { id: fieldId, data: value } } );
	}

	// createTemplateField
	// Create a Bacon.Property object. http://baconjs.github.io/api.html#property
	// The property gives the valueStream a default value which is commicated instantly
	// upon subscription to the stream.

	// Here we create and object that looks like this: { FieldName: Bacon.Property  }
	// each baconProperty can broadcast the state that is posted to the valueStream.

	var createTemplateField = function( field ) {
	    var newField = {}
		newField[ field.id ] = field.valueStream.toProperty( null );
		return newField;
	}

	// addToTemplate
	// Combines existing and field objects.
	// Because this is called with the Bacon.scan funtion, the 'existing'
	// parameter is either {} or it is the object that was returned in the
	// previous call to this function.  

	var addToTemplate = function( existing, field ) {
		return ramda.mixin( existing, field );
	}

	// setUpPagePublishingListener
	// create the listener which will publish the values of all the registered fields
	// this will be pushed to the application as a page-change.

	var setUpPagePublishingListener = function( template ) {
		Bacon.combineTemplate( template ).onValue( publishPageChangeEvent );
	}

	// publishPageChangeEvent
	// dispatches to the rest of the application the page-change event.
	// the state we dispatch is the state for all the form components who have registered with
	// this action.

	var publishPageChangeEvent = function( template ) {
		formDispatcher.dispatch( { actionType: 'page-change', template: template } );
	}

	// publish to application that field has registered.
	registrationStream
	  .delay(5)
	  .onValue( publishRegistrationEvent )
	
	// set up listener that will publish when field state changes.
	registrationStream
		.onValue( setUpValueStreamListener )
	
	// set up template to be used in Bacon.combineTemplate.
	registrationStream
	   .map( createTemplateField )
	   .scan( {}, addToTemplate )
	   .debounce(50)
	   .onValue( setUpPagePublishingListener );

	return {
		registrationStream: registrationStream
	}

} ())