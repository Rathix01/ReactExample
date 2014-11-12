/** @jsx React.DOM */

var delay = function( fn, field ) {
    setTimeout( fn.bind( this, field ), 150 );
    return field;
}

var fieldBase = {
  	
  	displayIsRequired: function() {
  		return this.props.required === true ? "*" : "";
  	},

    getInitialState: function() {
      this.setUpStreams = ramda.compose( this.registerWithFormAction, this.listenForUpdates );
      this.validate = ramda.compose( this.setValidationState, this.validateField )
      this.publishValidChanges = ramda.compose( this.publishChanges, this.validate, this.getValue );
      return { valueStream: new Bacon.Bus() }; 
    },

    registerWithFormAction: function() {
      GeneratedFormActions.registrationStream.push( { id: this.props.id, valueStream: this.state.valueStream } );
    },

    listenForUpdates: function() {
      this.props.updateStream.onValue( this.applyUpdates )
    },

    componentDidMount: function() {
      this.setUpStreams();
    },

    getErrorState: function( newState ) {
      return ramda.is( String, newState.error )
        ? { validationState: 'error', message: newState.error }
        : { validationState: '', message: '' };
    },

    setValidationState: function( newState ) {
      this.setState( this.getErrorState( newState ) );
      return newState
    },

    applyUpdates: function( updates ) {
        if( !this.isMounted() ) return Bacon.noMore;
        if( updates.target === this.props.id && this.applyUpdatedState ) {
          this.applyUpdatedState( updates ); // this method is found on the mixed-in component.
          delay( this.publishChanges.bind( this, updates.state ) ); //update the page template.
        }
    },

    getAnimationCSS: function() {
      return { transform: "translate3d(" + this.state.xPosition + "px, 0px, 1px)" }
    },

    publishChanges: function( fieldState ) {
      this.state.valueStream.push( fieldState );
    },

    render: function() {
      return (
          <div className={ 'large-' + this.props.cellWidth + ' columns field-container ' + this.state.validationState } style={ this.getAnimationCSS() }>
      	    <div class='field-header'>
      	    	<label>{ this.props.text } { this.displayIsRequired() }</label>
      	    </div>
            { this.createInput() }
            <div className='validation-message'>* { this.state.message }</div>
          </div>
      );
    }
}