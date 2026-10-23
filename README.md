# video-montaj — Claude Code agent for Uzbek talking-head Reels

Claude Code agent that edits 1080×1920 talking-head videos: it transcribes the speech, builds kinetic text, full-screen motion sheets, 3D icons and SFX on HyperFrames + GSAP, then renders an MP4.

## Contents
| Path | What it is |
|---|---|
| `.claude/agents/video-montaj.md` | The agent: pipeline, the owner's standing rules, the "Kinetic Reels" style, SFX cue sheet, icon rules and lessons learned |
| `.agents/skills/`, `.claude/skills/` | HyperFrames skills (`npx skills add heygen-com/hyperframes`) |
| `templates/kinetic-reels/` | Generator `build.js` + `data.example.js` (data → `public/index.html`) |
| `sfx-kit/` + `tools/make_sfx.py` | 8 synthesized SFX (impact, whoosh, whoosh_down, tick, pop, riser, shimmer, flash) |
| `assets/icons-3d/` | 33 Fluent Emoji 3D PNG icons (MIT) |
| `assets/fonts/`, `assets/vendor/` | Montserrat, Great Vibes (latin + latin-ext), GSAP 3.12.5 |
| `tools/mdx_sep.py`, `tools/sfx_events.py` | Split a reference reel's audio into voice / rest and list its SFX events |
| `references/` | Frames from the reference reels |
| `videos/` | Finished projects (source videos and renders are not committed) |

## Use
- **Cloud (claude.ai/code):** start a session with this repository selected, upload an `.mp4`, then write *"videoni montaj qil"*.
- **On your own computer:** clone the repository and open Claude Code in it. You need Node 18+ and ffmpeg. The `video-montaj` agent is picked up from `.claude/agents/`.

Transcription downloads whisper `large-v3` (~3 GB) from `huggingface.co` and `*.hf.co`. Allow both hosts in the environment's network settings.
