var myplugin2 = (function (jspsych) {
  "use strict";

  const info = {
    name: "myplugin2",
    parameters: {
      image_fnames: {
        type: jspsych.ParameterType.IMAGE,
        default: undefined,
      },
      instruction: {
        type: jspsych.ParameterType.STRING,
        default: undefined,
      }
    },
  };

  class myplugin2 {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    /*
    https://www.jspsych.org/7.3/developers/plugin-development/
    Inside the .trial() method you can do pretty much anything that you want, including modifying the DOM, 
    setting up event listeners, and making asynchronous requests
    
    basically,
    the trial function sets up the display (DOM), registers the event listeners, and waits.

    TODO: https://www.jspsych.org/7.3/reference/jspsych-pluginAPI/#preloadimages 

    */ 
    trial(display_element, trial)
    {
      
      // show image
      let html_content = `
      <div>
      <h2>
      ${trial.instruction}
      </h2>
      </div>
      <div class="outer-container">
        <div class="container">
            <img src="${trial.image_fnames[0]}" class="image" id="image01">
            <img src="${trial.image_fnames[1]}" class="image" id="image02">
            <img src="${trial.image_fnames[2]}" class="image" id="image03">
            <img src="${trial.image_fnames[3]}" class="image" id="image04">      
        <div>
          <button class="next-button" disabled id="nextButton">Next</button>
      </div>
      </div>
      </div>
      <div>
        <input type="hidden" id="selectedImageId">
      </div>
      `;
      //console.log(html_content);
      display_element.innerHTML = html_content;
      var start_time = performance.now();
      console.log(start_time)

      /* 
      ============ pasted from ChatGPT ==========
      */
      const images = document.querySelectorAll('.image');
      let selectedImageId;

      images.forEach(image => {
        image.addEventListener('click', e => {
          // Remove border from previously selected image
          if (selectedImageId) {
            document.getElementById(selectedImageId).style.border = 'none';
          }
        // Add border to currently selected image
          image.style.border = '10px solid #95ae48';
          selectedImageId = image.id;
          console.log(selectedImageId);
          document.getElementById("selectedImageId").value = selectedImageId;

          var nextbutton_element = document.getElementById("nextButton");
          nextbutton_element.removeAttribute("disabled");
        });
      });
      /*
      ===========================================
      */

      const after_mouse_response = () => {  
        var end_time = performance.now();
        console.log(end_time)
        var calculated_rt = Math.round(end_time - start_time);
        
        // record the data

        let data_saved = {
          rt: calculated_rt,
          selectedImageId: document.getElementById("selectedImageId").value,
        }        
        console.log(data_saved);
        // clear the HTML stuff that was previously created
        display_element.innerHTML = '';    
        
        /* 
        The only requirement for the trial method is that it calls jsPsych.finishTrial() when it is done. 
        This is how jsPsych knows to advance to the next trial in the experiment 
        (or end the experiment if it is the last trial). 
        The plugin can do whatever it needs to do before that point.
        */
        this.jsPsych.finishTrial(data_saved);
      } // after_key_response  ends
    

      const nextbutton_element = document.getElementById("nextButton");
      nextbutton_element.addEventListener("click", after_mouse_response);

      /* // set up a keyboard event to respond only to the spacebar
      this.jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_key_response,
        valid_responses: [' '],
        persist: false
      }); */


      

    }// trial function ends
  }
  myplugin2.info = info;

  return myplugin2;
})(jsPsychModule);