

// function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
// }

// startAudioContext();

//gain
let gain = new Tone.Gain(0.1).toMaster();
//volume env
let env = new Tone.Envelope({
    "attack" : 0.1,
    "decay" : 0.2,
    "sustain" : 1,
    "release" : 0.8,
}).connect(gain);

//filter
let filter = new Tone.Filter({
    type : 'lowpass' ,
    frequency : 100,
    rolloff : -12 ,
    Q : 25,
    gain : 0
}).connect(gain);
//noise gen
let noise = new Tone.Noise("brown").start().connect(filter);

//filter freq env
let filtEnv = new Tone.FrequencyEnvelope({
    "attack" : 0.2,
    "release" : 0.5,
    "baseFrequency" : 300,
    "octaves" : 2
}).connect(filter.frequency);

let filterGain = new Tone.Gain(0.5);
const sound = {
    noise: noise,
    filter: filter,
    filtEnv: filtEnv,
    env: env,
};

function getElementClass(e){
   if(e.target.className.baseVal === "key"){
   buttonTriggerSynth(1,sound,e.target.id)
   }
   console.log(event.target);
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
    const { filtEnv, noise} = sound
    if(note){
        filtEnv.baseFrequency = note;
    }
    if(gate){
        noise.start();
    }else if(gate){
        noise.stop();
    }
}

function buttonTriggerSynth(gate,note,key){
    const { env } = sound;
    console.log("trigger",event.key);
    
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
        filtEnv.triggerRelease();
        env.triggerRelease();
        updateOscs(gate);
    }
}

function changeValue(knob,angle) {
    const { filtEnv } = sound;
    if(knob.className.baseVal.split(' ')[0] === "filter"){
        filtEnv.baseFrequency = angle + 100 ;
        console.log("freqVal",angle)
    }
    if(knob.className.baseVal.split(' ')[0] === "peak"){
        filter.Q.value = angle + 100 /10 ;
        console.log("peak",angle)
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
        changeValue(knob,angle);
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