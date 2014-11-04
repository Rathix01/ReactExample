var autoCurry = (function () {
 
    var toArray = function toArray(arr, from) {
        return Array.prototype.slice.call(arr, from || 0);
    },
 
    curry = function curry(fn /* variadic number of args */) {
        var args = toArray(arguments, 1);
        return function curried() {
            return fn.apply(this, args.concat(toArray(arguments)));
        };
    };
 
    return function autoCurry(fn, numArgs) {
        numArgs = numArgs || fn.length;
        return function autoCurried() {
            if (arguments.length < numArgs) {
                return numArgs - arguments.length > 0 ?
                    autoCurry(curry.apply(this, [fn].concat(toArray(arguments))),
                              numArgs - arguments.length) :
                    curry.apply(this, [fn].concat(toArray(arguments)));
            }
            else {
                return fn.apply(this, arguments);
            }
        };
    };
 
}());

Function.prototype.autoCurry = function(n) { return autoCurry(this, n); }

var todos = [ "A", "B", "C" ];

var combine = function( arr, data ) {
    return ramda.map( function( fn ) { return fn( data ); }, arr);
}.autoCurry();

var el = function( tagName, args, content ) {
    return React.DOM[ tagName ].call( $.extend({}, args), content );
}.autoCurry();

var list = function( tagName, args, contentArray ) {
    return ( contentArray.length === 0 ) ? el( 'p', null, 'No items in the list.' ) : el( tagName, args, contentArray );
}.autoCurry();

var filterToDos = function(e) {
    todos = ramda.filter( function(t) { return t !== $( e.target ).text() }, todos );
    render(  todos );
}

var submitForm = function( formSubmitEvent ) {
    formSubmitEvent.preventDefault();   
    todos.push(formSubmitEvent.target.elements[0].value);          
    formSubmitEvent.target.elements[0].value = '';
    render( todos )
}

var render = function( data ) {
    React.renderComponent( 
        React.DOM.div(
            null,
            listComponent( data ),
            formComponent( [] )
        ),
        document.body )
}

var listComponent = ramda.compose( el( 'div', null ), list( 'ul', null ), ramda.map( el( "li", { onClick: filterToDos } ) ) );
var formComponent = ramda.compose( el( 'div', null ), el( 'form', { onSubmit: submitForm } ), combine( [ el( 'input', null ), el( 'input', { type: 'submit', 'value': '+' } ) ] ) );

//render(todos)

// var execute = function( url, operation, callback ) {
//     return $.get( url ).then( operation ).then( callback );
// }

//execute( "https://api.github.com/users", buildList, function() { console.log( arguments ) })


