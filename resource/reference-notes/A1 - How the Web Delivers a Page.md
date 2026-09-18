# A1 — How the Web Delivers a Page

**Module A — The Browser as the Foundation**
**Master Guide · Reconstructed from the A1 tutoring session**

---

## 1. What This Session Was Building

This session opened **Module A (Browser Foundations)** of the Frontend Core Mastery syllabus. Module C (CSS Mastery) is complete; Module B (HTML Structure) is complete; Module D (JavaScript) is running in parallel sessions. A1 is the entry point for understanding the machine that will execute everything you build.

Where A1 sits:

```
Module A — The Browser as the Foundation
  ▸ A1 (this session) → A2 HTML Parsing & DOM Construction
                        → A3 CSS Parsing & CSSOM
                        → A4 JavaScript Execution Basics
                        → A5 The Rendering Pipeline

Module B — HTML Structure           ✅ COMPLETE
Module C — CSS Mastery              ✅ COMPLETE
Module D — JavaScript               ▸ Running in parallel sessions
Module E — Tooling & Product        🔒 LOCKED
```

**Builds on:** general familiarity with URLs, browsers, and the concept of a "server" (at surface level).
**Leads into:** A2 (HTML Parsing and DOM Construction), where the browser begins doing something with the raw document this session traced to its arrival.

### Session objectives

By the end of A1 the learner should be able to:

1. **Trace the full journey** a browser makes from the moment a URL is typed to the moment a document arrives — as a connected pipeline of causes and effects.
2. **Explain the HTTP request/response cycle** — what is sent, what comes back, and in what form — including the anatomy of both a request and a response.
3. **Describe what a browser actually receives** (raw HTML text, not a visual page) and why that matters for everything that follows.

### The deliverable

A continuous, self-directed narration — no notes, no references — of the complete sequence of events from "user presses Enter on a URL" to "raw document lands in the browser." Every major step, correct terminology, connected as cause → effect → next cause.

### How mastery is measured here

- A1 has **no standalone gate**. Mastery is evaluated cumulatively at the **Nano Gate** (which covers A1 + A2 + A3 together), then the Micro Gate after A5.
- Consequence: **A1 must be solid before A2 is taught**, because gaps here will cascade into every subsequent browser-foundation topic.

### Standing session rules (persist from previous modules)

- **Correction sessions are mandatory after every answer** — imprecise reasoning gets rewritten into technically precise form, every time, no exceptions.
- Remediated passes are accepted as normal progression.
- **Algorithimics_Site** is the applied project layer alongside the module curriculum; examples throughout reference it where relevant.

---

## 2. The Learning System — How This Session Teaches

This is not a lecture dump. The session runs a fixed loop, and understanding the loop is itself part of the learning:

1. **First Principle** — every topic opens by answering *why the concept exists* before any terminology or syntax is shown. The protocol problem, the need for shared rules, the two actors — each is established before the pipeline.
2. **Mental Model** — a concrete picture of what each protocol or entity *does*, not just a definition.
3. **Concrete Example** — real URLs, real HTTP request/response text, real HTML documents immediately follow the abstract idea.
4. **Trace the Mechanism** — the session walks through what happens step by step (DNS lookup, TCP handshake, request sent, response received, secondary requests fired).
5. **Sticky Summary** — each chunk ends with a compressed, memorable formulation worth keeping.
6. **Quick-Check** — the learner answers; the questions deliberately target the distinctions that matter most.
7. **Correction Session** — every answer (even adequate ones) is audited, and imprecise wording is rewritten into a technically precise form. This is the engine of the whole system.
8. **Cross-concept reinforcement** — later chunks deliberately reuse earlier material (the library analogy from Chunk 1 returns in the deliverable; the "communication successful ≠ resource delivered" distinction sharpens the response anatomy).

The session's recurring diagnostic about this learner: **correct instinct, imprecise mechanism**. The conclusions and sequencing are usually right; the *why* or the *specifics* need sharpening. The correction sessions exist to close that gap.

---

## 3. The Core Mental Model — What the Web Actually Does When You Press Enter

### The one-sentence model

> The web is a client-server system where a browser sends structured requests over the internet and receives raw text documents in return — using a stack of protocols that each solve a specific communication problem.

Everything in Modules A through E ultimately builds on top of this sentence.

### The problem that made HTTP necessary

Before HTTP existed, two computers that wanted to exchange files had no agreed-upon way to talk. They needed shared answers to:

