/** @jsx React.DOM */

Components.register("TextField", React.createClass({
    
    mixins: [ fieldBase ],

    getInitialState: function() {
      return { value: this.props.value }; 
    },

    validate: function() {
      return ( this.state.value === "" && this.props.required )
        ? { value: this.state.value, error: "A value is required" }
        : { value: this.state.value, error: "" };
    },

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.processChange )
    },

    createInput: function() {
      return <div className='standard-text'>
                 <input type='text' placeholder='Enter Text' onChange={ this.handleChange } value={ this.state.value } />
             </div>
    }
  })
);
