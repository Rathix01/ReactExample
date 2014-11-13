/** @jsx React.DOM */
 
 
var getNode = function( template, state ) {
 
    var array = R.clone( template.data.childElements );
    var fields = template.state.fields
     
    if( !template.state ) return template.data;
 
    while ( array.length > 0 ) {
         
        var node = array.shift();
 
        if( node.childElements ) {
            array = ramda.concat( array, node.childElements );
        }
 
        //console.log(state)
        if( node && node.id === state.id ) {
            return node;
        }
    }
}
 
var doRender = function( pageData ) {
 
    React.unmountComponentAtNode(document.getElementById('application'));
 
    React.renderComponent(
        <div>
            <GeneratedForm page={ pageData }  />
            <ButtonBar buttonStream={ FormStore.buttonStream }  />
        </div>,
        document.getElementById( 'application' )
    )
}

var addPageChangePointer = function( existing, template ) {
 
        if( existing === "" ) return template
        else if ( existing.data.name !== template.data.name ) {
            template.isPageChange = true;
        }
        return template;
 
    }

var x = function( template ) {
         
  if( !template || template == "" ) return;

  ramda.forEach( function( key ) {

      if( template.state.fields[ key ] ) {
          var node = getNode( template, template.state.fields[ key ] );
          if( node ) node.state = template.state.fields[ key ];
      }

  }, ramda.keys( template.state.fields ) )

  if( template.isPageChange === true ) {
      //console.log( "render-data", template )
      doRender( template.data );
  }

}

 
Bacon.combineTemplate({
        data: FormStore.formDataStream,
        state: FormStateStore.stateStream
 
    })
    .scan( "", addPageChangePointer )
    .onValue( x )
 
FormStore.formDataStream.onValue( doRender );
 
// setInterval(function() {
//   console.log('tick')
 FormStore.formDataStream.push( dummyData.page1 )
// }, 2000000)