- How to ask for a file
- How to respond to that ask
- What format the file arrives in
- What to do if something goes wrong

Without agreement on all of this, two machines are just making noise at each other. This is the problem that **protocols** solve. A protocol is a **shared set of rules** two parties agree to follow so communication is possible.

**HTTP — HyperText Transfer Protocol — is the protocol the web uses.** It was invented by Tim Berners-Lee in 1989–1991 for one purpose: **allow a browser to ask a server for a document, and allow the server to send it back in a form the browser can use.**

The "HyperText" part refers to documents that contain links — text that *points to other text*. That is the web's core idea. HTTP is the agreed ruleset that makes fetching those documents possible.

### The two actors: client and server

Every web request involves exactly **two roles**:

| Role | Who | Behaviour |
|---|---|---|
| **Client** | Your browser | **Initiates** the request — speaks first, every time |
| **Server** | A remote computer that holds files | **Responds** to the request — never initiates, only reacts |

The analogy that holds up well:

> Think of the server as a **library**, and the client as a **reader who walks in and asks for a specific book**. The library doesn't push books at you — it waits for a request, then fulfils it.

**The directionality is fundamental.** The client always speaks first. The server never initiates — it only ever reacts. One direction. One initiator. Always.

```
CLIENT  ——— request ———→  SERVER
CLIENT  ←—— response ———  SERVER
```

This asymmetry is baked into every protocol in the stack.

---

## 4. The URL — A Three-Part Instruction, Not Just an Address

### First principle

When you type a URL and press Enter, you are not just pointing at a location. You are giving the browser a **complete, structured instruction** with several distinct parts. Each part has a specific job. Without all three, the browser cannot act.

### The three parts

```
https://developer.mozilla.org/en-US/docs/Web/HTTP
  │                      │                          │
  │                      │                          │
SCHEME              DOMAIN (HOST)                  PATH
"use this           "go to this               "and ask for
 protocol"           machine"                  this specific
                                              resource on it"
```

| Part | Example | What it tells the browser |
|---|---|---|
| **Scheme** | `https://` | Which protocol to use. `https` = HTTP with encryption layered on top (the S stands for Secure). |
| **Domain** | `developer.mozilla.org` | Which server to contact. A human-readable alias that must be translated before the browser can connect (see DNS below). |
| **Path** | `/en-US/docs/Web/HTTP` | Which specific resource on that server to request. Like a shelf location inside the library. |

### DNS — the web's phone book

Computers don't use domain names to find each other. They use numerical **IP addresses** (e.g. `63.245.215.20`). The domain is a friendly alias that gets translated into an IP address before the browser can contact the server.

That translation is done by **DNS — Domain Name System**. Think of DNS as the web's phone book: you look up a name, it gives you a number.

```
BROWSER ——— "what's the IP for developer.mozilla.org?" ———→ DNS SERVER
BROWSER ←——————— "63.245.215.20" ———————————————————  DNS SERVER
```

### Precise model: URL ≠ server

A URL is the **address instruction**. The server is the **machine at that address**. They are different things with different roles.

**Sticky summary (Chunk 2):**
> A URL is not just an address — it's a three-part instruction. Scheme = how to communicate. Domain = which machine. Path = which resource on that machine. The domain must be translated to an IP address via DNS before the browser can contact the server.

---

## 5. The Three-Layer Protocol Stack — TCP, TLS, and HTTP

This is the section where the session sharpened the learner's most significant correction: confusing what each protocol does.

### The problem with describing them in isolation

It is tempting to describe TCP, TLS, and HTTP as doing "different jobs." That is true but incomplete. The critical relationship is **layering** — they operate on top of each other, and one must exist before the next can function.

### The three protocols, precisely

| Protocol | What it is | What it does | What it does NOT do |
|---|---|---|---|
| **TCP** — Transmission Control Protocol | Lower-level protocol | Ensures data arrives **reliably and in order** — no missing pieces, no corruption, with confirmation that each piece arrived | Does not encrypt; does not define request/response structure |
| **TLS** — Transport Layer Security | Encryption layer (added when HTTPS is used) | Ensures data arrives **encrypted** — nobody intercepting it can read it | Does not handle reliability; does not define conversation rules |
| **HTTP** — HyperText Transfer Protocol | Application-level protocol | Defines the **structure and rules** of the request/response conversation — what a request looks like, what a response looks like, what the status codes mean | Does not handle connection reliability or encryption directly |

