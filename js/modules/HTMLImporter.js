/* @brief Import HTML from file     */
/* @note this requires Jquery       */
/* @author Alec Weiss               */
/* @date 6-2020                     */

/*
@brief Load any modules on the page (as seen with <import> tags) from its src attribute
@note The <import> tag is NOT valid html. It will be replaced with anything in its src
@note THIS DOES NOT ALLOW NESTED IMPORTS
*/
function import_html_modules(){
    // first lets get all of our import tags on the page
    var import_tag = 'html-import';
    var import_elements = document.getElementsByTagName(import_tag);
    // now lets replace each one
    // a while loop must be used because we delete the nodes as they are processed
    // I dont love this, but it works
    while(import_elements.length){
      // get the path  
      var src_path = import_elements[0].getAttribute('src');
      //load in the source data (or create request to do so)
      replace_element_from_file(import_elements[0],src_path);
      console.log('element_count=',import_elements.length);
    }
  }
  
  /*
  @brief Replace a given element with html from a file
  @note This currently uses jquery to load data into a div with the same ID
  @param[in] element - element to replace
  @param[in] file_path - path to the html file to replace the element with
  */
  function replace_element_from_file(element,file_path){
    var parent = element.parentNode;
    var element_id = element.getAttribute('id');
    var new_div = document.createElement('div'); // create thd div
    new_div.setAttribute('id',element_id);
    parent.replaceChild(new_div,element);
    $(new_div).load(file_path); // load into the div
    /*
    var xhttp = new XMLHttpRequest();
    xhttp.addEventListener("load", function(){
      var parent = element.parentNode;
      parent.innerHTML = this.responseText + parent.innerHTML;
      parent.remove(parent.getElementByTagName('html-import'));
    });
    xhttp.open("GET", file_path);
    xhttp.send();
    */
  }
  
 
  