var Components = ( function() {
  
  var components = this;
  var renderFn;
  
  components.register = function( name, component ) {
    components[name] = component;
  }

  components.createInstance = function( name, args ) {
    return components[name].call( components, args );
  }

  components.setRender = function( renderFunction ) {
    renderFn = renderFunction
    renderFunction();
  }

  components.render = function( renderFunction ) {
    renderFn === undefined 
     ? components.setRender( renderFunction ) 
     : renderFn();
  }

  return components;

} () );