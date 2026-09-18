# A2 — HTML Parsing and DOM Construction

**Module A — The Browser as the Foundation**
**Master Guide · Reconstructed from the A2 tutoring session**

---

## 1. What This Session Was Building

This session is the second section of **Module A (Browser Foundations)** of the Frontend Core Mastery syllabus. A1 traced the journey from keypress to raw HTML text arriving in the browser. A2 picks up at exactly that point: the browser has the raw text — now what does it do with it?

Where A2 sits:

```
Module A — The Browser as the Foundation
  [A1] How the Web Delivers a Page                 ✅ COMPLETE
  ▸ A2 (this session) → A3 CSS Parsing & CSSOM
                        → A4 JavaScript Execution Basics
                        → A5 The Rendering Pipeline

Module B — HTML Structure           ✅ COMPLETE
Module C — CSS Mastery              ✅ COMPLETE
Module D — JavaScript               ▸ Running in parallel sessions (D-track)
Module E — Tooling & Product        🔒 LOCKED
```

**Builds on:** A1 (HTTP delivery — raw HTML text received as the response body).
**Leads into:** A3 (CSS Parsing and CSSOM — the browser does for stylesheets what it just did for HTML).

### Session objectives

By the end of A2 the learner should be able to:

1. Explain step-by-step how the browser reads and parses raw HTML into a structured tree.
2. Describe what the DOM is, what it contains, and why it exists.
3. Explain what happens when the parser encounters a blocking resource mid-parse.

### The deliverable

Describe the full parsing-to-DOM pipeline in your own words, including what the parser does, what the DOM is, and what can interrupt the process.

### How mastery is measured here

- A2 has **no standalone gate**. Mastery is evaluated cumulatively at the **Nano Gate** (which covers A1 + A2 + A3 together), then the Micro Gate after A5.
- Consequence: **A2 must be structurally solid before A3 is taught**, because A3 builds directly on the DOM and parsing model established here.

### Standing session rules (persist from previous modules)

- **Correction sessions are mandatory after every answer** — imprecise reasoning gets rewritten into technically precise form, every time, no exceptions.
- Remediated passes are accepted as normal progression.
- **Algorithimics_Site** is the applied project layer alongside the module curriculum; examples throughout reference it where relevant.

---

## 2. The Learning System — How This Session Teaches

This is not a lecture dump. The session runs a fixed loop, and understanding the loop is itself part of the learning:

