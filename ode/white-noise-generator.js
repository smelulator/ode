class WhiteNoiseProcessor extends AudioWorkletProcessor {
    constructor(){
        super();
    }
}

    // input and output are float32 arrays each of which 
    // contains audio data for one channel 
    process(inputs, outputs, parameters) {
        const input = inputs[0];
        const output = outputs[0];
        const channelCount = input.length;
    }




registerProcessor("white-noise-generator", WhiteNoiseProcessor);


