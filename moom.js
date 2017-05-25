;function dataFormToView($view) {
	var $elements = $view.find('input,select,textarea');

	var data = {};

	$elements.each(function(){
		var $ele = $(this);
		data[$ele.attr('name')] = $ele.val();
	});

	return data;
};


var initEvents = function($m, settings) {
    var $mv =  $m.find('*[moom-view]');
 	var $me =  $m.find('*[moom-event]');
 	var $mto =  $m.find('*[moom-toView]');
 	var $mfor =  $m.find('*[moom-for]');
 	var $updateTo =  $m.find('*[moom-updateTo]');
 	

 	$mv.first().show();

 	$mfor.each(function(){
 		var $self = $(this);
 		$self.hide();

 		var forin = $self.attr('moom-for').split(" ");

 		var list = settings.data[forin[2]];

 		for( i in list ) {
 			var data = list[i];
 			var $clone = $self.clone();

			var names = Object.getOwnPropertyNames(data);

			for(j in names) {
				$clone.find('[moom-text='+ names[j] +']').text( data[names[j]] );
			}
 			
 			$self.parent().append( $clone.show() );
 		}
 	});

 	/*$mv.each(function() {
 		var $mvSelect = $(this); 

 		settings.data[$mv.attr('moom-view')] = {};

 		var $elements = $mvSelect.find('input,select,textarea');

 		$elements.each(function(){
 			var $ele = $(this);
			settings.data[$mv.attr('moom-view')][$ele.attr('name')] = $ele.val();
 		});
 	});*/

	//alert( settings.data.list.nome );



 	// events
 	$me.each(function(){
 		var $ele = $(this);
 		var content = $ele.attr('moom-event');
 		//$ele.preventDefault(0);

 		if( content.indexOf( '->') != -1 ) {
 			var eventFn = content.split('->');
			$ele.on( eventFn[0] +'.moom', function() {
	 			var $fn = settings.events[ eventFn[1] ];

	 			if( $fn != undefined )
	 				$fn( $ele, dataFormToView( $me.parent('*[moom-view]') ) );
	 		});
 		} else {
	 		$ele.on('click.moom', function() {
	 			var $fn = settings.events[content];

	 			if( $fn != undefined )
	 				$fn( $ele, dataFormToView( $me.parent('*[moom-view]') ) );
	 		});
	 	}
 	});

 	$mto.each(function(){
 		var $self = $(this);

 		$self.click(function(){
 			$self.parent('*[moom-view]').hide();
 			$('*[moom-view='+ $self.attr('moom-toView') +']').show();
 		});
 	});


 	$updateTo.each(function(){
 		var $self = $(this);
 		
 	});
};



function Moon(element, options) {

	var $m = $( '*[moom-controller='+ element +']');

	var settings = $.extend({
        data : {},
        events : {}
    }, options );


    this.set = function(data) {
		var names = Object.getOwnPropertyNames(data);

		for(i in names) {
			$m.find('[name='+ names[i] +']').val( data[names[i]] );
		}
    };

	/*this.data : function() {
		return settings.data;
	};*/

	/*data = function(data) {
		settings.data = data;
	};*/

	initEvents($m, settings);

};