var Components = {};

Components.BasicForm = React.createClass({
    
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
      return React.DOM.div({
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








// app.directive( 'basicform', [ 'coverOptions', 'applicationData', 'ui',
//                         function( coverOptions, applicationData, ui ) {
    
//     return {
     
//         restrict:'E',
//         scope: {},
//         templateUrl: "js/directives/basicform/basic-form.html",
//         link: function( $scope, $element, $attrs ) {

//             /* set up */

//             var setUp = function( options ) {
                
//                 $element.width( $(".panel-manager").width() );

//                 $scope.options = options;
//                 $scope.$apply();
//             }

//             coverOptions.options.onValue( setUp );

//             React.renderComponent(
//                 React.DOM.div( null, 
//                     Form({ stream: formStream })
//                     //SimpleList({ stream: listStream })
//                 ), 
//                 $element[ 0 ]
//             );



//             /* basic form functionality */

//             var find = function( selector ) { return $element.find( selector ) };
//             var buttonIsEnabled = function( enabled ) { find(".submit").attr("disabled", !enabled) }

//             var occupationUpdates = ui.getInputStream( find('.occupation'), 'keyup');
//             var incomeUpdates =     ui.getInputStream( find('.income'), 'keyup')//.map( uiEvents.isNumber )
//             var submitClick =       ui.getInputStream( find(".submit"), "click" );
//             var dateOfBirth =       $scope.dateOfBirth;


//             var allFieldsPopulated = Bacon.combineTemplate({

//                 plan:       coverOptions.optionSelect,
//                 date:       dateOfBirth,
//                 occupation: occupationUpdates,
//                 income:     incomeUpdates 
            
//             } );

//             allFieldsPopulated.onValue( function( template ) {  
//                 buttonIsEnabled( ui.confirmFields( template ) ); 
//             } );

//             var submit = Bacon.combineTemplate({
//                 fields: allFieldsPopulated,
//                 submit: submitClick
//             })

            

//             submit.onValue( function() {
                
//                 $scope.$emit( "step1", {} );
//             } )
//         }

//     }

// } ] );


