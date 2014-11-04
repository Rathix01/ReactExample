/** @jsx React.DOM */

Components.register("TextField", React.createClass({
    
    mixins: [ fieldBase ],

    getInitialState: function() {
      return { value: this.props.value }; 
    },

    getValue: function() {
      return this.state.value;
    },

    applyChange: function() {
      this.publishChanges( this.getValue() )
    },

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.applyChange );
    },

    createInput: function() {
      return <div className='standard-text'>
                 <input type='text' placeholder='Enter Text' onChange={ this.handleChange } value={ this.state.value } />
             </div>
    }
  })
);


Components.register("Header", React.createClass({
    


    render: function() {
      return (

          <div className={ 'large-' + this.props.cellWidth + ' columns field-container-header' }>
            <div className='field-header'>
              <h3>{ this.props.text }</h3>
              <div>{ this.props.subheader }</div>
            </div>
          </div>
      );
    }
  })
);

Components.register("BasicText", React.createClass({

    render: function() {
      return (

          <div className={ 'large-' + this.props.cellWidth + ' columns field-container-no-border' }>
            <div className='field-header'>
              <span>{ this.props.text }</span>
            </div>
          </div>
      );
    }
  })
);


Components.register("UploadField", React.createClass({

    mixins: [ fieldBase ],

    getInitialState: function() {
      return { value: this.props.value }; 
    },

    getValue: function() {
      return this.state.value;
    },

    applyChange: function() {
      this.publishChanges( this.getValue() )
    },

    handleChange:function( e ) {
      this.setState( { value: e.target.value }, this.applyChange );
    },

    createInput: function() {
      return (

          <div className={ 'large-' + this.props.cellWidth + ' columns field-container-no-border' }>
            <div className='field-header'>
              <input type='file' placeholder='Upload Photo' name="pic" accept="image/*"  />
            </div>
          </div>
      );
    }
  })
);


