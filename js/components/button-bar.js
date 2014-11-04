/** @jsx React.DOM */

Components.register( "ButtonBar", React.createClass({

  setFormData: function( newState ) {
    this.setState({ pageData: newState });
  },

  setButtonData: function( newState ) {
    this.setState(newState);
  },

  getInitialState: function() { 
    return { forwardIsEnabled: false, backwardIsEnabled: false, saveIsEnabled: false, pageData: [] }; 
  },
  
  componentWillMount: function() {
    this.props.formStream.onValue(this.setFormData);
    this.props.buttonStream.onValue(this.setButtonData);
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