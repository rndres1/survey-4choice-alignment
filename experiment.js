
const n_trials = 5;

// ======== END OF PARAMS =======

const jsPsych = initJsPsych({
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

for (i=0;i<n_trials;i++)
{
    rindx = random_sample_without_replacement(4,filenames.length);
    image_set = [image_names[rindx[0]], image_names[rindx[1]], image_names[rindx[2]], image_names[rindx[3]]]
    var trial1 = {
        type: myplugin2, 
        image_fnames: image_set,
        instruction: "Which image is the best?"
    }
    timeline.push(trial1);
}





jsPsych.run(timeline);