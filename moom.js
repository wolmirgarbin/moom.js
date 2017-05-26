;function dataFormToView($view) {
	var $elements = $view.find('*[name]:not([moom-data-ignore])');

	var data = {};

	$elements.each(function(){
		var $ele = $(this);
		data[$ele.attr('name')] = val( $ele );
	});

	return data;
};

/**
 * Obtem os valores dos elementos do form
 * @param $ele
 * @returns {*}
 */
function val($ele) {
    if( $ele.attr('type') == 'checkbox' ) {
    	return $ele.is(':checked');
    } else {
        return $ele.val();
	}
}


function validationReturn($view, settings) {
	var $elements = $view.find('*[name]:not([moom-data-ignore])');

	var validation = [];

	$elements.each(function(){
		var $ele = $(this);

		var fnVal = $ele.attr('moom-validation');

		if( fnVal != undefined ) {
			if( settings.validation[ fnVal ]( $ele ) ) {
				$ele.removeClass('moom-error');
			} else {
				$ele.addClass('moom-error');
				validation[ $ele.attr('name') ] = $ele;
			}
		}
	});

	return validation;
};


var initEvents = function($m, settings) {
    
   
	/*Object.observe(settings.data, function(changes) {
	  	console.log(changes);
	});*/


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

	 			if( $fn != undefined ) {
	 				var $moomView = $me.parent('*[moom-view]');
	 				param = {};
	 				param.element = $ele;
	 				param.data = dataFormToView( $moomView );
	 				param.validation = validationReturn( $moomView, settings );
	 				$fn( param );
	 			}
	 		});
 		} else {
	 		$ele.on('click.moom', function() {
	 			var $fn = settings.events[content];

	 			if( $fn != undefined ) {
	 				var $moomView = $me.parent('*[moom-view]');
	 				param = {};
	 				param.element = $ele;
	 				param.data = dataFormToView( $moomView );
	 				param.validation = validationReturn( $moomView, settings );
	 				$fn( param );
	 			}
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
		on : function() {},
        data : {},
        events : {},
        listen : {},
        validation : {}
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

	settings.on();

};