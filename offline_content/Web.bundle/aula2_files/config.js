$('a[href*="#topico"]').not('[href="#"]').not('[href="#0"]').click(function(event){
    if(location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname){
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length){
			event.preventDefault();
			$('html, body').animate({scrollTop: target.offset().top}, 1000, function(){
				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")){
					return false;
				}else{
					$target.attr('tabindex','-1');
					$target.focus();
				};
			});
		}
    }
});

// btn GotoTop
$(window).on('scroll', function() {
	if ($(window).scrollTop() + $(window).height() <= $(window).outerHeight()) {
	  $('#gotoTop').hide();
	} else {
	  $('#gotoTop').show();
	}
});

$('#gotoTop').click(function(){
   $("html").animate({scrollTop:0}, '1000');
});


AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


/* Play Imagem gif  https://www.hongkiat.com/blog/on-click-animated-gif/ */
var getGif = function() {
	var gif = [];
	$('img').each(function() {
		var data = $(this).data('alt');
		gif.push(data);
	});
	return gif;
}

var gif = getGif();

// Preload all the gif images.
var image = [];

$.each(gif, function(index) {
	image[index]     = new Image();
	image[index].src = gif[index];
});


// Change the image to .gif when clicked and vice versa.
$('figure').on('click', function() {

	var $this   = $(this),
			$index  = $this.index(),
			
			$img    = $this.children('img'),
			$imgSrc = $img.attr('src'),
			$imgAlt = $img.attr('data-alt'),
			$imgExt = $imgAlt.split('.');
			
	if($imgExt[1] === 'gif') {
		$img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
	} else {
		$img.attr('src', $imgAlt).attr('data-alt', $img.data('alt'));
	}

	// Add play class to help with the styling.
	$this.toggleClass('play');
});



var mySwiper = new Swiper('.swiper-container-navigation', {
   pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
  	firstSlideMessage:'Esse é o primeiro slide',
  	lastSlideMessage:'Esse é o último slide',
    prevSlideMessage:'Slide anterior',
    nextSlideMessage:'Próximo slide',
    paginationBulletMessage:'Vá para o slide {{index}}',
    
  },


});

var swiper = new Swiper('.swiper-container-progress', {
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
  	firstSlideMessage:'Esse é o primeiro slide',
  	lastSlideMessage:'Esse é o último slide',
    prevSlideMessage:'Slide anterior',
    nextSlideMessage:'Próximo slide',
    paginationBulletMessage:'Vá para o slide {{index}}',
    
  },
});

var swiper = new Swiper('.swiper-container-multiple', {
      slidesPerView: 3,
      spaceBetween: 40,
      // init: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },

      navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  },

      breakpoints: {
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },

        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        360: {
          slidesPerView: 1,
          spaceBetween: 10,
        }
      },

  a11y: {
  	firstSlideMessage:'Esse é o primeiro slide',
  	lastSlideMessage:'Esse é o último slide',
    prevSlideMessage:'Slide anterior',
    nextSlideMessage:'Próximo slide',
    paginationBulletMessage:'Vá para o slide {{index}}',
    
  },
 

});




function printPreview() {window.print();}


 $(function(){
    $(".twentytwenty-container[data-orientation!='vertical']").twentytwenty({default_offset_pct: 0.7});
    $(".twentytwenty-container[data-orientation='vertical']").twentytwenty({default_offset_pct: 0.3, orientation: 'vertical'});
  });

  $('#modalVideo').on('hidden.bs.modal', function (e) {
    // do something...
    $('#modalVideo #video').attr("src", $("#modalVideo  #video").attr("src"));
  });