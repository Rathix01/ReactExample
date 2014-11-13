/** @jsx React.DOM */

Components.register( "SelectField", React.createClass({
    
    mixins: [ fieldBase ],

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.processChange );
    },

    validate: function( state ) {
      return state;
    },

    isOptionSelected: function ( option ) {
      return this.state.value === option.value
    },

    getOptionTag: function( option ) {
      return <option value={ option.value } selected={ this.isOptionSelected( option ) }>{ option.text }</option>
    },

    createInput: function() {
      return <div className='select-list-basic'>
                <select onChange={ this.handleChange }> 
                  <option value=''> Select an Option </option>
                  { this.props.options.map( this.getOptionTag ) } 
                </select>
             </div>
    }
  })
);