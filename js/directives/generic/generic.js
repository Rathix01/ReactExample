app.directive( 'exclusiveRadio', [ 'ui', function( ui ) {
    
    return {
     
        restrict:'A',
        scope: false,
        link: function( $scope, $element, $attrs ) {

            var unsetSelected = function( prev, current ) {
                if( prev ) $( prev ).prop( "checked", false );
                return current;
            }

            $scope[ $attrs.exclusiveRadio ] = $element.find( 'input[type="radio"]' )
                                                  .asEventStream( 'click' )
                                                  .map( ui.getElement )
                                                  .scan( null, unsetSelected ) 
                                                  .map( ui.getId )
                                                  .changes();
        }
    }

} ] );


app.directive( 'date', [ 'ui', 'validation', function( ui, validation ) {
    
    return {
     
        restrict:'E',
        scope: false,
        template: '<div>' +
                  '<input type="number" maxlength="2" min="1" max="31" placeholder="DD" class="day" ng-model="day" />' +
                  '<input type="number" maxlength="2" min="1" max="12" placeholder="MM" class="month" ng-model="month" />' +
                  '<input type="number" maxlength="4" placeholder="YYYY" class="year" ng-model="year" />' +
                  '</div>',

        link: function( $scope, $element, $attrs ) {

            var dayUpdates =    ui.getInputStream( $element.find('.day'),   'keyup' );
            var monthUpdates =  ui.getInputStream( $element.find('.month'), 'keyup' );
            var yearUpdates =   ui.getInputStream( $element.find('.year'),  'keyup' );

            var dateTemplate = Bacon.combineTemplate({ day: dayUpdates, month: monthUpdates, year: yearUpdates });
            var correctDate = dateTemplate.map( validation.isDate ).changes();

            $scope[ $attrs.id ] = correctDate;
        }
    }

} ] );