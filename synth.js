

function startAudioContext(){    
    document.querySelector('#play-button').addEventListener('click', async () =>{
            await Tone.start()
    })
}

startAudioContext();

//setup Sound
//Setup volume
    let gain = new Tone.Gain(0.1).toMaster();
//Setup env   
    let env = new Tone.AmplitudeEnvelope({
            "attack" : 0.01,
			"decay" : 0.1,
			"sustain" : 0.5,
			"release" : 0.5
        }).connect(gain);
   
//Setup oscs
   
    let osc1 = new Tone.Oscillator(440,"square").connect(env).start();
    let osc2 = new Tone.Oscillator(440, "square").connect(env).start();
    let osc3 = new Tone.Oscillator(440, "square").connect(env).start();

let sound = {
    osc1: osc1,
    osc2: osc2,
    osc3: osc3,
    env: env
}


//buttons trigger synth

    
document.addEventListener("mousedown",()=>{
        if(event.target.className.baseVal === "key"){
       triggerSynth(1,sound,event.target.id)
        }
    });

document.addEventListener("mouseup",()=>triggerSynth(0,env));

document.addEventListener("keydown",()=>triggerSynth(1,sound,keyboard,event.key))

function triggerSynth(gate,sound,note){
    const { osc1, osc2, osc3 } = sound;
    if(gate){
        
        osc1.frequency.value = note;
        osc2.frequency.value = osc1.frequency.value + 1;
        osc3.frequency.value = osc1.frequency.value - 1;
        
        env.triggerAttack();
        
        
    }else{
        env.triggerRelease();
    }
}



//control relative pitch of oscillators
//button to change waveshape
//connect to filter









