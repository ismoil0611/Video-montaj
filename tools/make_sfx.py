# Synthesizes the Kinetic Reels SFX kit (deterministic, no third-party samples).
# Shapes modelled on the owner's reference reel (ref-6, nafmedia): see .claude/agents/video-montaj.md §7.7
# usage: python3 tools/make_sfx.py <out_dir>
import sys, os, numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 48000
rng = np.random.default_rng(7)
out = sys.argv[1] if len(sys.argv) > 1 else "sfx-kit"
os.makedirs(out, exist_ok=True)


def t_(d):
    return np.arange(int(SR * d)) / SR


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "bandpass", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "highpass", fs=SR, output="sos"), x)


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "lowpass", fs=SR, output="sos"), x)


def sweep_bp(noise, f0, f1, d, q=0.6, steps=48):
    # band-passed noise whose centre glides f0→f1 (block-wise, crossfaded)
    n = len(noise); y = np.zeros(n); blk = n // steps
    for i in range(steps):
        fc = f0 * (f1 / f0) ** (i / (steps - 1))
        lo, hi = fc * (1 - q / 2), min(fc * (1 + q / 2), SR / 2 - 100)
        seg = bp(noise, lo, hi)
        w = np.zeros(n); a, b = max(0, (i - 1) * blk), min(n, (i + 2) * blk)
        w[a:b] = np.hanning(b - a)
        y += seg * w
    return y


def save(name, x, peak=0.89):
    x = x / (np.max(np.abs(x)) + 1e-9) * peak
    fade = int(SR * 0.004); x[-fade:] *= np.linspace(1, 0, fade)
    st = np.stack([x, x], 1)
    wavfile.write(os.path.join(out, name), SR, (st * 32767).astype(np.int16))


# tick — word / digit reveal (ref: 28.7–29.4 counter, 5.6–6.4 word reveals): ~25 ms, 1.5–4 kHz body
t = t_(0.035)
tick = hp(rng.standard_normal(len(t)), 1500) * np.exp(-t * 260) + 0.6 * np.sin(2 * np.pi * 2300 * t) * np.exp(-t * 180)
save("tick.wav", tick, 0.8)

# pop — pill / card lands (ref: 32.1, 33.5, 35.4): pitch-up bubble 60 ms
t = t_(0.07)
f = 500 + 900 * (1 - np.exp(-t * 60))
pop = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 55)
save("pop.wav", pop)

# whoosh — sheet / card slide (ref: 3.9–4.3 into the red sheet): 0.55 s, centre rises 500→3 kHz
t = t_(0.55)
w = sweep_bp(rng.standard_normal(len(t)), 500, 3000, 0.55)
env = np.sin(np.pi * np.clip(t / 0.55, 0, 1)) ** 1.6
save("whoosh.wav", w * env)

# whoosh-down — exits / card deck falls away: 0.45 s, 3 kHz→400 Hz
t = t_(0.45)
w = sweep_bp(rng.standard_normal(len(t)), 3000, 400, 0.45)
env = np.sin(np.pi * np.clip(t / 0.45, 0, 1)) ** 1.3
save("whoosh_down.wav", w * env)

# riser — dot grows into a card, build-ups (ref: 8.6–10): 1.2 s, rising noise + rising sine
t = t_(1.2)
r = sweep_bp(rng.standard_normal(len(t)), 300, 6000, 1.2, q=0.5) * (t / 1.2) ** 2
r += 0.25 * np.sin(2 * np.pi * np.cumsum(200 * 4 ** (t / 1.2)) / SR) * (t / 1.2) ** 2
save("riser.wav", r, 0.8)

# impact — hook hit and hard cuts to a full-screen sheet (ref: 0.39, 19.08): sub drop 110→38 Hz + click
t = t_(0.8)
ph = 2 * np.pi * (38 * t + (110 - 38) * (1 - np.exp(-t * 9)) / 9)
imp = np.sin(ph) * np.exp(-t * 5.5) + 0.35 * lp(rng.standard_normal(len(t)), 900) * np.exp(-t * 40)
save("impact.wav", imp)

# shimmer — premium / arc-text reveals (ref: 37.2–37.5 sparkle above 8 kHz): 0.9 s
t = t_(0.9)
sh = np.zeros(len(t))
for k, (fr, st) in enumerate([(5200, 0.0), (6900, .05), (8300, .11), (9600, .17), (7400, .24), (10800, .3)]):
    e = np.where(t >= st, np.exp(-(t - st) * 7) * np.clip((t - st) / 0.006, 0, 1), 0)
    sh += np.sin(2 * np.pi * fr * t) * e * (1 + 0.3 * np.sin(2 * np.pi * 11 * t + k))
sh += 0.15 * hp(rng.standard_normal(len(t)), 8000) * np.exp(-t * 6)
save("shimmer.wav", sh, 0.7)

# flash — white flash / film-burn transition (ref: 36.9): airy noise swell + soft thump, 0.5 s
t = t_(0.5)
fl = hp(rng.standard_normal(len(t)), 2500) * np.sin(np.pi * t / 0.5) ** 2 + 0.6 * np.sin(2 * np.pi * 70 * t) * np.exp(-((t - 0.22) * 12) ** 2)
save("flash.wav", fl, 0.75)

print("wrote", sorted(os.listdir(out)))
