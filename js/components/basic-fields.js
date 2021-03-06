/** @jsx React.DOM */

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

    validate: function( state ) {
      return state;
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