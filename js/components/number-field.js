/** @jsx React.DOM */

Components.register( "NumberField", React.createClass({
    
    mixins: [ fieldBase ],

    getInitialState: function() {
      return { value: this.props.value }; 
    },

    validate: function( state ) {
      var isNumber = !isNaN( parseInt(this.state.value) )
      return ( this.props.required && !isNumber ||      // if this.props.required === true and state.value is not a number
               this.state.value !== ""  && !isNumber )  // or if state.value has a value and it is not a number.
        ? { value: this.state.value, error: "A valid number is required" }
        : { value: this.state.value, error: "" };
    }, 

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.processChange );
    },

    createInput: function() {
      return <div className='standard-text'>
                 <input type='text' placeholder='Enter Text' onChange={ this.handleChange } value={ this.state.value } />
             </div>
    }
  })
);