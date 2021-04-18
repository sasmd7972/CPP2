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
    //About
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
      
      $('#about').append(jqXHR.responseText);
    });

    // Degree
    getData({path:'/degrees'}).done(function(data){
      let degTitle = document.createElement('h2');
      degTitle.append('Undergraduate Degrees');
      $('#degree').append(degTitle);
      $.each(data.undergraduate,function(i, item){
        let ugDiv = document.createElement('div');
        let ugH3 = document.createElement('h3');
        let ugP = document.createElement('p');

        ugDiv.id = 'ugDiv';
        $(ugH3).append(item.title);
        $(ugP).append(item.description);
        $(ugDiv).append(ugH3,ugP);
        $('#degree').append( ugDiv);
      
      })

      let gTitle = document.createElement('h2');
      gTitle.append('Graduate Degrees');

      $.each(data.graduate,function(i, item){
        let gDiv = document.createElement('div');
        let gH3 = document.createElement('h3');
        let gP = document.createElement('p');

        gDiv.id = 'ugDiv';
        $(gH3).append(item.title);
        $(gP).append(item.description);
        $(gDiv).append(gH3,gP);
        $('#gdegree').append(gDiv);
      })
      $('#degree').append(gTitle);
     }).fail (function(jqXHR) {
      
      $('#minorAccordian').append(jqXHR.responseText);
    });

    // Minors
    // GetData Undergraduate description and info
    getData({path:'/minors/UgMinors'}).done(function(data){
      let ugMinors = data.UgMinors;
      for (let i = 0; i < ugMinors.length; i++ ){
        $("#minorAccordian").append("<h3>" + ugMinors[i].title.toUpperCase() + "</h3>")
          minorDetails = "<div>" +
          ugMinors[i].name + "<br>" +
          ugMinors[i].description + "<br>";
          courses = "<br>Courses:<br>"
          courses = courses + "<ul>";

          let ugCourses = [];
          for (let j = 0; j < ugMinors[i].courses.length; j++) {
            ugCourses.indexOf(ugMinors[i].courses[j]) === -1 ? ugCourses.push(ugMinors[i].courses[j]): console.log("exists");
            courses = courses + "<li>" + ugCourses[j] + "</li>" }
          courses = courses + "</ul>";
          minorDetails = minorDetails + courses;
  
        $("#minorAccordian").append(minorDetails)}
   
        $("#minorAccordian").accordion({
           collapsible: true,
           active: false,
           heightStyle: "content"
       });
     
     }).fail (function(jqXHR) {
      
      $('#minorAccordian').append(jqXHR.responseText);
    });

    // Employment
    getData({path:'/employment/'}).done(function(data){
      // Employment Heading      
      $("#employment").append("<h2 id='empTitle'>" + data.introduction.title + "</h2>");

      // This iterates through the employment introduction content makes title h3 and description p tag
      // Employment and Copperative Education Sections
      $.each(data.introduction.content,function(i, item){
        $("#employment").append("<div><h3>" + item.title + " </h3><p>" + item.description + "</p></div>");
      })


      // This is the Employers lists
      $("#employment").append('<div id="employmentDiv"><h2>' + data.employers.title + "</h2></div>")
      // Creating the ul that is getting all the employers names attached to
      let employmentUL = document.createElement('ul');
      employmentUL.id = "employmentUL";
      employmentDiv.appendChild(employmentUL);
      // This is the li being atteched to employersUL tag
      $.each(data.employers.employerNames,function(i, item){
        $("#employmentUL").append("<li>" + item + " </li>");
      })

      // This is the carrers lists
      $("#employment").append('<div id="careerDiv"><h2>' + data.careers.title + "</h2></div>");
      // Creating the ul that is getting all the careers names attached to
      let careersUL = document.createElement('ul');
      careersUL.id = "careersUL";
      careerDiv.appendChild(careersUL);
      // This is the li being attached to careersUL tag
      $.each(data.careers.careerNames,function(i, item){
        $('#careersUL').append("<li>" + item + " </li>");
      })

      // DegreeStatistics
      $("#employment").append('<div id="degreeStatisticsDiv"><h2>' + data.degreeStatistics.title + "</h2></div>");
      //Creating the ul that is getting all of degree statistics value and descriptions
      let degreeStaticsUL = document.createElement('ul');
      degreeStaticsUL.id = "degreeStaticsUL";
      degreeStatisticsDiv.appendChild(degreeStaticsUL);
      // This is the li being added to the ul
      $.each(data.degreeStatistics.statistics,function(i, item){
        $("#degreeStaticsUL").append("<li><b>" + item.value + "</b> - " + item.description + "</li>");
      })

      // Coop Table
      $("#employment").append("<h2>" + data.coopTable.title + "</h2>");
      // This is the coop table div
      $("#employment").append('<div id="coopTableDiv"></div>');
      // This creates the coopTable
      $("#coopTableDiv").jsGrid({
        width: "100%",
        height: "400px",

        inserting: false,
        editing: false,
        sorting: true,
        paging: true,

        data: data.coopTable.coopInformation,

        fields: [
            { name: "employer", type: "text", width: 125, validate: "required" },
            { name: "degree", type: "text", width: 50 },
            { name: "city", type: "text", width: 75 },
            { name: "term", type: "text", width: 10}
        ]
      });
  
      //Employment Table
      $("#employment").append("<h2>" + data.employmentTable.title + "</h2>");
      // This is the Employment table div
      $("#employment").append('<div id="employmentTableDiv"></div>');
       // This creates the employmentTable
       $("#employmentTableDiv").jsGrid({
         width: "100%",
         height: "400px",

         inserting: false,
         editing: false,
         sorting: true,
         paging: true,

         data: data.employmentTable.professionalEmploymentInformation,

         fields: [
             { name: "employer", type: "text", width: 125, validate: "required" },
             { name: "degree", type: "text", width: 50 },
             { name: "city", type: "text", width: 75 },
             { name: "title", type: "text", width: 150},
             { name: "startDate", type: "text", width: 50}
         ]
     });
    }).fail (function(jqXHR) {
      
      $('#employment').append(jqXHR.responseText);
    });

    // Faculty
    getData({path:'/people/faculty/'}).done(function(data){
      let ul = document.createElement('ul');
      let liDiv = document.createElement('div');

      ul.id = "facultyUL";
      liDiv = "staff-div";
      
      $('#content-staff').append(ul);
      $.each(data.faculty,function(i, item){
        $("#facultyUL").append(  "<div><li>" + item.title + " </li><li>" + item.name + "</li></div>");
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

    // Research
    
    getData({path:'/research/'}).done(function(data){
      // Employment Heading
      $('#research').append("<h2>" + "Research" + "</h2>" );
   
      $.each(data.byInterestArea,function(i, item){
        if ( i == 0){ //Adds ul tag at the start of the heading tabs
          $('#research').append('<ul id="Tabsul">');
        }
        $('#Tabsul').append("<li><a href=#div" + i + ">" + item.areaName + "</a></li>"); // Adding the heading of the tabs
        if ( i == data.byInterestArea.length-1){ // Closes the ul tag for the heading tabs
          $('#research').append("</ul>");
        }
      })
      $.each(data.byInterestArea,function(i, item){
        // This is a temp 
        let tempDiv;
        //Adds div tag at the start of the heading tabs
        tempDiv = "<div id='div" + i + "'>";
        $.each(item.citations,function(j, itemText){
          // Adds the items information into the div for the tab
          tempDiv = tempDiv + "<p>" + itemText + "</p>";
        });
        //Checks to see that the div is on its last item and appened the total information on to the tab
        $('#research').append(tempDiv + "</div>");
      })
      // This craete the tabs
      $('#research').tabs();
    }).fail (function(jqXHR) {
      
      $('#research').append(jqXHR.responseText);
    });

    // Footer
  getData({path:'/footer/'}).done(function(data){
    let count = 0;
    $('footer').append("<div id='social'></div>");
    // Social Media
    $.each(data.social,function(i, item){
      if( count == 0){
        $('#social').append("<h3>" + item + "</h3>");
      }
      count += 1;
      if( count == 4){
        $('#social').append("<a href='" + item + "'>" + "Twitter" + "</a><br>");
      }
      if( count == 5){
        $('#social').append("<a href='" + item + "'>" + "Facebook" + "</a>");
      }
    })

    // Quicklinks
    $('footer').append("<div id='quickLinks'></div>");
    $.each(data.quickLinks,function(i, item){
      $('#quickLinks').append("<a href='" + item.href + "'>" + item.title + "</a><br>");
    })

    $('#footer').append("<a href='" + data.news + "'>" + "News" + "</a>");

    // Copyright
    $('footer').append("<div id='copyright'></div>");
    $.each(data.copyright,function(i, item){
      // Copyright HTML
      if ( i == "html" ){
      $('#copyright').append(item);
      }
    })
    // //News
    // $('footer').append("<div id='news'></div>");
    // $('#news').append("<a href='" + data.news + "'>" + "News" + "</a>");
  }).fail (function(jqXHR) {
  
  $('footer').append(jqXHR.responseText);
});

    
    $('.navbar a').smoothScroll();
    $('#nav a').smoothScroll();

});
