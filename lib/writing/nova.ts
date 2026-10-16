import type { Article } from "../articles";

// ──────────────────────────────────────────────────────────────────────── Nova

const IMG = "/writing/nova";

export const nova: Article = {
  slug: "nova",
  project: "Nova",
  projectHi: "नया तारा",
  published: "2026-10-17",
  status: "Active",
  team: "Aakshant Kumar · Kaiketsu Tech",
  hero: { src: `${IMG}/plan-graph.png`, alt: "Nova's canvas drawing a request as a graph: what was said, how it was routed, the agent, four plan steps with two running side by side, and the result" },
  links: [{ label: "Source", href: "https://github.com/unexperiencedone/assistant-", kind: "source" }],
  stack: ["Python", "faster-whisper", "Groq", "Claude Code CLI", "FastAPI", "SQLite", "React", "Windows UI Automation", "Tailscale", "Termux"],

  // ─────────────────────────────────────────────────────────────────────── Story
  story: {
    title: "Nova: a voice assistant built to get cheaper the more it's used",
    dek: "Most assistants cost the same on day three hundred as on day one, because every request goes to a model. Nova is built to learn the things it's asked again and again, so they stop costing anything. Who it's for, how it works, and what the numbers say so far.",
    blocks: [
      { t: "p", text: "Ask most AI assistants to play a song and the same thing happens every time. Your words go to a large model, the model works out what you meant, and somebody pays for that thinking. The thousandth request costs what the first one did. That's fine when someone else is paying. It isn't when the only model you can rely on comes out of a fixed subscription with a usage limit, and every small request eats into the quota you need for real work." },
      { t: "p", text: "That was the situation Nova was built in. Its owner, a computer science student who works across VS Code, Chrome, Spotify and a dozen other apps all day and talks to the computer more than types at it, had no API billing at all. The one strong model available was Claude, through the Claude Code command-line tool on a personal subscription. On the first morning of the project, the instruction that decided everything else was short: we can't use the API, so drive Claude Code itself." },
      { t: "callout", label: "In short", labelHi: "सार", text: "Nova is a voice assistant that lives on one Windows laptop. It hears you on the laptop itself, then sends each request down the cheapest path that can handle it: a saved script if it has done this before, a free model for questions and lookups, and the paid coding agent only for real work. The paid agent labels every job by kind. When the same kind keeps coming back, Nova asks it to write the job up as a script, and the script only goes live after you approve it. It is built, tested and in regular use by its one user. Whether it really gets cheaper is being measured, and the numbers so far are mixed." },

      { t: "h", text: "Who it's for" },
      { t: "p", text: "Nova has exactly one user: the person who built it. That's deliberate. Because it runs on the owner's own machine with the owner's own logins, it can do what a cloud assistant can't: open local files, click buttons inside desktop apps, drive the Chrome that's already signed in to everything, and reach the phone in a pocket over a private network." },
      { t: "p", text: "The people it speaks for, beyond that one user, are anyone in the same spot: at a computer all day, wanting an assistant that does things rather than chats about them, and unwilling to pay again for something the assistant has already done a dozen times. Students without API credit are the obvious group, because for them the subscription limit is the whole budget." },

      { t: "h", text: "What it was like before" },
      { t: "p", text: "The project's second day is the most instructive one in its history. Nova was left listening in a room with a television on, and by evening it had accepted requests like \"Keep on tingling\" and \"These daughter got the car, I've got to go.\" Nobody said those things. A speech recogniser always returns something, and says it confidently, so every one of those strings was treated as an instruction. That day produced no code. It produced a rule: an assistant that acts on noise is worse than one that mishears, because mishearing is visible and noise isn't." },
      { t: "p", text: "The deeper problem showed up two weeks in, in the project's own status report. The reliable model was expensive and the free models were unreliable, so Nova got used for demos (music, news, the capital of Japan) while real work was still done by hand. And because the learning loop only learns from work that passes through it, it never learned the real work. The report called this the adoption loop and said plainly that no feature would fix it; only routing real work through Nova would." },

      { t: "h", text: "How it works, in plain terms" },
      { t: "p", text: "You say \"Nova\" and a request. The audio is turned into text on the laptop by a speech model called faster-whisper, so no recording leaves the machine. Two checks run before anything acts: one drops text the recogniser was only guessing at, and the other, once you've enrolled your voice, drops speech that isn't yours. Then the request goes down a ladder, cheapest rung first, as the figure below shows." },
      { t: "flow", title: "The cheapest path that can do it", takeaway: "A saved script costs nothing and takes seconds. A free model handles questions and lookups in about a second. The paid coding agent is the last resort, and the free model hands work up to it rather than giving up.", flow: { kind: "flow", colW: 260, rowH: 124, nodes: [
        { id: "ask", label: "You ask", sub: "transcribed on the laptop", col: 1, row: 0 },
        { id: "scr", label: "Saved script", sub: "no model, seconds, free", col: 0, row: 1, focus: true },
        { id: "free", label: "Free model", sub: "questions and lookups", col: 1, row: 1 },
        { id: "cla", label: "Coding agent", sub: "real work, uses quota", col: 2, row: 1 },
      ], edges: [
        { from: "ask", to: "scr", label: "done it before" }, { from: "ask", to: "free" }, { from: "free", to: "cla", label: "can't finish" },
      ] } },
      { t: "p", text: "Most of the care goes into refusing to guess. The matcher that recognises \"switch on the flashlight\" as the torch command can only ever pick a script that already exists, and when it's only fairly sure it asks \"Did you mean...?\" instead of acting. The free model that sorts unclear requests is allowed to answer \"none\", and its instructions say that \"none\" is a good answer, because picking the wrong script does the wrong thing while \"none\" only costs the turn that was going to be spent anyway." },

      { t: "h", text: "The part that makes it cheaper" },
      { t: "p", text: "Every time the paid agent finishes a job, it ends its reply with a hidden tag naming what kind of job it was: `play_song`, not \"play this particular artist\". Nova strips the tag before anything is spoken and counts it. When the same kind of job has succeeded three times, Nova asks the agent, quietly in the background, to write down the steps it actually took as a small script, with a blank where the song name goes." },
      { t: "flow", title: "From the first time to every time after", takeaway: "The first request costs a model turn. The third of the same kind turns into a proposal. Once you say \"keep that automation\", every request after it runs as a script with no model at all.", flow: { kind: "flow", colW: 260, rowH: 120, nodes: [
        { id: "first", label: "First time", sub: "the agent works it out", col: 0, row: 0 },
        { id: "tag", label: "Tagged", sub: "what kind of job it was", col: 1, row: 0 },
        { id: "count", label: "Counted", sub: "same kind, third success", col: 2, row: 0 },
        { id: "write", label: "Written up as a script", sub: "a proposal, not live", col: 2, row: 1 },
        { id: "ok", label: "You say keep it", sub: "checked first, then yours", col: 1, row: 1, focus: true },
        { id: "after", label: "Every time after", sub: "runs with no model", col: 0, row: 1 },
      ], edges: [
        { from: "first", to: "tag" }, { from: "tag", to: "count" }, { from: "count", to: "write" },
        { from: "write", to: "ok" }, { from: "ok", to: "after" },
      ] } },
      { t: "p", text: "The approval step wasn't in the first version. Early on, scripts went live the moment they were written, and on 23 September the loop produced three of them. Two made things worse. One turned a complaint, \"you haven't told me proper news\", into a trigger phrase for the news briefing, so it would have fired at exactly the moment the owner was saying the briefing had gone wrong. Now every proposal waits in a separate folder, a checker refuses ones built from complaints or that repeat a step, and nothing runs until you say so." },
      { t: "p", text: "There's a softer half too. Most jobs are too varied ever to become a script, so after every success Nova also records which tools worked, how long it took and what failed on the way, and shows that to the free model the next time a similar request arrives. \"The window is called Spotify Premium, not Spotify\" is one line, and it saves two wasted attempts." },

      { t: "h", text: "What it can reach" },
      { t: "list", items: [
        "**Your own Chrome**, through a small extension, with every site you're already signed in to. Pages reach the model as a short numbered list of buttons and fields instead of a wall of text.",
        "**Desktop apps**, by clicking controls by name (\"Five\", \"Plus\", \"Equals\" in Calculator) through Windows' accessibility interface, never by screen position, so a moved window doesn't break anything.",
        "**Your phone**, over Tailscale, a private network between your own devices: the torch, the battery, a notification, find-my-phone, opening an app, and texts and calls that always wait for a yes.",
        "**Several jobs at once.** Quick errands run alongside a big job, each in its own lane on a live canvas, and only one of them talks out loud.",
        "**Your day.** It knows the date, weather and your calendar, reminds you 60, 30 and 15 minutes before things, and keeps a short journal of each finished day built from what actually happened.",
      ] },
      { t: "p", text: "The newest piece is the overlay. Press Ctrl+Alt+H in any app and Nova appears over it, reads what you've selected, and answers there, without you switching windows. The figure shows the design it was built to." },
      { t: "image", src: `${IMG}/overlay-mockup.png`, alt: "Design mockup: Nova's overlay over a code editor, showing the selected lines it is reading, an answer, three numbered next actions and a Needs-you list", title: "Help in place, as designed", takeaway: "This is the design mockup, not a screenshot, and its content is illustrative. The overlay itself is built and was fixed and checked on both of the owner's monitors." },

      { t: "h", text: "What it will never do on its own" },
      { t: "p", text: "An assistant that can send texts and post to LinkedIn needs rules that don't depend on a model behaving well. Nova has a few, and each one is enforced in code rather than asked for in a prompt." },
      { t: "list", items: [
        "**Nothing outward-facing sends itself.** Posts, texts and calls are drafted, read back, and wait for a yes to that specific item. There's deliberately no tool a model can call to approve a draft, and no \"yes to everything\" switch.",
        "**The phone only knows named actions.** There is no way for Nova, or anyone holding its key, to run an arbitrary command on the phone.",
        "**When it can't tell, it says so.** Android reports a call as placed even when it silently blocked it, and for a while Nova said \"Calling now\" for calls that never happened. It now checks the phone's real call state and has three answers: calling, dropped and why, or \"I can't tell\".",
        "**Read content can't give orders.** A text message containing one of Nova's internal instructions is made harmless before Nova reads it, so a stranger can't send a text that opens a link on your phone.",
      ] },

      { t: "h", text: "Where it honestly stands" },
      { t: "p", text: "Nova works and is used. 897 automated tests pass in about 32 seconds, there are 20 saved scripts, and in the week starting 12 October it handled 153 requests. But the central claim, that it gets cheaper the more it's used, has only partly come true, and the project's own measurements say so." },
      { t: "table", head: ["What the numbers support", "What they don't, yet"], rows: [
        ["Since a free model became the front door, about four in five requests cost nothing (77% to 82% a week)", "That it learns to need no model at all: requests answered by scripts alone were 10% in the latest week"],
        ["The learning loop fires: 7 of the 38 kinds of job it has tagged reached the proposal stage", "That real work goes through it: the status report found mostly demos did, and said so"],
        ["Claude use is measured per turn: $23.92 at list price across 104 turns, 95% of input from cache", "That handing work up is rare: $12.79 of that Claude use was work the free model passed up"],
        ["A free-model turn averages about 3,600 tokens, after a bug that resent each turn's history was fixed", "Whether the free model's confident answers are good: nothing measures a mediocre answer yet"],
      ], title: "The honest split", takeaway: "The cheap path is carrying most requests, but by moving them to a free model rather than by turning them into scripts. The loop that writes scripts exists and works; the work it would learn from is still mostly withheld." },
      { t: "p", text: "One finding from the status report deserves its own sentence. The fear that kept real work away from Nova was that the free model is unreliable and burns through its rate limit. Investigation found that the unreliability was largely self-inflicted: Nova resent the whole conversation on every step of a turn, so a ten-step job cost about 22 times what it needed to. That's fixed. Whether the trust comes back with it is the next thing to find out." },

      { t: "h", text: "Why it matters" },
      { t: "p", text: "Almost every assistant today is priced as if each request were new. Most aren't. People ask for the same few dozen things over and over, and a system that notices that, writes it down, and asks before it changes its own behaviour can get faster, cheaper and more predictable at the same time, without sending more of anyone's life to a server." },
      { t: "p", text: "Nova is also a record of a lesson that came up five times in two weeks: if something only works when a model chooses to do it, it will eventually not choose. The fix every time was the same. Match locally, check in code, then tell the model what was found." },

      { t: "h", text: "Try it" },
      { t: "p", text: "The code is public. `python main.py --text --no-browser` runs Nova with typed input and no canvas, `python main.py demo` plays a scripted canvas demo with no microphone and no model usage, and `python main.py stats --routes` prints the week-by-week chart this piece quotes. It needs Windows, Python 3.11 and a signed-in `claude` CLI; nothing in `.env` is required to start it. The technical piece next door covers every tier, the bugs, and what's still open." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────── Technical
  technical: {
    title: "Nova, technically: a cost cascade for a voice assistant, and the loop that writes itself out of the job",
    dek: "How a Windows voice assistant with no API billing routes each request to the cheapest thing that can handle it, what every tier is made of and why, the bugs that shaped it, and what five weeks of route counts actually say.",
    blocks: [
      { t: "p", text: "Nova is a Python voice assistant for one Windows 11 laptop. It listens through the microphone, transcribes on the CPU, acts on the machine (apps, files, the browser, Word), on a phone over a private network, and through several AI \"brains\", and shows its working on a React canvas. It's built around one idea: a request should reach a model only when nothing cheaper can handle it, and work that keeps reaching a model should be turned into something that doesn't." },
      { t: "p", text: "This piece follows a request through the system tier by tier, with the actual thresholds and code, then covers the data the system keeps, speech, the hands it uses on the machine and the phone, security, testing and measurement, the failures that shaped it, and what's open. Every number comes from the repository: its documents, its 29 September status report, its tests, or the route and usage records on the machine, read on 17 October 2026." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "A request falls through scripted tiers (TOML automations, regex intents, a loose matcher, a validated free-model classifier) before any agent runs. Agents start on Groq's free tier with 41 tools and hand up to the Claude Code CLI when stuck. Every agent reply carries a hidden task-type tag; three successes of one type trigger a proposed automation that a local reviewer checks and the owner approves. Measured: 77 to 82% of weekly requests now cost nothing, but scripts alone answer only 10 to 24%; the rest is the free model. A quadratic history resend was the main cause of free-tier rate limits and is fixed." },

      { t: "h", text: "The problem and the constraints" },
      { t: "p", text: "The founding constraint is written into the project's history in the owner's own words from the first morning: no API billing, so drive Claude Code. Claude is therefore reached by running the `claude` CLI as a long-lived subprocess, not through an SDK. A Claude turn costs subscription quota and seconds rather than cents, and the only way to make one cheaper is not to make it. Every cheap tier in the system exists because of that." },
      { t: "list", items: [
        "**No Anthropic API calls, ever.** The repo's agent rules forbid adding them. The other brains are free: Groq and OpenRouter keys in `.env`, plus Google's Antigravity CLI.",
        "**One laptop, CPU only.** Speech recognition, the local index, embeddings and voice identification all run on the CPU.",
        "**Speech must never go silent mid-reply.** A free cloud voice that rate-limits halfway through a sentence was removed on day two for exactly that.",
        "**Voice first.** The owner talks far more than types, so every decision has a spoken path, and replies are written for the ear.",
        "**Nothing outward-facing without a yes.** Posts, texts, calls and changes to Nova's own behaviour all wait for approval of that specific item.",
      ] },
      { t: "p", text: "The system at a glance, counted for this piece. The growth column is from the project's own history and status report." },
      { t: "table", head: ["", "15 Sep", "23 Sep", "29 Sep", "17 Oct"], rows: [
        ["Lines of Python", "5,758", "16,488", "18,976", "30,193 (169 modules)"],
        ["Tests", "0", "420", "658", "897, passing in 31.7 s"],
        ["Commits", "1", "62", "84", "114"],
        ["Saved automations", "0", "", "17", "20"],
        ["Canvas (React)", "", "", "15 screens", "7,156 lines, four spaces"],
        ["Tools a free model can call", "", "25", "", "41"],
      ], title: "Nova by the numbers", takeaway: "Commits came in bursts (45 on 20 September, 30 on 23 September) because work was done live by voice and committed in batches. The test count tracks the failure record: most tests were written the day something broke." },

      { t: "h", text: "System architecture" },
      { t: "p", text: "The figure below shows the runtime shape. Input arrives from the microphone, or typed from the canvas, the phone or the overlay. A controller decides one route per request. Three families of handler sit under it: scripts, free models and the CLI agents. Nothing calls anything else's interface directly; modules publish to an in-process `EventBus`, and the state the canvas and the voice need is built from those events." },
      { t: "flow", title: "The runtime architecture", takeaway: "Every handler reports through the bus, which is why the canvas, the voice, the route counter and the learning stores can all watch the same request without knowing about each other.", flow: { kind: "flow", colW: 260, rowH: 116, nodes: [
        { id: "mic", label: "Microphone", sub: "faster-whisper on the CPU", col: 0, row: 0 },
        { id: "typed", label: "Canvas, phone, overlay", sub: "typed: no wake word", col: 2, row: 0 },
        { id: "gate", label: "Gate and voice ID", sub: "drop what isn't a request", col: 0, row: 1 },
        { id: "ctl", label: "Controller", sub: "one route per request", col: 1, row: 1, focus: true },
        { id: "scr", label: "Scripts and intents", sub: "TOML, regex, loose match", col: 0, row: 2 },
        { id: "free", label: "Free models", sub: "classifier, Groq + tools", col: 1, row: 2 },
        { id: "cli", label: "Claude / Antigravity", sub: "CLI subprocess", col: 2, row: 2 },
        { id: "bus", label: "EventBus", sub: "topics, not direct calls", col: 1, row: 3 },
        { id: "voice", label: "Voice out", sub: "Fish, local voice beneath", col: 0, row: 4 },
        { id: "canvas", label: "React canvas", sub: "versioned slices over /ws", col: 1, row: 4 },
        { id: "stores", label: "Counters and stores", sub: "routes, tags, recipes", col: 2, row: 4 },
      ], edges: [
        { from: "mic", to: "gate" }, { from: "gate", to: "ctl" }, { from: "typed", to: "ctl" },
        { from: "ctl", to: "scr" }, { from: "ctl", to: "free" }, { from: "free", to: "cli", label: "hand up" },
        { from: "scr", to: "bus" }, { from: "free", to: "bus" }, { from: "cli", to: "bus" },
        { from: "bus", to: "voice" }, { from: "bus", to: "canvas" }, { from: "bus", to: "stores" },
      ] } },
      { t: "p", text: "Threads matter on Windows. `app.py` runs input handling on a worker thread and keeps the main thread for the native window and the tray icon. Agent turns run in a pool (`agent_runner.py`, `max_parallel = 2`), each task with its own id, its own agent session and its own lane on the canvas. The UI never rebuilds its snapshot: `state.py` keeps named slices with revision numbers, and the FastAPI server sends only the slices that changed, and only new rows for list slices." },

      { t: "h", text: "The request path, tier by tier" },
      { t: "p", text: "The heart of the system is `Controller.handle`. A request is tried against progressively more expensive handlers, and the first one that claims it wins. Before any of this, pending yes-or-no questions are resolved (a confirmation for a text, a \"did you mean\", a promotion offer), and an ambiguous answer to a destructive question cancels it rather than guessing." },
      { t: "flow", title: "The order handlers are tried in", takeaway: "Five chances to answer without an agent, each cheaper than the next. Only the last box starts a model turn with tools, and even that starts on the free tier.", flow: { kind: "flow", colW: 280, rowH: 96, nodes: [
        { id: "in", label: "Heard or typed", col: 0, row: 0 },
        { id: "a", label: "Saved automation?", col: 0, row: 1 },
        { id: "ar", label: "Run its TOML steps", sub: "no model", col: 1, row: 1 },
        { id: "i", label: "Instant intent?", col: 0, row: 2 },
        { id: "ir", label: "Run the handler", sub: "regex, local", col: 1, row: 2 },
        { id: "u", label: "Act or talk?", col: 0, row: 3 },
        { id: "ur", label: "Talk turn", sub: "free model, no tools", col: 1, row: 3 },
        { id: "l", label: "Loose match?", col: 0, row: 4 },
        { id: "lr", label: "Run it, or ask first", sub: "0.86 runs, 0.72 asks", col: 1, row: 4 },
        { id: "c", label: "Free classifier", col: 0, row: 5 },
        { id: "cr", label: "Run the script named", sub: "checked against the list", col: 1, row: 5 },
        { id: "ag", label: "Agent turn", sub: "Groq first, Claude last", col: 0, row: 6, focus: true },
      ], edges: [
        { from: "in", to: "a" }, { from: "a", to: "ar", label: "match" },
        { from: "a", to: "i" }, { from: "i", to: "ir", label: "match" },
        { from: "i", to: "u" }, { from: "u", to: "ur", label: "talk" },
        { from: "u", to: "l" }, { from: "l", to: "lr", label: "close" },
        { from: "l", to: "c" }, { from: "c", to: "cr", label: "picked" },
        { from: "c", to: "ag", label: "none" },
      ] } },
      { t: "p", text: "Here is that order in the code, trimmed. Note the last comment: the route event, which the cost measurement depends on, is published once, by whoever actually took the turn." },
      { t: "code", lang: "python", source: "assistant/controller.py", title: "Controller.handle, the cascade", takeaway: "Each branch publishes a `route` event naming the tier that answered. Those events are the only evidence for the project's central claim, so who publishes them, and how often, turned out to matter (see Measuring it).", text: `# Scripted automations first: user-defined phrases, instant, no Claude usage.
found = self.automations.match(text) if self.automations else None
if found:
    macro, params = found
    self.bus.publish("route", utterance=text, route="automation", name=macro.name)
    ...
    return

intent = match_intent(text)
if intent is None:
    # Nothing matched strictly. Is it something to do, or something said?
    judgement = self._prejudged or self._understand(text)
    if judgement.kind == understanding.TALK:
        self.bus.publish("route", utterance=text, route="talk", name=judgement.source)
        self._talk(text, judgement)
        return
    # Before paying for an agent turn, check whether this is something Nova
    # already has a script for, said differently.
    if self._try_loosely(text):
        return
if intent and intent.name in LOCAL_INTENTS:
    ...
elif intent:
    self.bus.publish("route", utterance=text, route="intent", name=intent.name)
    self._handle_intent(intent, text)
else:
    # No route event here: dispatch publishes the real one, naming the backend
    # that took the turn. Publishing an anonymous "agent" first counted every
    # model turn twice, which is why the measured free share read low.
    self.dispatch(text, command=text, brain=brain)` },

      { t: "h", text: "Tier 1 and 2: automations and instant intents" },
      { t: "p", text: "An **automation** is a TOML file in `automations/` with a list of phrases and a list of steps. Phrases contain named slots such as `{query}`; `macros.py` turns each phrase into a strict regex, and a match fills the slots, which every step can interpolate (with derived forms like `{query_url}` for links). Steps cover Windows UI Automation (`open`, `wait_window`, `click`, `click_best`, `type`, `keys`, `read`, `media`), the browser, the phone, `say` and `wait`. Files are re-read when they change, so a new automation needs no restart. Here is part of the Spotify one; the comments are the repo's own." },
      { t: "code", lang: "toml", source: "automations/play_song.toml", title: "An automation that proves what it did", takeaway: "The interesting steps aren't the clicks. `wait_value` proves the screen is showing this search and not the last one, and a later `wait_title` reads what is actually playing, so Nova reports what happened rather than what was asked for.", text: `phrases = [
  "play {query} on spotify",
  "spotify play {query}",
  "put on {query}",
  "play {query}",
]
# When Spotify can't play it (not installed, nothing found, never starts), the same request
# goes to YT Music in Chrome.
fallback = "play_on_yt_music"

[[steps]]
do = "open"
label = "Search Spotify for {query}"
target = "spotify:search:{query_url}"

# Proof the results on screen are for *this* search: Spotify sometimes ignores the link
# when it is already open and keeps the last search.
[[steps]]
do = "wait_value"
window = "exe:spotify"
name = "What do you want to play?"
contains = "{query}"
reopen = "spotify:search:{query_url}"
timeout = 8` },
      { t: "p", text: "An automation that fails a step isn't a dead end. The controller hands the same request to the current agent with a note of what already happened (\"stopped at step 4; the steps before that already ran; check the current state first\"), and once the agent succeeds, a second background turn asks it to propose a fix. That note exists because without it, the model re-ran the automation, checked in a way that couldn't see the result, then handed over to Claude, and the song was started three times." },
      { t: "p", text: "An **instant intent** is a regex in `intents.py` paired with an `_intent_<name>` method on the controller: status, cancel, switch brain, plan editing, the phone, memory, schedule, recaps, the time. Specific patterns come before general ones, because \"call it a day\" must not reach the dialler while a three-word contact name must." },

      { t: "h", text: "Tier 3: act or talk" },
      { t: "p", text: "Until mid-October Nova had explicit talk modes (\"let's chat\" ... \"back to work\"). They broke the conversation both ways: asking for something mid-chat meant leaving the mode first. `understanding.py` replaced the switch with a judgement on every turn the strict matchers didn't claim. Rules decide most turns instantly: a request that starts with one of a long list of action verbs (open, play, send, write, fix, schedule...) is `act`, a greeting or a reaction is `talk`, a factual question is `act`. A free model on a background key decides the rest with the last few turns in view. When nothing decides, the answer leans on context: mid-conversation, an unclear sentence is talk. That keeps the one safety property the modes had. In a chat, a bare name (\"gulzar ali\" once became a phone call) never becomes an action." },
      { t: "p", text: "Talk turns run on a copy of the free model with no tools at all, so they send no tool schemas and are the cheapest model turn Nova has." },

      { t: "h", text: "Tier 4: the loose matcher" },
      { t: "p", text: "Strict regexes are instant and certain but literal, and speech varies. `matching.py` sits at exactly one place, the last branch before a request would go to an agent, and may only resolve to a script that already exists. It is standard-library Python with no model and no network, so trying costs microseconds. Three things make it work: filler words are stripped (\"could you please play X for me\" and \"play X\" become the same tokens), synonyms are collapsed to one canonical word from small hand-picked groups (\"locate my mobile\" and \"find my phone\" share almost no letters), and word order may vary at a penalty." },
      { t: "p", text: "Scoring aligns each template's fixed words against what was said using `difflib` similarity (a word counts at 0.78 or above). Words between two anchors fill the slot between them. The score is the mean similarity minus 0.09 for every word the template didn't account for; an out-of-order match pays an extra 0.10 and can never outrank an in-order one. A slot that comes out implausible is thrown away: \"pull up news brief for me and while you are at that play some song on spotify\" once scored 0.90 against \"pull up {topic} news\" and would have read the whole sentence back as a topic." },
      { t: "table", head: ["Said", "Result"], rows: [
        ["\"could you please put [artist] on spotify\"", "runs `play_song`, query = the artist"],
        ["\"where's my cell\"", "runs `phone_find`"],
        ["\"switch on the flashlight\"", "runs `phone_torch`"],
        ["\"spotify play some old punk\"", "asks first (0.85)"],
        ["\"play something on youtube instead of spotify\"", "asks first (0.73): close, but not the same request"],
        ["\"what is the capital of peru\"", "no match: goes on to the classifier"],
      ], title: "Two thresholds, because the two errors cost differently", takeaway: "At 0.86 or above it runs; from 0.72 it asks \"did you mean...?\"; below that it stays silent. A wrong guess here runs the wrong action, so the design prefers being unsure out loud. Saying no passes on what you actually said, not what Nova heard in it." },
      { t: "p", text: "One bug is worth recording because it is the exact failure the module's own comments warn about. \"phone\" was listed both as a base word (the device) and as a variant of \"call\" (the verb), so the flattened table turned \"find my phone\" into \"find call\". There is now an `assert` at import time that no word is both a base and somebody else's variant." },

      { t: "h", text: "Tier 5: a free model that may only point" },
      { t: "p", text: "Many misses aren't hard problems; they're a known request worded in a way nobody wrote a phrase for. Deciding which of a known list of scripts somebody meant is a tiny classification job, so `classify.py` asks Groq (`openai/gpt-oss-120b`, temperature 0, JSON output, 200 tokens) with the catalogue of every automation and intent in the prompt. It runs off the work loop on the pool's background key, and any failure (no key, no network, a rate limit, a garbled reply) means \"none\", so the request simply carries on to the agent. The safety comes from what happens to the reply." },
      { t: "code", lang: "python", source: "assistant/classify.py", title: "The model is a pointer, not a source", takeaway: "A script name not in the list, a confidence under 0.6, an argument the template never declared, an empty slot, or a slot value that isn't really in what was said: each turns the answer into \"none\". The model can choose an action, never invent one.", text: `def validate(answer, corpus, min_confidence=MIN_CONFIDENCE, said=None):
    name = str(answer.get("script", "") or "").strip()
    if not name or name.lower() in ("none", "null", "no", "n/a"):
        return None
    entry = next(((route, known, template) for route, known, template in corpus if known == name), None)
    if entry is None:
        return None                                   # a script that does not exist
    ...
    if confidence < min_confidence:
        return None
    wanted = slots_of(template)
    args = {key: str(value).strip() for key, value in raw.items()
            if key in wanted and str(value).strip()}
    if wanted - set(args):
        return None                                   # a slot it failed to fill
    # Asked "brief me on recent news", the model picked the right script and handed back
    # topic="brief me on recent", which the automation then said back out loud.
    if said is not None and not slots_are_sane(said, template, args):
        return None
    return Guess(route=route, name=name, args=args, score=confidence, phrase=template)` },
      { t: "p", text: "Measured against the real endpoint at 0.6 to 1.8 seconds per call, it routed \"i've misplaced my handset again\" to `phone_find`, \"chuck on that new [artist] tune\" to `play_song` with the right query, and \"give me the wikipedia rundown on quantum computing\" to `wikipedia_search`; and it declined \"what's the capital of peru\", \"write me a python script to rename files\" and \"how are you today\". The declines are what make the picks safe." },

      { t: "h", text: "Tier 6: the agents" },
      { t: "p", text: "Four brains sit behind one registry and can be switched by voice (\"use claude\", \"use groq\"). Each request is first sorted by `triage.py` into `LIGHT` (one action, one target: open, play, search, send, a short question) or `HEAVY` (write, build, fix, research, plan, most requests of 18 words or more, anything with \"and then\"). Errands run alongside anything; a second heavy job is queued with \"that's a big one, so I'll start it once X is done\", because two big jobs fight over the same windows and files. When in doubt it says heavy: starting a big job alongside another is the mistake that costs something." },
      { t: "table", head: ["Brain", "How it's reached", "Used for", "Cost"], rows: [
        ["Groq (default)", "HTTPS, OpenAI-style chat API, `openai/gpt-oss-120b`", "nearly everything: questions, lookups, clicking, automations, status", "free tier, about 1 s"],
        ["Claude Code", "`claude` CLI, one long-lived session, `--resume`", "coding, files, git, anything Groq couldn't finish", "subscription quota"],
        ["Antigravity", "`agy` CLI", "research and writing; Claude's stand-in", "its plan's quota"],
        ["OpenRouter", "the same chat loop, free models", "fallback brain", "free"],
      ], title: "Four brains", takeaway: "Claude and Antigravity cover for each other (`failover.py`): a turn that comes back with no answer, for any reason except being cancelled, is handed to the other once, with a note if the first had already started doing things." },
      { t: "p", text: "Before any agent turn, `Controller.dispatch` assembles context: details of any project or person named in the request (filtered by what that brain may see), one line of today's date, weather, markets and calendar, a matching recipe if one exists, and the matching fallback ladder. The Claude session is started when Nova starts, so the first request doesn't pay the CLI's start-up cost; each request is a new turn in the same process. If nothing has come back after 1.5 seconds, Nova says \"On it.\"" },

      { t: "h", text: "The free-model loop" },
      { t: "p", text: "Groq leads on purpose: the question isn't whether it's as good as Claude but how much it can finish by itself. Nova supplies the loop and the hands. `agents/tools.py` registers 41 tools, from the local index and UI Automation to the browser extension, web search, Word documents, screen recording, drafts, goals, the schedule, memory, skills, background tasks and the two delegates. A request isn't sent all 41 schemas: a core set always goes, plus whichever tools the request's words mention, and the delegates are always present, so a miss costs capability, not correctness." },
      { t: "p", text: "Three tools changed how much reached Claude at all. `web_search` and `read_page` are keyless DuckDuckGo search and a page reader in the standard library; before them, every question about anything current had to go to Claude. `nova_status` lets Groq read Nova's real state. And skills, the same `SKILL.md` folders Claude Code reads, are offered by name only (all 18 names cost about 50 tokens) and loaded on demand." },
      { t: "p", text: "The figure below is one round of the loop. A turn runs up to 10 rounds (`max_tool_calls`); a round with no tool calls is the answer." },
      { t: "flow", title: "One round of the chat loop", takeaway: "The full tool result goes to the canvas and the turn log; only the copy that will be resent on every remaining round is shortened. Any way of getting stuck moves the job up a tier instead of ending it.", flow: { kind: "flow", colW: 230, rowH: 124, nodes: [
        { id: "ctx", label: "Context added", sub: "profile, recipe, ladder", col: 0, row: 0 },
        { id: "rnd", label: "One model round", sub: "history resent whole", col: 1, row: 0, focus: true },
        { id: "tl", label: "Tools run", sub: "full result to the log", col: 2, row: 0 },
        { id: "bud", label: "Budgets applied", sub: "before the next round", col: 3, row: 0 },
        { id: "ans", label: "Reply spoken", sub: "no tool call this round", col: 1, row: 1 },
        { id: "up", label: "Handed to Claude", sub: "told what was tried", col: 2, row: 1 },
      ], edges: [
        { from: "ctx", to: "rnd" }, { from: "rnd", to: "tl" }, { from: "tl", to: "bud" },
        { from: "rnd", to: "ans", label: "answered" }, { from: "rnd", to: "up", label: "stuck" },
      ] } },
      { t: "p", text: "\"Stuck\" means any of four things: all 10 rounds used, every Groq key rate-limited for longer than 30 seconds, a garbled tool call that fails again when retried without tools, or the model claiming a handover it never made. That last one is a real small-model failure: describing the handover reads, to the model, like performing it. Nova catches the claim and performs the delegation for real." },
      { t: "code", lang: "python", source: "assistant/agents/chat_api.py", title: "Catching a fabricated handover", takeaway: "\"I've passed that to Claude\" when nothing was passed is the one failure a user can't detect for themselves, so the claim is matched in code and made true rather than trusted.", text: String.raw`CLAIMED_HANDOVER = re.compile(
    r"\b(?:handed|handing|passed|passing|sent|sending|forwarded|delegated|delegating)\b[^.]{0,40}\bclaude\b"
    r"|\bclaude\s+(?:will|is going to|is now|has been asked|should)\b"
    r"|\bI(?:'| a|’)?(?:ll|m going to| will)\s+(?:have|get|ask|hand)\s+[^.]{0,20}claude\b"
    r"|\basked\s+claude\s+to\b",
    re.IGNORECASE,
)
...
if not calls:
    # It described a handover instead of making one. Make it true rather
    # than letting the user be told work started that never did.
    if not delegated and text and CLAIMED_HANDOVER.search(text):
        moved = self._escalate(prompt, "the fast model said it would pass this to Claude",
                               on_event, started, turn)` },
      { t: "p", text: "The sequence below follows a request that the free tier can't finish, from the microphone to the spoken answer and what is kept afterwards." },
      { t: "sequence", title: "A request that rises a tier", takeaway: "Claude is told which tools Groq already tried, so the expensive tier doesn't repeat the cheap tier's dead work. A cancelled turn never escalates: saying \"stop\" must not quietly start a slower, costlier turn.", seq: { kind: "sequence", actors: ["You", "Controller", "Groq loop", "Claude CLI", "Learning stores"], steps: [
        { from: 0, to: 1, label: "request no script matched" },
        { from: 1, to: 1, label: "add profile, recipe, ladder, today" },
        { from: 1, to: 2, label: "prompt, route agent:groq" },
        { from: 2, to: 2, label: "10 rounds, no answer" },
        { from: 2, to: 3, label: "request + tools tried" },
        { from: 3, to: 2, label: "answer", dashed: true },
        { from: 2, to: 1, label: "reply + [[TASK: type]]", dashed: true },
        { from: 1, to: 4, label: "recipe kept, type counted" },
        { from: 1, to: 0, label: "guarded, then spoken", dashed: true },
      ] } },
      { t: "p", text: "On the way out, `persona/guard.py` checks the reply with two regexes: a backend introducing itself (\"I'm Claude\", \"as a large language model\", \"I'm powered by...\") is replaced with Nova's own identity line, and a failure explained by naming plumbing (\"the API returned\", \"rate limit\") is rewritten as Nova's own. One boundary is deliberate: an honest answer to a sincere question about what Nova is built on is left alone, because denying it would turn branding into lying." },

      { t: "h", text: "The bug that made the free tier look unreliable" },
      { t: "p", text: "By late September the owner had stopped trusting Groq for actions because it rate-limited almost immediately. The status report traced it. The chat loop resends the whole conversation on every round, nothing capped a tool result, and history was trimmed by message count, so ten 4 KB results trimmed exactly like ten 40-byte ones. A tool result's real cost was its size times the number of rounds still to come, and against a free tier of 8,000 tokens a minute a single ten-round turn could spend a quarter of a million tokens." },
      { t: "table", head: ["Round", "1", "2", "3", "5", "10", "Whole turn"], rows: [
        ["Before (chars sent)", "2.2k", "22k", "42k", "82k", "182k", "≈ 920k (≈ 230k tokens)"],
        ["After (chars sent)", "2.2k", "3.7k", "3.9k", "4.3k", "5.3k", "≈ 42k (≈ 10k tokens)"],
      ], title: "One ten-round turn with a 20,000-character tool result", takeaway: "Before, the history grew by a whole tool result every round, so a turn's cost was quadratic in its length. After, it is flat: 22 times less per turn and 35 times less on the final round. The rate limit wasn't Groq being stingy; it was Nova resending the same data ten times." },
      { t: "p", text: "The fix is three budgets per backend: a fresh tool result entering the history is capped at 2,000 characters (two thirds from the head, one third from the tail, since the tail usually holds the answer), the history as a whole at 12,000, and every result older than the latest round shrinks to 240." },
      { t: "code", lang: "python", source: "assistant/agents/chat_api.py", title: "Shrinking results the model has already used", takeaway: "A stale result is shortened, never deleted, because deleting it would break the `tool_call_id` pairing the API requires. That one constraint is why this is a digest and not a trim.", text: `def _digest_stale_tools(self) -> None:
    """Shorten every tool result except the round just run."""
    fresh = 0
    for i in range(len(self.history) - 1, -1, -1):
        if self.history[i].get("tool_calls"):
            fresh = i
            break
    limit = max(40, self.settings.stale_tool_chars)
    for message in self.history[:fresh]:
        if message.get("role") == "tool":
            message["content"] = _fit(str(message.get("content") or ""), limit)` },
      { t: "p", text: "A second change spread the remaining load. `keypool.py` pools several free Groq keys with **lanes**: the conversation leans on key 1, parallel tasks on key 2, the classifier and other background chores on key 3, and key 4 is spare. All callers share one cooldown record, so when a key returns HTTP 429 everyone moves off it at once instead of each discovering the same limit, and the request goes straight out again on the next free key. Token usage is now recorded from the provider's own `usage` field, not estimated." },

      { t: "h", text: "Writing itself out of the job" },
      { t: "p", text: "This is the machinery the project is named for in its own docs, and it started with one spoken request on 18 September: \"teach yourself to pause or play a song in spotify\". Every agent turn is instructed (by `agents/rules.py`) to end a reply to a general, repeatable request with a hidden marker such as `[[TASK: play_song]]`: the shape of the request, not its words. The controller strips it before anything is spoken and hands it to `promotion.py`, which counts successful turns per type in `data/task_frequency.json`." },
      { t: "code", lang: "python", source: "assistant/automation/promotion.py", title: "Deciding what to do about a repeated job", takeaway: "Three successes write the proposal without asking. Below that, an expensive turn (4 or more tool calls, $0.01 or more, or about two minutes) asks once by voice. Cheap and rare: never ask.", text: `def record(self, task_type, utterance, cost_usd, turns, seconds=None) -> str:
    stats = self._tasks.setdefault(task_type, _TaskStats())
    if stats.promoted:
        return DECISION_NONE  # already has (or is getting) an automation
    stats.count += 1
    ...
    if stats.count >= self.auto_after:
        return DECISION_AUTO
    # Expensive in any of the three currencies that matter: money, tool calls, or
    # your time sitting there waiting for it.
    expensive = ((cost_usd or 0) >= self.ask_min_cost_usd
                 or (turns or 0) >= self.ask_min_turns
                 or (seconds or 0) >= self.ask_min_seconds)
    if expensive and not stats.asked:
        return DECISION_ASK
    return DECISION_NONE` },
      { t: "p", text: "On `DECISION_AUTO`, the controller dispatches a background turn asking the agent to propose `automations/pending/<type>.toml`, written from how it actually did the job earlier in the same conversation, with a slot for whatever varied. Deciding which part of the request was the variable is the genuinely hard part of turning one run into something reusable, and the part most likely to go wrong. \"Remember that\" skips the count. If the agent's own reply says it just taught Nova something, the \"want me to save that?\" question is suppressed, since nobody wants it one sentence later." },
      { t: "flow", title: "From a tag to a running automation", takeaway: "The reviewer is the step that wasn't there at first. A proposal can't run until it is moved out of `pending/`, and moving it is something the owner says out loud.", flow: { kind: "flow", colW: 260, rowH: 124, nodes: [
        { id: "rep", label: "Agent reply", sub: "ends [[TASK: type]]", col: 0, row: 0 },
        { id: "cnt", label: "Tag stripped, counted", sub: "task_frequency.json", col: 1, row: 0 },
        { id: "thr", label: "Third success?", sub: "or costly: ask once", col: 2, row: 0 },
        { id: "wr", label: "Proposal written", sub: "automations/pending/", col: 2, row: 1 },
        { id: "rev", label: "review.py", sub: "four checks, all local", col: 1, row: 1, focus: true },
        { id: "keep", label: "\"Keep that automation\"", sub: "moved into service", col: 0, row: 1 },
      ], edges: [
        { from: "rep", to: "cnt" }, { from: "cnt", to: "thr" }, { from: "thr", to: "wr", label: "yes" },
        { from: "wr", to: "rev" }, { from: "rev", to: "keep", label: "clean" },
      ] } },
      { t: "p", text: "The loop fired unprompted in production on 19 September: \"You've now handled requests shaped like 'can you pull up some finance news?' (task type: news_briefing) as full turns several times...\" The result was `ambient/news.py`, headlines from RSS feeds with no model at all. Then on 23 September it produced three patches unreviewed, and two made things worse: one added a complaint as a trigger phrase; another made a browser step optional and added an unconditional duplicate, so every briefing loaded the page twice; separately an intents rule for the same complaint broke a test. The staging folder and the reviewer were built from exactly those failures." },
      { t: "code", lang: "python", source: "assistant/automation/review.py", title: "Checks written from real bad patches", takeaway: "Each check is one thing the loop actually shipped. It's local and cheap on purpose, in the project's recurring pattern: asking a model to be careful is not a boundary.", text: String.raw`# Words that mean the phrase is a complaint or a refusal rather than a request.
NEGATIONS = re.compile(
    r"\b(?:haven'?t|hasn'?t|hadn'?t|didn'?t|doesn'?t|don'?t|won'?t|wouldn'?t|can'?t|"
    r"couldn'?t|isn'?t|aren'?t|wasn'?t|weren'?t|never|nothing|not|no)\b", re.I)
...
    if NEGATIONS.search(phrase):
        found.append(f'the phrase "{phrase}" is a complaint, not a request -- '
                     "it would fire exactly when the user says this went wrong")
...
    # The duplicate-retry bug: an identical step that always runs means the work
    # happens twice every time, rather than once with a retry when it fails.
    if previous is not None and _same_work(previous, step) and not step.get("when"):
        found.append(f"step {index} repeats step {index - 1} unconditionally, "
                     "so it would run the same thing twice every time")` },
      { t: "p", text: "The other two checks: a phrase that an instant intent already answers (two handlers claiming the same sentence is a coin toss at runtime), and a step using a slot no phrase provides. A phrase that is nearly all placeholders, or a list of more than 24 phrases, is refused too. `approve()` refuses to move a proposal that failed review. The asymmetry that made this obvious is stated in `staging.py`: a LinkedIn post needed approval before it went out, and an edit to the assistant's own behaviour didn't. A bad post is embarrassing; a bad automation is wrong every time it fires, silently, until someone notices." },

      { t: "h", text: "Recipes and ladders: the softer half" },
      { t: "p", text: "Most work never gets rigid enough to become a TOML file, so on its own the promotion loop would leave most work at the top of the cascade forever. Recipes are the softer mechanism. After every successful tagged turn, `recipes/` stores one row per task type in SQLite: how it was asked, the tools called in order (collected off the bus), which brain, how long, the skill that applied, and pitfalls. Successes overwrite, because a better route found later is the one worth keeping; failures accumulate, because an old dead end is still a dead end." },
      { t: "table", head: ["", "An automation", "A recipe"], rows: [
        ["What it is", "exact steps", "an account of what worked"],
        ["Who runs it", "Nova, with no model", "a model, which adapts it"],
        ["Fits", "the same task every time", "fuzzy tasks phrased differently"],
        ["Fails by", "breaking loudly when a selector moves", "being ignored, which is harmless"],
        ["Written after", "three successes, or on request, then approval", "every successful tagged turn"],
      ], title: "Two ways to get cheaper", takeaway: "A recipe is a lead and an automation is a script; a task that hardens over time can graduate from one to the other. There are 22 recipes stored on the owner's machine." },
      { t: "p", text: "The hint is phrased as evidence, not instruction (\"What worked, in order: list_windows, click_control, type_in_app... Treat this as evidence, not a script\"), because a model told *do this* replays steps that may not fit, while a model shown *this worked* adapts. Matching is strict, two distinctive shared words, and the hint is empty far more often than not: a hint about the wrong task is worse than none, since a model follows a confident irrelevant instruction anyway. The known limit is that matching is by words, not meaning, so \"summarise my repo changes\" and \"what's new in the codebase\" won't find each other." },
      { t: "p", text: "**Ladders** fix the order of approaches in advance per kind of request (click, open, close, find a file, fill a form, mail, message, research, plan, write, app control), so a failed approach leads to the next one instead of a retry. They live in `ladders.toml`, at most two are added to a prompt, and each rung records whether it worked per site or app in `data/ladders.json`; once a rung has worked twice it is offered back (\"On WhatsApp, 'accessibility by name' worked 2 of 2 times: start there\"). Clicking in the browser escalates by itself in code, with no tokens: a scripted click, then a real mouse click through `chrome.debugger`, then an app link handed to Windows, then UI Automation on the Chrome window. Nothing that could send, pay, post or delete is ever clicked twice automatically." },

      { t: "h", text: "The data model" },
      { t: "p", text: "Everything Nova keeps lives under `data/`, which is git-ignored, and almost all of it is small SQLite files or JSON, one per concern, so each can be inspected, pruned or forgotten on its own." },
      { t: "table", head: ["Store", "One row or entry per", "Kept"], rows: [
        ["`routes.json`", "ISO week: count per route (intent, automation, loose, classifier, agent:groq, agent:claude...)", "for good"],
        ["`task_frequency.json`", "task type: count, cost, turns, promoted, asked", "for good"],
        ["`recipes.db`", "task type: utterance, tools, backend, seconds, skill, pitfalls", "for good"],
        ["`usage.db`", "agent turn (tokens, cost), free answer, browser-extension call", "for good"],
        ["`history.db`", "session, event (said, tool, result, plan), run graph; FTS5 trigram index", "365 days"],
        ["`sessions/`", "agent turn: the raw stream as JSON lines", "14 days"],
        ["`journal.db`", "finished day: the facts and the text written from them", "730 days"],
        ["`index.db`", "app, file or folder with frecency points; duplicate hashes", "rebuilt incrementally"],
        ["`afterthought.db`", "text chunk with a 384-dimension MiniLM vector and entity tags", "7 days, unless promoted"],
        ["`profile.json`", "profile section, each with a visibility", "until edited"],
        ["drafts (SQLite)", "outward-facing draft: platform, text, status, what the platform said", "until sent or dropped"],
      ], title: "What Nova remembers, and where", takeaway: "The journal is the clearest example of the house rule: its facts are arithmetic over `history.db`, and a model may only phrase those same facts. If narration fails or rambles, the plain entry stands, so the worst entry is clumsy, never a day that didn't happen." },
      { t: "p", text: "Two details in this table came from bugs. The text-to-speech cache had no eviction at all and reached 33 MB; it now has a 200 MB cap that evicts by last access time, not modification time, because a cache hit doesn't touch the modification time and an mtime sweep would have evicted exactly the lines Nova says most often. And Claude's `total_cost_usd` turned out to be a running total for the process, not a per-turn cost; summed as if it were per turn, it overstated spend about 4 to 5 times ($47.78 claimed against $10.13 actually used, on 7 October). `claude_cli.py` now reports each turn's own increment." },
      { t: "p", text: "Profile visibility deserves a line of its own. Each section is marked for all agents, for the CLI agents running under the owner's own accounts only, or for this PC only (speech hints and opening folders, never in any prompt). `audience_for(backend)` maps Claude and Antigravity to \"trusted\" and everything else to \"all\", so by default a free cloud model never sees the sections about people or projects." },

      { t: "h", text: "Speech in" },
      { t: "p", text: "The figure below shows what a phrase passes through before it can become a request. Transcription happens before the wake word is checked: matching text is far more reliable than spotting a word in audio, and since transcription is local that's a CPU cost, not a privacy one." },
      { t: "flow", title: "From sound to a request", takeaway: "Each stage catches a different kind of garbage: the gate catches the recogniser guessing, voice ID catches other people and the television, the addressing check catches the owner talking to someone else.", flow: { kind: "flow", colW: 260, rowH: 124, nodes: [
        { id: "mic", label: "Microphone", sub: "energy threshold, 1 s pause", col: 0, row: 0 },
        { id: "stt", label: "faster-whisper", sub: "base.en, int8, CPU", col: 1, row: 0 },
        { id: "gate", label: "Noise gate", sub: "confidence, loops, subtitles", col: 2, row: 0, focus: true },
        { id: "vid", label: "Voice ID", sub: "WeSpeaker, cosine ≥ 0.40", col: 2, row: 1 },
        { id: "addr", label: "Addressed?", sub: "wake word, or your voice", col: 1, row: 1 },
        { id: "und", label: "Act or talk?", sub: "then the cascade", col: 0, row: 1 },
      ], edges: [
        { from: "mic", to: "stt" }, { from: "stt", to: "gate" }, { from: "gate", to: "vid" },
        { from: "vid", to: "addr" }, { from: "addr", to: "und" },
      ] } },
      { t: "table", head: ["Check in `audio/gate.py`", "Rejects", "Why"], rows: [
        ["Average log-probability < −1.0", "low confidence", "Whisper was guessing at background audio (configurable as `min_avg_logprob`)"],
        ["Compression ratio > 2.4", "looping transcript", "one phrase repeated by the decoder"],
        ["Subtitle phrases", "\"thanks for watching\", \"see you in the next video\"", "Whisper was trained on subtitles, so noise sounds like the end of a video"],
        ["Filler only", "\"you\", \"thank you\", \"hmm\"", "a whole transcript that is only filler is noise"],
        ["Repetition", "one word ≥ 50% of the words; sentences repeated", "looping, not speech"],
      ], title: "The noise gate", takeaway: "All five are cheap and local, and all use scores Whisper already produces. This is the day-two lesson in code: a wrong transcript acted on is worse than one ignored." },
      { t: "p", text: "**Voice ID** (phase 1) turns each utterance into a 256-number voiceprint with WeSpeaker's ResNet34 (trained on VoxCeleb, 26 MB ONNX, run by `onnxruntime`, which faster-whisper already installs) from an 80-band log-mel filterbank computed in numpy, alongside Whisper so it adds no wait. Built against two Windows voices, the same voice scored 0.76 to 0.94 and a different voice at most 0.37. Enrolment originally set the bar 0.15 below the owner's least consistent sample, capped at 0.62, and on the first night it turned the owner away at 0.57: samples read in one sitting agree more than a request made later with music playing. The bar is now 0.40, set by hand, with 0.08 of leniency for phrases under a second, and every score is logged (the last 5,000) so phase 2 is decided on evidence. With voice ID on, the wake word is optional: the owner's voice is enough." },

      { t: "h", text: "Speech out" },
      { t: "p", text: "Speech output has the longest back-and-forth in the history. Fish Audio's free cloud voice was removed on day two because its rate limit cut replies off mid-sentence, and the rule became: speech is local Windows SAPI on purpose. Later Fish S2.1 came back with a structural fix rather than a hope: replies are fetched a sentence at a time, and any sentence Fish doesn't deliver is spoken by the local voice the moment it fails, so a rate limit changes how Nova sounds mid-reply instead of leaving it silent. The current configuration is Fish in front with SAPI underneath. Measured here: a whole three-sentence reply takes about 3.6 seconds to synthesise and the first sentence about 1.1. Audio streams as raw PCM after a WAV header that declared a 4 GB clip failed silently. \"Stop\" cuts speech within about 0.2 seconds." },
      { t: "p", text: "Most of what makes a voice sound human is punctuation. Every brain is told to write commas where a person would pause, and Nova normalises what it says: markdown removed, line breaks become sentence breaks, \"50%\" becomes \"50 percent\", ten thousand isn't read as \"ten zero zero zero\", and `notes.txt` stays one word. Delivery tags such as `[chuckles]` or `[gently]` colour a line on the Fish voice and are dropped if the local voice takes over." },

      { t: "h", text: "Hands: the browser, desktop apps and the phone" },
      { t: "p", text: "**The browser.** A Manifest V3 extension drives the owner's own Chrome, replacing Playwright (which stays as the fallback). The extension never opens a port: it connects out to Nova's server with the same token as the canvas. Pages reach a model as a numbered element map, and after an action only what changed is sent back." },
      { t: "code", lang: "text", source: "docs/extension.md", title: "A page, as a model sees it", takeaway: "Usually 300 to 2,000 characters instead of 1,800 to 8,000 of page text, and a six-field form is one `browse_form` call instead of six. Password, card and one-time-code fields always read back as •••.", text: `Create account — Example
https://example.com/signup
# Create account
[1] textbox "Full name" *
[2] textbox:email "Email" *
[3] textbox:password "Password" =•••
[4] select "Country" ="Choose" (3 options)
[5] checkbox "I agree to the terms" [ ]
[7] button "Create account"` },
      { t: "p", text: "When a model asks to click something that looks like paying, sending, submitting, deleting or posting, the click is refused until the model calls again with `confirmed=true`, which its tool description says to do only after the user agreed. Known limits: only the top frame is reached (no Stripe card fields in iframes), and `chrome://` pages can't be scripted by any extension." },
      { t: "p", text: "**Desktop apps.** `automation/desktop.py` uses Windows UI Automation through pywinauto: list a window's controls once with a filter, then act by exact name or AutomationId. Never pixel coordinates, so it survives window moves and theme changes. A walk is capped at 4,000 elements and now says so when it's truncated, so \"not found\" doesn't read as \"doesn't exist\". The window cache is an LRU of 32." },
      { t: "p", text: "**The phone.** An Android phone runs `nova_bridge.py` in Termux, bound only to its Tailscale address and refusing to start on anything else. It understands a fixed dictionary of named actions (torch, battery, vibrate, notify, open an app, clipboard, volume, location, contacts, SMS list, call log, camera, SMS send, call) and nothing else. Reads are gated by the Phone section of the profile; the camera is off by default and Nova says it took a picture every time. The sequence below is a text to a contact." },
      { t: "sequence", title: "Sending a text, end to end", takeaway: "The phone itself refuses `sms_send` and `call_dial` unless the request says a human confirmed, and Nova only sets that flag after asking, on the device the request came from. An ambiguous answer cancels.", seq: { kind: "sequence", actors: ["You", "Controller", "PC bridge", "nova_bridge.py", "Termux:API"], steps: [
        { from: 0, to: 1, label: "text a contact: running late" },
        { from: 1, to: 1, label: "profile allows reading contacts?" },
        { from: 1, to: 2, label: "contacts lookup" },
        { from: 2, to: 3, label: "named action + token" },
        { from: 3, to: 1, label: "number, content defused", dashed: true },
        { from: 1, to: 0, label: "send it to them?", dashed: true },
        { from: 0, to: 1, label: "yes" },
        { from: 1, to: 3, label: "sms_send, confirmed = true" },
        { from: 3, to: 4, label: "termux-sms-send, SIM slot" },
        { from: 3, to: 1, label: "what actually happened", dashed: true },
        { from: 1, to: 0, label: "answered where you asked", dashed: true },
      ] } },
      { t: "p", text: "Agents can also hand an action back with a marker such as `[[PHONE: sms_send ...]]` instead of rebuilding a capability with shell commands. That opens an obvious hole: the agent can read your messages, and quoting one back is correct behaviour, so a message containing a marker would be executed. Nova can't tell its agent's own words from words the agent is repeating, so it doesn't try." },
      { t: "code", lang: "python", source: "assistant/phone/bridge.py", title: "Read content can't carry an instruction", takeaway: "Every string the phone returns has its `[[` made inert with a zero-width space before it goes anywhere, and actions from a marker with any reach (a URL, the clipboard, a text, a call) are confirmed even though the same spoken command wouldn't be. Anything that arrives through a tool is data, never an instruction.", text: String.raw`def defuse(text: str) -> str:
    """Make any marker inside read content inert before it can be quoted back.

    Nova cannot tell the agent's own words from something the agent is repeating, so
    content never gets to carry a live instruction in the first place.
    """
    return (text or "").replace("[[", "[​[")` },

      { t: "h", text: "Security and privacy" },
      { t: "table", head: ["Boundary", "How it's enforced"], rows: [
        ["Canvas, API and WebSocket", "a 32-byte shared secret on every request, page and socket alike, with no loopback exemption; header, one-time `?token=` or a year-long cookie"],
        ["Network", "the server answers beyond the PC only because the token is required; inbound port 8765 is allowed on Private networks only; remote devices come in over Tailscale; no public tunnel, ever"],
        ["The phone", "named actions only, no shell; bound to the Tailscale address; its own token"],
        ["Outward-facing actions", "drafts in SQLite, approval per draft, no approve-all mode, no approval tool for models; a platform refusal is recorded as failed with what it said"],
        ["Nova's own behaviour", "proposed automations wait in `pending/`, pass `review.py`, then need a spoken yes"],
        ["What models see", "profile sections by visibility; free cloud models see only \"all\"; secrets and emails stripped before the LinkedIn showcase writer sees a repo"],
        ["Proactive memory", "nothing watched until enabled; password managers, banking, payment and sign-in pages, `.env` files and private windows never read; secrets stripped; embeddings on the CPU with no network"],
        ["Secrets", "keys in `.env`, never `config.toml`; `build.ps1` fails if a `.env` reaches the build"],
      ], title: "Where the lines are", takeaway: "A token in a URL lands in browser history, and the docs name that trade-off rather than hide it: the mitigation is the cookie, and rotation is deleting one file and restarting." },
      { t: "p", text: "Voice ID is described in its own docs as convenience, not security: a recording of the owner's voice can pass. And one rule from the history applies everywhere: every model-initiated tool call that changes something is logged at warning level, distinct from a command the owner spoke, because \"ask before anything that sends\" in a prompt is a convention, not a boundary." },

      { t: "h", text: "The canvas" },
      { t: "p", text: "The canvas draws each request as a live graph: what was said, how it was routed, the agent, the plan steps with their branches, each action, and the result. Plans come back from agents as `[[PLAN: title]] 1. ... 2. ... (after 1) [[/PLAN]]`; a step without `(after ...)` depends on the previous one, so a plan is a small DAG. Agents print `[[STEP n DONE]]` markers, and because models often run several steps and print markers only at the end, the runner also matches each action's target (such as `style.css`) against the step texts to light up the right step live. The figure below is a real screenshot from an early version of the canvas." },
      { t: "image", src: `${IMG}/plan-graph.png`, alt: "Nova's first canvas: You said, Route (Plan with Claude Code, no changes), Agent, then four plan steps where steps 2 and 3 branch side by side, and a Done result", title: "A plan drawn live", takeaway: "Steps 2 and 3 declare the same dependency, so they branch. The same `after` lists are what the orchestrator later used to run steps in parallel: sequential and parallel are one mechanism, distinguished only by whether steps declare dependencies." },
      { t: "p", text: "In October the canvas was redesigned as \"Manga × HUD\": four spaces (Now, Work, Studio, You), one global composer, and a Needs-you inbox where every decision waiting on the owner lands, whether a draft, a proposed automation, a blocked permission, a due reminder or an expiring sign-in. It came from a structural problem: half of Nova (drafts, goals, proposed automations, the capture inbox, the journal) had no screen at all, and a decision said once out loud and missed was simply gone." },
      { t: "image", src: `${IMG}/work-mockup.png`, alt: "Design mockup of the Work space: a task list, a plan graph with six done steps, and a detail panel with Redo and Save as automation buttons", title: "The Work space, as designed", takeaway: "A design mockup built on real data from the owner's machine; the built canvas follows it. The \"Save as automation\" button on a finished step is the promotion loop given a hand-operated door." },

      { t: "h", text: "Configuration and deployment" },
      { t: "p", text: "Settings live in `config.toml`, read by `assistant/config.py`, where every key has a default, so every key is optional. Keys live in `.env`, and nothing in it is required to start: each key switches on one capability, and a missing one disables that feature rather than breaking start-up (no Groq key means unrecognised phrasings go to Claude). The parts worth knowing:" },
      { t: "list", items: [
        "`[speech]`: `engine = \"whisper\"`, `whisper_model = \"base.en\"` (about 150 MB, downloaded once), `whisper_compute_type = \"int8\"`, `pause_threshold = 1.0`, `min_avg_logprob = -1.0`.",
        "`[agents]`: `default = \"groq\"`, `max_parallel = 2`; Groq `max_tool_calls = 10`, `max_tokens = 1200`, `temperature = 0.3`, `escalate_to_claude = true`, the three character budgets; Claude `permission_mode = \"auto\"`.",
        "`[promotion]`: `auto_after = 3`, `ask_min_turns = 4`, `ask_min_cost_usd = 0.01`, `ask_min_seconds = 123`.",
        "`[local]`: frecency half-lives by kind (apps 30 days, files 7, folders 14, commands 10), re-index every 30 minutes, full rescan daily.",
        "`[ui]`: port 8765, `require_token = true`, `host = \"0.0.0.0\"` only because the token and firewall rule are in place; hotkeys Ctrl+Alt+N for the window and Ctrl+Alt+H for the overlay.",
      ] },
      { t: "p", text: "Deployment is a PyInstaller `--onedir` build (`packaging/build.ps1`) with two executables: `Nova.exe`, windowed (tray and native WebView2 window), and `nova-cli.exe` for typed use, the index and autostart. `autostart install` registers a Task Scheduler job that starts 20 seconds after logon, restarts up to three times on a crash and needs no UAC prompt. The built canvas ships in the repo, so a fresh clone needs no Node. From a phone, `tailscale serve` puts HTTPS in front of the server inside the tailnet, which is what lets the canvas install as an app (a service worker needs a secure context). Release notes for a v1 under Kaiketsu as publisher are written; the release hasn't started." },

      { t: "h", text: "Testing" },
      { t: "p", text: "`python -m unittest discover -s tests` runs 897 tests in 31.7 seconds on the owner's laptop (run for this piece; all pass). None of them needs the network. They test behaviour more than plumbing:" },
      { t: "list", items: [
        "**Routing:** strict and loose matching, the classifier's validation, act-versus-talk, plan-versus-automation, route counting (17 tests after the double-count fix), escalation and hand-back, failover between Claude and Antigravity.",
        "**The loop:** promotion decisions, the reviewer's four checks, staging and approval, recipes, ladders, token budgets on a simulated ten-round turn.",
        "**Safety:** that staging a post sends nothing and a failed send is never recorded as sent, server auth with no loopback exemption, phone markers and confirmation, the persona guard and the drift check.",
        "**Everything else:** the noise gate, voice ID, speech normalisation (spoken numbers, the last sentence never cut), history sessions, the journal refusing to write today or an empty day, AfterThought's privacy rules, the schedule, the publishing pipeline and portfolio-article briefs.",
      ] },
      { t: "p", text: "Two gaps are stated in the docs: there are no frontend tests at all for over 7,000 lines of canvas, and `tests/manual_overlay_check.py` is manual. The pattern the history records is that testing live found what reading couldn't. The web search's four bugs (the endpoint answers a GET with its home page and needs a POST; `<b>` tags truncated every snippet; `<head>` in the skip set left every title empty; pages read as pure navigation until `<main>` was preferred), skills never being opened, and the fabricated handover all looked fine in source. A search that always returns nothing raises no error." },

      { t: "h", text: "Measuring it" },
      { t: "p", text: "The design's own scoreboard is `python main.py stats --routes`, which buckets each week's route events into scripted (no model), free model, and everything else. It was never run until the 29 September report, and when it was, it had to be repaired first: every model turn was counted twice, and agent turns didn't record which agent ran, so the central claim was not just unmeasured but unmeasurable from its own data. Here is the chart as it prints today." },
      { t: "table", head: ["ISO week", "Requests", "Scripted", "Free model", "No cost, as charted"], rows: [
        ["2026-W38", "16", "75.0%", "not recorded", "75.0%"],
        ["2026-W39", "127", "18.1%", "not recorded", "18.1%"],
        ["2026-W40", "34", "20.6%", "61.8%", "82.4%"],
        ["2026-W41", "93", "23.7%", "58.1%", "81.7%"],
        ["2026-W42", "153", "10.5%", "66.7%", "77.1%"],
      ], title: "Which tier answered, week by week", takeaway: "Groq became the front door in W39, and from W40 about four in five requests cost nothing. But almost all of that is the free model. The share answered by scripts alone hasn't grown, and the latest week, the busiest yet, is the lowest since the cascade was finished." },
      { t: "p", text: "Reading the raw counts in `data/routes.json` for this piece turned up three ways the chart is still imprecise, and they pull in opposite directions:" },
      { t: "list", items: [
        "**Automations are counted twice.** The controller publishes `route=automation`, and the automation runner publishes a second event, `route=macro`, when it starts. The chart doesn't recognise `macro` and counts it as a request that wasn't free: 31 such events so far. This understates the free share.",
        "**Talk turns are counted as not free.** They run on the free model with no tools, but `talk` isn't in the counter's list of free routes: 26 events in W42. This understates it too.",
        "**Escalations are filed under Groq.** A turn that Groq hands to Claude was routed `agent:groq` at dispatch, so the Claude work inside it counts as free. This overstates it, and the usage ledger shows by how much.",
      ] },
      { t: "p", text: "The usage ledger (`python main.py usage`) records what every brain spent from the providers' own counts, including delegated turns, which used to be invisible because they never passed through the runner." },
      { t: "table", head: ["Measured", "Value"], rows: [
        ["Claude turns, list-price value", "104 turns, $23.92 of subscription usage (34.8M tokens)"],
        ["Share of Claude's input served from cache", "95%"],
        ["Claude usage that was a free model handing up", "$12.79, over half"],
        ["Spent on turns that didn't finish the job", "$2.03 across 29 turns"],
        ["Groq turns", "159 turns, 579.6k tokens, about 3.6k per turn"],
        ["Requests that never reached a paid brain", "69% of 347"],
        ["Saved, estimated", "likely $15.59, at least $8.69; 20.5M Claude tokens not spent"],
      ], title: "What the brains actually spent", takeaway: "The most useful number here is the third row: handing up is where the paid usage comes from. Savings are valued at the median Claude turn of the same task type on this machine (25th percentile for \"at least\"), never from a price table, and failed turns save nothing." },
      { t: "p", text: "Put together: the cheap path carries most requests, the expensive tier's usage is dominated by work the free tier couldn't finish, and the mechanism that would move work to no model at all has fired (7 of 38 task types reached promotion, 20 automations exist) but isn't yet visible as a rising scripted share. The status report's explanation still holds: the loop learns only from what passes through it, and real work mostly hasn't." },

      { t: "h", text: "Performance" },
      { t: "table", head: ["Operation", "Measured"], rows: [
        ["Groq: a factual question (\"capital of Japan\")", "0.5 s"],
        ["Groq: a local-index lookup with `find_items`", "2 s"],
        ["Groq: two errands in parallel", "both answered in about 2 s"],
        ["Free classifier call", "0.6 to 1.8 s"],
        ["Claude: a simple question / a small file task", "about 2 s / 6 to 15 s"],
        ["Escalation to Claude, on the night it was measured", "12 to 76 s"],
        ["Local index search", "about 0.5 s"],
        ["Web automation after reusing the Playwright connection", "8.5 s → 2.6 s"],
        ["Fish voice: first sentence / a three-sentence reply", "about 1.1 s / 3.6 s"],
        ["\"Stop\" cutting speech", "about 0.2 s"],
        ["Parallel tasks (pool of two)", "a quick question answered at +6.0 s while a long job finished at +12.9 s"],
      ], title: "Where the time goes", takeaway: "The gap between a free-tier answer (about a second) and an escalation (tens of seconds) is the cost the cascade exists to avoid, measured in the currency the owner actually feels." },
      { t: "p", text: "The local index matters more than its size suggests. Apps come from `Get-StartApps` and launch through `shell:AppsFolder`; files are searched with SQLite FTS5 trigrams; ranking combines match quality with frecency, where each use adds a point and points halve every half-life. Duplicate detection narrows by size, then the first and last 64 KB, then a full BLAKE2b hash cached in SQLite, and it reports, never deletes." },

      { t: "h", text: "Failures, bugs and what they taught" },
      { t: "p", text: "The status report's most useful finding is a pattern: the same class of bug appeared at least five times, and every fix was the same. If correctness depends on a model choosing to do something, it will eventually not choose. Match locally and deterministically, then tell the model what was found." },
      { t: "table", head: ["The model was told", "What it did", "The fix"], rows: [
        ["\"Read a skill if one fits\"", "answered from memory; never opened the skill whose own description quoted the question", "skills matched locally; the fitting one is named in the prompt"],
        ["\"Delegate what you can't do\"", "said \"I've handed that to Claude\" without calling the tool", "`CLAIMED_HANDOVER` catches the claim and performs the handover"],
        ["\"Reuse what worked before\"", "ignored stored recipes", "recipe matched locally and put in front of the prompt"],
        ["\"Say how far along you are\"", "narrated tool names, not progress", "milestones declared and published by the runner"],
        ["\"Decompose a compound request\"", "never calls `run_steps`", "**still open**"],
      ], title: "Instruct-and-hope doesn't hold", takeaway: "None of these was fixed by a stronger model, and a stronger model wouldn't have fixed them. They were failures of deciding, not doing, which is why action reliability turned out to be achievable on a free model." },
      { t: "table", head: ["What broke", "What it taught"], rows: [
        ["A day of television transcripts accepted as requests", "the noise gate, then voice ID"],
        ["`termux-telephony-call` exits 0 whether or not Android placed the call", "check real state; \"I can't tell\" is an honest answer"],
        ["Promotion shipped a complaint as a trigger and a duplicated step", "staging, review and approval for Nova's own behaviour"],
        ["A ten-round turn resent 182k characters on its last round", "character budgets, not message counts; record real token usage"],
        ["Route events counted twice, agent name missing", "an instrument has to be tested like the thing it measures"],
        ["`total_cost_usd` summed as if per turn", "read what a field means before adding it up"],
        ["A long job made every new request a fresh session (\"fill in the form on it\" → \"could you tell me the URL\")", "a spawned session carries the last six turns"],
        ["Screen recordings killed with `terminate()` wouldn't play", "stop ffmpeg by sending `q` on stdin"],
        ["`git add -A` twice swept other agents' files into commits; shell heredocs mangled `\\b` into a 0x08 byte five times", "rules in AGENTS.md: named paths only, file tools instead of heredocs"],
      ], title: "The failure record", takeaway: "Two of these aren't product bugs at all. They were coding-agent mistakes that cost real time, and they're encoded as rules for the agents that work on the repo." },

      { t: "h", text: "Trade-offs and alternatives considered" },
      { t: "table", head: ["Considered", "Chosen", "Why"], rows: [
        ["A generic `run_shell` tool for the models", "declined", "it would undo the named-actions rule; a dictionary of actions is a categorically different risk from a model choosing a command string"],
        ["One mandatory model call per utterance", "declined", "it's the exact cost the cascade exists to avoid"],
        ["Polling a JSON file for task state", "declined", "the EventBus already pushes state"],
        ["Explicit talk modes", "replaced", "a per-turn act-or-talk judgement keeps one thread and the same safety"],
        ["Playwright in a separate profile", "kept as fallback", "the extension uses real logins and sends element maps and diffs instead of page text"],
        ["ChromaDB for memory", "not used", "at this size a numpy matrix multiply is well under a millisecond; a new dependency buys nothing"],
        ["AfterThought's original 0.75 similarity gate", "0.55", "with MiniLM, related text tops out near 0.65 and unrelated stays under 0.25, so 0.75 would never fire"],
        ["YouTube Data API upload", "YouTube Studio in Chrome", "Google locks videos from unaudited API projects to private"],
        ["Cloud voice only / local voice only", "both, stacked", "a neural voice for sound, the local one as a floor that never fails"],
        ["A model as judge for the voice-drift check", "regex scoring", "a judge is one more thing that can drift"],
      ], title: "Roads not taken", takeaway: "Most rejections came from the same instinct: keep decisions that carry risk or cost in deterministic code, and use models where being wrong is cheap and visible." },

      { t: "h", text: "What's open and what comes next" },
      { t: "list", items: [
        "**Compound requests.** The orchestrator (a step-DAG walker with dependency resolution, fan-out capped at three, failure propagation and one answer per group) is built and tested but effectively unreachable, because the only way in is a model choosing to call `run_steps`. The planned fix is the project's usual one: promote `triage.py`'s existing `_CLAUSES` regex into a splitter that calls the orchestrator directly. Pronoun carry between steps (\"fill the form on it\") is the design question to settle first.",
        "**The adoption loop.** The status report's recommendation stands: route one substantive recurring task through Nova at full cost, so the promotion loop and the recipe store learn real work rather than demos.",
        "**The route counter.** Recognise `talk` as free, stop counting `macro` twice, and attribute escalated turns to Claude, so the chart can settle the central claim.",
        "**Verification beyond calls.** `sms_send` still reports success from an exit code exactly as dialling used to; opening an app could be checked against the foreground activity.",
        "**Confidently mediocre answers.** Escalation catches hard failures, not a weak answer delivered with confidence. There's no proposal for detecting one yet.",
        "**Smaller items.** No frontend tests; `controller.py` is 1,666 lines and its intent handlers should move out; the phone bridge has no reconnect logic; the phone camera path has never run against the phone; Instagram needs a public host for media; two identities (Nova's own accounts and posting as the owner) are designed but not built, and the persona guard would need to skip its identity half on posts written as the owner.",
      ] },
      { t: "p", text: "Five weeks in, Nova's engineering is substantially complete and unusually well documented, and its own measurements are honest about the gap that's left. The cascade works; the free tier carries most of the load; the loop that writes Nova out of the job exists, is guarded, and has fired. What it hasn't had yet is enough real work to learn from. The next number that matters is the scripted share in the route chart, and whether it starts to rise." },
    ],
  },
};
