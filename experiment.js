
const jsPsych = initJsPsych({
    on_finish: function() {
    jsPsych.data.displayData();
}
});

var timeline = [];

var trial1 = {
    type: myplugin2, 
    image_fnames: [image_names[0], image_names[0], image_names[0], image_names[0]],
    instruction: "Which image is the best?"
}
timeline.push(trial1);

var trial2 = {
    type: myplugin2, 
    image_fnames: [image_names[0], image_names[0], image_names[0], image_names[0]],
    instruction: "Which image is the best?"
}
timeline.push(trial2);

jsPsych.run(timeline)