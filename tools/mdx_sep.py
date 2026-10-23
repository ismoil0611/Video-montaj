# Minimal UVR MDX-Net (Voc_FT) separation: writes vocals.wav and rest.wav (mix - vocals)
import sys, numpy as np, onnxruntime as ort
from scipy.io import wavfile
model, src, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
N_FFT, HOP, DIM_F, DIM_T, COMP = 7680, 1024, 3072, 256, 1.021
sr, mix = wavfile.read(src); mix = mix.astype(np.float32).T / 32768.0  # [2, n]
win = np.hanning(N_FFT + 1)[:-1].astype(np.float32)  # periodic hann
n_bins = N_FFT // 2 + 1
chunk = HOP * (DIM_T - 1); trim = N_FFT // 2; gen = chunk - 2 * trim

def stft(x):  # x [2, chunk] -> [4, DIM_F, DIM_T]
    xp = np.pad(x, ((0, 0), (N_FFT // 2, N_FFT // 2)), mode="reflect")
    frames = np.stack([xp[:, i * HOP:i * HOP + N_FFT] * win for i in range(DIM_T)], -1)  # [2, N_FFT, T]
    S = np.fft.rfft(frames, axis=1)  # [2, n_bins, T]
    out = np.stack([S[0].real, S[0].imag, S[1].real, S[1].imag])
    return out[:, :DIM_F].astype(np.float32)

def istft(s):  # s [4, DIM_F, DIM_T] -> [2, chunk]
    full = np.zeros((4, n_bins, DIM_T), np.float32); full[:, :DIM_F] = s
    S = np.stack([full[0] + 1j * full[1], full[2] + 1j * full[3]])
    frames = np.fft.irfft(S, n=N_FFT, axis=1) * win[None, :, None]
    L = N_FFT + HOP * (DIM_T - 1)
    y = np.zeros((2, L), np.float32); wsum = np.zeros(L, np.float32)
    for i in range(DIM_T):
        y[:, i * HOP:i * HOP + N_FFT] += frames[:, :, i]; wsum[i * HOP:i * HOP + N_FFT] += win ** 2
    y /= np.maximum(wsum, 1e-8)
    return y[:, N_FFT // 2:N_FFT // 2 + chunk]

n = mix.shape[1]
pad = gen - n % gen
mixp = np.concatenate([np.zeros((2, trim), np.float32), mix, np.zeros((2, pad + trim), np.float32)], 1)
sess = ort.InferenceSession(model)
voc = []
for i in range(0, n + pad, gen):
    seg = mixp[:, i:i + chunk]
    spec = sess.run(None, {"input": stft(seg)[None]})[0][0]
    voc.append(istft(spec)[:, trim:-trim])
voc = np.concatenate(voc, 1)[:, :n] * COMP
rest = mix - voc
for name, a in (("vocals", voc), ("rest", rest)):
    wavfile.write(f"{outdir}/{name}.wav", sr, (np.clip(a.T, -1, 1) * 32767).astype(np.int16))
print("done", n / sr, "s")
