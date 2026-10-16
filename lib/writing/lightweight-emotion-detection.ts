import type { Article } from "../articles";

// ──────────────────────────────────────────────────────────── Lightweight emotion detection

const IMG = "/writing/lightweight-emotion-detection";

export const emotionEdge: Article = {
  slug: "lightweight-emotion-detection",
  project: "Lightweight emotion detection",
  projectHi: "भावों की पहचान",
  published: "2026-10-16",
  status: "Research prototype",
  team: "Aakshant Kumar",
  hero: { src: `${IMG}/live_timeline.png`, alt: "Timeline of a scripted session: raw text, voice and face readings above a stable fused emotion strip and a confidence line with ambiguity states" },
  links: [{ label: "Source", href: "https://github.com/unexperiencedone/lightweight-emotion-detection", kind: "source" }],
  stack: ["Python", "PyTorch", "ONNX Runtime", "DistilBERT", "DistilHuBERT", "OpenCV", "librosa", "SciPy"],

  // ─────────────────────────────────────────────────────────────────────── Story
  story: {
    title: "Lightweight emotion detection: a reader of feelings that admits when it isn't sure",
    dek: "Can a laptop CPU read emotion from words, voice and face at once, without sending anything to the cloud, and say \"I don't know\" instead of guessing? This is where that question stands.",
    blocks: [
      { t: "p", text: "People rarely say how they feel in one channel. The words say one thing, the voice says another, the face settles it. A friend who says \"I'm fine\" through clenched teeth is not fine, and anyone in the room knows it. Software, mostly, does not. It reads the words, or it reads the face, and then it reports a single confident label as if that settled the matter." },
      { t: "p", text: "That confidence is the real problem. An emotion reader that is wrong a third of the time is useful if it knows which third. One that is wrong a third of the time and sounds equally sure every time is worse than nothing, because whoever relies on it can't tell the good readings from the bad ones." },
      { t: "callout", label: "In short", labelHi: "सार", text: "Three small models, one each for text, voice and face, run on an ordinary CPU and never send data anywhere. Their opinions are combined as probabilities, smoothed over time, and every reading comes with a state: confident, a blend of two emotions, ambiguous, the channels in conflict, or simply uncertain. On real recordings, voice and face together come within a point of human raters. The text model and the conflict signal are not proven yet, and this piece says so." },
      { t: "h", text: "Who it's for" },
      { t: "p", text: "The first audience is people who build things that respond to how someone is expressing themselves: research on how people talk, negotiate and cooperate, assistants that should notice frustration, tools that study conversations. They need a signal they can trust, which means a signal that is calibrated and that flags its own doubt." },
      { t: "p", text: "The second audience is the person being read. They didn't sign up to be labelled by a server somewhere. So the design rule from the first commit is that everything runs on the device, with consent, and the output only ever describes **expressed** affect, as a probability. It never claims to know what someone actually feels inside; the project's own documentation cites the research showing that expressions are not a direct readout of inner state." },
      { t: "h", text: "What it does, in plain terms" },
      { t: "p", text: "Words, audio and camera frames stream in. The system decides when a sentence, a stretch of speech or a frame is complete enough to analyse, runs the matching model, and turns each answer into a probability over eight emotions: anger, disgust, fear, joy, love, neutral, sadness and surprise. Every half second it combines the three channels into an instant reading. Every five seconds it summarises the last thirty: the overall mood, how sure it is about that mood, and the pattern, such as stable, shifting, volatile or escalating." },
      { t: "image", src: `${IMG}/live_timeline.png`, alt: "Five-row timeline: ground truth, text, voice and face raw readings, and the fused instant emotion, with an ambiguity strip below", title: "A scripted session, start to finish", takeaway: "The dots are what each model says on its own: noisy, and often wrong. The bottom strip is what the system reports: steady, and where the words say joy but the face and voice say anger, it marks the moment red as a conflict instead of picking a side. This session is synthetic, built to test the logic." },
      { t: "h", text: "What changes because of it" },
      { t: "p", text: "Instead of one label, you get a reading and a reason to trust it or not. When the evidence is clear, it answers. When two emotions are close and compatible, like joy and love, it says it's a blend. When they're close and opposite, like joy and anger, it says it's ambiguous and asks for more evidence. When there's simply too little to go on, it abstains." },
      { t: "flow", title: "Answer, or hold back", takeaway: "The point isn't to answer every time. On real recordings the first version answered 38% of clips and was right on 90% of those; the rest were flagged, and the flagged ones were more than twice as often clips that humans also found hard.", flow: { kind: "flow", colW: 260, rowH: 120, nodes: [
        { id: "in", label: "Words, voice, face", sub: "three small on-device models", col: 1, row: 0 },
        { id: "fz", label: "Calibrated fusion", sub: "probabilities, not labels", col: 1, row: 1, focus: true },
        { id: "ok", label: "Confident", sub: "act on the reading", col: 0, row: 2 },
        { id: "fl", label: "Flagged", sub: "ask, wait or abstain", col: 2, row: 2, dashed: true },
      ], edges: [
        { from: "in", to: "fz" }, { from: "fz", to: "ok", label: "clear evidence" }, { from: "fz", to: "fl", label: "doubt" },
      ] } },
      { t: "p", text: "It also stops the reading from flickering. A face changes expression constantly; read moment by moment with no memory, the label on real recordings switched about 35 times a minute. The time layer brings that down to about 11, roughly a third, while still following a real change within about a second. That's the difference between a display you can watch and one you can't." },
      { t: "h", text: "How good it is, measured on real people" },
      { t: "p", text: "The voice and face models were tested on CREMA-D, a public set of recordings in which actors speak sentences in six emotions. Crucially, every clip was also rated by crowd workers, separately for voice only, face only, and both. So the system can be compared to people on exactly the same clips, and the 15 test actors were never seen during training." },
      { t: "image", src: `${IMG}/real_upgrade.png`, alt: "Bar chart comparing first models, pretrained models and human raters for voice, face and fused voice plus face", title: "Against human raters, same clips", takeaway: "From voice alone the system now reads the acted emotion better than people do (69% against 47%). From the face it still trails people (58% against 70%). Together it reaches 75.7%, against 76.5% for people watching and listening." },
      { t: "p", text: "Two things in that chart matter more than the headline. First, combining two mediocre readers made a good one: the very first voice and face models scored 54% and 57% alone and 68% together, without ever being trained together. Second, the combined probabilities are honest. When it says 80%, it's right about 80% of the time; the calibration error is 0.04 on a scale where 0 is perfect." },
      { t: "p", text: "The size story matters just as much, because \"lightweight\" is the point. The full text model, DistilBERT, shrinks from 268 MB to 56.5 MB, and from 40.8 to 15.2 milliseconds per sentence on a single CPU core. With the whole pipeline running, the dominant costs are finding the face in a frame and measuring the voice, not the neural networks." },
      { t: "h", text: "Where it honestly stands" },
      { t: "table", head: ["Proven on real data", "Not proven yet"], rows: [
        ["Voice 69.4% on unseen actors (people: 46.7%)", "The text model's accuracy on its dataset: the run hasn't happened yet"],
        ["Voice + face 75.7% (people: 76.5%), calibrated", "The \"conflict\" signal: on real clips it's at chance (AUROC 0.52)"],
        ["Answering a third to a half of clips at about 90% accuracy, flagging the rest", "Real-time camera and microphone capture: written, not tested"],
        ["Flicker cut threefold; the mood probability is calibrated", "Anything in a real deployment setting: only acted and TV data so far"],
      ], title: "The honest split", takeaway: "The left column is what the numbers support. The right column is the work still to do, and it's listed in the project's own README in the same words." },
      { t: "p", text: "The conflict signal deserves a sentence of its own, because it's the most interesting idea and the least proven. It's meant to catch the clenched-teeth \"I'm fine\": text saying joy while face and voice say anger. On CREMA-D it doesn't line up with where human raters disagreed. One likely reason is that the actors weren't masking anything, so there was nothing to catch. It needs data with real sarcasm or masking before anyone should rely on it." },
      { t: "h", text: "Why it matters" },
      { t: "p", text: "Most of the interest in reading emotion comes from wanting machines that respond to people better. The risk is machines that respond to people wrongly and confidently. Building the doubt into the output, keeping the data on the device, and refusing to claim more than the measurements support is a small step toward the first without the second." },
      { t: "p", text: "It also connects to the question behind it: how people actually decide and cooperate, and whether affective and multi-agent AI can help explain it. A trustworthy, private signal of how someone is expressing themselves is one of the building blocks that work needs." },
      { t: "h", text: "Try it" },
      { t: "p", text: "The code, documentation and the full real-data study are public. `make live-demo` runs the scripted session above with no models or data needed, and prints the instant and window readings as it goes. The technical piece next door explains every layer, with the parameters and the bugs." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────── Technical
  technical: {
    title: "Lightweight emotion detection, technically: calibrated probabilities all the way down",
    dek: "How three int8 models, a sticky HMM filter, Dirichlet evidence and a log-opinion pool turn words, voice and face into a reading that knows when it isn't sure, and what human-labelled recordings said about each piece.",
    blocks: [
      { t: "p", text: "This is a Python system, built on PyTorch for training and ONNX Runtime for inference, that reads emotion from three streams at once on a CPU: the words someone says, the prosody of their voice (pitch, loudness, rhythm), and their facial expression. Each stream has its own small model. Nothing is fused until the very end, and nothing is ever passed between layers as a bare label: every stage hands the next one a calibrated probability distribution, so confidence, disagreement and doubt can be computed at any point." },
      { t: "p", text: "This piece walks through every layer in the order data flows through it, with the actual parameters from the code, then through how each layer was tested on real human-labelled recordings, what broke, and what's still open. Every number is from a result file in the repository. Where a number comes from synthetic data or random weights, it says so." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "Late fusion of calibrated per-modality posteriors works on real data: two weak models (54% and 57%) became a calibrated 68% with no joint training, and with pretrained encoders the fused system reached 75.7% against 76.5% for human raters. The time layer cuts flicker threefold but doesn't raise instant accuracy on real data. The cross-modal conflict signal is not validated, and the text model's real accuracy hasn't been measured." },

      { t: "h", text: "The problem and the constraints" },
      { t: "p", text: "The goals, as the project's technical documentation records them, were six: fine-tune DistilBERT on the six-class `dair-ai/emotion` dataset; quantize it only if it passes a 90% accuracy gate; measure size, memory and latency in simulated edge environments; build voice and face models through the same train, calibrate, quantize, evaluate steps; combine the three probabilistically rather than by early fusion, flagging ambiguity; and read the streams over time, with an instant emotion, an overall mood over a window, and a behavioural pattern." },
      { t: "list", items: [
        "**CPU only.** The targets are one or two cores and 0.5 to 2 GB of RAM.",
        "**Private.** All inference happens on the device; only derived probabilities ever need to leave it.",
        "**Any modality can vanish.** The face leaves the frame, the person stops talking, there's no transcript. The system must keep working on whatever it has.",
        "**Three datasets, three label sets.** Text, voice and face models are trained on different corpora that don't agree on what the emotions are.",
      ] },
      { t: "p", text: "Before the architecture, the scorecard. The project is unusually strict about separating what was measured from what wasn't, and it's worth reading the rest with this table in mind." },
      { t: "table", head: ["Part", "Status", "Evidence"], rows: [
        ["DistilBERT accuracy on dair-ai/emotion", "**Not measured.** The build environment blocked huggingface.co; a Colab notebook is ready to run it", "`make real-text`"],
        ["Text model size and latency", "Measured on the full architecture with random weights (valid for size and time, not accuracy)", "`results/edge_text_arch.json`"],
        ["Voice and face models", "Trained and tested on real CREMA-D audio and video, 15 unseen actors", "`results/upgrade.json`"],
        ["Fusion and ambiguity typing", "Validated on real clips; the `conflict` state is **not** (AUROC 0.52)", "`results/real_cremad.json`"],
        ["Temporal layer", "Synthetic benchmark plus real CREMA-D sessions and MELD conversations", "`results/real_meld.json`"],
        ["Live pipeline", "Files mode tested end to end; real-time capture written but untested (no camera or mic)", "`tests/test_live_files.py`"],
        ["Test suite", "29 tests, run in CI on every push", "`make test`"],
      ], title: "Verified versus pending", takeaway: "Three different kinds of evidence sit in this repo: real human labels, synthetic data that checks logic, and random weights that check size and speed. They're never mixed up, and every synthetic result file carries a `\"synthetic\": true` flag." },

      { t: "h", text: "System architecture" },
      { t: "p", text: "The figure below shows the on-device path. Three segmenters decide when a block of input is complete. Each block goes to its own int8 model, whose output is calibrated and projected into one shared space of eight emotions. From there each modality feeds two temporal models: a filter for the instant emotion and an evidence accumulator for the mood. The two meet across modalities in two fusion steps, one every half second and one every five seconds." },
      { t: "flow", title: "The on-device pipeline", takeaway: "Each modality is independent right up to the probability level: its own segmenter, model, label set, calibration and quantization. That's what lets any of them drop out without breaking the rest.", flow: { kind: "flow", colW: 250, rowH: 112, nodes: [
        { id: "ts", label: "Text segmenter", sub: "ASR words or typed lines", col: 0, row: 0 },
        { id: "as", label: "Audio segmenter", sub: "energy VAD, 0.8–6 s", col: 1, row: 0 },
        { id: "fs", label: "Frame sampler", sub: "4 fps, Haar face crop", col: 2, row: 0 },
        { id: "tm", label: "DistilBERT int8", sub: "6 labels", col: 0, row: 1 },
        { id: "sm", label: "DistilHuBERT int8", sub: "voice, 8 labels", col: 1, row: 1 },
        { id: "fm", label: "Face CNN", sub: "7 labels, 48×48 crop", col: 2, row: 1 },
        { id: "cal", label: "Calibrate + project", sub: "8 canonical emotions", col: 1, row: 2 },
        { id: "filt", label: "Sticky HMM filter", sub: "per modality", col: 0, row: 3 },
        { id: "mood", label: "Dirichlet mood", sub: "per modality, 30 s", col: 2, row: 3 },
        { id: "inst", label: "Instant fusion", sub: "every 0.5 s + ambiguity", col: 0, row: 4, focus: true },
        { id: "win", label: "Window fusion", sub: "every 5 s + behaviour", col: 2, row: 4 },
        { id: "out", label: "JSONL records", sub: "block · instant · window", col: 1, row: 5 },
      ], edges: [
        { from: "ts", to: "tm" }, { from: "as", to: "sm" }, { from: "fs", to: "fm" },
        { from: "tm", to: "cal" }, { from: "sm", to: "cal" }, { from: "fm", to: "cal" },
        { from: "cal", to: "filt" }, { from: "cal", to: "mood" },
        { from: "filt", to: "inst" }, { from: "mood", to: "win" },
        { from: "inst", to: "out" }, { from: "win", to: "out" },
      ] } },
      { t: "p", text: "Four principles from the design document explain most of what follows:" },
      { t: "list", items: [
        "**Each modality is independent** until the probability level.",
        "**Everything is a calibrated distribution**, never a bare label.",
        "**One shared clock and one canonical label space** for fusion.",
        "**The cheapest thing that works** at each stage, measured before it's optimised.",
      ] },
      { t: "p", text: "Offline, a second path trains, calibrates and compresses each model. It runs once per modality and produces the ONNX files and the calibration temperatures the live path loads." },

      { t: "h", text: "The data model: one space of eight emotions" },
      { t: "p", text: "The three training datasets disagree about what the emotions are. `dair-ai/emotion` has sadness, joy, love, anger, fear and surprise, and no neutral. The speech set follows RAVDESS with eight labels including calm. FER2013 has seven face labels including neutral and disgust. Fusion needs one space, so the system defines a canonical set of eight, anger, disgust, fear, joy, love, neutral, sadness and surprise, and a mapping matrix per modality. Most rows are one-to-one. A few aren't: \"happy\" in voice and face maps to 0.85 joy and 0.15 love, and \"calm\" maps to neutral." },
      { t: "p", text: "The subtle part is **coverage**. Text has no neutral class. If you simply project its distribution, neutral gets probability zero, and in a product of experts a zero is a veto: text would make neutral impossible no matter what the face says. So classes a modality can't express are set to the uniform level, which means \"no information\" rather than \"impossible\". A unit test checks exactly this: that text cannot veto classes it cannot express." },
      { t: "code", lang: "python", source: "emotion_edge/fusion/fuse.py", title: "Projecting into the canonical space", takeaway: "Three lines carry a design decision: an uncovered class gets the same level as every covered one, so it neither wins nor loses because of a modality that can't see it.", text: `def to_canonical(p: np.ndarray, modality: str) -> np.ndarray:
    q = p @ MAPS[modality]
    cov = coverage(modality)
    q = np.where(cov, q, 1.0 / cov.sum())      # uncovered classes: uniform level => uninformative
    return q / q.sum()` },
      { t: "p", text: "Everything downstream speaks in three record types, written one JSON line each. A `block` is one analysed unit with its raw, unsmoothed reading and the reason the segmenter closed it. An `instant` record comes every tick with the fused emotion, its ambiguity state and each modality's filtered reading. A `window` record comes every hop with per-modality and fused moods, credible intervals, the behavioural pattern and the share of the window spent in conflict. Here's a real instant record from the demo run, shortened." },
      { t: "code", lang: "json", source: "docs/LIVE_PIPELINE.md", title: "An instant record during masked anger", takeaway: "The record explains itself: face says anger with high reliability, text says joy, voice has gone nearly silent (reliability 0.16) and barely counts. The state is conflict, and the explanation names each modality's vote.", text: `{"type": "instant", "t": 55.0, "label": "anger", "state": "conflict", "p_top1": 0.877,
 "top2": ["anger", "neutral"], "margin": 0.828, "entropy": 0.256, "conflict": 0.602,
 "per_modality": {"speech": {"top": "neutral", "p_top": 0.301, "reliability": 0.163},
                  "face":   {"top": "anger",   "p_top": 0.921, "reliability": 0.792},
                  "text":   {"top": "joy",     "p_top": 0.631, "reliability": 0.406}},
 "explanation": "modalities disagree: speech->neutral; face->anger; text->joy"}` },

      { t: "h", text: "Block segmentation: when is a piece of input ready?" },
      { t: "p", text: "Models answer questions about bounded inputs; a stream has no natural \"one input\". A good block is long enough to carry affect, short enough not to average across a change of emotion, and closed at a natural boundary whenever one exists, with a hard cap otherwise. Each modality gets its own rules, all push-based (feed data as it arrives, receive closed blocks) with a `flush()` for the end of a stream." },
      { t: "image", src: `${IMG}/segmentation.png`, alt: "Top: an audio waveform split into voiced segments labelled by why they closed. Bottom: words grouped into three text blocks", title: "Segmentation rules on a test signal", takeaway: "The audio segment at 7.5 s hit the 6 s cap and was force-split with half a second of overlap. In the text, the one-word \"ok\" was merged forward into the next block rather than analysed alone." },
      { t: "list", items: [
        "**Text** closes on a sentence end once it has at least 3 words, on a pause of 1.2 s or more, at a 40-word cap, or on a change of speaker. The cap exists because WordPiece expands words to about 1.3 tokens and the model's window is 64 tokens. Fragments under 3 words merge forward; one is emitted alone only if nothing follows for 3 s. Block quality is `min(1, words / 6)`, so a two-word block gets a third of a full sentence's weight.",
        "**Voice** is an energy voice-activity detector on 20 ms frames. The noise floor is the 10th percentile of the last 10 s of frame energies, so it adapts to the room. A frame is speech if it's 9 dB above that floor and above -50 dBFS. A segment ends only after 0.4 s of continuous non-speech, because short gaps are part of prosody; segments are capped at 6 s with 0.5 s overlap, and anything under 0.8 s is dropped as too short for pitch statistics.",
        "**Face** frames are down-sampled to 4 fps on a fixed time grid. Expressions last 0.5 to 4 s, so 4 fps still sees each one at least twice. A frame with no detected face produces no observation at all: the face modality is simply absent and its filter decays.",
      ] },
      { t: "p", text: "Why an energy VAD instead of a neural one: it costs effectively nothing on one core and has no dependencies, and a neural VAD can be swapped in through the same interface where background speech is a problem." },

      { t: "h", text: "The three models" },
      { t: "p", text: "**Text.** `distilbert-base-uncased`: 6 layers, 768 hidden units, 66.96 M parameters, of which 23.84 M (36%) are the word-embedding table. Training is a plain PyTorch loop rather than Hugging Face's `Trainer`, chosen for control over length bucketing, best-validation checkpointing and optional distillation. AdamW at 3e-5 or 5e-5 with weight decay 0.01 (none on biases and LayerNorm), gradient clipping at 1.0, 6% linear warm-up then linear decay, 3 or 4 epochs. Batches are length-sorted inside shuffled mega-batches of 50 batches, which makes CPU training several times cheaper by cutting padding. The best epoch is chosen on validation, and the test set is read once per run. Label smoothing and distillation from a larger teacher exist as levers, used only if the plain recipe misses the gate." },
      { t: "p", text: "**Voice.** The first version computed 88 prosody features per segment: pitch in semitones relative to 100 Hz (so it's speaker-agnostic) via the YIN estimator, log-energy, voiced ratio, jitter and shimmer proxies, onset rate as a tempo proxy, pause ratio, spectral shape and 13 MFCC means and deviations, each contour summarised by mean, spread, percentiles and slope. A 29 k-parameter MLP classified them. It was later upgraded to a frozen DistilHuBERT speech encoder with a small head trained on top, which is what the current numbers use." },
      { t: "p", text: "**Face.** OpenCV's Haar cascade finds the largest face and crops it to 48×48 grayscale. A mini-Xception-style CNN with depthwise-separable blocks and global average pooling, 66 k parameters, classifies it. OpenCV is pinned below 5.0, which removed the cascade API. The full configuration adds HSEmotion, an EfficientNet-B0 pretrained on the AffectNet expression dataset, and averages the two." },
      { t: "table", head: ["", "Text", "Voice", "Face"], rows: [
        ["Labels", "6 (dair-ai/emotion)", "8 (RAVDESS order)", "7 (FER2013 order)"],
        ["Deployed model", "DistilBERT, pruned vocab, int8 + int8 embeddings", "DistilHuBERT (frozen) + head, int8", "Mini-Xception int8 (+ HSEmotion fp32 in the full config)"],
        ["Size", "56.5 MB", "50.8 MB", "0.10 MB (16.2 MB with HSEmotion)"],
        ["Cost", "15.2 ms per 32-token input, 1 core", "45 ms per ~2.5 s clip, 4 threads", "< 1 ms per frame (~15 ms with HSEmotion)"],
        ["Real accuracy", "Not measured", "69.4% on unseen actors", "56.9% (58.5% as an ensemble)"],
        ["Quantization", "Dynamic int8", "Dynamic int8, transformer layers only", "Static int8 (QDQ, per-channel, 200 calibration images)"],
      ], title: "One model per modality", takeaway: "Every model is small enough for a CPU. The interesting asymmetry is the voice model: its upgrade took it from 0.035 MB to 50.8 MB, and it's also the one that now beats human raters." },
      { t: "p", text: "All three are calibrated by **temperature scaling**: one scalar T is fitted on validation logits so that `softmax(logits / T)` produces probabilities that match observed accuracy. On real data the voice model needed T = 1.42 (its calibration error fell from 0.122 to 0.081) and the face model's frame-level outputs T = 1.57 (0.130 to 0.014). Fusion depends on this: if one model says 0.9 when it means 0.6, it will dominate every vote it takes part in." },

      { t: "h", text: "Compression, and the gate in front of it" },
      { t: "p", text: "The text model is the big one, so it gets a full compression study. Before any of it runs, there's a gate: rounded test accuracy must be at least 90%, or the pipeline writes the reason to its results file and stops. Published DistilBERT fine-tunes on this dataset report about 92 to 93%, so the gate is reachable but leaves little room, which is why the loss from quantization is budgeted too." },
      { t: "flow", title: "The accuracy gate and five variants", takeaway: "Quantization is a reward for passing, not a default. And the deployment pick is mechanical: the smallest variant whose accuracy is within one point of the fp32 model.", flow: { kind: "flow", colW: 250, rowH: 116, nodes: [
        { id: "fp", label: "Fine-tuned DistilBERT", sub: "fp32, test read once", col: 0, row: 0 },
        { id: "gate", label: "Rounded accuracy ≥ 90%?", col: 1, row: 0, focus: true },
        { id: "stop", label: "Stop, write reason", sub: "no quantization", col: 2, row: 0, dashed: true },
        { id: "full", label: "Full vocabulary", sub: "ONNX fp32 · dynamic int8", col: 0, row: 1 },
        { id: "prn", label: "Pruned vocabulary", sub: "fp32 · int8 · int8 + emb8", col: 2, row: 1 },
        { id: "ev", label: "Evaluate all five", sub: "accuracy · size · agreement", col: 1, row: 2 },
        { id: "dep", label: "Deploy the smallest", sub: "accuracy drop ≤ 1.0 pt", col: 1, row: 3 },
      ], edges: [
        { from: "fp", to: "gate" }, { from: "gate", to: "stop", label: "no" },
        { from: "gate", to: "full", label: "yes" }, { from: "gate", to: "prn", label: "yes" },
        { from: "full", to: "ev" }, { from: "prn", to: "ev" }, { from: "ev", to: "dep" },
      ] } },
      { t: "p", text: "The five variants each exist for a reason. Plain ONNX export proves the export is lossless. ONNX Runtime's **dynamic** int8 stores weights as int8 and quantizes activations at run time; it needs no calibration data and is robust to the activation outliers that attention and LayerNorm produce, which makes it the standard CPU choice for transformers. **Vocabulary pruning** keeps embedding rows only for wordpieces that appear in the training and validation text, mapping everything else to `[UNK]`; because the kept set comes only from train and validation, the test set isn't leaked." },
      { t: "p", text: "The last variant fixes a gap in the tooling. ONNX Runtime's quantizer leaves `Gather` tables in fp32, and the embedding table is 36% of the model's parameters. So the project quantizes it by hand, per row:" },
      { t: "code", lang: "python", source: "emotion_edge/text/model.py", title: "A hand-written int8 embedding table", takeaway: "Per-row scales keep every word's vector within about 0.4% of fp32. It's the piece that takes the file from 139 MB to 56.5 MB, because the quantizer everyone uses skips this table.", text: `class Int8Embedding(nn.Module):
    """Weight-only per-row int8 embedding. ORT's dynamic quantizer leaves Gather tables in fp32, and the
    word-embedding table is 36% of DistilBERT's parameters, so we quantize it ourselves.
    Lookup = Gather(int8) -> Cast -> Mul(row scale); numerically within ~0.4% of fp32 rows."""

    def __init__(self, emb: nn.Embedding):
        super().__init__()
        w = emb.weight.data
        scale = (w.abs().amax(1, keepdim=True) / 127.0).clamp_min(1e-8)
        self.register_buffer("q", torch.round(w / scale).to(torch.int8))
        self.register_buffer("scale", scale)

    def forward(self, ids):
        return self.q[ids].float() * self.scale[ids]` },
      { t: "p", text: "Since the real fine-tune hasn't run, the sizes and latencies were measured on the full DistilBERT architecture with random weights, which is valid because neither depends on what the weights are. Pruning assumes 15 k kept tokens for this measurement; the real count is written to the results file when the real run happens." },
      { t: "table", head: ["Variant", "File", "Peak memory", "p50, 32 tokens, 1 core", "p95"], rows: [
        ["fp32", "267.7 MB", "429 MB", "40.8 ms", "48.9 ms"],
        ["int8", "138.6 MB", "279 MB", "15.2 ms", "18.4 ms"],
        ["pruned (15 k) int8 + int8 embeddings", "**56.5 MB**", "**157 MB**", "16.5 ms", "19.9 ms"],
      ], title: "What compression buys", takeaway: "int8 buys speed, about 2.7× on one core. Pruning and the int8 embeddings buy memory, not time: the file shrinks by another 60% and peak memory nearly halves, at the same latency." },

      { t: "h", text: "Simulating an edge device on a laptop" },
      { t: "p", text: "There was no ARM board, so `emotion_edge/edge/bench.py` constrains the host CPU to behave like a smaller device. Each scenario runs in a fresh subprocess so that settings can't leak between runs: pinned to 4, 2 or 1 cores with `sched_setaffinity`; one core shared with a busy-loop process to stand in for a noisy neighbour or thermal throttling; and an address-space cap with `RLIMIT_AS`. A load test feeds Poisson-distributed requests into a single worker using the measured service times, a simulated M/G/1 queue." },
      { t: "image", src: `${IMG}/edge_text_arch.png`, alt: "Grouped bar charts of p50 latency for fp32, int8 and pruned int8 across five simulated device scenarios at 32 and 64 tokens", title: "Latency across simulated devices", takeaway: "Contention roughly doubles latency for every variant, so a real budget needs that margin. Under contention fp32 needs 90.6 ms for 32 tokens; int8 needs 32.8 ms." },
      { t: "p", text: "The documentation is candid about the limits. There's no emulation of the ARM instruction set, caches or clock, so absolute milliseconds are host numbers; a `--slowdown` flag can apply a ratio measured once on real hardware, and the output is then labelled as a projection. `RLIMIT_AS` limits address space rather than resident memory and didn't bind, so peak resident memory is the real evidence for fit. Four-thread results on short inputs are noisy, so decisions are made on the one- and two-core rows. Under load, fp32 saturates before 20 requests per second; int8 holds a p95 of 90 ms at 20 per second." },
      { t: "p", text: "Then the whole pipeline was costed on one pinned core, and the result was not what the design started out optimising for." },
      { t: "image", src: `${IMG}/latency_budget.png`, alt: "Horizontal bars: text inference 16.5 ms, audio features 30 ms, audio inference near 0, face detection 30 ms, face inference 0.5 ms, fusion 0.2 ms", title: "Where the time actually goes", takeaway: "The neural networks aren't the bottleneck. Finding the face (20–30 ms a frame) and extracting voice features (about 30 ms a segment) dominate. At default rates the whole pipeline uses about 10–14% of one core." },
      { t: "p", text: "That reorders the optimisation list. If the budget is tight, the documented levers are, in order: drop the face rate to 2 fps (the filter's dwell absorbs it), detect every Nth frame and track the box in between, and shrink the detection input. Compressing the networks further would barely register." },

      { t: "h", text: "Late fusion: combining opinions, not features" },
      { t: "p", text: "**Early fusion** concatenates features from all modalities and trains one classifier on them. It needs time-aligned, complete, jointly labelled input, and it hides any disagreement inside the classifier. None of that holds on a device: the modalities arrive at different rates, drop out, come from different datasets with different labels, and can legitimately disagree. **Late fusion** keeps each model independent and combines their output distributions, which needs no joint training data and keeps disagreement measurable." },
      { t: "p", text: "The combination rule is a **log-opinion pool**, also called a product of experts: add the log-probabilities of each modality and renormalise. Before pooling, each modality's distribution is **discounted** by its reliability r, the input's quality (text length, audio signal-to-noise times voiced fraction, face size) times a per-modality base weight. Discounting mixes the distribution toward uniform: at r = 1 it counts fully, at r = 0 it says nothing." },
      { t: "flow", title: "One fusion step", takeaway: "The top row runs once per modality; the pool takes all of them. Reliability enters only through the discount step, so a noisy segment or a tiny face can't outvote a clean one.", flow: { kind: "flow", colW: 230, rowH: 120, nodes: [
        { id: "lg", label: "Logits", sub: "one modality", col: 0, row: 0 },
        { id: "t", label: "Temperature softmax", sub: "T fitted on validation", col: 1, row: 0 },
        { id: "pj", label: "Project to 8 classes", sub: "mapping matrix", col: 2, row: 0 },
        { id: "cv", label: "Uncovered → uniform", sub: "no information", col: 3, row: 0 },
        { id: "ds", label: "Discount", sub: "r·q + (1 − r)/K", col: 3, row: 1 },
        { id: "pl", label: "Log-opinion pool", sub: "Σ log q̃ + log prior", col: 2, row: 1 },
        { id: "ty", label: "Ambiguity typing", sub: "five states", col: 1, row: 1, focus: true },
        { id: "o", label: "Posterior + state", sub: "+ per-modality readings", col: 0, row: 1 },
      ], edges: [
        { from: "lg", to: "t" }, { from: "t", to: "pj" }, { from: "pj", to: "cv" }, { from: "cv", to: "ds" },
        { from: "ds", to: "pl" }, { from: "pl", to: "ty" }, { from: "ty", to: "o" },
      ] } },
      { t: "p", text: "The pooled posterior alone can't tell a clear case from a contested one: two experts that strongly disagree can still produce a peaked posterior. So after pooling, the step types the result. It measures the disagreement between every pair of experts with the **Jensen-Shannon divergence** (JSD, a bounded, symmetric distance between two distributions), weighted by the less reliable expert of the pair, and checks the posterior's normalised entropy, its top probability and the margin to the runner-up." },
      { t: "code", lang: "python", source: "emotion_edge/fusion/fuse.py", title: "Typing the ambiguity", takeaway: "The order matters: conflict is checked first, because two confident experts that disagree can produce a posterior that looks certain. Blend and ambiguous differ only in whether the top two emotions sit close together on the valence-arousal map.", text: `conflict = 0.0
for a in range(len(names)):
    for b in range(a + 1, len(names)):
        ra, rb = per[names[a]]["reliability"], per[names[b]]["reliability"]
        conflict = max(conflict, jsd(qs[names[a]], qs[names[b]]) * min(1.0, 2 * min(ra, rb)))
compat = _VA_DIST[i1, i2] < th.compat_dist
if conflict > th.conflict_jsd and len(names) > 1:
    state = "conflict"
elif H > th.entropy or p1 < 0.30:
    state = "uncertain"
elif margin < th.margin:
    state = "blend" if compat else "ambiguous"
elif p1 >= th.conf_p:
    state = "confident"
else:
    state = "uncertain"` },
      { t: "p", text: "\"Compatible\" uses a coarse circumplex placement of the eight emotions in valence (pleasant to unpleasant) and arousal (calm to activated): joy sits at (0.8, 0.5), love at (0.8, 0.3), anger at (-0.6, 0.8). Two emotions closer than 0.75 on that map are a plausible blend." },
      { t: "table", head: ["State", "Trigger", "What a caller should do"], rows: [
        ["`confident`", "Top probability ≥ `conf_p`, margin ≥ `margin`, experts agree", "Act on it"],
        ["`blend`", "Top two close and compatible (joy + love)", "Report a mixed emotion"],
        ["`ambiguous`", "Top two close but incompatible (joy vs anger)", "Gather more evidence, or ask"],
        ["`conflict`", "Reliability-weighted max pairwise JSD > `conflict_jsd`", "Show each modality's reading; possible masking, sarcasm or a failing sensor"],
        ["`uncertain`", "Normalised entropy high, or top probability < 0.3", "Abstain"],
      ], title: "Five ways to be unsure", takeaway: "A single entropy threshold would lump all four kinds of doubt together. They need different responses, which is why they're separate states." },

      { t: "h", text: "The instant emotion: a sticky HMM filter" },
      { t: "p", text: "Frame-level face predictions are noisy. On the synthetic session, a static per-tick label switched about 43 times a minute while the true emotion barely changed. The fix is a **hidden Markov model** (HMM) filter: the true emotion is a hidden state, and the filter keeps a belief over the eight classes that it updates as observations arrive. \"Sticky\" means emotions persist, so between observations the belief mostly stays put." },
      { t: "p", text: "The filter has two steps. **Predict** runs whenever time passes: the belief relaxes toward a base distribution by a factor `exp(-Δt / dwell)`, so stickiness depends on the actual gap since the last update. That matters because the modalities arrive irregularly: face every 0.25 s, voice every few seconds, text whenever someone speaks. **Update** runs when a block arrives. A classifier's output is a posterior, not a likelihood, so the filter uses the classic hybrid-HMM trick and divides it by the prior to get a scaled likelihood, then raises it to the power r, the block's reliability." },
      { t: "code", lang: "python", source: "emotion_edge/temporal/tracker.py", title: "The whole filter", takeaway: "Two short methods and two parameters. Staleness needs no special case: a modality that goes quiet only runs predict, so it decays to the base rate, its informativeness drops to zero, and fusion stops listening to it.", text: `def predict(self, t: float):
    if self.t is not None and t > self.t:
        s = np.exp(-(t - self.t) / self.dwell_s)
        self.b = s * self.b + (1 - s) * self.base
    self.t = t if self.t is None else max(self.t, t)
    return self.b

def update(self, t: float, q: np.ndarray, r: float = 1.0):
    self.predict(t)
    like = np.clip(q / self.base, 1e-9, None) ** float(np.clip(r, 0, 1))
    prior = self.carry * self.b + (1 - self.carry) * self.base
    self.b = prior * like
    self.b /= self.b.sum()
    return self.b` },
      { t: "p", text: "The `carry` parameter wasn't in the first version. It was added after real conversation data showed that **persistence** (how long a reading stays relevant) and **inertia** (how much the previous state biases the next interpretation) are different things that need different settings. That story is in the real-data section below." },
      { t: "image", src: `${IMG}/live_filter_effect.png`, alt: "Scatter of raw per-frame joy probabilities between 0.2 and 0.8 with a solid line of the filtered belief rising to near 1 after a change at 20 s", title: "Noisy frames in, a steady belief out", takeaway: "Raw face frames scatter between 0.2 and 0.8 and often name another emotion. The filtered belief rises within about 2 s of the real change and then holds. One wrong frame can't flip a well-supported state; a few consistent ones can. (Synthetic data.)" },
      { t: "p", text: "At each tick, every modality's filter is advanced to the current time, its belief is divided by the base rate (so the prior isn't counted three times), and the results are pooled with the same fusion function as before. The reliability used for the conflict test is each filter's **informativeness**, one minus normalised entropy, so a stale or flat modality can't trigger a false conflict." },

      { t: "h", text: "The window mood: Dirichlet evidence" },
      { t: "p", text: "The second question is slower: over the last 30 seconds, what mixture of emotions did this person express, and how sure are we? The mixture is a probability vector, and the natural distribution over probability vectors is the **Dirichlet**, parameterised by pseudo-counts α. Start from a weak prior of 0.25 per class (2 pseudo-observations in total) and add each block's calibrated distribution, weighted." },
      { t: "p", text: "The weight is the heart of it. Forty face frames of the same expression in ten seconds are not forty independent votes, so each block counts at most `dur / τ_c` units, where τ_c is a correlation time. Recent blocks count more. And flat \"don't know\" outputs barely count at all, which matters most for text: its six-class model has to spread its probability when the true state is neutral, which it can't express." },
      { t: "code", lang: "python", source: "emotion_edge/temporal/tracker.py", title: "Weighing one block of evidence", takeaway: "Four factors, each answering one way evidence gets over-counted: unreliable input, correlated frames, stale history and uninformative output. A unit test confirms 10 fps and 1 fps of the same face give the same effective evidence, within 0.6.", text: `def weight(self, o: Obs, now: float, half_life: float | None = None) -> float:
    """reliability x independence (dur/tau_c, capped at 1) x recency x informativeness of the block."""
    hl = half_life or self.half_life_s or self.window_s
    return o.r * min(1.0, o.dur / self.tau_c) * 0.5 ** ((now - o.t) / hl) * min(1.0, 2 * (1 - entropy_norm(o.q)))` },
      { t: "p", text: "Mood evidence comes from each block's own distribution, never from the filtered belief, because filtered beliefs are autocorrelated by construction and feeding them in would count evidence twice. Across modalities the evidence is simply **added**: if the modalities are independent noisy views of the same underlying mixture, adding pseudo-counts is the exact Bayesian update, and modalities with more informative evidence automatically weigh more. Face at 4 fps contributes about 9 units per 30 s; text about 3." },
      { t: "p", text: "From the Dirichlet the system reads off the expected mixture, an exact 90% credible interval per emotion from its Beta marginal, and **P(dominant)**: the probability that the reported mood really has the largest share, estimated by drawing 2,000 samples and counting how often each emotion wins. That number is the confidence attached to the mood label." },
      { t: "image", src: `${IMG}/mood_dirichlet_t60.png`, alt: "Four panels of mean share and 90% credible interval per emotion for speech, face, text and fused, at the window ending at 60 s", title: "One window, four views", takeaway: "Voice has too little evidence to say anything (n_eff 1.1, insufficient). The face is in transition from joy to anger. Text leans joy. Fused, the mood is joy but marked conflicted, with P(dominant) only 0.58: the system is telling you not to trust its label much here." },
      { t: "p", text: "The mood gets a state, applied in order: `insufficient` when there's less than 1.5 units of evidence; `transition` when the older and newer halves of the window each have a clear and different leader; `dominant` when P(dominant) ≥ 0.8; `mixed` or `conflicted` when the runner-up has at least 0.6 of the top share, depending on whether the two are compatible; and `leaning` otherwise. The `transition` state was added after the first evaluation, which showed two emotions in sequence being reported as two emotions at once." },
      { t: "p", text: "Finally, the filtered fused belief is sampled every 0.5 s, mapped to expected valence and arousal, and described with measures from the affect-dynamics literature: variability (standard deviation), instability (mean squared successive difference, MSSD), inertia (lag-1 autocorrelation), trend per minute and label switches per minute. Explicit, configurable thresholds turn them into tags." },
      { t: "table", head: ["Tag", "Rule (defaults)"], rows: [
        ["`flat`", "Mean informativeness < 0.15"],
        ["`volatile`", "More than 4 switches per minute, or MSSD > 0.08"],
        ["`escalating`", "Arousal rising > 0.3 per minute while valence isn't rising, window ≥ 15 s"],
        ["`de-escalating`", "Arousal falling > 0.3 per minute, window ≥ 15 s"],
        ["`stable` / `shifting`", "Otherwise: the top label holds ≥ 70% of ticks, or it doesn't"],
        ["`incongruent`", "≥ 30% of ticks in `conflict`, or P(opposite-valence leaders) ≥ 0.4"],
      ], title: "Behavioural pattern tags", takeaway: "These are descriptive heuristics over seconds to minutes, not clinical constructs, and the documentation says so in as many words." },

      { t: "h", text: "The live flow, end to end" },
      { t: "p", text: "Everything runs on one clock. In files mode, the event streams from the video, audio and transcript are merged in timestamp order with `heapq.merge` and replayed through exactly the code path a live run uses, which makes a file run deterministic and the natural way to test and tune. The next figure follows one voiced segment from the microphone to a record." },
      { t: "sequence", title: "One voiced segment", takeaway: "The model call is the only expensive step, and it happens once per closed segment. Everything after it is a few vector operations on eight numbers.", seq: { kind: "sequence", actors: ["Audio source", "AudioSegmenter", "Voice model", "LiveSession", "Sink"], steps: [
        { from: 0, to: 1, label: "100 ms PCM chunks, 16 kHz" },
        { from: 1, to: 1, label: "20 ms frames vs floor + 9 dB" },
        { from: 1, to: 1, label: "0.4 s silence: close" },
        { from: 1, to: 2, label: "segment, 0.8–6 s" },
        { from: 2, to: 3, label: "logits · quality · duration" },
        { from: 3, to: 3, label: "calibrate, project, filter update" },
        { from: 3, to: 3, label: "add to the Dirichlet window" },
        { from: 3, to: 4, label: "block record (raw reading)", dashed: true },
      ] } },
      { t: "p", text: "Meanwhile the pipeline's clock drives two loops of its own: a tick every 0.5 s and a report every 5 s. Neither needs a new observation to run, which is what lets a silent modality fade gracefully." },
      { t: "sequence", title: "A tick and a hop", takeaway: "Ticks cost about 0.22 ms; a window report, with its Dirichlet sampling, credible intervals and behaviour metrics, about 21 ms every 5 s. Both are noise next to face detection.", seq: { kind: "sequence", actors: ["LivePipeline", "LiveSession", "Filters", "fuse_canonical", "Sink"], steps: [
        { from: 0, to: 1, label: "tick(t), every 0.5 s" },
        { from: 1, to: 2, label: "predict(t): decay toward base" },
        { from: 2, to: 1, label: "beliefs + informativeness", dashed: true },
        { from: 1, to: 3, label: "belief ÷ base, per modality" },
        { from: 3, to: 1, label: "posterior + ambiguity state", dashed: true },
        { from: 1, to: 4, label: "instant record", dashed: true },
        { from: 0, to: 1, label: "report(t), every 5 s" },
        { from: 1, to: 1, label: "Dirichlet per modality + fused" },
        { from: 1, to: 1, label: "behaviour on the 0.5 s grid" },
        { from: 1, to: 4, label: "window record", dashed: true },
      ] } },
      { t: "h", text: "Configuration and running it" },
      { t: "p", text: "Per-modality temporal parameters live in one dictionary, with the reason for each written next to it. Ambiguity thresholds live in `SessionConfig.thresholds`; the window, hop and tick are command-line flags (30 s, 5 s and 0.5 s by default)." },
      { t: "code", lang: "python", source: "emotion_edge/temporal/session.py", title: "The temporal defaults", takeaway: "Each number maps to how often a modality refreshes and how correlated its observations are. The one surprising value, text carry 0, came from real data, not from the design.", text: `DEFAULTS = {
    # text: persistence 10 s (a reading stays comparable with face/voice until the next utterance) but NO inertia:
    # on MELD conversations any carry > 0 lowers per-utterance weighted-F1 (docs/REAL_DATA_STUDY.md)
    "text":   {"dwell_s": 10.0, "carry": 0.0, "tau_c": 1.0, "base_weight": 1.0},   # one utterance = one unit (dur := 1)
    "speech": {"dwell_s": 6.0,  "carry": 1.0, "tau_c": 2.0, "base_weight": 1.0},   # 1-6 s segments
    "face":   {"dwell_s": 3.0,  "carry": 1.0, "tau_c": 1.0, "base_weight": 1.0},   # 4 fps frames, highly autocorrelated
}` },
      { t: "p", text: "There are three ways to run it. `scripts/live.py demo` needs no models or data: it replays a scripted 130-second session, prints readings, writes `records.jsonl`, regenerates the figures and runs a 10-seed evaluation. `files` mode takes any subset of a video, an audio file and a JSONL transcript, plus the ONNX models and their result files (which carry the calibration temperatures); a modality whose model isn't given is skipped. `realtime` captures from a camera and microphone on capture threads feeding one processing thread; text needs an external speech recogniser yielding word events. As a library, `LivePipeline(text=..., speech=..., face=..., sink=print)` delivers every record to a callback as it's produced." },
      { t: "p", text: "Swapping a model means passing any callable that returns logits, a quality and a time. Adding a modality, physiological signals for instance, means adding its label set and mapping matrix to `labels.py` and its defaults to the session. The fusion and temporal layers don't care which model produced a distribution." },

      { t: "h", text: "Testing" },
      { t: "p", text: "29 tests run on every push in GitHub Actions on Python 3.11, followed by the text pipeline's smoke run on synthetic data, which exercises the whole train, gate, prune, export and quantize path with a tiny random model. None of them need the network. They test behaviour, not just plumbing:" },
      { t: "list", items: [
        "**Fusion:** agreement is confident; incongruence is flagged as conflict; blend versus ambiguous; flat input is uncertain; missing modalities and low quality are discounted; text cannot veto classes it cannot express; temperature changes confidence.",
        "**Signals:** an octave pitch shift reads 12 ± 1.5 semitones; faster speech gives a higher onset rate; the int8 voice model agrees with the torch model on more than 90% of samples and the face model on more than 80%; the detector returns nothing when there's no face.",
        "**Temporal:** sentence-end, pause and cap closure; short fragments merge forward; a speaker change closes a block; the filter smooths and decays to base; low quality has less influence; correlated frames don't inflate evidence; every mood state; behaviour tags; carry separates inertia from persistence; incongruence needs opposite valence, not neutral.",
        "**Integration:** files mode end to end with real file decoding and tiny random ONNX models; the demo pipeline runs and beats static fusion.",
      ] },
      { t: "p", text: "Synthetic data verifies logic, though, not accuracy. The real test of each layer came next." },

      { t: "h", text: "Measuring quality on real human labels" },
      { t: "p", text: "Two datasets were reachable from the build environment. **CREMA-D** has 7,442 audio-video clips from 91 actors in six emotions, and every clip was also rated by crowd workers separately for voice only, face only and audio-visual presentation, about 9 raters each. That gives a human baseline on the very same clips. **MELD** has 13,708 utterances from multi-party TV conversations, each labelled with one of seven emotions, with speaker and timestamps. RAVDESS, FER2013 and MELD's audio and video sat on hosts the environment couldn't reach." },
      { t: "flow", title: "The evaluation protocol", takeaway: "Splitting by actor matters: splitting by clip lets the same person appear in training and test, and the model learns the person instead of the emotion. Every choice is made on validation actors; test actors are evaluated once.", flow: { kind: "flow", colW: 250, rowH: 116, nodes: [
        { id: "cd", label: "CREMA-D", sub: "7,442 clips · 91 actors", col: 1, row: 0 },
        { id: "tr", label: "61 train actors", sub: "fit the weights", col: 0, row: 1 },
        { id: "va", label: "15 validation actors", sub: "every choice made here", col: 1, row: 1 },
        { id: "te", label: "15 test actors", sub: "untouched until the end", col: 2, row: 1 },
        { id: "rp", label: "Report once", sub: "vs human raters, same clips", col: 2, row: 2, focus: true },
      ], edges: [
        { from: "cd", to: "tr" }, { from: "cd", to: "va" }, { from: "cd", to: "te" },
        { from: "tr", to: "va", label: "models" }, { from: "te", to: "rp" },
        { from: "va", to: "rp", label: "T, thresholds, epochs" },
      ] } },
      { t: "h", text: "The first models, against people" },
      { t: "table", head: ["Model (15 test actors, chance 17%)", "Accuracy", "int8", "int8 agrees with fp32", "Size", "Humans, same clips"], rows: [
        ["Voice: 88 prosody features + MLP", "54.0%", "55.2%", "90.6%", "0.035 MB", "46.7% (voice only)"],
        ["Face: mini-Xception, clip = mean of ~10 frames", "56.9%", "57.3%", "98.6%", "0.10 MB", "70.2% (face only)"],
      ], title: "Unimodal models on real recordings", takeaway: "The tiny voice model already beat human voice-only raters, partly because voice-only emotion is genuinely hard for people: over all 7,442 clips, their majority vote matched the acted label only 45.5% of the time. int8 cost nothing measurable on either." },
      { t: "image", src: `${IMG}/real_confusions.png`, alt: "Two confusion matrices for the voice prosody model and the face model across six emotions", title: "Where each model goes wrong", takeaway: "The face model recognises joy almost perfectly (0.91 recall) and anger and fear poorly (0.41 and 0.39), often reading them as neutral or sadness. That made the face the main bottleneck." },
      { t: "p", text: "Fused per clip with the same calibrated pool, the two reached **68.4%** (macro-F1 0.683), 11.5 points above the best single modality, with a calibration error of 0.039. One more number needs a sentence of interpretation. Measured against the distribution of human audio-visual votes, the fused probabilities have a Brier score of 0.259, against 0.361 for the one-hot acted label. The model's probabilities are closer to how people actually perceive a clip than the acted label is: where humans split their votes, so does the model." },
      { t: "h", text: "Does the doubt mean anything?" },
      { t: "p", text: "CREMA-D's rater votes give two real ground truths for doubt. A clip is **human-ambiguous** if fewer than 60% of audio-visual raters agree; that's 27.5% of test clips. It's **human-incongruent** if voice-only and face-only raters were each fairly confident but chose different emotions; that's 14.5%. Each of the system's doubt signals can be scored against these with AUROC, where 0.5 is chance and 1.0 is perfect." },
      { t: "image", src: `${IMG}/real_ambiguity.png`, alt: "Left: AUROC bars for four uncertainty signals. Right: accuracy and human-ambiguous share for answered versus flagged clips", title: "Uncertainty against human judgement", takeaway: "Low confidence predicts the model's own errors well (0.79) and human ambiguity partly (0.64). The conflict signal does not predict human voice/face disagreement at all (0.52). Selective answering works: answered clips are 90% right." },
      { t: "p", text: "The ambiguity thresholds were then retuned on validation actors, with the objective of flagging a clip whenever the model is wrong or humans found it ambiguous." },
      { t: "table", head: ["Threshold source", "Answered as confident", "Accuracy when answered", "Accuracy when flagged", "Human-ambiguous share: answered / flagged"], rows: [
        ["Code defaults", "51.9%", "84.3%", "51.3%", "21% / 34%"],
        ["Tuned on synthetic data", "36.7%", "88.6%", "56.6%", "18% / 33%"],
        ["**Tuned on real validation actors**", "37.8%", "**90.1%**", "55.2%", "**15% / 35%**"],
      ], title: "Selective answering on real clips", takeaway: "Synthetic tuning transferred reasonably (88.6% against 90.1%), but the real-tuned thresholds (`conf_p` 0.7, `margin` 0.1, `entropy` 0.6, `conflict_jsd` 0.5) are the recommended setting. They make conflict rare, 3.7% of clips, and route most doubt to uncertain." },
      { t: "callout", label: "Open problem", labelHi: "खुला प्रश्न", text: "The conflict state is not validated. One plausible reason: CREMA-D actors weren't masking anything, so disagreement between voice-only and face-only raters mostly reflects how hard voice is to read, not a person expressing two things. It needs data with real masking or sarcasm, such as the MUStARD sarcasm dataset, before anyone relies on it. Better models later didn't change the result (AUROC 0.51–0.55)." },

      { t: "h", text: "The temporal layer on real data" },
      { t: "p", text: "**Text in real conversations.** With pretrained transformers unreachable, MELD's text was classified by a lightweight stand-in: TF-IDF on word 1–2 grams and character 2–5 grams with logistic regression, 60.5% accuracy and weighted F1 0.562 on test (majority class: 48.1%). The question was whether smoothing text over time helps per utterance. It doesn't." },
      { t: "image", src: `${IMG}/real_meld_text_inertia.png`, alt: "Heatmap of MELD weighted F1 by text dwell from 0.5 to 32 seconds and carry from 0 to 1; the carry 0 row is constant at 0.526", title: "Inertia hurts text; persistence is free", takeaway: "With the classic filter (carry 1), F1 falls from 0.524 to 0.468 as dwell grows. With carry 0 it equals the raw 0.526 at every dwell. In MELD, a speaker's next utterance keeps the same label only 44% of the time." },
      { t: "p", text: "That split the filter's single time constant in two, and it's why the code has a `carry` parameter. Text now uses dwell 10 s with carry 0: each utterance is judged on its own, and its reading stays available for 10 s to compare with face and voice. Face and voice keep carry 1, because their consecutive observations really are autocorrelated." },
      { t: "callout", label: "Trade-off", labelHi: "समझौता", text: "The change had a measured cost. On the synthetic benchmark, instant masking detection fell from 0.70 to 0.25 and window incongruence from 0.56 to about 0.25, because that scenario's masking signal came from text accumulating over several utterances. It was accepted deliberately: real data beats a simulator, and the conflict signal was already unvalidated on real clips." },
      { t: "p", text: "**The mood on MELD.** For 217 dialogue-speaker pairs with four or more utterances and one dominant human label, the Dirichlet mood scored 0.682, a majority vote of raw predictions 0.696, and always answering neutral 0.668. The label is barely better than the baseline; that's the stand-in text model's limit. But the probability attached to it is honest: in the P(dominant) bins 0.2–0.4, 0.4–0.6, 0.6–0.8 and 0.8–1.0, observed accuracy was 0.44, 0.55, 0.79 and 0.89, a calibration error of 0.063." },
      { t: "p", text: "**Voice and face over time.** CREMA-D clips are single sentences, so sessions were assembled from real clips: per actor, episodes of 3 to 6 clips of one emotion, then another, with 0.3 to 1.2 s gaps, about 4.5 minutes each. The audio, the face frames at their real timestamps and the model outputs are real; the episode structure is constructed. The voice reading arrives at the end of each sentence, as it would live." },
      { t: "image", src: `${IMG}/real_temporal.png`, alt: "Left: heatmap of validation instant accuracy across face and voice dwell values, all between 0.531 and 0.543. Right: test instant accuracy and switches per minute for static fusion, default and retuned temporal layers", title: "Real sessions: less flicker, same accuracy", takeaway: "The temporal layer doesn't raise instant accuracy on real data (0.545 to 0.548), unlike the synthetic benchmark (0.76 to 0.96). It does cut flicker from 34.7 to 11.1 switches a minute at about 1 s latency. Accuracy is flat across all 30 parameter settings, so the defaults were kept." },
      { t: "p", text: "Instant accuracy on sessions (0.55) is well below clip-level fused accuracy (0.68). That gap is the price of real time: at each tick the voice reading still describes the previous sentence, and the face has seen only part of the current one. The mood's P(dominant) was again roughly honest, with a calibration error of 0.06–0.07, slightly over-confident at the top." },
      { t: "image", src: `${IMG}/real_session_timeline.png`, alt: "Timeline of a real CREMA-D test actor's assembled session showing ground truth episodes, voice and face readings and the fused instant emotion", title: "One real actor, two minutes", takeaway: "For this actor the face model reads anger and fear mostly as neutral or sadness, so the fused strip misses them. Per-person variation is large, and a per-user calibration step is the likely fix." },

      { t: "h", text: "Upgrading the encoders" },
      { t: "p", text: "The first voice and face models learned from scratch on about 5,000 training clips. With Hugging Face reachable later, pretrained encoders were tested on the same 61/15/15 actor split, choices on validation, test reported once. For voice, a frozen **DistilHuBERT** (a distilled self-supervised speech model pretrained on 960 hours of LibriSpeech) feeds a SUPERB-style head: a learned softmax-weighted sum of its layers, mean and standard-deviation pooling, and an MLP." },
      { t: "table", head: ["Modality", "Model", "Pretrained on", "Test accuracy", "Edge size / cost"], rows: [
        ["Voice", "88 prosody features + MLP", "Nothing", "54.0%", "0.035 MB; features ~30 ms per segment"],
        ["Voice", "**DistilHuBERT (frozen) + head**", "960 h of speech", "**69.4%** (int8 69.1%)", "50.8 MB int8, one graph from raw audio; 45 ms per clip"],
        ["Face", "Mini-Xception, 48×48", "Nothing", "56.9%", "0.10 MB; < 1 ms per frame"],
        ["Face", "MobileNetV3-large, 112×112, fine-tuned", "ImageNet objects", "52.3%: worse", ""],
        ["Face", "HSEmotion EfficientNet-B0 (frozen) + head", "AffectNet expressions", "53.5% (zero-shot 46.2%)", "16.1 MB fp32; 14 ms per frame"],
        ["Face", "**Ensemble: mini-Xception + HSEmotion**", "", "**58.5%**", "16.2 MB; ~15 ms per frame"],
      ], title: "Pretraining helps when it matches the task", takeaway: "Speech pretraining lifted voice by 15 points, and every emotion improved. ImageNet pretraining made the face worse: with 61 training actors, the bigger model memorised individuals. Three different face architectures landing at 52–57% points at the face data, not the architecture." },
      { t: "table", head: ["Voice + face, test actors", "Accuracy", "Answered as confident", "Accuracy when answered", "ECE"], rows: [
        ["Prosody MLP + mini-Xception (first version)", "68.4%", "37.8%", "90.1%", "0.039"],
        ["DistilHuBERT + mini-Xception (lean, ~51 MB)", "75.6%", "41.4%", "91.7%", "0.060"],
        ["DistilHuBERT + face ensemble (full, ~67 MB)", "**75.7%**", "**51.4%**", "91.3%", "**0.042**"],
        ["Human raters, audio + video", "76.5%", "", "", ""],
      ], title: "The fused system now matches people", takeaway: "Adding the second face model barely moves accuracy (+0.1) but changes confidence: half the clips are answered instead of 41%, with better calibration. The DistilBERT text model, about 56 MB, comes on top of either configuration." },

      { t: "h", text: "Security, privacy and responsible use" },
      { t: "p", text: "There's no server. Inference runs on the device and only derived probabilities ever need to leave it. The README states the rule plainly: outputs describe expressed affect probabilistically, not inner states, and the system runs on device, with consent. The design carries it through: the `blend`, `ambiguous`, `conflict` and `uncertain` states exist to avoid false certainty, and the mood is never reported without its probability." },
      { t: "list", items: [
        "**Fairness is unmeasured.** The training corpora are demographically narrow; the documentation says to measure per-group error before any deployment.",
        "**A licence constraint.** HSEmotion's code is Apache-2.0, but its weights were trained on AffectNet, which is licensed for research only. That affects the full configuration, not the lean one.",
        "**Mood is a narrow word here.** A 30-second window is far shorter than a psychological mood; it means the dominant state expressed over the window, nothing more. The behaviour tags are heuristics, not diagnoses.",
        "**One subject assumed.** The text segmenter honours speaker changes, but the audio and face paths assume one person; multi-speaker use needs diarisation.",
      ] },

      { t: "h", text: "What broke, and what it taught" },
      { t: "p", text: "Most of the useful changes in this repository came from something failing on contact with data. The commit history, all ten commits of it, records them alongside the features." },
      { t: "table", head: ["What went wrong", "How it showed up", "What changed"], rows: [
        ["Haar cascade reloaded on every frame", "Face detection measured at 45 ms a frame; the real cost is 20–30 ms", "Cached per process; the latency budget was corrected"],
        ["One time constant for the filter", "On MELD, any inertia lowered per-utterance F1", "Split into `dwell` (persistence) and `carry` (inertia); text carry 0"],
        ["Window incongruence by valence-arousal distance", "Counted neutral as incompatible: a 0.61 false-alarm rate on the synthetic benchmark", "Replaced by P(opposite valence) between modality leaders; neutral never counts"],
        ["Sequential emotions reported as simultaneous", "Windows straddling a change came out `conflicted`", "Added the `transition` mood state"],
        ["Trend tags at start-up", "The filter starting from the base rate read as de-escalating", "Trend tags need a window of at least 15 s"],
        ["`escalating` required valence non-increasing", "Noise of +0.04 per minute blocked it", "Now \"valence not rising meaningfully\""],
        ["VAD decided before measuring the room", "False onsets on background noise", "No decisions in the first 200 ms"],
        ["Frame sampler drift", "The 4 fps grid wandered", "Advances on a fixed grid, resyncs on skips"],
        ["Static int8 on EfficientNet-B0", "48% agreement with fp32, and slower on this CPU", "HSEmotion ships in fp32; quantization-aware training is the fix"],
        ["Documentation said ~130 prosody features", "The code computes 88", "Corrected"],
      ], title: "Bugs and dead ends", takeaway: "None of these were visible to a type checker or to synthetic tests alone. Most surfaced the first time the system met real recordings, which is the strongest argument in the repo for getting to real data early." },
      { t: "p", text: "A scoring artefact belongs on the list too. Windows split 50/50 between two phases have no single correct mood, and the model correctly called them `transition`; the evaluation was counting them as errors. They're now scored separately. And one negative result is worth stating plainly: on easy windows, the Dirichlet mood doesn't beat a majority vote (both score 1.00 on the synthetic session, and the vote is slightly ahead on MELD). Its value is the probability, the credible intervals and transition detection, not a better label." },

      { t: "h", text: "Trade-offs and alternatives" },
      { t: "table", head: ["Choice", "Instead of", "Why"], rows: [
        ["Late fusion, reliability-discounted log-opinion pool", "Early fusion, Dempster-Shafer, learned stacking", "Handles dropout and mismatched labels, keeps disagreement visible, needs no jointly labelled data"],
        ["Sticky HMM filter", "Moving average, majority vote, learned HMM, LSTM", "Time-aware, quality-aware, staleness built in, no training data needed; a learned 8×8 transition matrix needs labelled sequences"],
        ["Dirichlet evidence for mood", "Averaging probabilities, majority vote", "Gives P(dominant), credible intervals and effective evidence; handles correlated frames"],
        ["Classify each utterance, then pool over time", "Concatenating the window's text; pooling embeddings", "Matches the single-sentence training data, streams at constant cost, keeps per-utterance uncertainty"],
        ["Categorical state, valence-arousal for description", "A Kalman filter on valence and arousal", "Anger and fear sit close together in valence-arousal; the category would be lost"],
        ["ONNX Runtime", "TFLite, ExecuTorch", "One runtime for the transformer, MLP and CNN, with mature CPU kernels on x86 and ARM"],
        ["Default temporal parameters kept", "Values retuned on CREMA-D validation", "Accuracy was flat across the sweep and the retuned values did slightly worse on test"],
      ], title: "Decisions, from the 28-item log", takeaway: "The pattern is consistent: pick the simplest model that gives a calibrated, inspectable probability, and upgrade to a learned one only when labelled data exists to learn it from." },
      { t: "p", text: "Two upgrades are named in the design but not built. **Bayesian online change-point detection** would replace the half-window comparison behind `transition` with a principled run-length posterior. **Sequence models** over the raw streams would need labelled multimodal sequences, are harder to inspect and cost more on an edge device; they're worth reconsidering once in-domain recordings exist." },

      { t: "h", text: "What's still open" },
      { t: "list", items: [
        "**Run the text model for real.** `make real-text` or the Colab notebook, then replace the MELD TF-IDF stand-in. Everything else is ready for that number, including the gate.",
        "**Validate `conflict` and `incongruent`** on data with real masking or sarcasm, such as MUStARD.",
        "**Record in the deployment setting.** The documentation asks for 10–20 sessions of 5–15 minutes on the target camera and microphone, with consent, annotated by 2–3 people for emotion, per-window mood, and mixed, masked and escalating flags. Then rerun threshold and temporal tuning on them.",
        "**Test real-time capture** on an actual camera and microphone.",
        "**Per-user calibration**, since the face model fails on some actors' anger and fear.",
        "**Quantize the rest of DistilHuBERT** (its convolutional front-end is still fp32) and use quantization-aware training for the face encoder.",
        "**Measure on real hardware**, so the `--slowdown` ratio replaces host-based proxies.",
      ] },
      { t: "p", text: "The repository's `docs/` folder has the full technical documentation, the temporal design with its references, the operations guide and the real-data study, and the result files behind every number in this piece are in `results/`." },
    ],
  },
};
