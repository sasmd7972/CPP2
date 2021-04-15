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
      // console.log(data.faculty);
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

/*
 * GetData 
 * Undergraduate description and info
 *  
*/
  getData({path:'/minors/UgMinors'}).done(function(data){
    let ugMinors = data.UgMinors;
    for (let i = 0; i < ugMinors.length; i++ ){
      $("#minorAccordian").append("<h3>" + ugMinors[i].name.toUpperCase() + "</h3>")
        degreeDetails = "<div>" +
          ugMinors[i].title + "<br>" +
          ugMinors[i].description + "<br>";
          let 
          courses = "<br>Courses:"
          courses = courses + "<ul>";

          let ugCourses = [];
          for (let j = 0; j < ugMinors[i].courses.length; j++) {
            ugCourses.indexOf(ugMinors[i].courses[j]) === -1 ? ugCourses.push(ugMinors[i].courses[j]): console.log("This item already exists");

            // console.log(ugCourses);
            courses = courses +
              "<li>" + ugCourses[j] + "</li>"
          }
          courses = courses + "</ul>";
          degreeDetails = degreeDetails + courses;

      $("#minorAccordian").append(
          degreeDetails
      )                        
    }

    $("#minorAccordian").accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    });
  
  });

})

//About
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

    getData({path:'/about/'}).done(function(data){
      let titleText = document.createTextNode(data.title);
      let contentText = document.createTextNode(data.description);
      let quoteText = document.createTextNode(data.quote);
      let quoteAuthorText = document.createTextNode(data.quoteAuthor);

      let titlediv = document.createElement('div');
      let content = document.createElement('p');
      let quote = document.createElement('div');
      let quoteAuthor = document.createElement('div');
      
      titlediv.appendChild(titleText);
      content.appendChild(contentText);
      quote.appendChild(quoteText);
      quoteAuthor.appendChild(quoteAuthorText);

      $('#about').append(titlediv,content,quote,quoteAuthor);
    }).fail (function(jqXHR) {
      // Consider using the jQueryUI "Dialog" widget to display errors
      $('#about').append(jqXHR.responseText);
  });
})