### The layering relationship

```
HTTP  ← conversation rules
  │
  │  rides on top of
  ▼
TCP   ← reliable connection
  │
  │  TLS layer added here (if HTTPS)
  ▼
Physical connection to server
```

**TCP must exist before HTTP can operate. HTTP rides on top of TCP.** You cannot have the HTTP conversation without the TCP connection being established first.

### The analogy that locks it in

> **TCP** is the postal service guaranteeing your letter arrives intact and in sequence — not that nobody can read it.
> **TLS** is the envelope that seals the letter so only the recipient can read it.
> **HTTP** is the language the letter is written in.

The postal service (TCP) gets the letter there reliably. The sealed envelope (TLS) keeps it private. The language (HTTP) determines the content and structure of the message.

### The TCP handshake

Establishing a TCP connection involves a short handshake — three messages exchanged between client and server to confirm both sides are ready:

```
CLIENT ———— SYN ————→ SERVER        "I want to connect"
CLIENT ←—— SYN-ACK —— SERVER        "Acknowledged, ready"
CLIENT ———— ACK ————→ SERVER        "Connection established"
```

After this, if the site uses HTTPS, a **TLS handshake** follows to establish encryption.

**Sticky summary (Chunk 1/3):**
> TCP is the reliable connection underneath. TLS is the encryption layer on top of it (only if HTTPS). HTTP is the conversation protocol that rides on top of both. You cannot have the HTTP conversation until the TCP connection exists.

---

## 6. The Seven-Step Pipeline — From Keypress to Document

This is the core sequence of A1. Each step triggers the next. A1's job ends when the document arrives; everything after that is A2 onward.

```
USER TYPES URL + PRESSES ENTER
            │
            ▼
┌─────────────────────────┐
│   1. URL PARSED          │  Browser extracts scheme, domain, path
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   2. DNS LOOKUP          │  Domain → IP address
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   3. TCP CONNECTION      │  Reliable connection established
│      (+ TLS if HTTPS)   │  Encryption layer added if secure
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   4. HTTP REQUEST        │  Browser sends GET + path + headers
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   5. HTTP RESPONSE       │  Server returns status + headers + body
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   6. SECONDARY REQUESTS  │  CSS, JS, images each trigger new HTTP GETs
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   7. PARSING BEGINS      │  Browser reads raw text → builds DOM (A2)
└─────────────────────────┘
```

### Steps 1–3: Reaching the server

- **Step 1 — URL Parsed.** The browser reads the scheme, domain, and path. It knows which protocol to use, which machine to contact, and which resource to ask for.
- **Step 2 — DNS Lookup.** The browser contacts a DNS server and gets the IP address for the domain. Without this, it cannot connect — domain names are for humans; IP addresses are for machines.
- **Step 3 — TCP Connection (+ TLS if HTTPS).** The browser establishes a reliable connection to the server. If the scheme is `https`, a TLS handshake adds encryption. This must complete before any HTTP conversation begins.

### Steps 4–5: The HTTP conversation

- **Step 4 — HTTP Request.** The browser sends a structured text message containing the method (`GET`), the path, and headers (metadata about the request: browser type, accepted formats, language).
- **Step 5 — HTTP Response.** The server finds the resource and sends back a structured response containing a status code, headers, and a body.

### Steps 6–7: What happens next

- **Step 6 — Secondary Requests.** The browser encounters references to external files (CSS, JavaScript, images) inside the HTML and fires a **new HTTP GET request for each one**. (Full details in Section 7.)
- **Step 7 — Parsing Begins.** The browser begins reading the raw HTML text and converting it into a structured internal representation (the DOM). **This is A2's territory.** A1 ends the moment the document arrives.

**Sticky summary (Chunk 3):**
> The pipeline is: URL parsed → DNS lookup → TCP connection (+ TLS if HTTPS) → HTTP GET request → HTTP response → secondary requests for CSS/JS/images → parsing begins. Each step is a cause that enables the next.

---

## 7. Request Anatomy and Response Anatomy

### The HTTP request

An HTTP request is a **structured text message**. It contains:

| Part | What it is | Example |
|---|---|---|
| **Method** | What kind of action is requested. For loading a page, this is always `GET` ("give me this resource"). | `GET` |
| **Path** | Which resource is being requested. | `/en-US/docs/Web/HTTP` |
| **Headers** | Metadata about the request — browser type, accepted formats, language, etc. | `Accept: text/html` |

