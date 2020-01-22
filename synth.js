

//Start Audio Context



document.querySelector('#play-button').addEventListener('click',function(){
    
    
    if (Tone.context.state !== 'running'){
        Tone.context.resume();
        console.log("context running");
    }
   
})

//Oscillators
//control relative pitch of oscillators
//button to change waveshape
//connect to filter

//buttons trigger synth
let key = document.querySelector('#c\\#').addEventListener("click",clickKeys);

function clickKeys(){
    console.log("key clicked!");
    const synth = new Tone.MetalSynth().toMaster();

    synth.triggerAttackRelease("C4", "4n");
}
//buttons change abs pitch of oscillators
//sixteen keys control abs pitch of osccillators









