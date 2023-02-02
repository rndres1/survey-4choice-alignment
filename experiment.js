
const n_trials = 10;

// ======== END OF PARAMS =======

const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
    jsPsych.data.displayData();
}
});

function random_sample_without_replacement(sample_size, population_size) {
    const arr = [];
    while(arr.length < sample_size){
        var r = Math.floor(Math.random() * population_size) + 1;
        if(arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    return(arr)
}

image_names = filenames.map(i => './media/' + i);
var timeline = [];

// preload the files that are actually going to be used
var image_set_used = []
for (i=0;i<n_trials;i++)
{
    rindx = random_sample_without_replacement(4,filenames.length);
    image_set = [image_names[rindx[0]], image_names[rindx[1]], image_names[rindx[2]], image_names[rindx[3]]];
    image_set_used.push(image_set);
    console.log(image_set);
}

var preload = {
    type: jsPsychPreload,
    images: image_set_used,
    max_load_time: 990000, // make it large so that chances of failing are low
    continue_after_error: true,
    message: 'Please wait while the experiment loads. This may take a few minutes.'
};
timeline.push(preload);
for (i=0;i<n_trials;i++)
{
    
    var trial1 = {
        type: myplugin2, 
        image_fnames: image_set_used[i],
        instruction: "Which image is the best?"
    }
    timeline.push(trial1);
}





jsPsych.run(timeline);