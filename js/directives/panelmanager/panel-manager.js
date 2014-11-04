app.directive( 'panelmanager', [  function() {
    
    return {
     
        restrict:'A',
        scope: false,
        link: function( $scope, $element, $attrs ) {


            
        	

			console.log( 'panelmanager' )

            $scope.$on( "step1", step1 )
        }
    }

} ] );
// note.

/*
    need to manage height of viewable area.
    pages that are longer than others cause the slider to be too tall in some cases.
*/

var width;
var slideSpeed = 0.25
var easing = Power4.easeOut;

var step0 = function() {

    //var width = $(".panel-manager").width();
    var slider = $(".slide");
    width = $(".panel-manager").width();

    $(".basic-questions").show();

    TweenMax.to( slider, slideSpeed,  { transform: "translate3d(0px, 0px, 1px)", ease: easing } );
    $("mainform").hide();
}

var step1 = function() {

    var slider = $(".slide");
    width = $(".panel-manager").width();

    $(".basic-questions").hide();

    TweenMax.to( slider, slideSpeed,  { transform: "translate3d(-" + width + "px, 0px, 1px)", ease: easing } );
    $("mainform").show();
}


$(document).on("keydown", function( e ) {


    if(e.shiftKey === true) {
        
        if(e.keyCode == 49) { step0(); return false }
        else if(e.keyCode == 50) { step1(); return false }

        
    }
})

