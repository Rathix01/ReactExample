/** @jsx React.DOM */


var doRender = function( pageData ) {

	React.unmountComponentAtNode(document.getElementById('application'));

	React.renderComponent(
  		<div>
    		<GeneratedForm page={ pageData } updateStream={ FormStore.updateStream }  />
    		<ButtonBar buttonStream={ FormStore.buttonStream }  />
  		</div>,
  		document.getElementById( 'application' )
  	)
}


FormStore.formDataStream.onValue( doRender );
//setInterval(function() {
//console.log('xxx')
FormStore.formDataStream.push( dummyData.page1 )
//}, 5000)