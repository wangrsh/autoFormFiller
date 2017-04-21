       // ==UserScript==
      // @name        XY0-autoFormFiller
     // @namespace   http://www.link.to/form
    // @description Auto-fill a form, then submit it. Auto-refresh if brought to a confirmation page
   // @include     http://www.link.to/form/
  // @version     1
 // @grant       none
// ==/UserScript==

console.log('                              ');
console.log('            \\_|\\            ');
console.log('         ---script---         ');
///////////////////////\\\\\\\\\\\\\\\\\\\\\\\

var formURL = 'http://www.link.to/form';
var email_data = [
    {
        "FIELD1": "FirstName",
        "FIELD2": "LastName",
        "FIELD3": "email@address.com",
        "FIELD4": "Some other field",
        "FIELD5": "whatever"
    },
    {
        "FIELD1": "FirstName2",
        "FIELD2": "LastName2",
        "FIELD3": "email2@address.com",
        "FIELD4": "Some other field",
        "FIELD5": "whatever"
    },
    {
        "FIELD1": "FirstName3",
        "FIELD2": "LastName3",
        "FIELD3": "email3@address.com",
        "FIELD4": "Some other field",
        "FIELD5": "whatever"
    },
];

 // Creates custom stylesheets to be added to the page dynamically
//
var sheet = (function() {
  console.log("~ Adding new Style Sheet");
  
 // Create the <style> tag
 var style = document.createElement("style");

 // Add a media (and/or media query) here if you'd like!
 // style.setAttribute("media", "screen")
 // style.setAttribute("media", "only screen and (max-width : 1024px)")

 // WebKit hack :(
 style.appendChild(document.createTextNode(""));

 // Add the <style> element to the page
 document.head.appendChild(style);

 return style.sheet;
})();

 // Adds a CSS rule to a generated style sheet
//
function addCSSRule(sheet, selector, rules, index) {
  console.log("~ Adding Rule to Style Sheet");
 if("insertRule" in sheet) {
     sheet.insertRule(selector + "{" + rules + "}", index);
 }
 else if("addRule" in sheet) {
     sheet.addRule(selector, rules, index);
 }
}

// define the style change
//addCSSRule(sheet, "gform_fields_5", "background: yellow");
$("#gform_fields_5").css("background", "yellow");

// try to get the persistant indexing variable, if it dosn't exist, create it
if (localStorage.getItem("email_data_num") === null) {

    var email_data_num = 0;
    localStorage.setItem('email_data_num', email_data_num);

    alert("Click OK to start the Auto Form Filler");

    window.location.href = formURL;

} else {

    // if the form comfirmation page is detected 
    if(document.getElementById("gform_confirmation_message_5")) {

        // navigate back to the form
        window.location.href = formURL;

    } else {
        // start populating the form

        // get local storage index number, then incriment the number
        var email_data_num = localStorage.getItem('email_data_num');
        localStorage.setItem('email_data_num', (parseInt(email_data_num) + 1));

        // if we are finished with the entire set of data, otherise, keep going
        if (email_data.length <= email_data_num) {
            alert("All Done!");
        } else {

            var email_data_person = email_data[email_data_num];

            console.log( "~ on entry number: " + email_data_num );

            // fill input fields
            $("#input_5_1").val(email_data_person.FIELD2);
            $("#input_5_5").val(email_data_person.FIELD1);
            $("#input_5_2").val(email_data_person.FIELD3);

            // click on a form checkbox
            $('#choice_5_6_1').on('click', function() {
                //alert($(this).text());
            });
            $('#choice_5_6_1').trigger('click');

            // wait a second, then click submit
            setTimeout(function(){
                console.log("~ clicking submit");

                // $("#gform_submit_button_5").click(function(){
                //  console.log("button clicked");
                // });

                // $('#gform_submit_button_5').on('click', function() {
                    
                // });
                // $('#gform_submit_button_5').trigger('click');

            },1000);
        }
    }
}





console.log('         --/script---         ');

