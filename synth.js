

//function startAudioContext(){    
//    document.querySelector('#play-button').addEventListener('click', async () =>{
//            await Tone.start()
//    })
//}
//
//startAudioContext();

//setup Sound
//Setup volume
    let gain = new Tone.Gain(0.1).toMaster();
//Setup env   
    let env = new Tone.AmplitudeEnvelope({
            "attack" : 0.01,
			"decay" : 0.1,
			"sustain" : 1,
			"release" : 5
        }).connect(gain);
   
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


//buttons trigger synth

    
document.addEventListener("mousedown",()=>{
        if(event.target.className.baseVal === "key"){
       buttonTriggerSynth(1,sound,event.target.id)
        }
    });

document.addEventListener("mouseup",()=>buttonTriggerSynth(0,sound));



function buttonTriggerSynth(gate,sound,note){
    const { osc1, osc2, osc3, env } = sound;
    if(gate){
        
        osc1.frequency.value = note;
        osc2.frequency.value = osc1.frequency.value + 5;
        osc3.frequency.value = osc1.frequency.value - 5;
        
        env.triggerAttack();
        
        
    }else if (!gate){
        env.triggerRelease();
    }
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
}


document.addEventListener("keydown",()=>keyTriggerSynth(1,sound,keyboard,event.key))

document.addEventListener("keyup",()=>keyTriggerSynth(0,sound,keyboard,event.key))

function keyTriggerSynth(gate,sound,keyboard,key){
    console.log(key);
    const { osc1, osc2, osc3, env } = sound;
    
    if(gate && keyboard[key]){
        
        osc1.frequency.value = keyboard[key];
        osc2.frequency.value = osc1.frequency.value  + 50 ;
        osc3.frequency.value = osc1.frequency.value + 100;
        
        env.triggerAttack();
        
        
    }else if (!gate){
        env.triggerRelease();
    }
}


//control relative pitch of oscillators
//button to change waveshape
//connect to filter









