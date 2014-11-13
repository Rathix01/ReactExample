/** @jsx React.DOM */

var main = ( function() {

  var getNode = function( template, state ) {
 
    var array = ramda.clone( template.data.childElements );
    var fields = template.state.fields
     
    if( !template.state ) return template.data;
 
    while ( array.length > 0 ) {
      var node = array.shift();
      if( node.childElements ) {
        array = ramda.concat( array, node.childElements );
      }
      if( node && node.id === state.id ) {
        return node;
      }
    }
  }
 
  var addPageChangePointer = function( existing, template ) {
    if( existing === "" ) return template
    else if ( existing.data.name !== template.data.name ) {
        template.isPageChange = true;
    }
    return template;
  }

  var addStateToItem = function( template, key ) {
    if( template.state.fields[ key ] ) {
      var node = getNode( template, template.state.fields[ key ] );
      if( node ) node.state = template.state.fields[ key ];
    }
  }

  var mergeState = function( template ) {       
    if( !template || template == "" ) return;
    ramda.forEach( addStateToItem.bind( this, template ), ramda.keys( template.state.fields ) )
    return template;
  }

  var render = function( template ) {
    if( template && template.isPageChange === true ) {
      doRender( template.data );
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

  Bacon.combineTemplate({
    data: FormStore.formDataStream,
    state: FormStateStore.stateStream
  })
  .scan( "", addPageChangePointer )
  .map( mergeState )
  .onValue( render )
 
  // Initial start up.
  FormStore.formDataStream.onValue( doRender );
  FormStore.formDataStream.push( dummyData.page1 )

} () )
 


