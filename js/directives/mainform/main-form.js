app.directive( 'mainform', [ 'coverOptions', 'applicationData', 'ui',
                        function(  coverOptions, applicationData, ui ) {
    
    return {
     
        restrict:'E',
        scope: {},
        templateUrl: "js/directives/mainform/main-form.html",
        link: function( $scope, $element, $attrs ) {

            $element.width( $(".panel-manager").width() );

            var radioSelections = Bacon.combineTemplate({

                nzCitizenOrResident:  $scope.nzCitizen,
                paymentMethod:        $scope.paymentMethod,
                restrictedActivities: $scope.restrictedActivities,
                terminalIllnesses:    $scope.terminalIllnesses
            
            });

            radioSelections.onValue(function( template ) {

                console.log( template )

            })
        	

            

        }
    }

} ] );