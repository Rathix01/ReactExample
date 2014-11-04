/** @jsx React.DOM */

Components.render(function() {
React.renderComponent(
  <div>
    <GeneratedForm stream={ FormStore.formDataStream }  />
    <ButtonBar  formStream={ FormStore.formDataStream } buttonStream={ FormStore.buttonStream } />
  </div>,
  document.getElementById( 'application' )
  )
} );

FormStore.formDataStream.push( dummyData.page1 )
