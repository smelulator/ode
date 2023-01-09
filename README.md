# smelUlator
Something smells funky 

![iui](https://github.com/b0mTrady/smelUlator/blob/main/IUI.png)

smelUlator is a new way of thinking about the electronic music machine. 

## Version 1 

- Python 
  - [aubio](https://aubio.org/)
  - [librosa](https://librosa.org/)
- SvelteKit

## Version 2

- SvelteKit
- WebAssembly
- Audio Worklet
- C/Rust

### Audio Worklet 

Achieving near native audio processing is now [possible due to the addition of audio worklet](https://developer.chrome.com/blog/audio-worklet/), making browser based audio applications the next target environment. 

Very importantly audio worklet [works in](https://caniuse.com/?search=audio%20worklet) Chrome for Android, Safari for iOSand FireFox for Android (not all features don't work for FF for andriod). Mobile application opportunities abound. 

The [audio-worklet](https://developer.chrome.com/blog/audio-worklet/) passes scripts to the render thread, thereby not blocking other browser processes (the cause of audio glitches in web audio api). 


From the [hello audio worklet code](https://github.com/GoogleChromeLabs/web-audio-samples/tree/main/src/audio-worklet/basic/hello-audio-worklet/) we see much of the standard webAudio code: 

```
const audioContext = new AudioContext();

const startAudio = async (context) => {
  await context.audioWorklet.addModule('bypass-processor.js');
  const oscillator = new OscillatorNode(context);
  const bypasser = new AudioWorkletNode(context, 'bypass-processor');
  oscillator.connect(bypasser).connect(context.destination);
  oscillator.start();
};

```