1. **First Principle** — every topic opens by answering *why the concept exists* before any terminology is shown. The raw character stream problem, the need for a programmable representation, the safety concern behind parser blocking — each is established before the mechanism.
2. **Mental Model** — a concrete picture of what the parser, the DOM, and the browser *do*, not just definitions.
3. **Concrete Example** — real HTML snippets, real tree diagrams, real API method names immediately follow the abstract idea.
4. **Trace the Mechanism** — the session walks through what happens step by step (parser reads characters, creates nodes, tracks position, builds tree concurrently).
5. **Sticky Summary** — each chunk ends with a compressed, memorable formulation worth keeping.
6. **Quick-Check** — the learner answers; the questions deliberately target the distinctions that matter most.
7. **Correction Session** — every answer (even adequate ones) is audited, and imprecise wording is rewritten into technically precise form. This is the engine of the whole system.
8. **Cross-concept reinforcement** — later chunks deliberately reuse earlier material (the Q3 "tags as labels" misconception resurfaces in Chunk 1's `<strong>` correction; the Q5 script-blocking gap is closed with full precision in Chunk 3).

The session's recurring diagnostic about this learner: **correct instincts, imprecise mechanism**. The conclusions and sequencing are usually right; the *why* statement needs sharpening. The correction sessions exist to close that gap, and the learner is explicitly encouraged to challenge the evaluation when it feels wrong.

---

## 3. The Core Mental Model — What the Parser Does With Raw Text

### The one-sentence model

> The browser receives the HTML body as a plain text stream. The parser reads it top to bottom, creating element nodes from tags and text nodes from text, building the DOM tree concurrently as it parses.

### The problem parsing exists to solve

After A1, the browser has one thing: a long string of characters. Something like:

```
<!DOCTYPE html><html><head><title>Hello</title></head><body><h1>World</h1></body></html>
```

That string has no structure. No hierarchy. No objects. Just characters in a sequence. **The browser cannot render characters. It needs objects** — things it can measure, style, position, and manipulate.

The parser's job is to read that character stream and convert it into a tree of objects. This is not a luxury — without it, nothing visual can happen.

### How it works — the mental model

Think of the parser as a reader moving left to right across the text, one character at a time. As it reads, it does two things simultaneously:

**1. It recognises tokens.**
When it sees `<`, it knows a tag is opening. When it sees `>`, the tag closes. Everything between is the tag name or its attributes. These meaningful units are called **tokens**.

**2. It builds nodes from tokens.**
Each token becomes a **node** — an object in memory with properties. An opening tag becomes an element node. Text content becomes a text node. The `<!DOCTYPE>` declaration becomes a document type node.

### The tree emerges from nesting

This is where the pre-check Q3 misconception ("tags are metadata of the text") gets corrected precisely.

Tags don't label text. They **establish relationships**.

When the parser sees:

```html
<section>
  <p>Hello</p>
</section>
```

It doesn't think: *"this text is section-flavoured."*

It thinks: *"create a section node. Now create a p node. Make p a child of section. Now create a text node 'Hello'. Make it a child of p. Section tag closed — move back up."*

The parser is always tracking **where it is in the tree** — moving down when it opens a tag, moving back up when it closes one. Nesting in HTML isn't decoration or labelling. **It is the instruction set for building the tree.** Position in the source code determines position in the tree.

### Parsing and DOM construction are concurrent, not sequential

This is the most important structural fact about the process and the most significant correction in the deliverable.

The DOM is not built *after* parsing — it is built *during* parsing. Every time the parser creates a node, it is immediately attached to the growing tree. By the time the parser finishes the last character, the DOM is already fully constructed. They are one continuous process, not two separate phases.

> The parser does not first read the entire HTML and then assemble a tree. It builds the tree *as it reads*.

**Sticky summary (Chunk 1):**
> The parser reads HTML as a character stream, converts it into tokens, and builds each token into a node. Nesting determines parent-child relationships in the tree, not labelling or description. Parsing and DOM construction happen concurrently — the tree grows as the parser reads.

---

## 4. Quick-Check — Chunk 1 (Node Counting and `<strong>`)

### The exercise

Given this HTML:

```html
<article>
  <h2>Title</h2>
  <p>Some <strong>bold</strong> text.</p>
</article>
```

Describe in words: what nodes exist, and what is the parent-child relationship between them? Name every node you can identify, including text nodes.

### The learner's answer (and what it revealed)

The learner said: four nodes exist, `<article>` is the overarching parent with two direct children, and `<strong>` exists as a "modifier node" that won't create a new branch.

Two errors emerged — both are high-value teaching moments.

### Error 1 — Text nodes are real nodes

The node count is **8 nodes minimum**, not 4:

- `<article>` → element node
- `<h2>` → element node
- `"Title"` → text node
- `<p>` → element node
- `<strong>` → element node
- `"bold"` → text node
- `"Some "` → text node
- `" text."` → text node

Every discrete run of text — including plain text sitting alongside `<strong>` inside the `<p>` — creates a text node. Text nodes are real nodes. The parser does not skip them.

### Error 2 — `<strong>` absolutely creates a branch

The learner said `<strong>` is a "modifier node" that won't create a new branch. This is the Q3 pre-check misconception re-appearing: tags as descriptions rather than structural instructions.

The parser doesn't know or care what `<strong>` *means* visually. It sees an opening tag, so it creates an element node and moves down into it. `<strong>` becomes a child of `<p>`, and `"bold"` becomes a child of `<strong>`. That is a branch. Every element tag — regardless of its visual role — creates a node with its own place in the tree.

**The DOM has no concept of "modifier." It only has nodes and relationships.**

### The corrected tree

```
article
├── h2
│   └── "Title"
└── p
    ├── "Some "
    ├── strong
    │   └── "bold"
    └── " text."
```

### The precise restatement the session established

> The parser has no concept of visual role or semantic weight at the node-creation stage. Every opening tag — regardless of whether it appears decorative or structural — causes the parser to create a new element node and descend into it. `<strong>` becomes a child of `<p>` not because of what it means visually, but because it was opened while the parser's current position was inside `<p>`. **Position in the source determines position in the tree.**

**Sticky summary (Chunk 1 correction):**
> Every opening tag creates an element node and opens a new branch. Every run of text creates a text node. The DOM captures all of it — there is no such thing as a "modifier node" at the parsing level.

---

## 5. What the DOM Actually Is

### First principle

The parser doesn't just build a tree and discard it. The tree it builds is stored in memory as a **live, programmable object**. That object is the **DOM — the Document Object Model**.

The word "model" is doing real work here. It is a *representation* of the document — not the HTML text, not the visual page, but a structured object that the browser and JavaScript can both read and manipulate. "Model" does real work: it is an abstraction that enables interaction.

### Three things the DOM is

**1. It is a tree of nodes.**
Every element, every text run, even HTML comments — all become nodes with parent-child relationships. You already have this from Chunk 1.

**2. It is live.**
The DOM exists in memory and can change at any time. JavaScript can add nodes, remove nodes, change attributes. When the DOM changes, the browser responds — it doesn't re-parse the HTML. The HTML source stays the same. The DOM is its own living thing.

**3. It is an API.**
The DOM exposes methods and properties that JavaScript uses to interact with the page. `document.querySelector()`, `element.textContent`, `node.appendChild()` — these are all DOM API calls. The DOM is the interface between your code and what appears on screen. JavaScript does not "fetch" the DOM — it *accesses* and *manipulates* an object that is already in memory.

### An analogy

Think of a **blueprint** (your HTML) and the **actual constructed building** (the DOM).

The blueprint is static — it doesn't change when you repaint a wall. The building is live — you can renovate it, add rooms, knock down walls. Once the building exists, the blueprint becomes largely irrelevant to what's happening inside.

**JavaScript works on the building, not the blueprint.**

Once parsing completes, HTML source and DOM are two separate things that diverge. The blueprint and the building share an origin but are no longer the same object.

### What the DOM contains

The DOM is not just the `<body>`. The full DOM tree starts at the **document node** — a single root that sits above even `<html>`:

```
document
└── html
    ├── head
    │   └── title
    │       └── "Hello"
    └── body
        └── h1
            └── "World"
```

`<head>`, `<title>`, `<meta>` tags — all of it is in the DOM. The document node is the root of everything.

### Live vs. source — the separation that matters

If you open DevTools, find an element, and delete it — you've changed the DOM. The HTML file on the server is unchanged. The DOM can be modified by JavaScript, by the browser itself, even by DevTools. None of those changes touch the source file.

> The HTML source and the DOM are two separate things from the moment parsing completes. They start from the same text, but they immediately diverge — the DOM can be modified by JavaScript, by the browser itself, even by DevTools. None of those changes touch the source file. They are not the same object.

This matters in Module D when JavaScript starts manipulating the DOM directly. That separation must be instinctive.

**Sticky summary (Chunk 2):**
> The DOM is a live, in-memory tree of nodes built from parsed HTML. It is not the HTML file. It is not the visual page. It is a programmable object — the browser and JavaScript both use it to read and change the document. Once parsing completes, the HTML source and the DOM are separate things that diverge.

---

## 6. Quick-Check — Chunk 2 (DOM Independence and Scope)

### Q1. If you open DevTools, find an element, and delete it — you've changed the DOM. The HTML file on the server is unchanged. What does this tell you about the relationship between the HTML source and the DOM?

**Learner's answer:** The HTML file is static and updated from the server. The DOM is dynamic and entirely on the browser. Every time the browser reloads it is reconstructed, and it changes does not affect the server.

**Assessment: Adequate.** The key point is explicit: the DOM is separate from the source, and changes to the DOM do not propagate back to the server file. One addition made precise: the HTML source and the DOM are two separate things *from the moment parsing completes*. They start from the same text but immediately diverge.

### Q2. Someone says: "The DOM is just the body content of the page." What is wrong with that statement?

**Learner's answer:** To say it is 'just' the body content is fundamentally wrong because it fails to capture the reality as a model/tree of nodes the browser can now directly work with. It relegates it to the level from which it was intentionally transformed.

**Assessment: Particularly strong.** "Relegates it to the level from which it was intentionally transformed" captures exactly right — the whole point of parsing is the transformation. Calling the DOM "body content" collapses that transformation and loses everything meaningful about what the DOM *is*.

---

## 7. What Can Stop the Parser — Parser Blocking

### First principle

The parser moves through the HTML character stream in order, top to bottom. Under normal conditions it keeps moving until the document is fully parsed.

But certain resources it encounters **force it to stop**. This is called **parser blocking** — and understanding it is essential to understanding both performance and behaviour in the browser.

### The primary blocker: `<script>` without `defer` or `async`

When the parser hits a `<script>` tag, it stops completely.

Why? Because JavaScript can *modify the HTML being parsed* — it can call `document.write()` and inject new markup mid-stream. The parser cannot safely continue without knowing what the script will do. So it halts, fetches the script if it's external, executes it fully, and only then resumes.

This was the pre-check Q5 correction: the key fact is not just "a new HTTP request" — **the parser stops and waits**. The fetch *and* the execution must complete before parsing continues.

```html
<head>
  <script src="heavy.js"></script>
  <!-- parser is frozen here until heavy.js is fetched AND executed -->
  <link rel="stylesheet" href="styles.css">
</head>
```

`styles.css` won't even begin to be requested until `heavy.js` is done.

**Script blocking applies anywhere in the document** — not just `<head>`. Head placement makes the block most damaging because it halts the parser before the body has been parsed, but the mechanism triggers wherever a `<script>` tag without `defer` or `async` appears.

### The secondary factor: `<link rel="stylesheet">`

CSS does not block the *parser* directly — but it blocks *rendering* and can block script execution. Since scripts might query computed styles, the browser won't run a script if a stylesheet is still loading. This creates an indirect chain: **stylesheet → blocks script → blocks parser**.

Stylesheets and scripts are not equivalent parser blockers. Grouping them together loses an important mechanical distinction.

### Why this design exists

The browser had to make a choice: either parse speculatively and risk being wrong, or pause and be certain. For scripts, it chose certainty — because a script that rewrites the DOM mid-parse would make the partial tree invalid.

The cost of that safety is performance. A large script with no `defer` or `async` delays everything below it.

### The two solutions

| Attribute | Behaviour |
|---|---|
| `defer` | Script fetched in **parallel with parsing**, executed **after** parsing completes |
| `async` | Script fetched in **parallel with parsing**, executed **as soon as it arrives** (still blocks briefly) |

Both allow the parser to keep moving during the fetch. `defer` is the safer default for most scripts because execution order is preserved.

### The relationship between bottom-placement and defer

Moving a `<script>` tag to the end of `<body>` **relocates** the parser block to a point after the full DOM is already built — it does not eliminate blocking. The parser still halts when it reaches the script tag, fetches the external file, executes it, and only then finishes.

**Bottom placement controls where the parser pauses. `defer` controls when the script executes relative to the DOM being ready.**

| Scenario | What happens |
|---|---|
| Script in `<head>`, no defer | `parse <head>` → STOP → fetch + execute → resume → `parse <body>` — entire body held hostage |
| Script at end of `<body>`, no defer | `parse <head>` → `parse <body>` → build full DOM → STOP → fetch + execute — DOM already complete, page visible |
| Script at end of `<body>` with defer | Fetch starts **in parallel with parsing** (arrives sooner); execution still held until parsing completes |

With a script at the bottom of `<body>` and no `defer`: if the fetch is slow, the user has a fully parsed page sitting idle while the script loads. `defer` additionally starts the fetch earlier — in parallel with parsing — so the script arrives sooner. They solve related but distinct problems.

> Moving a script to the bottom of `<body>` doesn't remove blocking — it defers the block to a point where the DOM is already complete. `defer` adds something placement alone cannot: the fetch starts in parallel with parsing (the script arrives sooner). The practical effect is that the page appears to load faster because content is rendered before the script runs.

### The cooking analogy (extended from the learner's Q2 pre-check answer)

The parser is chopping ingredients in sequence — mise en place on the counter (that mise en place is the DOM). A `<script>` tag is like discovering mid-prep that you need a specific tool from a shop across town. You stop everything, go get it, use it, come back — then continue chopping. `defer` is like ordering the tool for delivery while you keep working, and only picking it up when prep is done.

**Sticky summary (Chunk 3):**
> When the parser encounters a `<script>` tag without `defer` or `async`, it stops completely — fetches the script, executes it, then resumes. This is parser blocking. It exists because JavaScript can modify the document mid-parse. `defer` and `async` allow the fetch to happen in parallel, reducing the block. Bottom placement relocates the block to a less harmful point but does not eliminate it.

---

## 8. Quick-Check — Chunk 3 (Script Placement)

### Q1. A developer places `<script src="app.js"></script>` in `<head>`, no defer/async. What happens to the HTML below it while `app.js` is fetched and executed?

**Learner's answer:** The HTML parsing pauses.

**Assessment: Correct.** The parser halts. The HTML below the script tag is not parsed, not built into the DOM, not available to anything — until `app.js` is fully fetched and executed.

### Q2. The developer moves the script to the end of `<body>`, still no defer/async. What problem does this solve, and does any blocking still occur?

**Learner's first answer:** It solves the blocking issue, so all elements load before it does. No blocking still occurs.

**Assessment: Partial.** Directionally correct but incomplete. Blocking **still occurs** at the end of `<body>`. Moving the script doesn't eliminate blocking — it *relocates* it to a point where it is much less harmful. The entire DOM has already been parsed and can be rendered; the parser still pauses, but the page is already visible.

**Learner's follow-up (defer vs. bottom placement):** "If all parsing is complete I see no need for defer, or should I?"

This revealed a gap worth closing: defer adds something placement alone cannot. Bottom placement controls *where* the parser pauses. Defer controls *when* the fetch starts — in parallel with parsing, not after it. The fetch begins the moment the parser sees the tag, even at the bottom. The practical gain for bottom-placed scripts is small, but defer remains the more technically correct choice because it optimises fetch timing without any risk.

---

## 9. The Correction Session — Five Precise Rewrites

Per standing instructional rule, every pre-check and quick-check answer was audited and rewritten to mechanism level. These five rewrites target the causal mechanisms the originals were missing.

**1. Pre-Check Q1 — what the browser received:**

> **Original:** "The browser received the HTTP response that contains the status code, headers, and HTML body. It is passed as raw text form."

> **Corrected:** The browser received the HTTP response body as a flat stream of raw characters — no structure, no hierarchy, no objects. The status code and headers are processed separately by the browser's networking layer. What matters for A2 is the body: a plain text string that the parser must read and transform into a tree of nodes entirely from scratch.

**2. Pre-Check Q3 — tags and nesting:**

> **Original:** "Tags are like metadata of the text they contain, often they tell about the function or hierarchy of the text."

> **Corrected:** Tags are structural instructions to the parser. Each opening tag tells the parser to create a new element node and move down into it. Each closing tag tells the parser to move back up. Tags don't describe or label text — they establish parent-child relationships between nodes. The nesting of tags in source code is the direct instruction set for the shape of the DOM tree.

**3. Pre-Check Q5 — script tag encounter:**

> **Original:** "It will fire a separate HTTP request to get it."

> **Corrected:** When the parser encounters a `<script>` tag without `defer` or `async`, it stops parsing immediately. If the script is external, a fetch is initiated — but the parser does not continue while that fetch is in flight. Once the script arrives, it is executed in full. Only after execution completes does the parser resume from where it stopped. The blocking behaviour exists because JavaScript can modify the document mid-parse via `document.write()`, making it unsafe to continue without knowing what the script will do.

**4. Chunk 1 Quick-Check — `<strong>` as modifier node:**

> **Original:** "The browser only understands nodes and relationships at this stage, it creates a node of every text and element node of every tag."

> **Corrected:** The parser has no concept of visual role or semantic weight at the node-creation stage. Every opening tag — regardless of whether it appears decorative or structural — causes the parser to create a new element node and descend into it. `<strong>` becomes a child of `<p>` not because of what it means visually, but because it was opened while the parser's current position was inside `<p>`. Position in the source determines position in the tree.

**5. Chunk 3 Q2 — bottom-placement answer:**

> **Original:** "It solves the blocking issue so all elements load before it does. No blocking still occurs."

> **Corrected:** Moving a script to the bottom of `<body>` relocates the parser block to a point after the full DOM is already built — it does not eliminate blocking. The parser still halts when it reaches the script tag, fetches the external file, executes it, and only then finishes. The practical benefit is that all HTML above has already been parsed and can be rendered, so the page appears complete to the user before the script runs. Blocking persists — its consequences are simply less harmful.

---

## 10. Connections Between Concepts

```
A1 — Raw HTML text arrives (HTTP response body)
      │ flat character stream, no structure, no hierarchy
      ▼
Chunk 1 — Parser reads left to right
      │ tokens → nodes; opening tag → descend; closing tag → ascend
      │ nesting = parent-child relationships; position determines tree position
      ▼
Chunk 2 — DOM: live, programmable, in-memory tree
      │ separate from HTML source; exposes API (querySelector, appendChild)
      │ root = document node (above <html>)
      ▼
Chunk 3 — Parser blocking
      │ <script> without defer/async → parser halts (JS can modify mid-parse)
      │ defer = parallel fetch + post-parse execution
      │ async = parallel fetch + immediate execution
      │ bottom placement = relocates block, does not remove it
      ▼
A3 — CSS Parsing and CSSOM (next: browser does for stylesheets what it did for HTML)
```

**Deliberate cross-references the session makes:**

- **Pre-Check Q3 ("tags as metadata") → Chunk 1 `<strong>` correction** — the misconception that tags describe or label text resurfaces as the "modifier node" error. Both are corrected by the same principle: tags are structural instructions, not labels.
- **Pre-Check Q5 ("script fires request") → Chunk 3 full blocking mechanism** — the initial gap (missing the parser halt) is closed with the full chain: halt → fetch → execute → resume, plus the `document.write()` rationale.
- **Pre-Check Q2 cooking analogy → Chunk 3 extended analogy** — the learner's own analogy (parser as chopping ingredients) is extended to cover blocking (needing a tool from across town) and defer (ordering delivery). The DOM is the mise en place on the counter.
- **Pre-Check Q4 (DOM as "model tree") → Chunk 2 full definition** — the instinct was right; the session sharpened "body contents" to "full document including head," and added "live" and "API" as two missing properties.

---

## 11. Recurring Mistakes and Precision Traps

These are the patterns this session deliberately sharpened. They form the diagnostic layer of the lesson.

### 1. Tags as labels vs. tags as structural instructions

**The trap:** describing tags as "metadata of the text" or saying `<strong>` "modifies" the text without creating a branch.
**The correct model:** tags are instructions to the parser. Each opening tag creates an element node and descends into it. Each closing tag ascends back up. `<strong>` is not a modifier — it is an element node with its own children, its own branch. The DOM has no concept of "modifier." It only has nodes and relationships.
**Recognition rule:** whenever a description of a tag focuses on what it *means visually* rather than what it *does structurally*, the explanation is off-track.

### 2. Text nodes as invisible / not "real" nodes

**The trap:** counting only element nodes and omitting text nodes from the tree.
**The correct model:** every discrete run of text — even plain text sitting beside an element — creates a text node. `"Some "` and `" text."` on either side of `<strong>` inside a `<p>` are each their own text node. Text nodes are real nodes with parent-child relationships just like element nodes.
**Recognition rule:** when asked to count nodes, count *every* text run and *every* element tag. If text runs are missing, the count is wrong.

### 3. Parsing and DOM construction as two sequential phases

**The trap:** saying "after parsing is complete, the browser constructs the DOM tree."
**The correct model:** parsing and DOM construction are one concurrent process. Every node the parser creates is immediately attached to the growing tree. When parsing finishes, the DOM is already complete. They are not two phases — they are one process.
**Recognition rule:** the word "after" before "the DOM is built" signals this trap. Parsing *builds* the DOM; it does not produce something that a separate step then assembles.

### 4. The DOM is "fetched" by scripts

**The trap:** saying JavaScript "fetches" the DOM or that the DOM "can be fetched with the script."
**The correct model:** the DOM is already in memory. JavaScript *accesses* and *manipulates* it through the DOM API — `document.querySelector()`, `element.textContent`, `node.appendChild()`. "Fetched" implies an HTTP request, which is not what happens. The DOM is an in-memory object that JavaScript reads from and writes to directly.
**Recognition rule:** the word "fetch" in the context of DOM access is almost always wrong. JavaScript *queries*, *reads*, *modifies*, or *manipulates* the DOM — it does not fetch it.

### 5. Grouping stylesheets and scripts as equivalent parser blockers

**The trap:** treating `<script>` and `<link rel="stylesheet">` as if they block the parser in the same way.
**The correct model:** a `<script>` without `defer`/`async` **directly blocks the parser** — the parser halts. A `<link rel="stylesheet">` blocks *rendering* and can indirectly block script execution, but does **not** directly stop the parser. These are different mechanisms with different chains of effect.
**Recognition rule:** if a description treats scripts and stylesheets as interchangeable blockers, the mechanical distinction has been lost.

### 6. Understating blocking scope — head-only vs. anywhere

**The trap:** saying script blocking occurs "in the head" or "when placed in the head section."
**The correct model:** a `<script>` tag without `defer` or `async` blocks the parser **wherever it appears** in the document — head, body, or anywhere else. Head placement is merely the most damaging because it halts the parser before the body has been parsed.
**Recognition rule:** the word "head" in a blocking description is a scope error. Blocking applies to the tag itself, not its location.

### 7. Bottom-placement as eliminating blocking

**The trap:** saying moving a script to the end of `<body>` "solves" or "removes" blocking.
**The correct model:** bottom placement *relocates* the parser block to a point after the full DOM is built. The parser still pauses — fetches, executes, resumes. The practical benefit is that the page is already rendered before the script runs. Blocking persists; its consequences are less harmful.
**Recognition rule:** the word "eliminates" or "solves" in the context of bottom-placement is wrong. It "reduces harm" or "relocates the block."

### 8. Naming solutions incompletely

**The trap:** citing only bottom-placement as the solution to parser blocking, omitting `defer` and `async`.
**The correct model:** `defer` and `async` are the primary technical solutions. Bottom placement is a mitigation — useful, but it does not add parallel fetching. `defer` starts the fetch in parallel with parsing; bottom placement waits until parsing is finished before even beginning the fetch.
**Recognition rule:** if a solution list for parser blocking mentions only bottom placement, `defer` and `async` are missing.

---

## 12. Problem-Solving Patterns — How to Describe the Parsing Pipeline

Every Quick-Check in the session was a mechanism trace. The unified method that emerges:

1. **Start with what arrives.** The browser has a flat character stream — raw HTML text with no structure. This is always the starting point.

2. **Trace the parser's actions.** Characters → tokens → nodes. Opening tag → create element node, descend. Text run → create text node. Closing tag → ascend. Every tag creates a node; every text run creates a node. No exceptions for visual or semantic role.

3. **Build the tree mentally.** Track the parser's current position: inside which node is it? When a new tag opens, it becomes a child of whatever the parser is currently inside. This is the source of parent-child relationships.

4. **State what the DOM is, not what it resembles.** The DOM is a live, in-memory tree. It is not the HTML file. It is not the visual page. It is an API. Name a concrete method (`document.querySelector()`, `element.appendChild()`) to make "API" tangible.

5. **Identify what halts the parser.** A `<script>` without `defer`/`async` stops the parser anywhere in the document. A `<link rel="stylesheet">` does not directly stop the parser but blocks rendering and can indirectly block scripts.

6. **Name solutions precisely.** `defer` = parallel fetch, post-parse execution. `async` = parallel fetch, immediate execution. Bottom placement = relocates the block, does not remove it. They are not equivalent.

---

## 13. The Deliverable Arc — What the Two Attempts Reveal

The A2 deliverable required a continuous prose description of the full parsing-to-DOM pipeline. The first attempt received a **Remediated Pass — Minor Fracture** with four errors. The rewrite fixed all four and reached **Clean Pass**.

### First attempt — four errors

| Error | What was wrong | Why it matters |
|---|---|---|
| **1. Sequential framing** | "After parsing is complete, browser constructs DOM tree" | Parsing and DOM construction are concurrent — one process, not two phases |
| **2. "Fetched" for in-memory API** | "exists as an API that can be fetched with the script" | Implies HTTP request; DOM is already in memory and accessed via its API |
| **3. Grouped blockers** | Stylesheets and scripts described as equivalent "resource fetching tags" | Scripts directly block the parser; stylesheets block rendering indirectly |
| **4. Incomplete solutions** | Only bottom-placement named; `defer` and `async` missing | `defer` and `async` are the primary technical solutions; placement is a mitigation |

### Second attempt — clean pass

All four errors corrected. The rewrite included concrete API examples (`document.querySelector()`, `element.textContent`, `node.appendChild()`), correctly unified parsing and DOM construction as one process, separated script blocking from stylesheet rendering-blocking, and named `defer` and `async` with correct distinctions.

### One residual imprecision noted

The rewrite said script blocking occurs "when it encounters script tags placed in the head section." Script blocking is not limited to `<head>` — it applies anywhere in the document. Head placement is merely the most damaging. This was flagged but did not fracture the structural model. **A2 closed as Clean Pass.**

### What this arc teaches

The errors are all at the **mechanism level**, not the conceptual level. The instincts were right throughout — the sequence was correct, the DOM was correctly identified as separate from the source, the `document.write()` rationale was present. The correction sessions target precision of expression as well as correctness of reasoning. This is a **precision problem, not an understanding problem**.

---

## 14. Session State and Carry-Forward Items

### Where A2 currently stands

```
A2: HTML Parsing and DOM Construction
│
├── ✅ Pre-Check (3 Partial, 1 Adequate, 1 Missing)
├── ✅ Chunk 1 — What the parser does (character stream → tokens → nodes → tree)
├── ✅ Quick-Check 1 — Node counting + <strong> as branch (8 nodes, corrected)
├── ✅ Chunk 2 — What the DOM is (live, API, separate from source)
├── ✅ Quick-Check 2 — DOM independence + DOM scope (both adequate)
├── ✅ Chunk 3 — Parser blocking (script, defer, async, bottom placement)
├── ✅ Quick-Check 3 — Script placement (Q1 correct, Q2 corrected)
├── ✅ Correction Session — Five precise rewrites
├── ✅ Deliverable — First attempt: Remediated Pass (4 errors)
│                    Second attempt: Clean Pass ✅
└── Structural Integrity: STABLE
```

A2 is **COMPLETE**. Clean pass on second attempt. Structural integrity stable.

### Gate status

```
Nano Gate (after A3): LOCKED — A3 not yet complete
Micro Gate (after A5): LOCKED — A3–A5 not yet complete
```

### Parallel track

Module D (JavaScript) is being taught in separate sessions. D-track is independent.

### Active correction patterns — carry into A3

These five patterns were identified during A2 and must stay monitored:

1. **Treating concurrent phases as separate when they are concurrent** — parsing and DOM construction are one process.
2. **Using "fetch" loosely to describe in-memory API access** — JavaScript reads/modifies the DOM; it does not fetch it.
3. **Grouping distinct blocking mechanisms under one category** — scripts block the parser directly; stylesheets block rendering indirectly.
4. **Understating blocking scope (head-only vs. anywhere in document)** — script blocking applies wherever the tag appears.
5. **Naming solutions incompletely** — bottom-placement without defer/async is an incomplete answer.

### Topic stack (carry-forward from prior modules — still open)

1. **D4 DOM Manipulation** — revisit void element `.offsetWidth` (deferred from the C8 performance section).
2. `tokens.css` — fix font name typo: `"JetBrain Mono"` → `"JetBrains Mono"`.
3. `tokens.css` — consider renaming `--blue-*` → `--brand-*` for naming consistency.
4. `tokens.css` — resolve the green scale convention issue.

### Known strengths to keep using

- Good instinct on pipeline sequencing — the learner consistently gets the order right.
- Strong Q2 answers on the DOM — "relegates it to the level from which it was intentionally transformed" was an exceptional formulation.
- The cooking analogy carried through the entire session and was extended naturally into the blocking explanation.
- Self-assessment accuracy — "scrambled knowledge" was an honest and precise self-diagnosis.

---

## 15. Quick Reference

### The parser's job

```
Raw HTML text (flat character stream, no structure)
        │
        ▼
   Parser reads left to right
        │
        ├── Recognises tokens (opening tags, closing tags, text)
        │
        ├── Creates nodes from tokens
        │     Opening tag  → element node  → descend
        │     Text run     → text node     → attach as child
        │     Closing tag  → ascend back up
        │
        └── Builds DOM tree concurrently (not after — during)
```

### The DOM

| Property | What it means |
|---|---|
| **Tree of nodes** | Every element, every text run, even comments — all nodes with parent-child relationships |
| **Live** | Exists in memory; can be changed at any time by JS, DevTools, or the browser |
| **API** | Exposes methods/properties JS uses: `document.querySelector()`, `element.textContent`, `node.appendChild()` |
| **Root** | Starts at the `document` node — above `<html>`, includes `<head>` and everything |
| **Separate from source** | Once built, DOM and HTML source diverge; changes to DOM don't touch the server file |

**Analogy:** Blueprint (HTML, static) vs. constructed building (DOM, live). JavaScript works on the building, not the blueprint.

### Parser blocking

| Resource | Directly blocks parser? | Effect |
|---|---|---|
| `<script>` (no defer/async) | **Yes** — parser halts completely | Fetch + execute must finish before parsing resumes. Exists because JS can modify document mid-parse via `document.write()`. |
| `<link rel="stylesheet">` | **No** — does not directly stop parser | Blocks *rendering*. Can indirectly block script execution (stylesheet → blocks script → blocks parser). |

### Script-blocking solutions

| Solution | What it does | What it doesn't do |
|---|---|---|
| **`defer`** | Fetches in parallel with parsing; executes after parsing completes | — |
| **`async`** | Fetches in parallel with parsing; executes as soon as it arrives | Does not preserve execution order |
| **Bottom placement** | Relocates the parser block to after the full DOM is built | Does not eliminate blocking; does not add parallel fetching |

**`defer` adds something bottom-placement alone cannot:** the fetch starts in parallel with parsing — the script arrives sooner. Bottom placement waits until parsing finishes before the fetch begins.

### Corrected tree from the `<strong>` exercise

```
article
├── h2
│   └── "Title"
└── p
    ├── "Some "
    ├── strong
    │   └── "bold"
    └── " text."
```

8 nodes minimum. `"Some "` and `" text."` are separate text nodes. `<strong>` creates its own branch.

### Mental-model phrases worth keeping

- "The browser cannot render characters. It needs objects."
- "Nesting in HTML is the instruction set for building the tree, not decoration or labelling."
- "The DOM has no concept of 'modifier.' It only has nodes and relationships."
- "Position in the source determines position in the tree."
- "JavaScript works on the building, not the blueprint."
- "The parser does not first read the entire HTML and then assemble a tree. It builds the tree as it reads."
- "Parser blocking applies anywhere in the document — head placement is merely the most damaging."
- "Bottom placement relocates the block to a less harmful point. It does not eliminate it."

---

## 16. Mastery Checklist

Based only on what the A2 session established, the learner should now be able to:

- **Explain** what the parser does with raw HTML text — reads left to right, recognises tokens, builds nodes, creates a tree.
- **Distinguish** element nodes from text nodes, and **count** all nodes in a given HTML fragment (including text nodes alongside elements).
- **Explain** why every tag — including `<strong>`, `<em>`, and other "visual" tags — creates its own element node and branch.
- **State** that nesting in HTML is the instruction set for building the DOM tree, not a labelling or descriptive mechanism.
- **Trace** the parser's movement through a nested HTML structure — descend on opening tag, ascend on closing tag.
- **Describe** what the DOM is — a live, in-memory, programmable tree of nodes — and **distinguish** it from the HTML source file.
- **Name** at least two DOM API methods and **explain** that JavaScript accesses the DOM in memory, not by fetching it.
- **State** that the DOM root is the `document` node, which sits above `<html>` and includes `<head>`.
- **Explain** why a `<script>` tag without `defer` or `async` blocks the parser — JavaScript can modify the document mid-parse via `document.write()`.
- **Describe** the full blocking chain: parser halts → fetches external script → executes fully → resumes.
- **Distinguish** `defer` (parallel fetch, post-parse execution) from `async` (parallel fetch, immediate execution).
- **Explain** what bottom-placement does and does not achieve — relocates the block, does not eliminate it.
- **Explain** what `defer` adds that bottom-placement alone cannot — parallel fetching, earlier arrival.
- **Distinguish** script blocking (direct parser halt) from stylesheet blocking (rendering block, indirect script block).
- **Recognise** the five active correction patterns when they appear in future explanations.

---

## Appendix: The Five Correction Rewrites (Quick Reference)

For rapid lookup during future study or before the Nano Gate:

| # | Original concept | Precise formulation |
|---|---|---|
| 1 | Browser received "HTTP response with status code, headers, body as raw text" | Body is a flat stream of raw characters — no structure, no hierarchy. Status code and headers are handled separately. The parser must transform the body into a tree from scratch. |
| 2 | Tags are "metadata of the text" | Tags are structural instructions. Opening tag → create node, descend. Closing tag → ascend. Nesting = instruction set for tree shape. |
| 3 | Script tag "fires a separate HTTP request" | Parser stops immediately. Fetch initiated but parser does not continue. Script arrives, executes fully, then parser resumes. Blocking exists because of `document.write()`. |
| 4 | `<strong>` is a "modifier node" that doesn't branch | Parser has no concept of visual role. Every opening tag creates an element node and descends. Position in source determines position in tree. |
| 5 | Bottom placement "solves blocking" | Relocates the block to after DOM is complete. Parser still pauses. Practical benefit: page renders before script runs. Blocking persists, consequences are less harmful. |
