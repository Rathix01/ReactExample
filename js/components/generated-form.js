/** @jsx React.DOM */

Components.register( "GeneratedForm", React.createClass({
  
  // Utility 

  updateList: function( existing, data ) {
    return ( ramda.is( Array, data ) )  
      ? data
      : existing.concat( data );
  },

  setList: function( items ) {
    this.setState( { pageData: items } );
  },

  // Pre render

  getInitialState: function() { 
    return { pageData: [], pageComponents: [], filterKey: 0 }; 
  },
  
  componentWillMount: function() {
    return this.props.stream.scan([], this.updateList).onValue(this.setList);
  },
  
  // Render Time

  render: function() {
    if( this.state.pageData.length === 0 ) return <div>No items in the list</div>
    else return  <div className='form-main'>{ this.renderChildren() }</div> 
  },

  setListItem: function( page ) {
    return Page( page );
  },

  renderChildren: function() {
    return React.DOM.div( { component: React.DOM.div }, this.state.pageData.map( this.setListItem ) );
  }

 })
);