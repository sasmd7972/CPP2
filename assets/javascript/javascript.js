

/*
Author: Steven Varada
Function: This is for the staff of IST and its being added to a div with
the ID of content
*/
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
ul.id = "facultyUL";
$('#content').append(ul);
$.each(data.faculty,function(i, item){
    $("#facultyUL").append(  "<li> Name: " + item.name + "</li>");
})
}).fail (function(jqXHR) {
    // Consider using the jQueryUI "Dialog" widget to display errors
    $('#content').append(jqXHR.responseText);
});
})