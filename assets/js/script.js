//This checks if the webpage is ready, leave it alone

$(document).ready(function () {
    console.log('Hello World!');

    
    
//    this searches for the class of title in the document 
//    and applies a click function
    
    $("#complete-toggle").click(function () {
        //       this line applies a show/hide toggle on the element with a class of toggle
       $(this).siblings("#completed").toggle();

//       $('#completed').toggle();
    });    
    
});
//the above closes the document ready function
