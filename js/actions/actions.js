//TODO - refactor as Actions.register( "GeneratedFormActions", React.createClass({ ... }) )

var dispatchToStream = new Dispatcher();

var GeneratedFormActions = (function() {

	var submitStream = new Bacon.Bus();
	var addFieldStream = new Bacon.Bus();

	var fieldValues;
	var fieldsTemplate = {};

	var isNullOrError = function( value ) { return value === null || value === "" }
	var filterNullValues = ramda.filter( isNullOrError )

	var hasOnlyValidValues = function( template ) {
		return filterNullValues( ramda.values(template) ).length === 0;
	}

	var checkForNullOrError = function( template ) {
		return { isValid: hasOnlyValidValues( template ), template: template }
	}

	var createNamedStream = function( field ) {
		var newProperty = {}
		newProperty[ field.id ] = field.valueStream.toProperty( null );
		return newProperty;
	}

	var fireFieldEvent = function( fieldId, value) {
		dispatchToStream.dispatch( { actionType: 'form-field-change', field: { id: fieldId, value: value } } );
	} 

	var setUpFieldEvents = function( field ) {
		field.valueStream.onValue( fireFieldEvent.bind( this, field.id ) )
	}

	var addNewField = function( existing, field ) {
		setUpFieldEvents( field )
		return ramda.mixin( existing, createNamedStream( field ) );
	}

	var setUpTemplate = function( template ) {

		fieldsTemplate = ramda.mixin( fieldsTemplate, template );

		Bacon.combineTemplate( fieldsTemplate ).flatMap( checkForNullOrError ).onValue(function( t ) {
			if( t.isValid ) {
				dispatchToStream.dispatch( { actionType: 'page-complete', template: t.template } );
			}
		})                    
	}

	addFieldStream.scan( {}, addNewField ).debounce(500).onValue( setUpTemplate )


	return {
		addFieldStream: addFieldStream,
		submitStream:   submitStream
	}

} ())


// todo, rewrite so that any number of buttons can be used.
var ButtonBarActions = ( function() {

	var leftButtonStream = new Bacon.Bus();
	var centralButtonStream = new Bacon.Bus();
	var rightButtonStream = new Bacon.Bus();

	var leftClick = function () {
		dispatchToStream.dispatch( { actionType: 'left-button-click' } );
	}

	var centralClick = function () {
		dispatchToStream.dispatch( { actionType: 'centre-button-click' } );
	}

	var rightClick = function () {
		dispatchToStream.dispatch( { actionType: 'right-button-click' } );
	}

	leftButtonStream.onValue( leftClick )
	centralButtonStream.onValue( centralClick )
	rightButtonStream.onValue( rightClick )

	return {
		left: leftButtonStream,
		centre: centralButtonStream,
		right: rightButtonStream
	}

} () )