A simplified HTTP request:

```
GET /en-US/docs/Web/HTTP HTTP/1.1
Host: developer.mozilla.org
Accept: text/html
```

Plain text. Structured. Rule-governed. That is HTTP.

### The HTTP response

A response always carries **three things**:

| Part | What it tells the browser |
|---|---|
| **Status code** | Did the request succeed? What happened? |
| **Headers** | Metadata about the response — content type, length, caching rules |
| **Body** | The actual payload — the raw HTML text (or an error page, or other content) |

A simplified HTTP response:

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 48212

<!DOCTYPE html>
<html>
  ...
</html>
```

### Status codes — what happened

| Code | Meaning |
|---|---|
| `200 OK` | Resource found, here it is |
| `301 Moved Permanently` | Resource lives at a new URL |
| `404 Not Found` | Resource doesn't exist |
| `500 Internal Server Error` | Server failed trying to respond |

### The critical distinction: "communication succeeded" ≠ "resource delivered"

A `404` or `500` is still a **completed HTTP response** — the communication succeeded, but the resource was not delivered. Those are different failures at different levels:

- A failed TCP connection = the communication itself broke down (you never reach the server).
- A `404` response = the communication succeeded perfectly; the server simply doesn't have what you asked for.
- A `200` response = the communication succeeded AND the resource was delivered.

**Sticky summary (Chunk 3/5):**
> A response is not just "the page arriving." It is a structured message with a status code (did it work?), headers (metadata), and a body (the content). "Communication successful" and "resource delivered" are not the same thing — a 404 is still a complete response.

---

## 8. Secondary Requests and What the Browser Actually Receives

### First principle

When the HTTP response arrives, the browser receives a **raw text document**. Not pixels. Not a layout. Not a visual of any kind. Just text — structured according to HTML rules — that the browser will now process.

This is the single most important insight of A1. Everything visual, structural, and interactive is built **by the browser itself** from that text. The network only delivers text.

### A real example of what arrives

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hello</h1>
    <p>This is a paragraph.</p>
    <script src="app.js"></script>
  </body>
</html>
```

This is the **entire payload** the network delivers. The browser receives this as a stream of bytes, decodes it into characters, and begins reading it top to bottom.

### Secondary requests: the cascade

Notice that the HTML document references other files:

```html
<link rel="stylesheet" href="styles.css">
<script src="app.js"></script>
```

The browser has not received those files yet. The HTML document only told it they *exist*. When the browser encounters a reference to an external resource — a CSS file, a JavaScript file, an image — it **fires a new HTTP request for each one.**

```
Browser receives HTML
        │
        ├── finds <link href="styles.css">  ——→ new HTTP GET request
        ├── finds <script src="app.js">     ——→ new HTTP GET request
        └── finds <img src="photo.jpg">     ——→ new HTTP GET request
```

Each of those returns its own HTTP response. The browser collects all of it before it can fully construct and render the page. This is why complex pages with many assets take longer to load — each resource is a round trip through the full pipeline.

### Counting total requests

If a page's HTML references **one CSS file**, **two JavaScript files**, and **three images**, the total count is:

| Request | Type |
|---|---|
| 1 | Initial HTML document |
| 2 | CSS file |
| 3 | JS file #1 |
| 4 | JS file #2 |
| 5 | Image #1 |
| 6 | Image #2 |
| 7 | Image #3 |

**Total: 7 HTTP requests.** The initial HTML document counts as one; each referenced file adds one. Every referenced resource is a separate round trip.

**Sticky summary (Chunk 4):**
> The browser receives raw HTML text — a stream of characters. That text may reference other files. Each referenced file triggers a new HTTP request. The browser collects all resources before it can render anything visual. The browser never receives a visual page — it receives raw text and builds everything itself.

---

## 9. Connections Between Concepts

```
Protocol problem (Chunk 1)
      │ shared rules are necessary for machine communication
      ▼
Client / Server (Chunk 1)
      │ client initiates, server reacts; asymmetry is fundamental
      ▼
URL structure (Chunk 2)
      │ scheme = protocol, domain = machine, path = resource
      ▼
DNS (Chunk 2)
      │ human-readable name → machine-readable IP address
      ▼
TCP / TLS / HTTP stack (Chunk 3)
      │ reliability → encryption → conversation rules; layered dependency
      ▼
HTTP Request (Chunk 3)
      │ method (GET) + path + headers
      ▼
HTTP Response (Chunk 3)
      │ status code + headers + body (raw HTML text)
      ▼
Secondary Requests (Chunk 4)
      │ each referenced file (CSS/JS/img) triggers a new HTTP GET
      ▼
Parsing begins → A2 (HTML Parsing and DOM Construction)
```

