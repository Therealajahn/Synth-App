

//function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
//}
//
//startAudioContext();

//setup Sound
//Setup volume
    let gain = new Tone.Gain(0.05).toMaster();
//Setup filter
    let filter = new Tone.Filter({
        type : 'lowpass',
        frequency : 100,
        rolloff : -12,
        Q : 20,
        gain : 0
    }).connect(gain);
//Setup env   
    let env = new Tone.AmplitudeEnvelope({
        "attack" : 0.01,
		"decay" : 0.01,
		"sustain" : 1,
		"release" : 5
    }).connect(filter);
  
 //Setup filter env      
    let filtEnv = new Tone.FrequencyEnvelope({
        "attack" : 0.001,
		"decay" : 0.01,
		"sustain" : 0.5,
		"release" : 2,
        "baseFrequency" : 250,
        "octaves" : 2,
        "exponent" : 1,
    }).connect(filter.frequency);
//Setup oscs
   
    let osc1 = new Tone.Oscillator(440,"sawtooth").connect(env).start();
    let osc2 = new Tone.Oscillator(440, "sawtooth").connect(env).start();
    let osc3 = new Tone.Oscillator(440, "sawtooth").connect(env).start();

const sound = {
    osc1: osc1,
    osc2: osc2,
    osc3: osc3,
    env: env
}




//buttons trigger synth

    
document.addEventListener("mousedown",()=>{
        if(event.target.className.baseVal === "key"){
       buttonTriggerSynth(1,sound,event.target.id)
        }
    });

document.addEventListener("mouseup",()=>buttonTriggerSynth(0,sound));

document.addEventListener("keydown",()=>buttonTriggerSynth(1,sound,keyboard[event.key],event.key))

document.addEventListener("keyup",()=>buttonTriggerSynth(0,sound,keyboard[event.key],event.key))

      
function updateOscs(note,sound) {
    const { osc1, osc2, osc3 } = sound
    osc1.frequency.value = note;
    osc2.frequency.value = osc1.frequency.value + 5;
    osc3.frequency.value = osc1.frequency.value - 5;
}

function buttonTriggerSynth(gate,sound,note,key){
    const { env } = sound;
    
    if(gate){
       if(key){
           updateOscs(keyboard[key],sound)
       }
        updateOscs(note,sound);
       env.triggerAttack();
       filtEnv.triggerAttack();
    }else if (!gate){
        env.triggerRelease();
        filtEnv.triggerRelease();
    }
}
//Rotate knob when cliked based on mouse distance
let filterKnob = document.getElementsByClassName("filter-knob");

let knobClicked = false;
//detect if mouse held down or not on knob
filterKnob[0].addEventListener("mousedown", () => {
    knobClicked = true;
    document.addEventListener("mousemove", () => {
        console.log("x",event.clientX);
        console.log("y:",event.clientY);
    })
});


if(knobClicked){
    document.addEventListener("mouseup", () => {
    
        console.log(knobClicked);
        document.removeEventListener("mousemove", () => {
            console.log("x",event.clientX);
            console.log("y:",event.clientY);
        })
    });
}

s
 
 



//control relative pitch of oscillators
//button to change waveshape










