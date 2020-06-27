/* @brief Language filtering        */
/* @author Alec Weiss               */
/* @date 6-2020                     */

export {languageFilterEventListener,set_language_filter};

var filter_dict_nice = { // this contains RegExp():'replace' values
      'fudge'            : /\bfuck/ig,
      'darn'             : /\bdamn/ig,
      'shoot'            : /\bshit/ig,
      'booty'            : /\bass(hole)*\b/ig,
      'pain in the butt' : /\bbitch/ig,
      'unpleasant-thing' : /\bdick/ig,
    };

/*
@brief filter language in the main text
@param[in] element - element to filter
*/
function filter_children(element){
    // filter anything in headers or paragraphs on the page
    var filter_types = ['p','h1','h2','h3','h4','h5'];
    for(var ft of filter_types){
        var filter_elems = element.querySelectorAll(ft);
        for(var fe of filter_elems){
            filter_language(fe,filter_dict_nice);
        }
    }
}

/*
@brief apply the language filter given a filter_dict
*/
function filter_language(element,filter_dict){
    var myhtml = element.innerHTML;
    for(var rep_val in filter_dict){
        myhtml = myhtml.replace(filter_dict[rep_val],rep_val)
      }
    element.innerHTML = myhtml;
}

function set_language_filter(filter_state){
    // set the current value
    document.getElementsByTagName('html')[0].setAttribute('data-language-filter',theme_value); 
    //write to storage
    if (typeof(Storage) !== "undefined") { // set the user values
        sessionStorage.setItem('data-language-filter',filter_state);
    } else { //otherwise use cookies
        document.cookie = "data-language-filter="+filter_state+";path=/";
    }

    // now run the filter if we turned on the value
    if(filter_state==true){
        filter_children(document.querySelector('main'));
    }
}

/*
@brief handler for language filter selector
*/
function languageFilterEventListener(){
    var lang_filt_state = document.querySelector('#language_filter_checkbox').checked;
    set_language_filter(lang_filt_state);
  }
  