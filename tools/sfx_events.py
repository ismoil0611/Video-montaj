import sys, numpy as np
from scipy.io import wavfile
from scipy.signal import stft, find_peaks
sr, x = wavfile.read(sys.argv[1]); x = x.astype(np.float32).mean(1)/32768
_, vv = wavfile.read(sys.argv[2]); v = vv.astype(np.float32).mean(1)/32768
f, t, Z = stft(x, sr, nperseg=2048, noverlap=2048-441); P = np.abs(Z)**2
_, _, ZV = stft(v, sr, nperseg=2048, noverlap=2048-441); PV = np.abs(ZV)**2
def db(a): return 10*np.log10(a+1e-12)
tot = db(P.sum(0)); voc = db(PV.sum(0))
bands = {"sub":(20,90),"low":(90,400),"mid":(400,3000),"high":(3000,8000),"air":(8000,18000)}
B = {k: db(P[(f>=a)&(f<b)].sum(0)) for k,(a,b) in bands.items()}
# music bed: median of rest in frames where nothing transient happens
print("rest median dB:", np.median(tot).round(1), "| vocals median dB:", np.median(voc[voc>-60]).round(1))
flux = np.maximum(0, np.diff(tot, prepend=tot[0]))
pk, pr = find_peaks(tot, prominence=7, distance=12)
print(" t     peak  aboveBed  vsVoice  dominant  dur  centroid_start->end(Hz)")
bed = np.median(tot)
for i in pk:
    if tot[i] - bed < 6: continue
    j = i
    while j < len(tot)-1 and tot[j] > tot[i]-15: j += 1
    k = i
    while k > 0 and tot[k] > tot[i]-15: k -= 1
    dom = max(B, key=lambda b: B[b][i])
    seg = P[:, k:j+1]; cen = (f[:,None]*seg).sum(0)/(seg.sum(0)+1e-12)
    print(f"{t[i]:5.2f}  {tot[i]:5.1f}  {tot[i]-bed:6.1f}  {tot[i]-np.median(voc[voc>-60]):6.1f}   {dom:5s}  {(j-k)*10:4d}ms  {cen[0]:6.0f}->{cen[-1]:6.0f}")
# beat estimate from low-band onset envelope
env = np.maximum(0, np.diff(B["sub"]+B["low"], prepend=0)); env -= env.mean()
ac = np.correlate(env, env, "full")[len(env)-1:]
lags = np.arange(len(ac))*0.01; m = (lags>0.3)&(lags<1.5)
L = lags[m][np.argmax(ac[m])]; print("beat period ≈", round(L,2), "s →", round(60/L,1), "BPM")
