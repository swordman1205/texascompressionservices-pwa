;(function( $ ) {

	// Fit slide video background to video holder
	function resizeVideo() {

		//var $video = $('.video');
		var $trailer = $( '.videoHolder' );

		$trailer.find( '.video' ).each( function() {
			if ( $trailer.width() / 16 > $trailer.height() / 9 ) {
				$( this ).css( { 'width': '100%', 'height': 'auto' } );
			} else {
				$( this ).css( { 'width': 'auto', 'height': '100%' } );
			}
		} );
		$trailer.find( '.responsive-embed' ).each( function() {
			if ( $trailer.width() / 16 > $trailer.height() / 9 ) {
				$( this ).css( { 'width': '100%', 'height': 'auto' } );
			} else {
				$( this ).css( { 'width': $trailer.height() * 16 / 9, 'height': '100%' } );
			}
		} );
	}

	// Sticky Footer
	var bumpIt = function() {
			$( 'body' ).css( 'padding-bottom', $( '.footer' ).outerHeight( true ) );
			$( '.footer' ).addClass( 'sticky-footer' );
		},
		didResize = false;

	$( window ).resize( function() {
		didResize = true;
	} );
	setInterval( function() {
		if ( didResize ) {
			didResize = false;
			bumpIt();
		}
	}, 250 );


	// Scripts which runs after DOM load

	$( document ).ready( function() {

		//Remove placeholder on click
		$( 'input, textarea' ).each( function() {
			$( this ).data( 'holder', $( this ).attr( 'placeholder' ) );

			$( this ).focusin( function() {
				$( this ).attr( 'placeholder', '' );
			} );

			$( this ).focusout( function() {
				$( this ).attr( 'placeholder', $( this ).data( 'holder' ) );
			} );
		} );

		//Make elements equal height
		$( '.matchHeight' ).matchHeight();


		// Add fancybox to images
		$( '.gallery-item a' ).attr( 'rel', 'gallery' ).attr( 'data-fancybox', 'gallery' );
		$( 'a[rel*="album"], .gallery-item a, .fancybox, a[href$="jpg"], a[href$="png"], a[href$="gif"]' ).fancybox( {
			minHeight: 0,
			helpers: {
				overlay: {
					locked: false
				}
			}
		} );

		// Sticky footer
		$( '.footer' ).find( 'img' ).one( 'load', function() {
			bumpIt();
		} ).each( function() {
			if ( this.complete ) {
				$( this ).load();
			}
		} );

		/**
		 * Scroll to Gravity Form confirmation message after form submit
		 */
		$( document ).bind( 'gform_confirmation_loaded', function( event, formId ) {
			var $target = $( '#gform_confirmation_wrapper_' + formId );

			if ( $target.length ) {
				$( 'html, body' ).animate( {
					scrollTop: $target.offset().top - 25
				}, 500 );

				return false;
			}
		} );

		resizeVideo();

		// Dropdown categories
		var $dropdownTrigger = $('.js-dropdown-trigger');

		// Categories dropdown mobile behavior
		var event;
		var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		if (isSafari) {
			event = 'click mouseover';
		} else {
			event = 'click';
		}

		var lastElem;
		$(document).on('click', function(e) {
			if(e.target !== lastElem) {
				lastElem = false;
			}
		});

		$dropdownTrigger.on(event, function(e) {
			var currentElem = e.target;

			if ($(this).closest('.product-cats__item').find('.product-cats__child').length && $(window).width() < 1025) {
				if (currentElem !== lastElem) {
					e.preventDefault();
					lastElem = currentElem;
				}
			}
		});

		$dropdownTrigger.hover(function() {
			$(this).closest('.product-cats__item').find('.js-dropdown').stop().slideToggle();
		});

		// Add attributes to input fields phone number
		function customPhoneField() {
			$(".gfield_list_8_cell1 input").attr({
				'maxlength': '3',
				'type': 'tel'
			});

			$(".gfield_list_8_cell2 input").attr({
				'maxlength': '3',
				'type': 'tel'
			});

			$(".gfield_list_8_cell3 input").attr({
				'maxlength': '4',
				'type': 'tel'
			});
		}

		customPhoneField();
		$('.gfield_list_cell input').wrap('<div class="gf_input-outer"></div>');

		jQuery(document).bind('gform_post_render', function(){
			customPhoneField();
			$('.gfield_list_cell input').wrap('<div class="gf_input-outer"></div>');
		});


	} );


	// Scripts which runs after all elements load

	$( window ).on( 'load', function() {

		//jQuery code goes here
		if ( $( '.preloader' ).length ) {
			$( '.preloader' ).addClass( 'preloader--hidden' );
		}


	} );

	// Scripts which runs at window resize

	$( window ).resize( function() {

		//jQuery code goes here

		resizeVideo();

	} );


	// ACF Google Map JS code
	/*
	*  This function will render a Google Map onto the selected jQuery element
	*/

	function render_map( $el ) {
	    // var
	    var $markers = $el.find('.marker');
	    // var styles = []; // Uncomment for map styling
	    // vars
	    var args = {
	        zoom        : 16,
	        center      : new google.maps.LatLng(0, 0),
	        mapTypeId   : google.maps.MapTypeId.ROADMAP,
	        scrollwheel : false,
	        // styles : styles // Uncomment for map styling
	    };
	    // create map
	    var map = new google.maps.Map( $el[0], args);
	    // add a markers reference
	    map.markers = [];
	    // add markers
	    $markers.each(function(){
	        add_marker( $(this), map );
	    });
	    // center map
	    center_map( map );
	}

	/*
	*  This function will add a marker to the selected Google Map
	*/
	var infowindow;
	function add_marker( $marker, map ) {
	    // var
	    var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );
	    // create marker
	        var marker = new google.maps.Marker({
	            position    : latlng,
	            map         : map,
	            //icon: $marker.data('marker-icon') //uncomment if you use custom marker
	        });
	    // add to array
	    map.markers.push( marker );
	    // if marker contains HTML, add it to an infoWindow
	    if( $.trim($marker.html()) )
	    {
	        // create info window
	        infowindow = new google.maps.InfoWindow();

	        // show info window when marker is clicked
	        google.maps.event.addListener(marker, 'click', function() {
	            // Close previously opened infowindow, fill with new content and open it
	            infowindow.close();
	            infowindow.setContent($marker.html());
	            infowindow.open( map, marker );
	        });
	    }
	}

	/*
	*  This function will center the map, showing all markers attached to this map
	*/

	function center_map( map ) {
	    // vars
	    var bounds = new google.maps.LatLngBounds();
	    // loop through all markers and create bounds
	    $.each( map.markers, function( i, marker ){
	        var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
	        bounds.extend( latlng );
	    });

	    // only 1 marker?
	    if( map.markers.length == 1 ) {
	        // set center of map
	        map.setCenter( bounds.getCenter() );
	    }
	    else {
	        // fit to bounds
	        map.fitBounds( bounds );
	    }

	}

	/*
	*  This function will render each map when the document is ready (page has loaded)
	*/

	$('.acf-map').each(function(){
	    render_map( $(this) );
	});


}( jQuery ));
