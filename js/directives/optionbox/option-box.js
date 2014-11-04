app.directive( 'optionbox', [ '$compile', 'coverOptions', 
                        function( $compile, coverOptions ) {
	
	return {
     
        restrict:'A',
        scope: {
            data: '='
        },
        template: "<div ng-class='{ \"selected\": data.selected }' class='large-option-box'><div class='option-name'>{{ data.name }}</div><div class='option-description'>{{ data.description }}</div><div class='option-benefit' ng-repeat='benefit in data.benefits'>{{ benefit.name }}</div></div>",
        link: function( $scope, $element, $attrs ) {

            var selectionStream = $element.asEventStream( "click" ).map( $scope.data )
            coverOptions.optionSelect.plug( selectionStream );
        }

    }

} ] );