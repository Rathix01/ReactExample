/** @jsx React.DOM */

Components.register("DateField", React.createClass({
    
    mixins: [ fieldBase ],

    isValidDate:function( date ) {
      return moment( date, 'YYYY-MM-DD', true ).isValid()
    },

    validate: function() {
      return ( !this.isValidDate( this.state.value ) )
        ? { value: this.state.value, error: "Date is Invalid" }
        : { value: this.state.value, error: "" };
    },

    getCompleteDate: function() {
      return this.state.year + "-" + this.state.month + "-" + this.state.day;
    },

    formatDate: function() {
      this.state.day = this.state.day.length < 2 ? "0" + this.state.day : this.state.day;
      this.state.month = this.state.month.length < 2 ? "0" + this.state.month : this.state.month;
    },

    setDate: function() {
      if( !isNaN( this.state.day ) && !isNaN( this.state.month ) && !isNaN( this.state.year ) ) {
        this.formatDate();
        this.setState( { value: this.getCompleteDate() }, this.processChange )
      }
    },

    setDay: function( e ) {
      this.setState( { day: e.target.value }, this.setDate );
    },

    setMonth: function( e ) {
      this.setState( { month: e.target.value }, this.setDate );
    },

    setYear: function( e ) {
      this.setState( { year: e.target.value }, this.setDate );
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