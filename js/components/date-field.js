/** @jsx React.DOM */

Components.register("DateField", React.createClass({
    
    mixins: [ fieldBase ],

    setInternalEvents: function() {

      var fieldTemplateObject = { 
          dayStream: new Bacon.Bus(), 
          monthStream: new Bacon.Bus(), 
          yearStream: new Bacon.Bus(),  
      };
      
      Bacon.combineTemplate( fieldTemplateObject ).onValue( this.publishChanges );
      return fieldTemplateObject
    },

    getInitialState: function() { 
      return this.setInternalEvents()
    },

    getValue: function( dateProperty ) {
      return ( this.state && this.state.value && this.state.value !== "" )
        ? this.state.value[ dateProperty ]
        : "";
    },

    componentDidMount: function() {
      console.log( '>>', this.state )
      if( this.state.value && !this.state.value.day ) {
        this.setState({ 
          day:   this.getValue( "dayStream" ), 
          month: this.getValue( "monthStream" ), 
          year:  this.getValue( "yearStream" ),
        });
      }
    },

    setDay: function( e ) {
      this.state.dayStream.push( e.target.value );
    },

    setMonth: function( e ) {
      this.state.monthStream.push( e.target.value );
    },

    setYear: function( e ) {
      this.state.yearStream.push( e.target.value );
    },

    createInput: function() {
      
      return <div className='date-of-birth'>
                <input type='text' placeholder='DD' onChange={ this.setDay } value={ this.state.day } />
                <input type='text' placeholder='MM' onChange={ this.setMonth } value={ this.state.month } />
                <input type='text' placeholder='YYYY' onChange={ this.setYear } value={ this.state.year } />
              </div>
    }
  })
);