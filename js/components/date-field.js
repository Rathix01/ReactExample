/** @jsx React.DOM */

Components.register("DateField", React.createClass({
    
    mixins: [ fieldBase ],

    getValue: function( override ) {
      return ramda.is( Object, override )
        ? override 
        : { value: this.state.yearValue + "-" + this.state.monthValue + "-" + this.state.dayValue };
    },

    getInitialState: function() { 
      var intialStateObject = { 
          day:   new Bacon.Bus(), 
          month: new Bacon.Bus(), 
          year:  new Bacon.Bus(),  
      };
      
      //this stream will send a date formatted object to the validation step.
      Bacon.combineTemplate( intialStateObject ).map( this.formatDate ).map( this.addCompleteDate ).onValue( this.publishValidChanges );
      return intialStateObject
    },

    validateField: function( state ) {
      return ( moment( state.value, 'YYYY-MM-DD', true ).isValid() )
        ? state
        : new Bacon.Error( "Date is invalid" )
    },

    formatDate: function( template ) {
      template.day = template.day.length < 2 ? "0" + template.day : template.day;
      template.month = template.month.length < 2 ? "0" + template.month : template.month;
      return template;
    },

    pushToStreams: function() {
      if( this.state.dayValue )   this.state.day.push( this.state.dayValue )
      if( this.state.monthValue ) this.state.month.push( this.state.monthValue )
      if( this.state.yearValue )  this.state.year.push( this.state.yearValue )
    },

    setDay: function( e ) {
      this.setState( { dayValue: e.target.value }, this.pushToStreams );
    },

    setMonth: function( e ) {
      this.setState( { monthValue: e.target.value }, this.pushToStreams );
    },

    setYear: function( e ) {
      this.setState( { yearValue: e.target.value }, this.pushToStreams );
    },

    addCompleteDate: function( template ) {
      template.value = template.year + "-" + template.month + "-" + template.day;
      return template;
    },

    applyUpdatedState: function( update ) {

      if( !update.state.data ) return;

      this.setState( { 
        dayValue:   update.state.data.day,
        monthValue: update.state.data.month,
        yearValue:  update.state.data.year
      } )
    },

    createInput: function() {

      return <div className='date-of-birth'>
                <input type='text' placeholder='DD' onChange={ this.setDay } value={ this.state.dayValue } />
                <input type='text' placeholder='MM' onChange={ this.setMonth } value={ this.state.monthValue } />
                <input type='text' placeholder='YYYY' onChange={ this.setYear } value={ this.state.yearValue } />
              </div>
    }
  })
);