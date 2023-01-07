let audioContext = null;
let whiteNoiseNode;
let gainNode;

async function createWhiteNoiseProcessor() {
    if (!audioContext){
        try {
            audioContext = new AudioContext();
        } catch (e){
            console.log("Did not create audioContext");
            return null;
        }
    }
    let processorNode;

    try {
        processorNode = new AudioWorkletNode(audioContext, "white-noise-generator");
    } catch (e) {
        try {
            console.log("adding node");
            await audioContext.audioWorklet.addModule("white-noise-generator.js");
            processorNode = new AudioWorkletNode(audioContext, "white-noise-generator")
        } catch (e) {
            console.log("Unable to create audioWorklet ${e}");
            return null;
        }
    }
    await audioContext.resume();
    return processorNode;
}

async function audioStart(){
    whiteNoiseNode = await createWhiteNoiseProcessor();
    if (!whiteNoiseNode) {
        console.log("Could not create white noise generator");
        return; 
    }

    const soundSource = new OscillatorNode(audioContext);
    gainNode = audioContext.createGain();
    soundSource.type = "sawtooth";
    soundSource.frequency.setValueAtTime(440, audioContext.currentTime);
    
    soundSource.connect(gainNode).connect(whiteNoiseNode).connect(audioContext.destination);
    soundSource.start();
}
