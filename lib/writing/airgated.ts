import type { Article } from "../articles";

// ──────────────────────────────────────────────────────────────────── AirGated
// Sources: C:\attendance_system (README.md, AirGated_Report.md, AirGated_Progress_Report.pdf,
// AirGated_Technical_Report_v2.pdf, server.py, face_verify.py, certs.py, templates/, tests/, git log).
// Figures blink-trace, trial-rtt and trial-outcomes are the Technical Report v2.0's own figures;
// phone-screens is the repo's templates/landing.html and templates/portal.html rendered at phone width.

const IMG = "/writing/airgated";

export const airgated: Article = {
  slug: "airgated",
  project: "AirGated",
  projectHi: "हाज़िरी का पहरा",
  published: "2026-10-17",
  status: "Paper in prep",
  team: "Aakshant Kumar",
  hero: { src: `${IMG}/trial-outcomes.png`, alt: "Bar chart of the 17 events in AirGated's 30 September 2026 trial: accepted check-ins and enrollments, rejections that were friction for honest students, and rejections where a security control fired" },
  links: [{ label: "Source", href: "https://github.com/unexperiencedone/airgated-", kind: "source" }],
  stack: ["Python", "FastAPI", "SQLite", "Web Crypto", "IndexedDB", "WebSockets", "OpenCV YuNet", "MediaPipe", "SFace", "dnslib"],

  // ─────────────────────────────────────────────────────────────────────── Story
  story: {
    title: "AirGated: attendance you can't fake from your hostel room",
    dek: "Every way colleges take attendance has been beaten by a cheap trick. AirGated is attendance that needs you, your phone and the classroom's own Wi-Fi at the same moment, with no internet at all. Who it's for, what it's like to use, and where it honestly stands.",
    blocks: [
      { t: "p", text: "Ask any student in an Indian college how attendance gets faked and you'll get a list. At roll call a friend says \"present\" for you. When the college moved to a QR code on the projector, someone took a photo and forwarded it to the class WhatsApp group. When the QR was replaced with a GPS check, a fake-location app put everyone inside the classroom. Each new system lasted exactly as long as it took someone to find the trick." },
      { t: "p", text: "AirGated started as my answer to that list, and it went through the same arms race in miniature. The first version trusted the phone's GPS and was beaten the same way the college's was. The second tied attendance to a secret key on the phone, which stopped people sharing logins but not a friend carrying your phone to class. The version that exists now is built around one rule: never trust a number the phone reports." },
      { t: "flow", title: "The arms race", takeaway: "Each step was introduced to stop the trick before it, and each was beaten by a new one. AirGated starts from the last arrow: whatever the phone says about itself can be faked, so the checks have to be made by something the instructor controls.", flow: { kind: "flow", colW: 300, rowH: 104, nodes: [
        { id: "a", label: "Roll call", col: 0, row: 0 },
        { id: "b", label: "QR on projector", col: 0, row: 1 },
        { id: "c", label: "GPS geofence", col: 0, row: 2 },
        { id: "d", label: "Wi-Fi + device key", col: 0, row: 3 },
        { id: "e", label: "+ face & blink", sub: "AirGated today", col: 0, row: 4, focus: true },
      ], edges: [
        { from: "a", to: "b", label: "friend says present" }, { from: "b", to: "c", label: "photo forwarded" },
        { from: "c", to: "d", label: "fake-GPS app" }, { from: "d", to: "e", label: "friend has your phone" },
      ] } },
      { t: "callout", label: "In short", labelHi: "सार", text: "The instructor's laptop creates a Wi-Fi network and becomes the whole system: no cloud, no internet, no app to install. To be marked present, a student has to prove four things at once: they're on that Wi-Fi directly, on the phone they enrolled with, they're a live person who blinks when asked, and their face matches the one recorded on day one. Every one of those checks is made by the laptop, not by the phone." },

      { t: "h", text: "Who it's for" },
      { t: "p", text: "The first group is students who don't cheat. In most Indian colleges, attendance below a cut-off can cost you the right to sit an exam, and sometimes a scholarship or a hostel place. When proxies are easy, the students who refuse to use them are the only ones who actually carry the rule's weight. A fair system is, before anything else, fair to them." },
      { t: "p", text: "The second is instructors. Calling sixty or seventy names takes a real slice of a lecture, and the instructor still can't tell who said \"present\" for whom. AirGated gives them a page on their own laptop that shows who checked in, who didn't, and, for every failed attempt, the reason it failed." },
      { t: "p", text: "The third is institutions with poor connectivity, or with good reasons not to send students' faces to someone else's server. AirGated runs on one laptop. The only time it touches the internet is a one-time download of three small face models when it's first set up." },

      { t: "h", text: "What it's like to use" },
      { t: "p", text: "On day one, each student joins the classroom Wi-Fi. Their phone, thinking it has found a hotel-style login network, pops up a sign-in window. That window points them to the secure check-in page in their normal browser, because the pop-up can't use the camera. There they type their roll number and name, look into the front camera, and blink the number of times the screen asks for. In the background the phone creates a secret key that is locked inside the browser and can never be copied off it." },
      { t: "image", src: `${IMG}/phone-screens.png`, alt: "Two phone-sized screens side by side. Left: the AirGated Classroom Network sign-in page with steps to open Chrome or Safari, an Open secure check-in button and a Download classroom certificate button. Right: the Enroll Identity (Day 1) form with roll number and full name fields, a Scan Face & Enroll button and a note to turn off private Wi-Fi addresses", title: "What a student sees on day one", takeaway: "Left: the page inside the phone's own Wi-Fi sign-in pop-up, which hands the student to a real browser. Right: the one-time enrollment form. These are the project's own pages, rendered at phone width with no data filled in." },
      { t: "p", text: "After that, a daily check-in is the same short ritual: join the Wi-Fi, open the page, type your roll number, blink when asked. It takes seconds of the student's time and none of the instructor's." },
      { t: "flow", title: "A daily check-in, from the student's side", takeaway: "Four steps for the student. Everything that makes it hard to fake happens on the laptop while they blink.", flow: { kind: "flow", colW: 230, nodes: [
        { id: "a", label: "Join class Wi-Fi", col: 0, row: 0 },
        { id: "b", label: "Open the page", sub: "type roll number", col: 1, row: 0 },
        { id: "c", label: "Blink 2 or 3 times", sub: "5 seconds on camera", col: 2, row: 0 },
        { id: "d", label: "Marked present", sub: "or told why not", col: 3, row: 0, focus: true },
      ], edges: [{ from: "a", to: "b" }, { from: "b", to: "c" }, { from: "c", to: "d" }] } },

      { t: "h", text: "What it stops" },
      { t: "p", text: "The easiest way to understand AirGated is as a table of tricks. Each row is a real way attendance gets faked, and each answer is something the laptop checks for itself." },
      { t: "table", head: ["The trick", "What stops it now"], rows: [
        ["A friend says \"present\" for you", "Your face has to match your enrollment"],
        ["Forwarding a QR code or screenshot", "There's no QR. Every check-in signs a fresh, single-use code from the laptop"],
        ["Fake GPS", "GPS isn't used. You must be on the classroom Wi-Fi itself"],
        ["Joining from home through a VPN", "The laptop times the connection itself and rejects slow, relayed links"],
        ["Copying your login to a friend's phone", "The key is locked inside your phone's browser and can't be exported"],
        ["A friend carries your phone to class", "Your face, not theirs, has to be in front of the camera"],
        ["Holding up a photo", "A photo can't blink a number of times it didn't know in advance"],
        ["One phone marking five friends", "One phone can check in one roll number per minute"],
      ], title: "Every trick, and its answer", takeaway: "AirGated's design is this table read row by row. The two rows it can't fully answer yet are below." },

      { t: "h", text: "Where it stands" },
      { t: "p", text: "AirGated has been tried with real people, but only a few. On 30 September 2026, three students enrolled three different phones and spent about twenty minutes using it, and trying to break it. The security checks did their job: a check-in sent for one student from another student's phone was stopped, and a face that didn't belong to the enrolled student was rejected by a wide margin." },
      { t: "image", src: `${IMG}/trial-outcomes.png`, alt: "Bar chart of the 30 September trial: 4 successful check-ins, 4 check-ins failed on liveness, 2 on the latency gate, 1 face mismatch, 1 MAC mismatch, 3 successful enrollments and 2 enrollments failed on liveness", title: "Everything that happened in the first trial", takeaway: "Green worked, red is the system catching a cheat, and amber is the system getting in an honest student's way. There's more amber than red, and that's the next problem to fix." },
      { t: "p", text: "It also showed what isn't good enough yet. Honest students blinked and the laptop counted fewer blinks than it asked for, six times out of seventeen attempts. Two honest phones were rejected as \"too slow\" while sitting a metre from the laptop; that one was traced to how the phones save battery and has been fixed in code, though it still needs to be confirmed in the next trial. And the laptop's built-in hotspot only allows eight phones at once, which is nowhere near a class of sixty-seven." },
      { t: "callout", label: "Honest limits", labelHi: "सीमाएँ", text: "AirGated is a working prototype, not a product. It hasn't been tested with a full class on real phones. Wi-Fi reaches into the corridor, so \"on the network\" isn't quite \"in the room\". Someone holding your phone and a video of you blinking could still get through. And it stores face data, which needs a proper consent screen and an automatic deletion policy before any college should use it. All of this is in the project's own open-issues list, and the technical piece goes through each one." },

      { t: "h", text: "Why it matters" },
      { t: "p", text: "Attendance is a rule with consequences, and a rule that's easy to break rewards the people who break it. Honest attendance is also honest data: an institution that knows who actually turns up can tell which lectures are working. AirGated's bet is that this can be done without a subscription, without a cloud account, and without sending anyone's face anywhere, using hardware every instructor already carries." },
      { t: "p", text: "It's being written up as a paper. I designed AirGated, made the design decisions and ran the trials; as the project's README says, I used an AI coding assistant to help write most of the code, tests and documentation. The next step is a proper trial on a dedicated router with at least ten phones at once, recording every blink score so the liveness check can be tuned on real faces instead of defaults." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────── Technical
  technical: {
    title: "AirGated, technically: six gates between a phone and \"present\"",
    dek: "A captive portal on a laptop hotspot, a latency check the server times itself, the laptop's own ARP table, a signing key the browser can't export, and an offline face-and-blink check. How each piece works, the actual parameters, what a three-phone trial showed, and what's still open.",
    blocks: [
      { t: "p", text: "AirGated is an attendance system that proves a student is physically in a classroom without using the internet. It runs entirely on the instructor's laptop: a DNS server that answers every lookup with the laptop's own address, a plain-HTTP listener that handles the phone's \"is there internet here?\" probes, a FastAPI server on HTTPS, three small face models, and a SQLite file. Students check in from a web page on their phones. There is no app." },
      { t: "p", text: "This piece goes through all of it: the threat model and constraints, the architecture, how a phone is steered to the portal, enrollment and check-in end to end, the six verification gates, the face and blink engine with its real thresholds, the latency estimator and why it changed, the data model, testing, the live trial, the bugs and dead ends, and the open problems. The code is about 1,600 lines across `server.py` (885), `face_verify.py` (179), `certs.py` (140), `fetch_models.py` and two HTML templates, plus 31 tests." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "Never trust a number the phone reports. The server times the latency itself, reads the MAC address from its own ARP table, issues single-use challenges, and analyses the camera frames itself. The phone contributes exactly two things: a signature from a key it cannot export, and the frames that signature covers." },

      { t: "h", text: "The problem and the constraints", id: "problem" },
      { t: "p", text: "The goal is to answer one question for each student at the start of a lecture: is this person, right now, in this room? Every common attendance method answers a weaker question. Roll call answers \"did someone say this name\". A QR code on the projector answers \"has someone seen this image\", and images travel. A GPS geofence answers \"what does the phone say its location is\", which is the phone's claim and nothing more." },
      { t: "p", text: "That last point became the design rule. Anything computed on the student's phone can be changed by the student: GPS coordinates, a reported ping time, a \"liveness passed\" flag, the page's JavaScript itself. So every decision has to be made from evidence the server collects or can verify independently. The constraints that shaped the rest:" },
      { t: "list", items: [
        "**No internet.** Classrooms have dead zones and congested campus networks, and the system shouldn't depend on a cloud service. After a one-time model download, nothing leaves the laptop.",
        "**A web page, not an app.** Students check in from the phone's ordinary browser, so the client can only do what a mobile browser allows, and the server has to assume its JavaScript can be edited.",
        "**Browsers demand HTTPS.** The camera (`getUserMedia`) and the Web Crypto API (`crypto.subtle`) only exist on secure origins. A laptop on a private IP can't get a publicly trusted certificate, so the system needs its own certificate authority.",
        "**An ordinary laptop.** A Windows laptop and its built-in Mobile Hotspot, at least for now. This caps a session at eight phones, which comes up again later.",
        "**Everything decided on the laptop CPU.** Face analysis has to run offline, on a few seconds of CPU per check-in, with no GPU.",
      ] },

      { t: "h", text: "Architecture", id: "architecture" },
      { t: "p", text: "Figure 1 is the whole system. The laptop runs Windows Mobile Hotspot at `192.168.137.1` (configurable with `AIRGATED_LOCAL_IP`), so it is also the network's gateway and DHCP server. That detail turns out to matter: it's what lets the laptop see each phone's MAC address. Three listeners share one Python process: a DNS spoofer thread on UDP 53, an HTTP app on port 80 in a second thread, and the main FastAPI app on 443." },
      { t: "flow", title: "Everything runs on one laptop", takeaway: "No cloud and no internet. The trust boundary is the room's Wi-Fi, and every check happens on hardware the instructor controls. The face engine, the database and the ARP table are reachable only through the HTTPS server.", flow: { kind: "flow", colW: 250, nodes: [
        { id: "p", label: "Student phones", sub: "a web page, no app", col: 0, row: 0 },
        { id: "ap", label: "Wi-Fi hotspot", sub: "laptop = gateway", col: 1, row: 0 },
        { id: "dns", label: "DNS spoofer", sub: "UDP 53: all → laptop", col: 2, row: 0 },
        { id: "http", label: "HTTP listener :80", sub: "probes · landing · CA", col: 0, row: 1 },
        { id: "https", label: "FastAPI :443", sub: "portal · WebSocket · APIs", col: 1, row: 1, focus: true },
        { id: "face", label: "Face engine", sub: "YuNet · MediaPipe · SFace", col: 2, row: 1 },
        { id: "arp", label: "OS ARP table", sub: "IP → MAC", col: 0, row: 2 },
        { id: "db", label: "SQLite", sub: "registry · records · audit", col: 1, row: 2 },
        { id: "adm", label: "/admin dashboard", sub: "loopback only", col: 2, row: 2 },
      ], edges: [
        { from: "p", to: "ap" }, { from: "ap", to: "dns" }, { from: "ap", to: "http" }, { from: "ap", to: "https" },
        { from: "https", to: "face" }, { from: "https", to: "arp" }, { from: "https", to: "db" }, { from: "https", to: "adm" },
      ] } },
      { t: "table", head: ["Component", "Where", "What it does"], rows: [
        ["DNS spoofer", "UDP 53, `run_dns_spoofer()`", "Answers every query with the laptop's IP (TTL 60 s), so every request a phone makes lands on the laptop"],
        ["HTTP listener", "TCP 80, `build_http_app()`", "Answers OS connectivity probes, serves the page shown in the sign-in pop-up, offers the classroom CA for download"],
        ["HTTPS server", "TCP 443, FastAPI", "Student portal, challenge WebSocket, `/api/register`, `/api/checkin`, the loopback-only `/admin` dashboard, and a catch-all redirect registered last"],
        ["Face engine", "`face_verify.py`", "Face detection (YuNet), blink scoring (MediaPipe Face Landmarker), identity embedding (SFace), all offline"],
        ["Certificate manager", "`certs.py`", "Creates an ECDSA P-256 classroom CA (10 years) and server certificate (825 days) once, then reuses them"],
        ["Model fetcher", "`fetch_models.py`", "One-time download of the three models (~42 MB) with pinned SHA-256 checksums"],
        ["Persistence", "`database.db`", "Device registry, attendance records, audit log. Not committed to git"],
      ], title: "Runtime components", takeaway: "One process, three listeners, three local resources. Nothing makes an outbound connection during a class." },

      { t: "h", text: "Getting a phone to the portal", id: "captive-portal" },
      { t: "p", text: "When a phone joins Wi-Fi, its operating system quietly fetches a known plain-HTTP URL to decide whether the network has internet. Android asks for `/generate_204`, iOS for `/hotspot-detect.html`, Windows for `/connecttest.txt`. If it gets back exactly the expected answer, it concludes \"internet works\" and shows nothing. If it gets a redirect, it concludes \"there's a login page\" and opens the familiar \"Sign in to network\" pop-up. This is how hotel Wi-Fi works, and it's called a captive portal." },
      { t: "p", text: "Because the DNS spoofer sends every name to the laptop, those probes arrive at the port-80 listener. The trick is to answer differently depending on whether this phone has already checked in. An unverified phone is redirected, which raises the pop-up. A phone that has completed a check-in gets the exact success answer its OS expects for the next three hours (`VERIFIED_CLIENT_SECONDS`), so the Wi-Fi is marked as working and keeps passing the OS's periodic re-checks." },
      { t: "table", head: ["Platform", "Probe path", "Before check-in", "After check-in"], rows: [
        ["Android / ChromeOS", "`/generate_204`, `/gen_204`", "302 → `/welcome`", "204 No Content"],
        ["iOS / macOS", "`/hotspot-detect.html`, `/library/test/success.html`", "302 → `/welcome`", "200 \"Success\" page"],
        ["Windows", "`/connecttest.txt`, `/ncsi.txt`", "302 → `/welcome`", "200 \"Microsoft Connect Test\" / \"Microsoft NCSI\""],
        ["Firefox", "`/success.txt`, `/canonical.html`", "302 → `/welcome`", "200 with the expected body"],
      ], title: "Connectivity probes the server recognises", takeaway: "The same URL gets two different answers depending on the phone's state. Getting this wrong in either direction breaks the flow: always-204 hides the pop-up, always-302 leaves the phone saying \"no internet\" forever." },
      { t: "p", text: "The first working version answered `204` to everyone, which tells the OS the network is already open, so the pop-up never appeared. That bug, its misdiagnoses and its fix are in the failures section below. One more wrinkle: the pop-up is a restricted web view that generally can't open the camera. So the landing page it shows doesn't try to do the check-in. It tells the student to open `https://192.168.137.1/generate-captive-window` in Chrome or Safari, and offers the classroom CA certificate for a one-time install so the browser stops warning." },

      { t: "h", text: "HTTPS without the internet", id: "certs" },
      { t: "p", text: "Browsers only expose the camera and `crypto.subtle` on secure origins, and no public certificate authority will issue a certificate for `192.168.137.1`. So `certs.py` creates a private one: an \"AirGated Classroom CA\" (ECDSA P-256, valid ten years, `path_length=0`) and a server certificate it signs, with the hotspot IP, `127.0.0.1` and `localhost` as subject alternative names. The server certificate is valid for 825 days because iOS and macOS refuse to trust TLS certificates valid for longer. It's reissued only when it's missing, within 30 days of expiry, or no longer covers the configured IP." },
      { t: "p", text: "Persistence was itself a fix. The August build generated a fresh certificate on every restart, so every reboot of the laptop invalidated every phone's earlier trust decision and put a new warning in front of every student. Students now either install the CA once from `http://192.168.137.1/airgated-ca.crt` or click through a warning." },

      { t: "h", text: "Enrollment", id: "enrollment" },
      { t: "p", text: "Enrollment binds three things to a roll number: a device key, a link-layer address, and a face. The key is the interesting part. The browser generates an RSA-2048 key pair for RSASSA-PKCS1-v1_5 with SHA-256, and passes `false` as the `extractable` argument. That makes the private key a `CryptoKey` object whose bytes no JavaScript can read, including the page's own. The object can be stored in IndexedDB and used to sign, but there's no way to export it, so a student can't text their identity to a friend's phone." },
      { t: "code", lang: "javascript", source: "templates/portal.html", title: "The one argument that makes the key uncopyable", takeaway: "The second argument, false, is extractable. Only the public half is ever exported. In the August build this was true and the key was exported to localStorage, which silently defeated the whole design.", text: `const keyPair = await crypto.subtle.generateKey(
    { name: "RSASSA-PKCS1-v1_5", modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" },
    false, ["sign", "verify"]
);
const pubHex = toHex(await crypto.subtle.exportKey("spki", keyPair.publicKey));
// ... record the clip, sign, POST /api/register ...
if (data.status !== "success") throw new Error(data.message);
// Only keep the key once the server has accepted it
await savePrivateKey(keyPair.privateKey);` },
      { t: "p", text: "Two small ordering decisions matter here. The new key signs the enrollment request itself, which is proof that whoever submitted this public key holds the matching private key. And the private key is written to IndexedDB only after the server accepts the enrollment. Otherwise a rejected enrollment would leave a key behind, and the page, which decides what to show by checking for a stored key, would think the phone was enrolled." },
      { t: "sequence", title: "Enrollment, day one", takeaway: "The face clip is recorded only after the server issues a nonce, and it is signed by the brand-new key. The phone keeps the key only once the server says yes.", seq: { kind: "sequence", actors: ["Student", "Phone browser", "Laptop server", "Face engine"], steps: [
        { from: 0, to: 1, label: "roll + name, \"Scan Face & Enroll\"" },
        { from: 1, to: 1, label: "generate RSA-2048, extractable: false" },
        { from: 1, to: 2, label: "WebSocket, purpose=register" },
        { from: 2, to: 1, label: "13 pings, then nonce N + K", dashed: true },
        { from: 1, to: 0, label: "\"Blink K times slowly\"" },
        { from: 1, to: 1, label: "record 5 s, sign N + roll + sha256(frames)" },
        { from: 1, to: 2, label: "POST /api/register + public key" },
        { from: 2, to: 2, label: "consume N · MAC from ARP · check signature" },
        { from: 2, to: 3, label: "analyse frames" },
        { from: 3, to: 2, label: "liveness + embedding", dashed: true },
        { from: 2, to: 2, label: "re-enrollment rules, store key · MAC · face" },
        { from: 2, to: 1, label: "success", dashed: true },
        { from: 1, to: 1, label: "only now: save key to IndexedDB" },
      ] } },
      { t: "p", text: "On the server, `/api/register` consumes the nonce, reads the phone's MAC from the ARP table (and refuses if it can't, unless the request comes from the laptop itself), checks the signature against the submitted public key, runs liveness on the clip, and then applies the re-enrollment rules described later. The enrollment WebSocket measures latency like the check-in one does, but only check-in enforces the 20 ms gate; enrollment relies on the ARP lookup, which only succeeds for a phone directly on the laptop's network." },

      { t: "h", text: "Check-in, end to end", id: "checkin" },
      { t: "p", text: "A daily check-in has two network phases. First the phone opens a WebSocket to `/ws/challenge?purpose=checkin&roll=R`. The server sends 3 warm-up pings it ignores, then 10 timed ones; the phone answers each with a pong, and the server times the round trips with `time.perf_counter()`. If the fastest round trip is over 20 ms, the socket closes with an error and the attempt is audited. If not, the server issues a challenge: a 128-bit random nonce (`secrets.token_hex(16)`) and a random blink count K, either 2 or 3." },
      { t: "p", text: "Then the phone shows the front camera, a short countdown and the instruction \"Blink K times slowly\", and records for 5 seconds: a frame every 80 ms, scaled to 320 px wide and JPEG-encoded at quality 0.8, which comes to about 60 frames of 5 to 12 KB each. It signs a message containing the nonce, the roll number and a SHA-256 hash of the exact frames, and posts everything to `/api/checkin`. Figure 6 shows the whole exchange." },
      { t: "sequence", title: "A daily check-in", takeaway: "The server times the pings and issues the challenge before the camera records anything, so a slow, relayed or replayed request never reaches the expensive face check. The face engine only ever sees frames whose signature has already been verified.", seq: { kind: "sequence", actors: ["Student", "Phone browser", "Laptop server", "Face engine"], steps: [
        { from: 0, to: 1, label: "roll no., \"Verify Face\"" },
        { from: 1, to: 1, label: "load key from IndexedDB, open camera" },
        { from: 1, to: 2, label: "WebSocket, purpose=checkin" },
        { from: 2, to: 1, label: "3 warm-up + 10 timed pings", dashed: true },
        { from: 2, to: 2, label: "fastest RTT ≤ 20 ms?" },
        { from: 2, to: 1, label: "nonce N, blinks K ∈ {2, 3}", dashed: true },
        { from: 1, to: 0, label: "\"Blink K times slowly\"" },
        { from: 1, to: 1, label: "record ~60 frames, sign N + roll + hash" },
        { from: 1, to: 2, label: "POST /api/checkin + frames" },
        { from: 2, to: 2, label: "gates 1–4: nonce · latency · MAC · signature" },
        { from: 2, to: 3, label: "analyse frames" },
        { from: 3, to: 2, label: "blinks · faces · embedding", dashed: true },
        { from: 2, to: 2, label: "gates 5–6: face · one device; record" },
        { from: 2, to: 1, label: "\"marked\", or the reason why not", dashed: true },
      ] } },
      { t: "p", text: "The signed message is a plain UTF-8 string, built identically in the browser and in Python. Putting the frames' hash inside it is what ties the video to the request: change one byte of one frame after signing and the signature no longer verifies. The challenge is bound to the purpose, roll number and client IP that asked for it, lives at most 120 seconds, and is removed from memory the first time anyone presents it." },
      { t: "code", lang: "python", source: "server.py", title: "Single-use challenges and the signed message", takeaway: "pop, not get: the nonce is gone on first use whether the request then passes or fails. A mutation test that swapped pop for get was caught by test_replayed_signature_rejected.", text: `def consume_challenge(nonce, purpose, roll_number, client_ip):
    """Pop the challenge (single use) and return (challenge, error_message)."""
    challenge = CHALLENGES.pop(nonce, None)
    if challenge is None:
        return None, "Challenge unknown or already used. Start again."
    if time.time() - challenge.issued_at > CHALLENGE_TTL_SECONDS:
        return None, "Challenge expired. Start again."
    if (challenge.purpose, challenge.roll_number, challenge.client_ip) != (purpose, roll_number, client_ip):
        return None, "Challenge was issued for a different request."
    return challenge, None


def signed_message(purpose, nonce, roll_number, frames):
    frames_hash = hashlib.sha256(b"".join(frames)).hexdigest()
    return f"airgated|{purpose}|{nonce}|{roll_number}|{frames_hash}".encode()` },

      { t: "h", text: "The six gates", id: "gates" },
      { t: "p", text: "`verify_checkin()` runs the gates in a fixed order, cheapest first, and stops at the first failure. Each rejection returns a message to the student and writes a typed event to the `airgated_audit_log` table, so the instructor's dashboard can say exactly why each attempt failed. Figure 8 is the pipeline as implemented." },
      { t: "flow", title: "The verification pipeline in verify_checkin()", takeaway: "Every dashed box is a distinct audit event the instructor can see. The order is deliberate: the cheap checks that need no CPU (a dictionary lookup, a number, a string compare) run before signature verification, and the few seconds of face analysis run last.", flow: { kind: "flow", colW: 300, rowH: 92, nodes: [
        { id: "g1", label: "1 · Challenge", sub: "known, unused, < 120 s, bound", col: 0, row: 0 },
        { id: "g2", label: "2 · Latency", sub: "server's fastest RTT ≤ 20 ms", col: 0, row: 1 },
        { id: "g3", label: "Enrolled?", sub: "roll has a key and a face", col: 0, row: 2 },
        { id: "g4", label: "3 · MAC", sub: "ARP MAC = enrolled MAC", col: 0, row: 3 },
        { id: "g5", label: "4 · Signature", sub: "nonce + roll + frames hash", col: 0, row: 4 },
        { id: "g6", label: "5a · Liveness", sub: "1 face, ≥ 60%, ≥ K blinks", col: 0, row: 5 },
        { id: "g7", label: "5b · Face match", sub: "cosine ≥ 0.363", col: 0, row: 6 },
        { id: "g8", label: "6 · One device", sub: "no other roll in 60 s", col: 0, row: 7 },
        { id: "ok", label: "Present", sub: "record + evidence photo", col: 0, row: 8, focus: true },
        { id: "r1", label: "checkin_bad_challenge", col: 1, row: 0, dashed: true },
        { id: "r2", label: "latency_gate", col: 1, row: 1, dashed: true },
        { id: "r3", label: "checkin_unregistered", sub: "or checkin_no_face", col: 1, row: 2, dashed: true },
        { id: "r4", label: "mac_mismatch", col: 1, row: 3, dashed: true },
        { id: "r5", label: "bad_signature", col: 1, row: 4, dashed: true },
        { id: "r6", label: "liveness_failed", col: 1, row: 5, dashed: true },
        { id: "r7", label: "face_mismatch", col: 1, row: 6, dashed: true },
        { id: "r8", label: "multi_profile", col: 1, row: 7, dashed: true },
      ], edges: [
        { from: "g1", to: "g2", label: "pass" }, { from: "g2", to: "g3" }, { from: "g3", to: "g4" }, { from: "g4", to: "g5" },
        { from: "g5", to: "g6" }, { from: "g6", to: "g7" }, { from: "g7", to: "g8" }, { from: "g8", to: "ok" },
        { from: "g1", to: "r1", label: "fail" }, { from: "g2", to: "r2" }, { from: "g3", to: "r3" }, { from: "g4", to: "r4" },
        { from: "g5", to: "r5" }, { from: "g6", to: "r6" }, { from: "g7", to: "r7" }, { from: "g8", to: "r8" },
      ] } },
      { t: "table", head: ["Gate", "What it proves", "Why the phone can't fake it"], rows: [
        ["1. Challenge", "The request is fresh, and meant for this roll number, this purpose and this client", "The server created the nonce and deletes it on first use"],
        ["2. Latency", "The phone is directly on the classroom network, not behind a relay or tunnel", "The server times the pings itself. The phone never reports a number"],
        ["3. MAC", "The request comes from the enrolled phone's network card", "The laptop reads the MAC from its own ARP table"],
        ["4. Signature", "The request comes from the enrolled phone's secret key, and covers these exact frames", "The key can't be exported, and the frames' hash is inside the signed message"],
        ["5. Face", "A live person who matches the enrolled face is holding the phone", "The laptop analyses the signed frames. The phone only records"],
        ["6. One device", "One phone isn't marking several students present", "The server checks its own attendance records for the last 60 s"],
      ], title: "What each gate proves", takeaway: "Every gate rests on something the server measures or holds itself. That is the whole security argument, and it's why editing the page's JavaScript can't make a check-in pass." },
      { t: "p", text: "Gate 3 deserves a note. A MAC address is the hardware address of a network card. Browsers can't read it, by design, but the laptop can: when the phone talks to it, the operating system records the phone's IP-to-MAC mapping in its ARP (Address Resolution Protocol) cache. `get_client_mac()` runs `arp -a <ip>` on Windows or `arp -n <ip>` elsewhere and pulls the MAC out with a regular expression. This only works because the laptop is the network's gateway. On an ordinary router with AP isolation switched on, which most ISP routers ship with, Wi-Fi clients never exchange traffic with each other at the link layer, so the laptop's ARP cache stays empty. That was found by a real test on a home router, not inferred, and it made \"the instructor's device must own the network\" a hard requirement." },

      { t: "h", text: "The face and blink engine", id: "face" },
      { t: "p", text: "The face gate exists for the one attack device binding can't stop: a student who is present carrying an absent friend's enrolled phone. It follows the pattern of remote identity verification (the KYC checks banks run during app sign-up): an active liveness challenge plus a comparison against an enrolled reference. The difference is that it runs entirely offline, on the laptop's CPU, with three models that `fetch_models.py` downloads once and verifies against pinned SHA-256 checksums." },
      { t: "table", head: ["Model", "File", "Size", "Role"], rows: [
        ["YuNet (OpenCV Zoo, 2023)", "`face_detection_yunet_2023mar.onnx`", "0.23 MB", "Counts faces per frame and supplies the landmarks used to align the face"],
        ["MediaPipe Face Landmarker (float16)", "`face_landmarker.task`", "3.6 MB", "Per-frame `eyeBlinkLeft` / `eyeBlinkRight` blendshape scores"],
        ["SFace (OpenCV Zoo, 2021)", "`face_recognition_sface_2021dec.onnx`", "36.9 MB", "A 128-number identity embedding for each face"],
      ], title: "The three offline models", takeaway: "About 42 MB in total, all run through OpenCV's DNN module or MediaPipe on the CPU. The OpenCV objects and the landmarker aren't thread-safe, so analysis holds a lock." },
      { t: "flow", title: "What face_verify.analyze() does with a clip", takeaway: "One pass over the frames feeds two separate decisions: the blink count comes from MediaPipe's scores, the identity from SFace embeddings taken only from open-eye frames. Both have to pass.", flow: { kind: "flow", colW: 240, nodes: [
        { id: "fr", label: "~60 JPEG frames", sub: "320 px · 80 ms apart · 5 s", col: 0, row: 0 },
        { id: "yu", label: "YuNet", sub: "faces per frame", col: 1, row: 0 },
        { id: "rej", label: "2+ faces → reject", col: 2, row: 0, dashed: true },
        { id: "mp", label: "MediaPipe", sub: "mean eyeBlink score", col: 0, row: 1 },
        { id: "sf", label: "SFace", sub: "≤ 12 open-eye frames", col: 1, row: 1 },
        { id: "bl", label: "count_blinks()", sub: "open ≤ 0.25 · shut ≥ 0.45", col: 0, row: 2 },
        { id: "dec", label: "Decision", sub: "≥ K blinks · cosine ≥ 0.363", col: 1, row: 2, focus: true },
      ], edges: [
        { from: "fr", to: "yu" }, { from: "yu", to: "rej", label: "many" }, { from: "yu", to: "mp", label: "one face" },
        { from: "yu", to: "sf" }, { from: "mp", to: "bl" }, { from: "bl", to: "dec" }, { from: "sf", to: "dec" },
      ] } },
      { t: "p", text: "**Detection.** YuNet runs on every frame with a 0.8 confidence threshold. Frames with no face are skipped. If any frame contains more than one face, the whole clip fails, so a second person can't stand in shot. If fewer than 60% of frames (`MIN_FACE_FRAME_RATIO`) contain a face, it fails as \"face not clearly visible\"." },
      { t: "p", text: "**Blink scoring.** For each frame with one face, MediaPipe's Face Landmarker produces blendshapes: named scores for facial movements, between 0 and 1. The blink score is the mean of `eyeBlinkLeft` and `eyeBlinkRight`, where 0 is wide open and 1 is shut. Figure 12, from the project's technical report, shows what a clip looks like through that lens." },
      { t: "image", src: `${IMG}/blink-trace.png`, alt: "Line chart of the eyes-closed score per frame over a 5-second capture, with dashed lines at 0.45 (closed) and 0.25 (open). Three spikes above 0.45 are labelled blink 1, 2 and 3; a smaller spike at about 0.36 is labelled squint, never crosses 0.45, not counted", title: "A blink trace over one 5-second capture (illustrative)", takeaway: "Three blinks cross both lines and count. The squint at 3.3 s rises above the open line but never reaches the closed line, so it doesn't. At about 12 frames a second, a blink's closed phase is only one to three dots wide, which is why liveness is fragile." },
      { t: "p", text: "**Counting with hysteresis.** A blink is an open, then closed, then open transition. Using one threshold would make a score hovering around it count as several blinks. So there are two: the eyes are \"closed\" only at 0.45 or above and \"open\" again only at 0.25 or below, and nothing in between changes the state. That gap is called hysteresis. The counter also has to see open eyes first, so a clip that starts mid-blink doesn't get a free count." },
      { t: "code", lang: "python", source: "face_verify.py", title: "count_blinks()", takeaway: "Eleven lines carry three rules: frames without a face are ignored, the clip must start from open eyes, and a blink only counts when the eyes reopen. Six parametrised tests pin each rule, including squints (0.35) and one long blink that dips to 0.4 mid-way.", text: `BLINK_CLOSED_SCORE = 0.45
BLINK_OPEN_SCORE = 0.25

def count_blinks(scores):
    """Count open -> closed -> open transitions, ignoring frames with no face (None)."""
    blinks = 0
    state = None  # must see open eyes first so a clip that starts mid-blink doesn't count
    for score in scores:
        if score is None:
            continue
        if score <= BLINK_OPEN_SCORE:
            if state == "closed":
                blinks += 1
            state = "open"
        elif score >= BLINK_CLOSED_SCORE and state == "open":
            state = "closed"
    return blinks` },
      { t: "p", text: "**Identity.** SFace turns an aligned face crop into a 128-dimensional vector, an embedding, where photos of the same person land close together. Embeddings are taken only from open-eye frames (blink score ≤ 0.25), up to 12 of them spread through the clip, each normalised to unit length. At least 3 are required. Their mean, re-normalised, is the clip's identity. Comparing two identities is a cosine similarity, which for unit vectors is just their dot product and runs from −1 to 1. OpenCV publishes 0.363 as SFace's \"same person\" operating point, and AirGated uses it unchanged as `MATCH_THRESHOLD`." },
      { t: "p", text: "**Consistency.** Before the mean is accepted, every sampled embedding must itself score at least 0.363 against it. Without this, a clip could start with the enrolled student's face and cut to someone else, and the average might still match. With it, a clip that switches people part-way through produces no embedding at all and fails liveness." },
      { t: "p", text: "**Why the blink count is random.** A fixed count could be satisfied by one pre-recorded clip. K is drawn from {2, 3} and revealed only in the challenge, after the nonce is issued, a few seconds before recording starts. That makes a prepared recording less likely to fit. It doesn't make it impossible, which is the first open problem below." },
      { t: "p", text: "The server, not the phone, makes every one of these decisions. The best-scoring open-eye frame of each accepted check-in is saved to an `evidence/` folder for the instructor to review, and the rest of the frames are discarded once analysed." },

      { t: "h", text: "The latency gate, and why it changed twice", id: "latency" },
      { t: "p", text: "The latency gate separates a phone sitting on the classroom network from one reaching it through a relay: a VPN, a tunnel, or a friend's phone acting as a bridge. A direct Wi-Fi hop to the laptop takes a few milliseconds. Any relay adds at least one more network path. The threshold is 20 ms." },
      { t: "p", text: "In the first version, the browser measured the round trip over a WebSocket and then sent the number to the server as a form field called `current_rtt`. Anyone could set it to 1. The server also timed only the last of three pings. The fix was to move the stopwatch: the server sends the pings and times them itself, and the phone only echoes. Then the September trial showed a second problem. Accepted check-ins measured 3.9 to 7.2 ms, but two honest phones about a metre from the laptop were rejected at 212.9 ms and 25.3 ms, using the median of five pings." },
      { t: "image", src: `${IMG}/trial-rtt.png`, alt: "Horizontal bar chart on a log scale of median round-trip time under the old gate for six trial attempts: four accepted at 4.9, 3.9, 4.6 and 7.2 ms, and two rejected at 212.9 and 25.3 ms, against a dashed 20 ms gate line", title: "Server-measured RTT in the 30 September trial, old estimator", takeaway: "All six phones were within about a metre of the laptop. Distance can't explain a fifty-fold difference: radio travels a metre in a few nanoseconds. Something else was slowing some pings down." },
      { t: "p", text: "The cause was Wi-Fi power saving. An idle phone radio sleeps between the access point's beacons, typically about 100 ms apart, and a packet that arrives while it's asleep waits for the next wake-up. With five samples, two or three of those waits are enough to push the median over 20 ms. The new estimator sends 3 warm-up pings and throws them away (they wake the radio), times 10 more, and gates on the minimum. The median is still recorded, for diagnostics." },
      { t: "code", lang: "python", source: "server.py", title: "The estimator, and the reason for it", takeaway: "The argument is in the docstring: delays from sleep, congestion and retransmission only ever add time, while a relay can't make its fastest ping faster than its real path. So the minimum is the one number that answers \"is this link direct\".", text: `RTT_THRESHOLD_MS = 20.0
RTT_WARMUP_PINGS = 3   # discarded: wake the phone's Wi-Fi radio out of power-save first
RTT_PING_COUNT = 10

def summarize_rtt(samples):
    """The gate uses the fastest round trip, not the median. Phones in Wi-Fi power-save only
    wake every beacon interval (~100 ms), so a few pings in any burst come back slow even at
    1 m from the access point -- that is radio sleep, not distance. Sleep, congestion and
    retries can only ever make a ping slower, while a tunnel or relay cannot make its fastest
    ping quicker than its real path, so the minimum is the honest measure."""
    return min(samples), statistics.median(samples)

# in the WebSocket handler: the server holds the stopwatch
for i in range(RTT_WARMUP_PINGS + RTT_PING_COUNT):
    start = time.perf_counter()
    await websocket.send_json({"type": "ping"})
    await websocket.receive_json()
    if i >= RTT_WARMUP_PINGS:
        samples.append((time.perf_counter() - start) * 1000)` },
      { t: "table", head: ["Estimator", "Who measures", "Statistic", "Honest phone with power-save spikes", "Relayed link"], rows: [
        ["May 2026", "Phone, reports `current_rtt`", "last of 3 pings", "Depends on luck", "Passes: it can report anything"],
        ["Until 30 Sep", "Server", "median of 5", "Rejected in the trial (212.9 and 25.3 ms)", "Rejected"],
        ["Now", "Server", "min of 10, after 3 warm-ups", "Passes on its fastest ping (3.9 ms in the test pattern)", "Rejected (fastest 36.2 ms in the test pattern)"],
      ], title: "Three latency estimators", takeaway: "Each version fixed a real failure. The current one is pinned by test_rtt_gate_ignores_power_save_spikes, which feeds it a spiky local pattern with pings up to 212.9 ms and a relayed pattern whose fastest ping is 36.2 ms. It still has to be confirmed in a live trial." },
      { t: "callout", label: "What latency can't do", labelHi: "सीमा", text: "No RTT threshold can measure distance inside Wi-Fi range. A phone in the corridor with a good signal measures the same few milliseconds as a phone on the front desk. The gate proves network membership without a relay, not presence inside the room. Room presence needs a different signal, which is open problem two." },

      { t: "h", text: "Re-enrollment and lost phones", id: "reenroll" },
      { t: "p", text: "Students clear browser data, change phones and, as the trial showed, arrive with randomised MAC addresses. The August build handled any MAC collision by silently overwriting whichever roll number was registered to that MAC, which quietly downgraded the security model to \"trust the latest device on this MAC\". The rules are now explicit, and the enrolled face is what proves identity when the device changes." },
      { t: "table", head: ["Situation", "Outcome", "Audit event"], rows: [
        ["This phone's MAC is already enrolled to a different roll", "Refused: one phone, one student", "`register_device_taken`"],
        ["Roll number not enrolled yet", "New enrollment", "none"],
        ["Roll enrolled with a face, and the new face matches (≥ 0.363)", "Re-key: the new phone and MAC are accepted", "`reenroll_device`"],
        ["Roll enrolled with a face, and the new face doesn't match", "Refused", "`reenroll_face_mismatch`"],
        ["Roll enrolled before faces existed, same MAC", "Face added to the existing enrollment", "`legacy_face_added`"],
        ["Roll enrolled before faces existed, different MAC", "Refused: the instructor must reset", "`legacy_upgrade_refused`"],
        ["Lost or replaced phone", "Instructor deletes the enrollment from `/admin`; the student enrolls again", "`instructor_reset`"],
      ], title: "Re-enrollment rules in /api/register", takeaway: "Taking over someone else's roll number by re-registering now needs their face. Every path, including the instructor's reset, leaves an audit row." },

      { t: "h", text: "Data model", id: "data" },
      { t: "p", text: "Three SQLite tables, created at start-up. New columns are added to an existing database automatically (`_add_missing_columns` reads `PRAGMA table_info` and issues `ALTER TABLE`), which is how databases from before the face check picked up embedding columns without a migration tool. Nonces and the set of verified phones are deliberately kept in memory only: a restart forces students to start a check-in again, which is harmless." },
      { t: "table", head: ["Table", "Columns", "One row per"], rows: [
        ["`airgated_device_registry`", "`roll_number` (PK), `name`, `public_key_hex` (DER, hex), `hardware_mac`, `face_embedding` (128 × float32 BLOB), `enrolled_at`", "Enrolled student"],
        ["`airgated_attendance_records`", "`id`, `roll_number`, `timestamp`, `latency_ms` (server-measured), `network_ip`, `network_mac`, `face_similarity`, `blinks_detected`, `evidence_file`", "Accepted check-in"],
        ["`airgated_audit_log`", "`id`, `timestamp`, `event`, `roll_number`, `network_ip`, `network_mac`, `detail`", "Rejection, re-enrollment or reset"],
      ], title: "The database", takeaway: "The registry stores a public key and a face embedding, never a private key or a face photo. Attendance rows keep the evidence that justified them: the RTT, the face score and the blink count." },
      { t: "p", text: "The instructor's dashboard at `https://localhost/admin` is built straight from these tables. It refuses any client that isn't the laptop itself (a 403 for anything but `127.0.0.1` or `::1`), refreshes every 30 seconds, and can show any day. It shows enrolled, present and absent counts and the attendance rate; a bar chart of failure reasons; a seven-day trend; a \"needs attention\" list of students who failed and were never marked present, with their first failure reason; present and absent lists with face score, blinks and RTT; every failed check-in and enrollment; and the reset form for lost phones. All values are HTML-escaped. It is read-only apart from the reset." },

      { t: "h", text: "Configuration and running a class", id: "config" },
      { t: "table", head: ["Constant", "Value", "Meaning"], rows: [
        ["`RTT_THRESHOLD_MS`", "20.0", "Maximum fastest round-trip time for check-in"],
        ["`RTT_WARMUP_PINGS` / `RTT_PING_COUNT`", "3 / 10", "Discarded warm-up pings / timed pings"],
        ["`CHALLENGE_TTL_SECONDS`", "120", "Nonce lifetime"],
        ["`CAPTURE_MS`", "5000", "Face clip length"],
        ["`BLINK_CHOICES`", "(2, 3)", "Random blink count per challenge"],
        ["`BLINK_CLOSED_SCORE` / `BLINK_OPEN_SCORE`", "0.45 / 0.25", "Blink hysteresis thresholds"],
        ["`MATCH_THRESHOLD`", "0.363", "SFace cosine similarity for \"same person\""],
        ["`MIN_FACE_FRAME_RATIO`", "0.6", "Minimum share of frames containing a face"],
        ["`MAX_EMBEDDING_FRAMES` / `MIN_EMBEDDING_FRAMES`", "12 / 3", "Open-eye frames used for identity"],
        ["`MAX_FRAMES` / `MAX_FRAME_BYTES`", "120 / 300,000", "Upload limits per request"],
        ["`MULTI_PROFILE_WINDOW_SECONDS`", "60", "One MAC, one roll number per window"],
        ["`VERIFIED_CLIENT_SECONDS`", "10,800", "Probes answered as \"online\" after a check-in (3 hours)"],
        ["`AIRGATED_LOCAL_IP` (env)", "192.168.137.1", "The laptop's address on the classroom network"],
      ], title: "Every tunable number", takeaway: "Thirteen numbers define the system's behaviour. Three of them, the two blink thresholds and the face threshold, are defaults that have not been calibrated on real students yet." },
      { t: "p", text: "Setup needs the internet once: create a virtual environment, `pip install -r requirements.txt` (FastAPI, uvicorn, cryptography, dnslib, OpenCV, MediaPipe and a few others), and `python fetch_models.py`. Each class then follows a fixed ritual, and the order is not optional:" },
      { t: "list", items: [
        "Turn Mobile Hotspot **off**.",
        "Start `python server.py` as Administrator, because it binds ports 53, 80 and 443.",
        "Turn the hotspot **on**. The server has to claim port 53 before Windows' Internet Connection Sharing does (see the failures section).",
        "Students join, follow the pop-up to the secure page, and check in. Each student turns off \"Private Wi-Fi address\" (iOS) or \"Randomized MAC\" (Android) for this network once.",
        "The instructor watches `https://localhost/admin` on the laptop.",
      ] },
      { t: "p", text: "Windows Mobile Hotspot allows eight devices at a time. For a full class the plan is a dedicated travel router with `AIRGATED_LOCAL_IP` set to the laptop's address on it. The progress report compared three candidates and chose a budget dual-band AC1200 router, the Mercusys AC10, over a single-band model whose own vendor guidance suggests 20 to 25 concurrent clients. It hasn't been bought or tested yet, and it must be checked with a real `arp -a` test for AP isolation before it's trusted." },

      { t: "h", text: "Testing", id: "testing" },
      { t: "p", text: "There are 31 automated tests (`python -m pytest tests`). Re-run for this write-up in a clean environment with the versions `requirements.txt` asks for, all 31 passed in 19.9 seconds. The server tests drive the real `server.py` in memory through FastAPI's `TestClient`, over real HTTP and WebSocket calls, against a fresh temporary SQLite file. Each simulated phone is a `Device` that owns a real RSA-2048 key and signs messages in exactly the browser's format, so signature verification is genuine." },
      { t: "p", text: "Two things are substituted, because a test can't blink at a camera or have an ARP table. The face engine is replaced by `fake_analysis`, so each test chooses what the engine \"sees\": the enrolled face, a different face, or too few blinks. The MAC lookup returns whatever the test wants. The real face code is exercised separately in `tests/test_face_verify.py`, including one test that loads the real models and checks that a black frame contains no face." },
      { t: "table", head: ["Concern", "Tests", "Examples"], rows: [
        ["Challenge and replay", "4", "Replayed signature rejected and audited; nonce issued for another roll; nonce older than 120 s; RTT measured by the server"],
        ["Signatures", "2", "A key from another device; a signature over one clip with another clip uploaded"],
        ["Latency gate", "2", "Gate rejects above threshold; power-save spikes don't cause rejection, a relayed link still does"],
        ["Face and liveness decisions", "2", "Face mismatch; 1 blink when 2 were asked for"],
        ["Device binding and profiles", "4", "MAC mismatch; two rolls from one MAC within 60 s; a phone can't take a second roll; face-verified re-enrollment"],
        ["Portal, routing, captive probes", "4", "No key export or `localStorage` in the portal; the catch-all doesn't swallow APIs; probes 302 before and 204 after, on both listeners"],
        ["Dashboard and reset", "4", "End-to-end enroll and check-in; `/admin` is loopback-only; statistics correct; reset lets a new phone enroll"],
        ["Face engine unit tests", "9", "Six blink-counting cases; embedding round trip; liveness reasons; real models reject blank frames"],
      ], title: "What the 31 tests cover", takeaway: "Every gate and every bug that was ever found has a test. The suite checks logic, not cameras: it can't say whether 0.45 suits a cheap front camera." },
      { t: "p", text: "A test that always passes proves nothing, so the suite was checked by mutation testing: five deliberate bugs were put into a throwaway copy of the code, and the tests were run against each one." },
      { t: "table", head: ["Deliberate bug", "Caught by"], rows: [
        ["Nonce not deleted after use (`dict.get` instead of `dict.pop`)", "`test_replayed_signature_rejected`"],
        ["Face-similarity check removed", "`test_face_mismatch_rejected`"],
        ["Blink counter increments by two", "4 cases of `test_count_blinks`"],
        ["Probes answered `204` for every client (the original pop-up bug)", "`test_probe_redirects_until_verified`, `test_http_listener_probe_behaviour`"],
        ["MAC comparison disabled", "`test_mac_mismatch_rejected`"],
      ], title: "Mutation testing", takeaway: "Five mutants, five caught. It's a small sample, but each mutant is one of the real ways this code has broken or could break." },

      { t: "h", text: "The live trial, 30 September 2026", id: "trial" },
      { t: "p", text: "The first multi-device trial used the instructor laptop on Windows Mobile Hotspot, three students each on their own phone at about a metre, and a fresh database. Between 01:08 and 01:27 it recorded 17 events, taken straight from the attendance and audit tables: 3 enrollments and 4 check-ins accepted, 10 attempts rejected. Earlier, on 1 August, a brand-new unconfigured phone had completed the older three-gate pipeline unassisted for the first time (native pop-up, registration, three check-ins at 5.0 to 6.0 ms), and on 3 and 4 August two cross-device impersonation attempts against a real registered roll number were both blocked by the MAC gate." },
      { t: "table", head: ["Time", "Student", "Event", "Detail"], rows: [
        ["01:08:49", "A", "check-in", "RTT 4.9 ms · face 0.720 · 2 blinks"],
        ["01:09:04", "A", "liveness_failed", "asked 2 blinks, saw 0"],
        ["01:09:27", "A", "liveness_failed", "asked 3 blinks, saw 2"],
        ["01:09:51", "A", "check-in", "RTT 3.9 ms · face 0.715 · 2 blinks"],
        ["01:14:57", "B", "register_liveness_failed", "asked 3 blinks, saw 2"],
        ["01:15:27", "B", "check-in", "RTT 4.6 ms · face 0.879 · 3 blinks"],
        ["01:15:46", "B", "liveness_failed", "asked 3 blinks, saw 1"],
        ["01:16:02", "B", "liveness_failed", "asked 2 blinks, saw 0"],
        ["01:16:09", "A", "latency_gate", "median RTT 212.9 ms (old estimator)"],
        ["01:16:27", "A", "face_mismatch", "similarity 0.204 on A's enrolled phone"],
        ["01:24:20", "C", "register_liveness_failed", "asked 2 blinks, saw 1"],
        ["01:24:37", "C", "latency_gate", "median RTT 25.3 ms (old estimator)"],
        ["01:24:55", "C", "check-in", "RTT 7.2 ms · face 0.823 · 5 blinks"],
        ["01:26:50", "C", "mac_mismatch", "check-in for C sent from A's phone"],
      ], title: "The trial's event log", takeaway: "Students are lettered here; the report abbreviates roll numbers. The successful enrollments aren't audit events, which is why 14 rows plus 3 enrollments make 17." },
      { t: "list", items: [
        "**Device binding works across real phones.** A check-in for one student sent from another student's enrolled phone was rejected at the MAC gate.",
        "**Face matching separated genuine from impostor with margin.** Genuine check-ins scored 0.715 to 0.879; a different face on an enrolled phone scored 0.204. The 0.363 threshold sits between them, but four genuine samples and one impostor are far too few to calibrate anything.",
        "**Latency false rejections (2 of 12 check-in attempts)** came from the median estimator and power-save spikes, not distance. Fixed in code as described above; the fix still needs a live confirmation.",
        "**Liveness false rejections are the dominant friction:** 4 of 12 check-in attempts and 2 of 5 enrollments, with 0 to 2 blinks counted against 2 or 3 requested. Likely causes: a blink's closed phase covers only one to three frames at about 12 fps, and one blurred frame can stay under 0.45; students starting to blink during the countdown; and the rule that eyes must reopen before the clip ends.",
        "**MAC randomisation was on for all three phones.** Every enrolled MAC had the locally-administered bit set, meaning a per-network random address. They stayed stable for the session, but some Android and iOS versions rotate them, which would break the MAC gate for that student until they re-enroll with their face.",
        "**Repeat check-ins are recorded.** One student checked in twice a minute apart. The dashboard counts distinct students, but records aren't deduplicated per session.",
      ] },

      { t: "h", text: "How it evolved, and what broke", id: "failures" },
      { t: "p", text: "The repo has ten commits, from \"first version of local attendance\" on 29 May 2026 to the v2.0 report on 30 September. Most of the learning is in two documents alongside the code: a May write-up and an August \"Progress Report & Critical Analysis\" that audited the May claims against the code and found several of them untrue." },
      { t: "table", head: ["When", "State", "What changed it"], rows: [
        ["Before May 2026", "GPS geofence over the internet, distance by the Haversine formula", "Mock-location apps; client-side GPS is a claim, not evidence"],
        ["May 2026 (v1.0)", "Three stages: client-reported RTT ≤ 20 ms, ARP MAC lookup, RSA signature; 60 s multi-profile lockout", "The May report called it \"production-ready\" and \"zero-vision\""],
        ["Early Aug 2026", "Audit: ten critical findings. Exportable key in `localStorage`, hard-coded challenge, null-returning APIs, no tests, a Groq API key in source", "First unassisted phone run on 1 Aug; impersonation tests on 3–4 Aug"],
        ["30 Sep 2026 (v2.0)", "Six gates, server-issued nonces, server-measured RTT, face + blink liveness, audit log, dashboard, 31 tests", "The first three-phone trial, then the latency estimator fix"],
        ["After v2.0", "Exam generator removed; AirGated is attendance-only and holds no API keys", "Scope: the generator was reachable by every student and spent the key"],
      ], title: "Five states of the project", takeaway: "Each step was forced by a specific failure. The biggest reversal is the face check: v1 was sold as \"zero-vision\", and v2 stores face embeddings because device binding alone can't stop a friend carrying your phone." },
      { t: "p", text: "**The key that could be copied.** The May report said the private key was non-extractable and kept in IndexedDB. That was true of `templates/register.html`, but nothing served that file. The portal that actually ran was embedded inline in `server.py`, and it generated the key with `extractable: true`, exported it to a base64 string and saved it in `localStorage`. A student could paste that string into another phone and both would sign valid check-ins. The lesson: a security property described in a document is only as true as the code path that's actually served. The fix is now pinned by a test that reads the portal page and fails on any `localStorage.` use or key export." },
      { t: "p", text: "**The APIs that returned null.** During the first phone tests, enrollment and check-in both \"succeeded\" with a response body of `null`, and the page crashed reading a field off it. The cause was route order. Starlette matches routes in the order they're registered, and the captive-portal catch-all, `/{path_name:path}`, was registered before `/api/register` and `/api/checkin`. It matched first, saw the path on an exempt list, and did a bare `return`, intending to let the request through. But a route that has matched *is* the response, and an empty return serialises as `null`. The catch-all now comes last with no exempt list, and a test posts empty forms to both APIs and requires a validation error, not `null`." },
      { t: "p", text: "**The pop-up that never appeared, three times over.** At first the server had no port-80 listener at all, so the OS's plain-HTTP probe was refused. Adding a listener that answered `204` didn't help either, because `204` means \"internet works, no sign-in needed\". In between, a different bug hid both: Windows' Internet Connection Sharing, the service behind Mobile Hotspot, binds UDP port 53 the moment the hotspot turns on, so if the hotspot started first, the DNS spoofer silently lost the race (`WinError 10048`) while the rest of the server ran normally. Starting the server first fixed the race; the start-up message now explains it in plain words. Answering probes per client, redirect until verified and success after, fixed the pop-up. Both the route bug and the port race were ordering problems with no error surfaced, which is a pattern worth remembering in this kind of system." },
      { t: "p", text: "**The challenge that never changed.** In the August code the phone signed `MOCK_CHALLENGE_FROM_QR`, a constant string, and the server accepted whatever challenge text the client sent. One captured signature was valid forever for that roll number. Closing it needed the server-issued, bound, expiring nonce described above, a design change rather than a one-line fix." },
      { t: "p", text: "**Smaller ones.** A stray `import bytes` at the top of the first server shadowed Python's built-in and broke `bytes.fromhex`. Windows Defender Firewall blocked inbound connections from the hotspot until a rule was added. Before HTTPS, testing needed Chrome's `unsafely-treat-insecure-origin-as-secure` flag, which can't be asked of real students. And the August audit found `database.db` and `__pycache__` tracked in git; they were removed from all history and ignored, because the database holds personal data." },

      { t: "h", text: "Trade-offs and roads not taken", id: "alternatives" },
      { t: "table", head: ["Option", "Why it was rejected or deferred"], rows: [
        ["GPS geofence", "The phone reports its own location; mock-location apps beat it. This was AirGated's own first phase"],
        ["Rotating QR code on the projector", "Beats a delayed screenshot but not a live video call to a friend, who scans it off the feed. That friend must still be in Wi-Fi range to submit, so it only matters in the corridor case"],
        ["Ultrasonic tone from the laptop", "Attenuation in air rises sharply with frequency. Purpose-built ultrasonic transducers reach about 5 to 10 m; a laptop speaker is weaker, so back rows wouldn't hear it"],
        ["A native app (Flutter, Tauri)", "Suggested in the May report as the production fix for browser sandboxing. Superseded: serving the portal over HTTPS with a classroom CA solved the same problem with nothing to install"],
        ["Room or college Wi-Fi", "Usually has AP isolation on, which empties the laptop's ARP cache and kills the MAC gate. The instructor must own the network"],
        ["Containing the Wi-Fi signal", "A dedicated router at low transmit power, with a 5 GHz network that fades faster through walls. Judged the most robust fence, but imprecise and untested"],
      ], title: "Alternatives considered", takeaway: "Every rejection has a concrete reason, often a measurement. The realistic answer to \"is the phone in the room\" is layered: signal containment as the boundary, the signed pipeline under it, and an instructor's spot check on top." },
      { t: "p", text: "Some choices in the shipped design are trade-offs worth naming. RSA-2048 with PKCS#1 v1.5 is available in Web Crypto on mobile browsers and verifies with the standard `cryptography` library on the server; the key never needs to be anything but a signer. Uploading about 60 JPEGs instead of a video file means the server can decode frames with no codec and hash them in exactly the order the phone signed them. Keeping nonces in memory means no cleanup job and no stale-nonce bugs, at the cost of assuming one server process. And running face analysis in a thread pool behind a single lock keeps the event loop responsive, but means check-ins are analysed one at a time." },

      { t: "h", text: "Security and privacy", id: "security" },
      { t: "table", head: ["Attack", "Stopped by", "Status"], rows: [
        ["Replay a captured check-in request", "Single-use nonce (gate 1)", "Closed"],
        ["Tamper with the reported latency", "RTT measured by the server (gate 2)", "Closed"],
        ["Check in from outside over a VPN or tunnel", "Latency gate (gate 2)", "Closed"],
        ["Copy the device key to a friend's phone", "Non-extractable key + MAC (gates 3–4)", "Closed"],
        ["Swap in a different video after signing", "Frames' hash inside the signature (gate 4)", "Closed"],
        ["Friend brings your phone to class", "Face match (gate 5)", "Closed"],
        ["Hold up a photo of the absent student", "Blink liveness (gate 5)", "Closed"],
        ["One phone checks in several students", "Multi-profile rule (gate 6)", "Closed"],
        ["Take over a roll number by re-registering", "Face match needed to re-key", "Closed"],
        ["Play a video of the student blinking into the enrolled phone", "Only the random blink count", "Partly open"],
        ["Stand in the corridor within Wi-Fi range", "Nothing yet: Wi-Fi range isn't a wall", "Open"],
      ], title: "The threat model", takeaway: "Every closed attack is closed by something the server holds or measures. The two open ones are about the physical world: what a camera can be shown, and where radio reaches." },
      { t: "p", text: "Privacy cuts both ways in this design. Nothing leaves the laptop, there's no cloud account, and the database stores a 128-number embedding rather than a face photo. But it also keeps the best frame of every accepted check-in in `evidence/`, with no consent screen at enrollment and no automatic deletion. The project's own issue list puts a consent screen, a retention period and automatic deletion of evidence images on the list before any real deployment." },
      { t: "p", text: "One risk the project's documents don't list yet is visible in `certs.py`: the classroom CA is created without name constraints, and its private key is stored unencrypted in `ssl_certs/`. A phone that installs it trusts whoever holds that key for every HTTPS site, not just `192.168.137.1`. For a laptop the instructor controls, that's the trade made to avoid a warning, but it's a real trust request to make of students, and constraining the CA to the classroom IP would narrow it." },

      { t: "h", text: "Performance", id: "performance" },
      { t: "p", text: "What has been measured is small. On a direct link, server-measured RTTs were 3.9 to 7.2 ms in the September trial and 5.0 to 9.0 ms in August, against a 20 ms gate. A clip is about 60 frames of 5 to 12 KB, so a check-in uploads well under a megabyte. Face analysis runs three models on up to 120 frames on the CPU and takes a few seconds per check-in." },
      { t: "p", text: "What hasn't been measured matters more. Analysis is serialised behind one lock, so a class arriving at once queues. Nobody has measured whether 60 or more phones close together keep the latency gate reliable, and the progress report estimated that cycling 67 students through Windows Hotspot's 8 slots, at 15 to 30 seconds per student, would take ten minutes or more of pure queuing. A load test with 60+ concurrent check-ins is on the list." },

      { t: "h", text: "What's still open", id: "open" },
      { t: "p", text: "The technical report ranks the open software issues. In order:" },
      { t: "table", head: ["#", "Priority", "Issue", "Planned fix"], rows: [
        ["1", "High", "Liveness false rejections (6 of 17 attempts in the trial)", "Log per-frame blink scores to calibrate; capture at 15 to 20 fps at lower resolution; start recording after the countdown; a live blink counter for feedback, with the server still deciding; an instant retry"],
        ["2", "High", "No proof of being in the room", "A short code on the projector that changes every 15 s, typed by the student and included in the signed message, so forwarding only helps people already on the classroom Wi-Fi within seconds"],
        ["3", "Medium", "Video replay of a blinking face on the enrolled phone", "A randomised active challenge (turn left or right, look up) scored from head-pose landmarks"],
        ["4", "Medium", "Face threshold not calibrated", "Collect genuine and impostor pairs from a class under room lighting and pick the threshold from the observed distributions"],
        ["5", "Medium", "No rate limiting on the challenge or the APIs", "Per-IP and per-roll attempt limits with back-off; cap outstanding challenges"],
        ["6", "Low", "Dashboard protected only by the loopback check", "An instructor password if it's ever exposed beyond the laptop"],
        ["7", "Low", "Class-scale performance unmeasured", "Load test 60+ concurrent check-ins; measure analysis time and latency-gate stability"],
        ["8", "Low", "Biometric retention and consent", "Consent screen at enrollment; retention period and automatic deletion of `evidence/`"],
        ["9", "Low", "Camera unavailable in the OS pop-up; CA trust needed", "Keep the browser hand-off; hand out the classroom CA during onboarding"],
        ["10", "Low", "Housekeeping", "Deduplicate repeat check-ins per session; refresh the outdated May report"],
      ], title: "Open software issues, from the v2.0 report", takeaway: "The top two are the honest centre of the project. Closed attacks are closed by design; what remains is calibration on real faces and a signal that knows where the walls are." },
      { t: "p", text: "There are smaller known gaps too. MAC randomisation can't be detected, so a student who forgets to turn it off fails the MAC gate and has to re-enroll with their face. Roll numbers are matched exactly with no normalisation, so a missing prefix looks like an unenrolled student. And in-memory state assumes a single server process." },
      { t: "p", text: "The next trial is already planned: re-run with the new latency estimator and record the fastest and median RTT for every attempt; record how the pop-up behaves on each Android and iOS version and whether students needed to install the CA; capture per-frame blink scores for every attempt so the liveness thresholds can be fitted to real data; and move to a travel router with at least ten phones at once. AirGated is being written up as a paper, and those numbers are what it needs." },
      { t: "p", text: "A note on authorship, as the README puts it: I designed AirGated, made the design decisions and tested it with real students and phones, and used an AI coding assistant to help write most of the code, tests and documentation. The full threat model, schema and test-by-test guide are in the repository's README." },
    ],
  },
};
