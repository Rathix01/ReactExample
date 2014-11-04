/** @jsx React.DOM */

Components.register("AltValuesField", React.createClass({
    
    mixins: [ fieldBase ],

    isChecked: function( optionData ) {
      console.log( this.state, optionData.value )
      return optionData.value === this.state.checked
    },

    getOptionWidth: function() {

      var width = ( Math.round( 100 / this.props.options.length ) - 1 );
      return { 'width': + width + "%" }; 
    },

    componentDidMount: function() {
      console.log(this.state.value)
      this.setState( { checked: this.state.value.split(":")[0], value: this.state.value.split(":")[1] } )
    },

    toggleOption: function( e ) {
      this.setState( { checked: e.target.dataset.value }, function () { this.state.valueStream.push( this.state.checked ) } )
    },

    createOption: function ( optionData ) {

      return <div className='radio-option' onClick={ this.toggleOption } style={ this.getOptionWidth() } data-value={ optionData.value }>
                <input type='radio' data-value={ optionData.value } checked={  this.isChecked( optionData ) } />
                <label data-value={ optionData.value }>{ optionData.text }</label>
              </div>
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

    applyChange: function() {
      this.publishChanges( this.state.option + ":" + this.state.value )
    },

    handleChange:function( e ) {
      this.setState( { value: e.target.value, option: this.state.option }, this.applyChange );
    },


    createInput: function() {
      return <div className={ 'radio-options-field ' + this.state.checked } value={ this.state.value }>
                {  this.props.options.map( this.createOption ) }
              <div>
                <div style={ this.isVisible( 'CreditCard' ) }>
                 <label>{ this.getPaymentType( this.state.checked ) }</label>
                 <input type='text' placeholder='Enter Credit Card Number' onChange={ this.handleChange } value={ this.state.value } />
                </div>
                <div style={ this.isVisible( 'OnlineBanking' ) }>
                  <label>{ this.getPaymentType( this.state.checked ) }</label>
                  <input type='text' placeholder='Enter Online Banking Number' onChange={ this.handleChange }  value={ this.state.value } />
                </div>
              </div>
             </div>
    }
  })

);