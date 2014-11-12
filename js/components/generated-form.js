/** @jsx React.DOM */

Components.register( "GeneratedForm", React.createClass({
  
  // Pre render

  getInitialState: function() { 
    return { page: this.props.page }; 
  },

  render: function() {
    return  <div className='form-main'>{ this.setPage( this.state.page ) }</div> 
  },

  setPage: function( page ) {
    return Page( ramda.mixin( page, { updateStream: this.props.updateStream } ) );
  },


 })
);