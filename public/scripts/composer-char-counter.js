$(document).ready( function() {
  console.log("javascript is loading!");
  $("textarea").on("input",function(event){
    counter = 140 - this.value.length;
    $(this).parent().find("output")[0].innerHTML = counter;
    if (counter < 0) {
      $(this).parent().find("output").removeClass()
      $(this).parent().find("output").addClass("redFont")
    }
    else if (counter < 10) {
      $(this).parent().find("output").removeClass()
      $(this).parent().find("output").addClass("orangeFont")
    }
    else {
      $(this).parent().find("output").removeClass()
    }
  })
});