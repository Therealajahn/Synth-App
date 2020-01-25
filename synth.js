

function startAudioContext(){    
    document.querySelector('#play-button').addEventListener('click', async () =>{
            await Tone.start()

            let synth = new Tone.FMSynth().toMaster();
            synth.triggerAttackRelease("c5", "8n");
    })
}

startAudioContext();


//Oscillators

    //Setup volume env
    let gainNode = Tone.context.createGain();
    let env = new Tone.Envelope().connect(gainNode.gain);
    //Setup oscs
    let osc1 = new Tone.Oscillator(440,"square")connect(env).start();
//    let osc2 = new Tone.Oscillator(440,"square");
//    let osc3 = new Tone.Oscillator(440,"square");
    triggerSynth(env);



//control relative pitch of oscillators
//button to change waveshape
//connect to filter

//buttons trigger synth

 
    
let key = document.querySelector("#c").addEventListener("click",()=>triggerSynth(env));



function triggerSynth(env){
    console.log("key clicked!");
    
   env.triggerAttackRelease('4n','4n');
}

//buttons change abs pitch of oscillators
//sixteen keys control abs pitch of osccillators









