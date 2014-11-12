var ButtonBarActions = ( function() {

	var leftButtonStream = new Bacon.Bus();
	var centralButtonStream = new Bacon.Bus();
	var rightButtonStream = new Bacon.Bus();

	var leftClick = function () {
		formDispatcher.dispatch( { actionType: 'left-button-click' } );
	}

	var centralClick = function () {
		formDispatcher.dispatch( { actionType: 'centre-button-click' } );
	}

	var rightClick = function () {
		formDispatcher.dispatch( { actionType: 'right-button-click' } );
	}

	leftButtonStream.onValue( leftClick )
	centralButtonStream.onValue( centralClick )
	rightButtonStream.onValue( rightClick )

	return {
		left:   leftButtonStream,
		centre: centralButtonStream,
		right:  rightButtonStream
	}

} () )