(function(){
if(Modernizr.canvas){
var canvas = {
	html5:document.getElementById('html5'),
	javascript:document.getElementById('javascript'),
	php:document.getElementById('php'),
	adobe:document.getElementById('adobe')
}
function drawCircles(el,deg){
	el.width = el.offsetWidth;
	el.height = el.offsetWidth;
	var context = el.getContext('2d');
	var radius = el.offsetWidth/2;
	//blue
	context.beginPath();
	context.arc(radius,radius,radius-(13/2),0,Math.PI*2);
	context.strokeStyle = '#202835';
	context.lineWidth = 13;
	context.stroke();
	//orange
	var point = Math.PI*1.5;
	var rad = deg*Math.PI/180;
	context.beginPath();
	context.arc(radius,radius,radius-(13/2),point+rad,point);
	context.strokeStyle = '#fb6816';
	context.lineWidth = 13;
	context.stroke();
	//console.log(el.offsetWidth);
}
drawCircles(canvas.html5,45);
drawCircles(canvas.javascript,83);
drawCircles(canvas.php,110);
drawCircles(canvas.adobe,10);
}
})();
(function(){
var	map;
var address = '291 Henry St Brooklyn New York, NY 11201, United States';
window.initMap = function(){
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: results[0].geometry.location,
        zoom: 14,
        noClear:true,
    	scrollwheel:false,
    	draggable:!Modernizr.touchevents,
    	signed_in:false
    });
    //console.log(results[0].geometry.location);
	marker = new google.maps.Marker({
		map: map,
		position: results[0].geometry.location
	});
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });	
}
})();
var doCangeHash = true;
(function(){
	$('.bar').on('click',function(){
		$('#main-menu').addClass('show');
	});
	$('#main-menu .close').on('click',function(){
		$('#main-menu').removeClass('show');
	});
	function changeHash($a){
		var href = $a.attr('href');
		var $target = $(href);
		$target.attr('id','');
		location.hash = href;
		$target.attr('id',href.substr(1));
	}
	function initNav(){
		//current
		//var offset = $('#main-menu .nav .active').position().top-10;
		if(location.hash){
			var offset = $('#main-menu .nav a[href='+location.hash+']').parent().position().top-10;
			$('#main-menu .nav .current').css({transform:'translate(0px,'+offset +'px'});
		}
	}
	initNav();
	if(!Modernizr.touchevents){
		$('#main-menu .nav a').on('click',function(e){
			e.preventDefault();
			doCangeHash = false;
			changeHash($(this));
			var $target = $($(this).attr('href'));
			var targetOffset = $target.offset().top;
			$('html, body').stop().stop().animate({
				scrollTop: targetOffset
			}, 700,function(){
				doCangeHash = true;
			});
		});
	}
	$('body').scrollspy({ target: '#main-menu' });
	$('#main-menu').on('activate.bs.scrollspy', function () {
		var active = $(this).find('.active');
		if(doCangeHash){
			changeHash(active.find('a'));
		}
		$(this).find('.current').css({transform:'translate(0px,'+(active.position().top-10)+'px'});
	});
	var heigth =  $('#service .quote').height();
	$('#service .quote .bg').imageScroll({
            image: null,
            imageAttribute: 'image',
            container: $('#service .quote'),
            windowObject: $(window),
            speed:.2,
            coverRatio:1,
            holderClass: 'bg',
            imgClass: 'parallax',
            holderMinHeight: heigth,
            holderMaxHeight: heigth,
            extraHeight: 0,
            mediaWidth: 1920,
            mediaHeight: 800,
            parallax: !Modernizr.touchevents && Modernizr.opacity,
            touch: Modernizr.touchevents
    });
	heigth =  $('#clients-block').height();
    $('#clients-block .bg').imageScroll({
            image: null,
            imageAttribute: 'image',
            container: $('#clients-block'),
            windowObject: $(window),
            speed:.2,
            coverRatio:1,
            holderClass: 'bg',
            imgClass: 'parallax',
            holderMinHeight: heigth,
            holderMaxHeight: heigth,
            extraHeight: 0,
            mediaWidth: 1920,
            mediaHeight: 800,
            parallax: !Modernizr.touchevents && Modernizr.opacity,
            touch: Modernizr.touchevents
    });
    $('#portfolio a.zoom').colorbox({rel:'zoom'});
    $(document).on('cbox_open', function(){
	  $('#main-carousel').carousel('pause');
	});
	$(document).on('cbox_closed', function(){
	  $('#main-carousel').carousel('cycle');
	});
	console.log('test');
})();