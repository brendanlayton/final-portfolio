							
/* ========================================================
		Page Functionality
 ========================================================*/

// Secondary Pane Show/Hide

$(document).ready(function () {
	if ( $( window ).width() > 1023 ) {
		$('.inner-container').addClass('open');	
		$('.footer').removeClass('vertical');
		$('.personal-dets img, .personal-dets .lead, .personal-dets .btn-group').addClass('show');
		$('.name').removeClass('vertical');
		$('.feature-text').removeClass('slide-left');
		$('.hideShow i').removeClass('fa-chevron-right').addClass('fa-chevron-left');
	} 
});	

  $('.hideShow a').click(function(e) {
		e.preventDefault();
		$('.inner-container').toggleClass('open'); // open/close secondary pane
		$('.personal-dets img, .personal-dets .lead, .personal-dets .btn-group').toggleClass('show');
		$('.name').toggleClass('vertical');
		//$('.personal-dets').toggleClass('show');
		$('.feature-text').toggleClass('slide-left');
		$('.footer').toggleClass('vertical');
		$(this).find('i').toggleClass('fa-chevron-right fa-chevron-left', 1000); // toggle left/right icon
  });

//$('.hideShow a').click(function(e) { 
//	e.preventDefault();
//	$(this).find('i').toggleClass('fa-chevron-left fa-chevron-right', 1000); // toggle left/right icon
//	$('.inner-container').toggleClass('open'); // open/close secondary pane
//	$('.feature-text').toggleClass('slide-left');
//	$('.footer').toggleClass('vertical');
//});
// Smooth Scroll

$("a.smooth").click(function() {
	var target = $(this).attr("href");
		$('html,body').animate({
				scrollTop: $(target).offset().top},
				'slow');
});


// Scroll to top button

$(window).scroll(function() {
    if ($(this).scrollTop() > 600) {
        $('.scroll-top:hidden').stop(true, true).fadeIn().css("margin-bottom", "0");
    } else {
        $('.scroll-top').stop(true, true).fadeOut();
    }
});


/* ========================================================
		Project Modal
 ========================================================*/

// Variables

var overlay = $('<div id="overlay"></div>');
var btnGroup = $('<div class="btn-group" role="group" aria-label="Button group"></div>');
var btnLeft = $('<button type="button" class="btn btn-primary previous"><a class="arrow" href="#"><i class="fa fa-chevron-left" aria-hidden="true"></i>  Previous Project</a></button>');
var btnRight = $('<button type="button" class="btn btn-primary next"><a class="arrow" href="#">Next Project  <i class="fa fa-chevron-right" aria-hidden="true"></i></a></button>');
var closeButton = '<i onclick="closeModal()" class="fa fa-times-circle" aria-hidden="true"></i>';
var $index = 0;
var galleryLengthMax = $('.project-list li').length - 1;
var projectModal = $('<div id="projectModal"></div>');
var modalSummaryDiv = $('<div class="modal-summary"></div>');
var modalDetailsDiv = $('<div class="modal-details"></div>');
var docBody = $('body');


// Miscellaneous Functions

function goToTop() {
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	return false;
}

function closeModal() {
	projectModal.hide();
	overlay.hide();
	docBody.removeClass('no-scroll');
}

overlay.click(function(event) {

	// exclude clicks on nav buttons and other elements

	if(event.target.id === 'overlay') {	
		$(this).hide(); // close overlay
		docBody.removeClass('no-scroll'); // Add scroll back to body
	}

});


// Add elements to overlay
    
$('body').append(overlay);
overlay.append(projectModal)
projectModal.append(closeButton);
projectModal.append(modalSummaryDiv);
projectModal.append(modalDetailsDiv);
projectModal.append(btnGroup);
btnGroup.append(btnLeft).append(btnRight);

	
// Modal Functionality 

	// 1. Content update function

	function updateContent(modalSummaryText, modalDetailsText) {
		overlay.show();
		projectModal.show();
		$('a.arrow').show();
		modalSummaryDiv.html(modalSummaryText).show();
		modalDetailsDiv.html(modalDetailsText).show();
	}

	// 2. Show modal and overlay on "Details" button click

	$(".card .details").click(function() {
		overlay.show();
		docBody.addClass('no-scroll');
		var modalSummaryText = $(this).parent().parent().children().html();
		var modalDetailsText = $(this).parent().prev().html();

		// Update content 
		updateContent(modalSummaryText, modalDetailsText);
		
		// Update index
		$index = $(this).parent().parent().parent().index();
		
		// Scroll to the top of the page
		goToTop();
		
	});

	// 3. Function to update the $index variable and use it to retrieve new content

		function prevNext(prev) {
			// The above sets prev to true

			// if prev not true add 1 to $index, i.e. move forward, else take one away from $index, i.e. move backwards

			if (!prev) {
				++$index; // increase the $index variable by one
			} else {
				--$index; // decrease the $index variable by one 
			}

			// Reset the value of $index if its value moves outside the index range. 
			// The variable galleryLengthMax is used to accommodate the varying length of the galleries.

			if ($index < 0) {
				$index = galleryLengthMax;
			} 
			if ($index > galleryLengthMax) {
				$index = 0;
			}

			// Get the new content using the index variable to locate it

			var newContent = $('.project-list li').get($index).getElementsByClassName('project-details');

			var modalSummaryText = $(newContent).html();
			var modalDetailsText = $(newContent).next().html();

			//Update content

			updateContent(modalSummaryText, modalDetailsText);

		}

	
	// 4. Add click events to arrows using the prevNext function

		$('.previous').click(function(event) {
			prevNext(true);
		});
		$('.next').click(function(event) {
			prevNext(); 
		});

	
	// 5. Add the ability to navigate with left and right keys on keyboard

	$('body').keydown(function(event) {

		// makes sure keyboard navigation only works when overlay is open

		if(event.keyCode === 37 && $('#overlay').css('display') === 'block') { // left
			prevNext(true);
		} else if (event.keyCode === 39 && $('#overlay').css('display') === 'block') { // right
			prevNext();
		}

	});