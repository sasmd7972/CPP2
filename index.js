// index.js
$(document).ready(function(){

	function getData(pathName){
        return $.ajax({
        type: 'get',
        url:'http://solace.ist.rit.edu/~plgics/proxy.php',
        dataType:'json',
        data: pathName,
        cache:false,
        async:true
        })
    }

    getData({path:'/people/faculty/'}).done(function(data){
      let ul = document.createElement('ul');
      let liDiv = document.createElement('div');

      ul.id = "facultyUL";
      liDiv = "staff-div";
      
      $('#content-staff').append(ul);
      $.each(data.faculty,function(i, item){
        $("#facultyUL").append(  "<div><li>" + item.title + " </li><li>" + item.name + "</li></div>");
        // var imageUrl = data.faculty[i].imagePath;
        // $("#facultyUL div").css("background-image", "url(" + imageUrl + ")");
      })
      $('#facultyUL div').click(function(){
        let listItemText = $(this).children('li').last().text();
        console.log(listItemText);
        for (let i = 0; i < data.faculty.length; i++) {
          if (data.faculty[i].name == listItemText) {
            var divContent = "<div><ul>";

            divContent += "<li><font color='#18ADEA'><b><u>Title:</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>" + data.faculty[i].title + "</b></<li>"	
            divContent += "<li><font color='#18ADEA'><b><u>Email:</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>" + data.faculty[i].email + "</b></<li>"
            divContent += "<li><font color='#18ADEA'><b><u>Office:</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>" + data.faculty[i].office + "</b></<li><br><br>"	
            divContent += "<img src =" + data.faculty[i].imagePath + ">";

            divContent +=  "</ul></div>"; 

            $("#dialog").html(divContent);
            $("#dialog").dialog( "option", "title", listItemText );
            $( "#dialog" ).dialog( "open" )
            break;
          }
        }
      })

      
    }).fail (function(jqXHR) {
        // Consider using the jQueryUI "Dialog" widget to display errors
        $('#content-staff').append(jqXHR.responseText);
    });

    $("#dialog").dialog({
      autoOpen: false,
      width: 600,
      buttons: [
          {
              text: "OK",
              icons: {
                  primary: "ui-icon-heart"
              },
              click: function() {
                  $( "#dialog" ).dialog( "close" );
              }
          }
      ]
  });
})