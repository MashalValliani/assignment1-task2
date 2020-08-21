$(document).ready(function(){
  
  //var incremented to check user exists or not
  count=0;
  
  //var to swipe over profiles array
  profileChanger=0;

  //var to check matches 
  profileStatus=0;

  //var to check email sent or not
  counter=0;

  //Carousel slider
  console.log('Ready')
  $(".carousel.carousel-slider").carousel({fullWidth: true});
  
  //Carousel slider autoplay
  autoplay();
  function autoplay() {
      $('.carousel').carousel('next');
      setTimeout(autoplay, 5000);
  }

  //dropdown for logout profile
  $('.dropdown-trigger').dropdown(
    { 'closeOnClick': true,
      
    }
  );

  //dropdown for gender select
  $('select').material_select();


  $("#signUp").click(function(event){
    //here the value is stored in variable. 
    var userName = $("#username").val();
    var pass= $("#password").val();
    var age = $("#age").val();
    var emailing= $("#email").val();
   
    document.cookie = emailing;
   
    document.location.href= "user.html";
  });
  
 
  //array of profiles, randomly assining 0 or 1 for status to match it with login user-> 0=dislike, 1=like
  let profiles=[
    {id:11,name:'Alex',password:'zxc',age:'30',status: Math.round(Math.random()), image:"assets/alex.jpg"},
    {id:12,name:'AR',password:'zxc',age:'25',status:Math.round(Math.random()), image:"assets/AR.jpg"},
    {id:13,name:'Josh',password:'zxc',age:'21',status:Math.round(Math.random()), image:"assets/Josh.jpg"},
    {id:14,name:'Kody',password:'zxc',age:'22',status:Math.round(Math.random()), image:"assets/Kody.jpg"},
    {id:15,name:'Henry',password:'zxc',age:'28',status:Math.round(Math.random()), image:"assets/Henry.jpg"}
]

//display profiles
$('#profilePicture').attr("src", profiles[profileChanger].image);
$('#bio').text(profiles[profileChanger].name+", "+profiles[profileChanger].age);

//on like button click event
$("#like").click(function(){
  if(profiles[profileChanger].status == 1){
    //ssending matched profile picture to html 
    $('#matchProfile1').attr("src","assets/pic.jpg");
    $('#matchProfile2').attr("src", profiles[profileChanger].image);
    
    //incrementing value to check if there were an matches or  not
    profileStatus=profileStatus+1;
    
    // showing matches profiles side by side
    $('#matched').css("visibility","visible")
    setTimeout(function() { 
    $('#matched').css("visibility","hidden")
  }, 4000);
    }

  var emailAdd = document.cookie;
  //getting user email addres from array and storing it in emailAdd variable
  /*for(var i=0; i<accounts.length; i++){
    if(accounts[i].uName == user){
      emailAdd = accounts[i].email
       break;
      }
  }*/
  //message to send
  var message = "You have found a match" + profiles[profileChanger].name + "will contact you soon!";
  var values={
    var1:emailAdd,
    var2:message
  }
  $.get("/public/user.html", values, function (data) {
    console.log("data entered"+ data)
    counter=counter+1;
    //email notification when its successful
    //alert(data)
  });
  
    //incrementing profile changer to display next image
    profileChanger= profileChanger+1
    $('#profilePicture').attr("src", profiles[profileChanger].image);
    $('#bio').text(profiles[profileChanger].name+", "+profiles[profileChanger].age);
    
    //if no matches than displaying message 
    if(profileChanger>profiles.length){
      if(profileStatus <=1 ){
        $('#like').attr("href", "#modal2");
        $('.modal').modal();
      }
    }
     });

//on dislike button click event
$("#dislike").click(function(){
    //incrementing profile changer to display next image
  profileChanger= profileChanger+1

  //if no matches than displaying message 
  if(profileChanger >= profiles.length){
    if(profileStatus <=1 ){
      $('#dislike').attr("href", "#modal2");
      $('.modal').modal();
    }
  }
  $('#profilePicture').attr("src", profiles[profileChanger].image);
  $('#bio').text(profiles[profileChanger].name+", "+profiles[profileChanger].age);
  
});
//operation through ARROW KEYS
if (top.location.pathname === '/user.html')
{
document.onkeydown = function(e) {
  switch(e.which) {
      case 37: // left NO
      //incrementing profile changer to display next image
      profileChanger= profileChanger+1

      //if no matches than displaying message 
      if(profileChanger >= profiles.length){
        if(profileStatus <=1 ){
          $('#dislike').attr("href", "#modal2");
          $('.modal').modal();
        }
      }
      $('#profilePicture').attr("src", profiles[profileChanger].image);
      $('#bio').text(profiles[profileChanger].name+", "+profiles[profileChanger].age);
      break;

    
      case 39: // right arror -> like
      if(profiles[profileChanger].status == 1){
        //ssending matched profile picture to html 
        $('#matchProfile1').attr("src","assets/pic.jpg");
        $('#matchProfile2').attr("src", profiles[profileChanger].image);
        
        //incrementing value to check if there were an matches or  not
        profileStatus=profileStatus+1;
        
        // showing matches profiles side by side
        $('#matched').css("visibility","visible")
        setTimeout(function() { 
        $('#matched').css("visibility","hidden")
      }, 4000);
        }
    
      var emailAdd = document.cookie;
  
      //message to send
      var message = "You have found a match" + profiles[profileChanger].name + "will contact you soon!";
      var values={
        var1:emailAdd,
        var2:message
      }
      $.get("/public/user.html", values, function (data) {
        console.log("data entered"+ data)
        counter=counter+1;
        //email notification when its successful
        //alert(data)
      });
      
        //incrementing profile changer to display next image
        profileChanger= profileChanger+1
        $('#profilePicture').attr("src", profiles[profileChanger].image);
        $('#bio').text(profiles[profileChanger].name+", "+profiles[profileChanger].age);
        
        //if no matches than displaying message 
        if(profileChanger>profiles.length){
          if(profileStatus <=1 ){
            $('#like').attr("href", "#modal2");
            $('.modal').modal();
          }
        }
      break;

      default: return; // exit this handler 
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
};
}

})
