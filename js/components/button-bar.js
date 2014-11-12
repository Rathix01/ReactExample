/** @jsx React.DOM */

Components.register( "ButtonBar", React.createClass({

  setButtonData: function( newState ) {
    console.log( this.state, this.isMounted() )
    if( this.isMounted() ) this.setState( newState );
    else return Bacon.noMore;
  },

  getInitialState: function() { 
    return { forwardIsEnabled: true, backwardIsEnabled: false, saveIsEnabled: false }; 
  },
  
  componentDidMount: function() {
    this.props.buttonStream.delay(10).onValue( this.setButtonData );
  },

  handleForwardClick: function( e ) {
    ButtonBarActions.right.push( e );
  },

  handleBackwardClick: function( e ) {
    ButtonBarActions.left.push( e );
  },
  
  // Render Time

  render: function() {

    return <div className='button-bar row'>
              <div className='large-12 small-12 buttons'>
                <button onClick={ this.handleBackwardClick } disabled={ !this.state.backwardIsEnabled }> Back </button>
                <button onClick={ this.handleForwardClick }  disabled={ !this.state.forwardIsEnabled }> Next </button>
              </div>
            </div>
  }

 })
);