function go() {
  
  var ListItem, SimpleList, TextField, listStream, textStream;

  var normal = []
  var test = [ { text: "Test", type: "text", complete: false, key: new Date().getTime() }, { text: "Test2", type: "select", complete: false, key: new Date().getTime() } ]

  Form = React.createClass({
    getInitialState: function() {
      return { };
    },
    submitForm: function(e) {
        e.preventDefault();
        var val = e.target.elements[0].value;
        e.target.elements[0].value = '';
        this.setState( { text: val, complete: false, key: new Date().getTime() }, function() {  return this.props.stream.push(this.state); } );
    },
    render: function() {
      return React.DOM.form({
              onSubmit: this.submitForm
            }, 
            React.DOM.input({
              placeholder: 'New TODO item',
              onKeyUp: this.handleKeyUp
            }), 
            React.DOM.input({
              type: 'submit',
              value: 'Add TODO'
            })
        );
    }
  });

  SimpleList = React.createClass({
    getInitialState: function() { 
        return { items: [], filterKey: 0 }; 
    },
    updateList: function( existing, item ) { 
        if (item.key === this.state.filterKey) return ramda.filter( ramda.not( ramda.where({ key: item.key }) ), existing )
        else return existing.concat( item );
    },
    componentWillMount: function() {
        return this.props.stream.scan(test, this.updateList).onValue(this.setList);
    },
    setList: function( items ) {
        this.setState( { items: items } );
    },
    setListItem: function( item ) {
        return ListItem({ item: item, remove: this.filterList })
    },
    filterList: function(item) {
        this.setState({ filterKey: item.key }, function() { this.props.stream.push( item ); });
    },
    render: function() {
      if( this.state.items.length === 0 ) return React.DOM.p(null, "No items in the list" )
      else return React.addons.TransitionGroup( { component: React.DOM.ul }, this.state.items.map( this.setListItem ));
    }
  });

  ListItem = React.createClass({
    getInitialState: function() { 
        return { text: '', opacity: 1 }; 
    },
    toggleComplete: function() {
      this.setState( { complete: this.state.complete ? false : true } );
    },
    handleClick: function() {
        this.toggleComplete();
        setTimeout( this.remove.bind(this), 1000 )
    },
    componentWillMount: function() {
        this.setState( { item: this.props.item } );
    },
    componentDidMount: function() {
        TweenMax.fromTo(this, 0.2, { state: { opacity: 0, marginTop:-50  } }, { state: { opacity: 1, marginTop:0 } } );
    },
    remove: function() {
        if( this.state.complete ) this.animateRemove( this.removeItem );
    },
    animateRemove: function(callback) {
      TweenMax.fromTo(this, 0.4, { state: {opacity: 1 } }, { state: { opacity: 0 }, onComplete: callback.bind(this) } );
    },
    removeItem: function() {
      this.setState( { complete: false, opacity: 1 } )
      this.props.remove( this.props.item )
    },
    render: function() {
      return React.DOM.li({
            style: { opacity: this.state.opacity, marginTop: this.state.marginTop },
            className: 'tag'
        },  
        this.props.item.text,
        React.DOM.input( { type:'checkbox',
                           checked: this.state.complete ? "checked" : "",
                           onChange: this.handleClick
                        } )
      ); 
    }
  });

  formStream = new Bacon.Bus;
  listStream = new Bacon.Bus;

  var pipeValue = function( args ) { listStream.push( args ); }

  formStream.onValue( pipeValue );

  React.renderComponent(
    React.DOM.div(null, 
        Form({ stream: formStream }),
        SimpleList({ stream: listStream })
    ), 
    document.getElementById('full-height-container')
  );

}

go();

/*
var TodoList = React.createClass({displayName: 'TodoList',
  render: function() {
    var createItem = function(itemText) {
      return React.DOM.li(null, itemText);
    };
    return React.DOM.ul(null, this.props.items.map(createItem));
  }
});

var TodoApp = React.createClass({displayName: 'TodoApp',
  getInitialState: function() {
   return {items: [], text: ''};
  },

  onChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },

  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.h3(null, "TODO"), 
        TodoList({items: this.state.items}), 
        React.DOM.form({onSubmit: this.handleSubmit}, 
          React.DOM.input({onChange: this.onChange, value: this.state.text}), 
          React.DOM.button(null, 'Add #' + (this.state.items.length + 1))
        )
      )
    );
   }
});
React.renderComponent(TodoApp(null), document.body);

*/

function composeAsync() {
  var funcs = arguments,
      length = funcs.length,
      stepCount = ( length - 1 );

  while (length--) {
    if (!_.isFunction(funcs[length])) {
      throw new TypeError;
    }
  }

  function step() {
    var args = Array.prototype.slice.call(arguments, 0);

    if( stepCount >= 0 ) {

      if(args.length <= 1) args.push( step )
      else args.splice( 1, 0, step ); // put the callback into the second argument slot.

      args = funcs[ stepCount ].apply( this, args );
      stepCount -= 1;

      if ( args && args.promise ) $.when( args ).always( step );            // assumes jQuery...
      else if( $.isArray( args ) || $.isPlainObject( args ) ) step( args ); // more jQuery...

    } else {
        stepCount = ( length - 1 );
    }
  };

  return step;
}

var pass = function( data ) {
  data.push( { time: new Date().getTime() } )
  return data;
}

var asyncPass = function( data, callback ) {
  data.push( { time: new Date().getTime() } )
  setTimeout( callback.bind( null, data ), 2000 );
}

var getData = function() {
  return $.get( "https://api.github.com/users" );
}

var log = console.log;
var doPass = composeAsync( pass, asyncPass, asyncPass, pass, asyncPass, getData );