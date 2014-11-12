/** @jsx React.DOM */

Components.register( "NumberField", React.createClass({
    
    mixins: [ fieldBase ],

    getValue: function() {
      return { value: this.state.value };
    },

    getInitialState: function() {
      return { value: this.props.value }; 
    },

    validateField: function( state ) {
      var isNumber = ramda.is( Number, parseInt(state.value) );
      return ( this.props.required && !isNumber || // if this.props.required === true and state.value is not a number
               state.value !== ""  && !isNumber )  // or if state.value has a value and it is not a number.
        ? new Bacon.Error( "A valid number is required" )
        : state;
    }, 

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.publishValidChanges );
    },

    applyUpdatedState: function( update ) {

      if( !update.state.data ) return;

      this.setState( { 
        value:   update.state.data.value
      } )
    },

    createInput: function() {
      return <div className='standard-text'>
                 <input type='text' placeholder='Enter Text' onChange={ this.handleChange } value={ this.state.value } />
             </div>
    }
  })
);