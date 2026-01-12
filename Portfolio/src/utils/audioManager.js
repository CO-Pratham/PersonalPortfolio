// React Web Audio Implementation
// Pure synthesis - No external files, no 403 errors.

class SoundSynthesizer {
    constructor() {
        this.context = null;
        this.masterGain = null;
    }

    init() {
        if (typeof window === 'undefined') return;
        if (!this.context) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;

            this.context = new AudioContext();
            this.masterGain = this.context.createGain();
            this.masterGain.gain.value = 0.3;
            this.masterGain.connect(this.context.destination);
        }
        if (this.context.state === 'suspended') {
            this.context.resume().catch(() => { });
        }
    }

    playTone(freq, type, duration, vol = 1) {
        this.init();
        if (!this.context) return;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.context.currentTime);

        gain.gain.setValueAtTime(vol, this.context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start();
        osc.stop(this.context.currentTime + duration);
    }

    playNoise(duration, vol = 0.2) {
        this.init();
        if (!this.context) return;

        try {
            const bufferSize = this.context.sampleRate * duration;
            const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            const noise = this.context.createBufferSource();
            noise.buffer = buffer;
            const gain = this.context.createGain();

            gain.gain.setValueAtTime(vol, this.context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

            noise.connect(gain);
            gain.connect(this.masterGain);
            noise.start();
        } catch (e) {
            // Ignore buffer errors
        }
    }
}

const synth = new SoundSynthesizer();

export const playSound = (type) => {
    // Prevent errors during SSR or before interaction
    if (typeof window === 'undefined') return;

    try {
        switch (type) {
            case 'type':
                synth.playTone(600, 'triangle', 0.05, 0.05); // Subtle click
                synth.playNoise(0.03, 0.1); // Keycap noise
                break;
            case 'click':
                synth.playTone(400, 'sine', 0.1, 0.15);
                break;
            case 'error':
                synth.playTone(150, 'sawtooth', 0.3, 0.2);
                break;
            case 'success':
                setTimeout(() => synth.playTone(440, 'sine', 0.3, 0.1), 0);
                setTimeout(() => synth.playTone(554, 'sine', 0.3, 0.1), 100);
                break;
            case 'boot':
                synth.init();
                break;
            default:
                break;
        }
    } catch (e) {
        console.warn('Audio play failed', e);
    }
};
