/* @brief useful UI functions       */
/* @author Alec Weiss               */
/* @date 6-2020                     */

export {toggle_display}

function toggle_display(element,display_type='block') {
    if (element.style.display === "none") {
      element.style.display = display_type;
    } else {
      element.style.display = "none";
    }
  }