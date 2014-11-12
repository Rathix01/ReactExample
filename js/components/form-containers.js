/** @jsx React.DOM */

var containerBaseMixin = {

  // Pre render
  getInitialState: function() {
    return { items: this.props.childElements }; 
  },
  
  //Arrival Animation
  
  componentDidMount: function() {
   // TweenMax.fromTo( this, 2.5, { state: { opacity:0 } }, { state: { opacity: 1 },  ease: Power1.easeOut } );
  },

  getAnimationCSS: function() {
      return { opacity: this.state.opacity }
  },

  // During render

  renderChildren: function() {
    return this.props.columns > 0
      ? <div className='row'>{ this.state.items.map(this.setItem) }</div>
      : this.state.items.map(this.setItem);
  }
}

var standardRenderMixin = {

  render: function() {

    if( this.state.items.length === 0 ) return <div>Empty Page</div>
    else return  <div className={ 'form-' + this.props.type.toString() } style={ this.getAnimationCSS() }>
      { this.renderChildren() }</div> 
  }
}

Components.register( "Page", React.createClass({
  
    mixins: [ containerBaseMixin, standardRenderMixin ],

    setItem: function( item ) {
      return Group( ramda.mixin( item, { updateStream: this.props.updateStream } ) );
    }

  })
);


Components.register( "Group", React.createClass({
  
    mixins: [ containerBaseMixin, standardRenderMixin ],

    getColumns: function() {
      return { cellWidth: ( 12 / this.props.columns ) }
    },

    getChildProps: function() {
      return ramda.mixin( this.getColumns(), { updateStream: this.props.updateStream } );
    },

    getChild: function( item ) {
      return Components.createInstance( item.type, ramda.mixin( item, this.getChildProps() ) )
    },

    setItem: function( item ) {
      return this.props.columns > 0
        ? Components.createInstance( item.type, ramda.mixin( item, this.getChildProps() ) )
        : <div className='row'> { this.getChild( item ) } </div>
    }

  })
);