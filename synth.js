

//function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
//}
//
//startAudioContext();

//setup Sound
//Setup volume
    let gain = new Tone.Gain(1).toMaster();
//Setup filter
    let filter = new Tone.Filter({
        type : 'lowpass',
        frequency : 100,
        rolloff : -24,
        Q : 12,
        gain : 0
    }).connect(gain);
//Setup env   
    let env = new Tone.AmplitudeEnvelope({
        "attack" : 0.01,
		"decay" : 0.01,
		"sustain" : 1,
		"release" : 2
    }).connect(filter);
  
 //Setup filter env      
    let filtEnv = new Tone.FrequencyEnvelope({
        "attack" : 0.001,
		"decay" : 0.01,
		"sustain" : 1,
		"release" : 2,
        "baseFrequency" : 300,
        "octaves" : 1,
        "exponent" : 1,
    }).connect(filter.frequency);
//Setup oscs
   
    let osc1 = new Tone.Oscillator(440,"square").connect(env).start();
    let osc2 = new Tone.Oscillator(440, "square").connect(env).start();
    let osc3 = new Tone.Oscillator(440, "square").connect(env).start();

const sound = {
    osc1: osc1,
    osc2: osc2,
    osc3: osc3,
    env: env
}
//Define keys to use for keyboard
const keyboard = {
    //bottom row
    z: "c1",
    s: "c#1",
    x: "d1",
    d: "d#1",
    c: "e1",
    v: "f1",
    g: "f#1",
    b: "g1",
    h: "g#1",
    n: "a1",
    j: "a#1",
    m: "b1",
    ',': "c2",
    l: "c#2",
    '.': "d2",
    ';': "d#2",
    '/': "e2",
     //top row
     q: "c2",
     2: "c#2",
     w: "d2",
     3: "d#2",
     e: "e2",
     r: "f2",
     5: "f#2",
     t: "g2",
     6: "g#2",
     y: "a2",
     7: "a#2",
     u: "b2",
     i: "c3",
     9: "c#3",
     o: "d3",
     0: "d#3",
     p: "e3",
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
    osc2.frequency.value = osc1.frequency.value + 1;
    osc3.frequency.value = osc1.frequency.value - 1;
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



//control relative pitch of oscillators
//button to change waveshape










