var Components = ( function() {
  
  var components = this;
  
  components.register = function( name, component ) {
    components[name] = component;
  }

  components.createInstance = function( name, args ) {
    return components[name].call( components, args );
  }

  return components;

} () );