/** @jsx React.DOM */

var fieldBase = {
  	
  	isRequired: function() {
  		return this.props.required === true ? "*" : "";
  	},

    getInitialState: function() { 
      return { valueStream: new Bacon.Bus() }; 
    },

    setValue: function ( fields ) {
        if( fields.value ) {
          var fieldValue = fields.value();
          this.setState( { value: fieldValue[ this.props.id ], fieldValueId: this.props.id } );
        } 
    },

    componentWillMount: function() {
      FormValueStore.getValueStream.subscribe( this.setValue ) 
      GeneratedFormActions.addFieldStream.push( { id: this.props.id, valueStream: this.state.valueStream });
    },

    componentDidMount: function() {
      //TweenMax.fromTo( this, 0.8, { state: { xPosition:370 } }, { state: { xPosition: 0 },  ease: Bounce.easeOut } );
    },

    getAnimationCSS: function() {
      return { transform: "translate3d(" + this.state.xPosition + "px, 0px, 1px)" }
    },

    publishChanges: function( value ) {
      this.state.valueStream.push( value );
    },

    render: function() {
      return (

          <div className={ 'large-' + this.props.cellWidth + ' columns field-container' } style={ this.getAnimationCSS() }>
      	    <div class='field-header'>
      	    	<label>{ this.props.text } { this.isRequired() }</label>
      	    	<div></div>
      	    </div>
            { this.createInput() }
          </div>
      );
    }
}