

// function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
// }

// startAudioContext();

//setup Sound
//Setup volume
    let gain = new Tone.Gain(0.1).toMaster();
//Setup filter
    let filter = new Tone.Filter({
        type : 'lowpass',
        frequency : 100,
        rolloff : -12,
        Q : 20,
        gain : 0,
    }).connect(gain);
//Setup env   
    let env = new Tone.AmplitudeEnvelope({
        "attack" : 0.01,
		"decay" : 0.01,
		"sustain" : 1,
		"release" : 0.5
    }).connect(filter);
  
 //Setup filter env      
    let filtEnv = new Tone.FrequencyEnvelope({
        "attack" : 0.001,
		"decay" : 0.01,
		"sustain" : 0.5,
		"release" : 0.5,
        "baseFrequency" : 250,
        "octaves" : 2,
        "exponent" : 1,
    }).connect(filter.frequency);
//Setup oscs
   
    let osc1 = new Tone.Oscillator(440,"square").connect(env);
    let osc2 = new Tone.Oscillator(440, "square").connect(env);
    let osc3 = new Tone.Oscillator(440, "square").connect(env);

const sound = {
    osc1: osc1,
    osc2: osc2,
    osc3: osc3,
    env: env,
    gain: gain,
}

function getElementClass(e){
   if(e.target.className.baseVal === "key"){
   buttonTriggerSynth(1,sound,e.target.id)
   }
   console.log(e.target.className);
   if(e.target.className.includes("knob")){
        // console.log("knobclicked???");
        turnKnob(e);    
    }
} 
document.addEventListener("mousedown", getElementClass);

document.addEventListener("keydown",()=>buttonTriggerSynth(1,keyboard[event.key],event.key))

document.addEventListener("keyup",()=>buttonTriggerSynth(0,keyboard[event.key],event.key))

      
function updateOscs(gate,note) {
    const { osc1, osc2, osc3 } = sound
    if(note){
    osc1.frequency.value = note;
    osc2.frequency.value = osc1.frequency.value + 1;
    osc3.frequency.value = osc1.frequency.value - 1;
    }
    if(gate){
        osc1.start();
        osc2.start();
        osc3.start();
    }else if(gate){
        osc1.stop();
        osc2.stop();
        osc3.stop();
    }
}

function buttonTriggerSynth(gate,note,key){
    const { env } = sound;
    console.log("trigger",event.key);
    console.log("gain",gain.gain.value);
    if(gate){
        console.log("envelope attack trigger");
    
        //if key is pressed
        if(key){
           updateOscs(gate,keyboard[key],sound)
       }
       //if button is clicked
        updateOscs(gate,note,sound);
       env.triggerAttack();
       filtEnv.triggerAttack();
    }else if (!gate){
        console.log("envelope release trigger")
        env.triggerRelease();
        filtEnv.triggerRelease();
        updateOscs(gate);
    }
}

//disables default dragging behavior, prenventing knob turning bug 
document.ondragstart = function(){
    return false;
};

function turnKnob(e){
let knob = document.getElementsByClassName(e.target.className.split(' ')[0])[1];
// console.log("knob",knob);
let angle = 0;
    // console.log("angle",angle);
    const past = e.pageY + angle;
    console.log(past);
    function getMouseDistance(e){
        let currentY = e.pageY;
        let distanceY = (currentY - past) * -1;
        angle = distanceY;
        // console.log('currentAngle',angle);
        knob.style.transform = `rotate(${angle}deg)`;
    };

    document.addEventListener("mousemove",getMouseDistance);
    
    function removeListeners(){
        // console.log('up');
        document.removeEventListener("mousemove",getMouseDistance);
        document.removeEventListener("mouseup",removeListeners)
    }

    document.addEventListener("mouseup",removeListeners)
};




//control relative pitch of oscillators
//button to change waveshape