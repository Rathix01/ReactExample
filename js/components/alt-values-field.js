/** @jsx React.DOM */

Components.register("AltValuesField", React.createClass({
    
    mixins: [ fieldBase ],

    isChecked: function( optionData ) {
      return optionData.value === this.state.checked
    },

    getValue: function( property ) {
      return { value: this.state.value, checked: this.state.checked }
    },

    validateField: function( state ) {
      return state;
    },

    getOptionWidth: function() {
      var width = ( Math.round( 100 / this.props.options.length ) - 1 );
      return { 'width': + width + "%" }; 
    },

    toggleOption: function( e ) {
      this.setState( { checked: e.target.dataset.value }, this.applyChange );
    },

    getPaymentType: function ( type ) {
      return type === "CreditCard"
        ? "Credit Card"
        : "Online Banking"
    },

    isVisible: function( option ) {
      return this.state.checked !== option
        ? { "display": "none" }
        : {}
    },
    
    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.processChange );
    },

    createOption: function ( optionData ) {
      return <div className='radio-option' onClick={ this.toggleOption } style={ this.getOptionWidth() } data-value={ optionData.value }>
                <input type='radio' data-value={ optionData.value } checked={  this.isChecked( optionData ) } />
                <label data-value={ optionData.value }>{ optionData.text }</label>
              </div>
    },

    createInput: function() {
      return <div className={ 'radio-options-field ' + this.state.checked }>
                {  this.props.options.map( this.createOption ) }
              <div>
                <div style={ this.isVisible( 'CreditCard' ) }>
                 <label>{ this.getPaymentType( this.state.checked ) }</label>
                 <input type='text' placeholder='Enter Credit Card Number' onChange={ this.handleChange } value={ this.state.value } />
                </div>
                <div style={ this.isVisible( 'OnlineBanking' ) }>
                <br />
                  <label>{ this.getPaymentType( this.state.checked ) }</label>
                  <input type='text' placeholder='Enter Online Banking Number' onChange={ this.handleChange } value={ this.state.value } />
                </div>
              </div>
             </div>
    }
  })

);