**Deliberate cross-references the session makes:**

- **The library/reader analogy** (Chunk 1) reappears in the deliverable narration (Chunk 5) — the learner carries the mental model through the full pipeline.
- **"Communication successful" ≠ "resource delivered"** — the session repeatedly distinguishes between a completed TCP connection, a completed HTTP exchange, and a successful resource delivery. These are three different things at three different levels.
- **Pre-Check Q2 (server = address) → Chunk 2 (URL = address instruction, server = machine at that address)** — the session identifies and corrects this confusion explicitly in the Pre-Check scoring, then teaches the correct model in Chunk 2.

---

## 10. Recurring Mistakes and Precision Traps

These are the patterns this session deliberately sharpened. They form the diagnostic layer of the lesson.

### 1. The client-server inversion

**The trap:** saying "the client responds to the request" or "the server initiates the connection."
**The correct model:** the client (browser) **initiates** every request. The server (remote machine) **only reacts** — it never initiates. The arrow is always: CLIENT → request → SERVER, SERVER → response → CLIENT.
**Recognition rule:** if you ever describe the server as "sending first" or the client as "responding," the roles are swapped.

### 2. TCP = security (the most significant correction in this session)

**The trap:** describing TCP as establishing a "secure connection" or equating TCP with encryption.
**The correct model:**
- **TCP** = reliability. Data arrives in order, without corruption, with confirmation of delivery. No encryption.
- **TLS** = encryption. Data is unreadable to anyone intercepting it. Added only when the scheme is `https`.
- **HTTP** = conversation rules. Defines what requests and responses look like.

TCP's concern is *reliability*, not privacy. TCP must exist before HTTP can operate — HTTP rides on top of TCP. TLS is a separate layer added between TCP and HTTP when encryption is needed.
**Recognition rule:** the moment the word "secure" or "encrypted" appears in a description of TCP, the protocols are confused. TCP = postal service (gets it there reliably). TLS = sealed envelope (keeps it private). HTTP = language (defines the message).

### 3. The server-as-address misconception

**The trap:** describing a server as "the home address of the page" or equating the URL with the server.
**The correct model:** the URL is the **instruction** (scheme + domain + path). The server is the **machine** at the address the domain resolves to. The URL is the address; the server is the building at that address.
**Recognition rule:** URL = instruction/address. Server = machine/building. They are different things.

### 4. "Communication successful" = "resource delivered"

**The trap:** assuming that if the HTTP request/response cycle completes, the resource was successfully delivered.
**The correct model:** a `404 Not Found` and a `500 Internal Server Error` are **completed HTTP responses** — the communication succeeded perfectly, but the resource was not delivered (or the server failed internally). "Communication succeeded" and "resource delivered" are different statements at different levels.
**Recognition rule:** always distinguish between the communication channel (did the request reach the server and get a response?) and the resource outcome (was the resource actually found and returned?).

### 5. Naming and function dissociation

