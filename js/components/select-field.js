/** @jsx React.DOM */

Components.register("Select", React.createClass({
    
    mixins: [ fieldBase ],

    getValue: function() {
      return this.state.value;
    },

    applyChange: function() {
      this.publishChanges( this.getValue() )
    },

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.applyChange );
    },

    getOptionTag: function( option ) {
      return <option value={ option.value }>{ option.text }</option>
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