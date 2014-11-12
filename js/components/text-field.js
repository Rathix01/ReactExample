/** @jsx React.DOM */

Components.register("TextField", React.createClass({
    
    mixins: [ fieldBase ],

    getInitialState: function() {
      return { value: this.props.value }; 
    },

    validateField: function( state ) {
      return ( state.value === "" && this.props.required )
        ? new Bacon.Error( "A value is required" )
        : state;
    },

    getValue: function() {
      return { value: this.state.value };
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