**The trap:** knowing what an acronym stands for but not being able to describe what the thing *does*. (The learner's Pre-Check Q4: knew HTTP = "Hypertext Transfer Protocol" but had no understanding of its function.)
**The correct model:** an acronym is only useful if you can connect it to a mechanism. HTTP is not just a name — it is the ruleset that defines how browsers ask for documents and servers respond.
**Recognition rule:** if you can state the full name but not the function, you have a surface-level label, not understanding.

### 6. Imprecise mechanism, correct instinct

**The trap:** getting the right conclusion but stating the mechanism imprecisely or partially — e.g., the deliverable's HTTP response description was "the communication is successful" rather than specifying status code + headers + body.
**The correct model:** the instinct (the pipeline sequence, the direction of data flow) is usually right. The mechanism (what specifically is in a response, what each protocol does) needs the full, precise formulation. The correction sessions exist to close this gap.
**Recognition rule:** when you get the right answer but the explanation feels vague, you are in this pattern. Sharpen the *what specifically* and *how exactly*.

---

## 11. Problem-Solving Patterns — How to Narrate the Pipeline

Every Quick-Check in the session was a pipeline trace. The unified method that emerges:

1. **Start with the trigger.** The user types a URL and presses Enter. This is always step 0.

2. **Follow the pipeline in order.** Each step enables the next. DNS must happen before TCP. TCP must happen before HTTP. The browser cannot skip a step or reorder them.

3. **Name each protocol's role precisely.** TCP = reliability. TLS = encryption (HTTPS only). HTTP = conversation rules. Do not conflate them.

4. **Count accurately.** When asked for the number of HTTP requests, remember that the initial HTML document itself is one request. Every referenced external file (CSS, JS, images) adds one. Count the initial document first, then each reference.

5. **Distinguish the levels.** A completed TCP connection ≠ a completed HTTP exchange ≠ a successful resource delivery. Each level can succeed or fail independently.

6. **State what arrives, not what you imagine arrives.** The browser receives raw HTML text — a stream of characters. Not a visual page. Not pixels. The browser builds everything visual itself from that text.

Applied examples from the session:

- **Pre-Check Q2 trace:** the learner said a server "acts as the home address" → corrected: the URL is the address; the server is the machine at that address.
- **Quick-Check 3a trace:** the learner said TCP establishes a "secure connection" → corrected: TCP = reliability, TLS = encryption, HTTP = conversation rules — three separate layers.
- **Quick-Check 4 trace:** 1 CSS + 2 JS + 3 images = 6 secondary requests + 1 initial HTML = 7 total — the learner's self-correction ("seven if counting the html doc original request") showed good pipeline tracking.

---

## 12. The Pushback Case — When the Learner's Instinct Was Right

Part of the session's teaching is the evaluation itself, and this moment is worth preserving.

**Quick-Check 4:** the learner initially said "6 HTTP requests" and immediately self-corrected to "seven if counting the html doc original request." The tutor accepted the corrected answer as perfect — the self-correction demonstrated active pipeline tracking, not confusion.

**The deliverable narration:** the learner's HTTP response description was marked **Partial** — it said "the communication is successful" without specifying status code, headers, and body. But the sequence was correct, the terminology was used, and the gap was narrow (a missing detail, not a wrong model). The correction session closed it by supplying the full response anatomy.

**Lesson for the learner:** the correction sessions target precision of expression as well as correctness of reasoning. A Partial mark does not mean you are wrong — it means the explanation needs one more layer of specificity to be complete. The gap was closed in-session, and the deliverable was upgraded to **Passed**.

---

## 13. Session State and Carry-Forward Items

### Where A1 currently stands

```
A1: How the Web Delivers a Page
│
├── ✅ Pre-Check
├── ✅ Chunk 1 — The protocol problem + client/server roles
├── ✅ Chunk 2 — URL structure (scheme, domain, path) + DNS
├── ✅ Chunk 3 — The seven-step pipeline + TCP/TLS/HTTP stack
├── ✅ Chunk 4 — What the browser receives + secondary requests
├── ✅ Chunk 5 — Full picture assembly
└── ✅ Deliverable — Narration passed (minor gap on response anatomy, closed in-session)
```

A1 is **COMPLETE**. Structural integrity: stable. Deliverable: passed with one minor gap (response anatomy missing status code and body) — closed in-session.

### Gate status

```
Nano Gate (after A3): LOCKED — A2, A3 not yet complete
Micro Gate (after A5): LOCKED — A2–A5 not yet complete
```

### Parallel track

Module D (JavaScript) is being taught in separate sessions. D1 is in progress.

### Topic stack (carry-forward from prior modules — still open)

1. **D4 DOM Manipulation** — revisit void element `.offsetWidth` (deferred from the C8 performance section).
2. `tokens.css` — fix font name typo: `"JetBrain Mono"` → `"JetBrains Mono"`.
3. `tokens.css` — consider renaming `--blue-*` → `--brand-*` for naming consistency.
4. `tokens.css` — resolve the green scale convention issue.

### Recurring correction flags that must stay monitored in Module A

1. Pipeline stage ordering — understanding which stage does what and in what order.
2. Protocol role confusion — TCP vs TLS vs HTTP, particularly the TCP-not-encryption distinction.
3. Response anatomy completeness — status code + headers + body, not just "the page arrives."

### Known strengths to keep using

- Good instinct on pipeline sequencing — the learner consistently gets the order right.
- Self-correction behaviour — the learner catches and fixes imprecision before being prompted.
- Analogy retention — the library/reader model carried through the entire session correctly.

---

## 14. Quick Reference

### The seven-step pipeline

```
1. URL parsed        → scheme (protocol), domain (machine), path (resource)
2. DNS lookup        → domain translated to IP address
3. TCP connection    → reliable connection established (in-order, no corruption)
   + TLS (HTTPS)     → encryption layer added
4. HTTP GET request  → method + path + headers
5. HTTP response     → status code + headers + body (raw HTML text)
6. Secondary requests → CSS, JS, images each fire new HTTP GETs
7. Parsing begins    → browser reads raw text → builds DOM (A2 territory)
```

### Protocol stack

| Protocol | Job | Analogy |
|---|---|---|
| **TCP** | Reliable data delivery (in order, no corruption) | Postal service |
| **TLS** | Encryption (HTTPS only) | Sealed envelope |
| **HTTP** | Request/response conversation rules | Language of the letter |

TCP exists before HTTP. HTTP rides on top of TCP. TLS is added between them for HTTPS.

### URL anatomy

```
https://developer.mozilla.org/en-US/docs/Web/HTTP
  │                        │                          │
SCHEME                  DOMAIN                      PATH
(protocol)          (which machine)          (which resource)
```

Domain must be translated to an IP address via DNS before the browser can connect.

### Request anatomy

| Part | Purpose |
|---|---|
| Method (`GET`) | What action is requested |
| Path | Which resource on the server |
| Headers | Metadata (browser type, accepted formats, language) |

### Response anatomy

| Part | Purpose |
|---|---|
| Status code | Did the request succeed? (200, 301, 404, 500) |
| Headers | Metadata about the response (content type, length, caching) |
| Body | The actual content (raw HTML text, or error page) |

### Status codes

| Code | Meaning |
|---|---|
| `200 OK` | Resource found, delivered |
| `301 Moved Permanently` | Resource lives at a new URL |
| `404 Not Found` | Resource doesn't exist on this server |
| `500 Internal Server Error` | Server failed while trying to respond |

### Key distinction

- "Communication succeeded" and "resource delivered" are **not the same thing**. A 404 is a complete HTTP response — the communication worked, the resource wasn't found.

### Counting HTTP requests

Total requests = 1 (initial HTML document) + N (each referenced CSS, JS, and image file).

### Mental-model phrases worth keeping

- "HTTP is a protocol — a shared ruleset. Without this shared agreement, no communication is possible."
- "A URL is a three-part instruction: scheme = how, domain = which machine, path = which resource."
- "DNS is the web's phone book: you look up a name, it gives you a number."
- "TCP is the postal service. TLS is the sealed envelope. HTTP is the language."
- "The browser never receives a visual page. It receives raw text and builds everything itself."
- "Communication succeeded and resource delivered are different things at different levels."
- "The client always speaks first. The server never initiates."

---

## 15. Mastery Checklist

Based only on what the A1 session established, the learner should now be able to:

- **Explain** why protocols exist — two machines need shared rules to communicate — and identify HTTP as the web's protocol.
- **Name** Tim Berners-Lee as the inventor of HTTP and the web, and describe the core idea: documents that contain links to other documents.
- **Distinguish** the client (browser, initiates) from the server (remote machine, responds) and **state** the directionality of the relationship.
- **Break down** a URL into its three parts — scheme, domain, path — and **explain** what each part tells the browser.
- **Describe** DNS as the system that translates human-readable domain names into machine-readable IP addresses.
- **Distinguish** TCP (reliability), TLS (encryption), and HTTP (conversation rules) from each other and **state** their layering relationship (TCP before HTTP, TLS added for HTTPS).
- **Trace** the seven-step pipeline from keypress to document arrival in the correct order.
- **Describe** the anatomy of an HTTP request — method (`GET`), path, headers.
- **Describe** the anatomy of an HTTP response — status code, headers, body.
- **List** the four status codes taught (200, 301, 404, 500) and **explain** what each one means.
- **Explain** why "communication succeeded" and "resource delivered" are different things — a 404 is a complete response.
- **Describe** what the browser actually receives: raw HTML text, not a visual page.
- **Explain** secondary requests: each referenced CSS, JS, or image file triggers a new HTTP GET.
- **Count** total HTTP requests for a given page, including the initial HTML document.
- **Narrate** the complete pipeline from keypress to document arrival as a continuous, connected sequence — the A1 deliverable.
