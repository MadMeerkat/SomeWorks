window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topbtn").style.display = "block";
    } else {
        document.getElementById("topbtn").style.display = "none";
    }
}

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 900, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});




/*MENU*/
//Menu-Resposive
$(document).ready(main);
 
var x = 1;
 
function main(){
  $('.res-menu').click(function(){
    // $('nav').toggle(); 
 
    if(x == 1){
      $('.opciones').animate({
        top: '85'
      });
      x = 0;
    } else {
      x = 1;
      $('.opciones').animate({
        top: '-700'
      },
      1200);
    }
 
  });
 
};