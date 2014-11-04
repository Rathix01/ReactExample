/** @jsx React.DOM */

Components.register("RadioOptionField", React.createClass({
    
    mixins: [ fieldBase ],

    isChecked: function( optionData ) {
      return optionData.value === this.state.checked
    },

    getOptionWidth: function() {

      var width = ( Math.round( 100 / this.props.options.length ) - 1 );
      return { 'width': + width + "%" }; 
    },

    componentDidMount: function() {
      this.setState( { checked: this.state.value } )
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


    createInput: function() {
      return <div className='radio-options-field' value={ this.state.value }>
              {  this.props.options.map( this.createOption ) }   
             </div>
    }
  })

);


/** @jsx React.DOM */

Components.register("HeroOptionField", React.createClass({
    
    mixins: [ fieldBase ],

    isChecked: function( optionData ) {
      return optionData.value === this.state.checked
    },

    isOpen: function( optionsData ) {
      //console.log( this.state, optionData );
      return false// optionData.value === "CreditCard";
    },

    getClass: function ( optionData ) {
      return optionData.value === this.state.checked
          ? "option-selected"
          : "";
    },

    getOptionWidth: function() {

      var width = ( Math.round( 100 / this.props.options.length ) - 1 );
      return { 'width': + width + "%" }; 
    },

    componentDidMount: function() {
      this.setState( { checked: this.state.value } )
    },

    toggleOption: function( e ) {
      this.setState( { checked: e.target.dataset.value }, function () { this.state.valueStream.push( this.state.checked ) } )
    },

    createOption: function ( optionData ) {

      return <div className={ 'radio-option mega-option large-3 small-12 ' + this.getClass( optionData ) }>
                <input type='radio' data-value={ optionData.value } checked={ this.isOpen( optionData ) } />
                <label data-value={ optionData.value }>{ optionData.text }</label>
                <div className='all-details'>
                  <div className='option-details'>Option Details</div>
                  <div className='option-details'>Option Details</div>
                  <div className='option-details'>Option Details</div>
                </div>
                <button onClick={ this.toggleOption } data-value={ optionData.value } className='button radius select-button'> Select </button>
              </div>
    },

    createInput: function() {
      return <div className='radio-options-field' value={ this.state.value }>
              {  this.props.options.map( this.createOption ) }
              <br className='clear' />
             </div>
    }
  })

);