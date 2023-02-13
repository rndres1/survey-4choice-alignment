
const n_trials = 5;

// ======== END OF PARAMS =======

const jsPsych = initJsPsych({
    show_progress_bar: true,
    on_finish: function() {
    jsPsych.data.displayData();
}
});

function random_sample_without_replacement(sample_size, population) {
    const arr = [];
    population_size = population.length;
    while(arr.length < sample_size){
        var r = Math.floor(Math.random() * population_size) + 1;
        if(arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }
    retarr = [];
    for (i=0;i<arr.length;i++)
    {
        retarr.push(population[arr[i]]);
    }
    return retarr;    
}

var timeline = [];
image_names = filenames.map(i => './media/' + i);

var image_set_used = [];
for (ivar=0;ivar<n_trials;ivar++)
{
    image_set = random_sample_without_replacement(6,image_names);
    image_set_used.push(image_set);    
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
        type: myplugin_6choice, 
        image_fnames: image_set_used[i],
        instruction: "Choose the image most aligned to the text",
        alignPrompt: "expressing the emotion joy"
        // todo: alignPrompt should be generated from filenames
    }
    timeline.push(trial1);
}

jsPsych.run(timeline);