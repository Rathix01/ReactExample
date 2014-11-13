/** @jsx React.DOM */

var fieldBase = {

    // React events.

    getInitialState: function() {
      var defaultState = { valueStream: new Bacon.Bus(), error: "" };
      return defaultState;
    },

    componentDidMount: function() {
      GeneratedFormActions.registrationStream.push( ramda.mixin( { id: this.props.id }, this.state ) );
      if( this.props.state ) this.setState( this.props.state )
    },

    // state change processing.    

    processChange: function( value ) {
      if( this.validate ) this.setState( this.validate(), this.publishChanges );
      else this.publishChanges();
    },

    publishChanges: function() {
      this.state.valueStream.push( ramda.mixin( { id: this.props.id }, this.state ) );
    },

    // Render methods.

    getValidationState: function() {
      return this.state.error === ""
        ? "clean"
        : "error";
    },

    displayIsRequired: function() {
      return this.props.required === true ? "*" : "";
    },

    getAnimationCSS: function() {
      return { transform: "translate3d(" + this.state.xPosition + "px, 0px, 1px)" }
    },

    render: function() {
      return (
          <div className={ 'large-' + this.props.cellWidth + ' columns field-container ' + this.getValidationState() } style={ this.getAnimationCSS() }>
      	    <div class='field-header'>
      	    	<label>{ this.props.text } { this.displayIsRequired() }</label>
      	    </div>
            { this.createInput() }
            <div className='validation-message'>* { this.state.error }</div>
          </div>
      );
    }
}