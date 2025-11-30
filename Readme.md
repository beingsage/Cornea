# Cornea — Cognitive Knowledge System

Cornea is a Next.js + TypeScript web application focused on building a cognitive knowledge system and UI toolkit. This repository contains reusable React UI components, visualizations for knowledge pipelines and models, and an extendable architecture for prototyping research ideas in knowledge management, modeling and human-in-the-loop workflows.

Table of Contents
- About
- Tech Stack
- Features
- Getting Started
  - Prerequisites
  - Install
  - Environment
  - Development
  - Build & Production
- Project Structure
- Components & UI
- Contributing
- Notes & References
- License

About
-----
This project bundles a UI component library, visualizations and conceptual components for building a knowledge intelligence platform. It contains sample visualizations and compositions such as pipeline visualizations, architecture visualizations, knowledge hierarchies and an ML model showcase.

Tech Stack
----------
- Next.js 14 (App Router) + React 19
- TypeScript
- Tailwind CSS
- Radix UI components and other small utility libraries
- pnpm as package manager

Features
--------
- Reusable UI components in `components/ui` built with Radix primitives and Tailwind
- Several example visualizations in `components/`:
  - `architecture-visualization.tsx`
  - `knowledge-hierarchy.tsx`
  - `pipeline-visualization.tsx`
  - `ml-model-showcase.tsx`
- Top-level pages using Next.js App Router in `app/`
- Tailwind styling (see `styles/globals.css`)

Getting Started
---------------
Follow the guide below to run the project locally.

Prerequisites
- Node.js 18+ (or Node 20) — whichever your environment supports well with Next.js 14.
- pnpm (preferred) - recommended to install with npm i -g pnpm.

Install
```powershell
git clone https://github.com/beingsage/Cornea.git
cd Cornea
pnpm install
```

Environment
- If the project requires environment variables, create a `.env.local` file in the repository root and add your keys there.
- Keep example env files like `.env.example` committed, but ensure you do not commit secrets.

Development
```powershell
pnpm dev
```
Open http://localhost:3000 to view the app and hot-reload changes while developing.

Build & Production
```powershell
pnpm build
pnpm start
```
This runs `next build` followed by the production server.

Scripts
-------
- dev — Next.js dev server: `pnpm dev`
- build — Build optimization: `pnpm build`
- start — Start the compiled Next.js app: `pnpm start`
- lint — Lint checks (if configured): `pnpm lint`

Project Structure
-----------------
Top-level files and folders:
- `app/` — Next.js App Router pages: `layout.tsx`, `page.tsx`, and styling
- `components/` — Reusable components and UI layout. See subfolder `ui/` for primitives
- `styles/` — Tailwind / global CSS
- `public/` — static assets
- `package.json` — scripts and dependencies

Components & UI
----------------
The `components/ui/` directory is intentionally comprehensive and contains the component primitives used across the site (buttons, inputs, cards, toasts, etc.).

When adding a component:
- Place shared, presentational components in `components/ui`.
- Place page-or-app-specific composition components in `components/` or under `app/(routes)/...

Contributing
------------
Contributions are welcome! Suggested workflow:
1. Fork the repository
2. Create a feature branch
3. Run the project and add your changes
4. Open a PR describing the intent and any run steps

Style & Development Notes
- TypeScript for static typing and developer ergonomics.
- Prefer functional components with React hooks.
- Use Tailwind utilities for styling.
- Create small, testable components and compose from primitive controls in `components/ui`.

Notes & References
-----------------
This repository is a living prototype and contains notes and research links used to design the knowledge system, including models and architecture ideas. Examples include topics like MAML (Model-Agnostic Meta-Learning), SBERT, HMMs/CRFs, and federated or mTLS-protected models.

Some research links & inspiration (kept here as references):
- Enterprise AI Architecture Series: How to Build a Knowledge Intelligence Architecture (Part 1)
- How to Develop AI Knowledge Management Software? - Matellio Inc
- 11 Ways to Use AI in Knowledge Management - Evalueserve

If the README here removed or replaced some brainstorming notes previously stored in `Readme.md`, you can find them in the repository commit history if needed.

License
-------
There is no license specified inside this repo by default. If you want a permissive open-source license consider `MIT` or another license and add `LICENSE` to the repo.

---

If you'd like, I can add a `CONTRIBUTING.md`, a `CODE_OF_CONDUCT.md`, or a default `LICENSE` (e.g., MIT) for you and wire up a simple `pnpm` script for linting and tests.
https://www.perplexity.ai/search/create-a-data-flowing-visual-h-UO.EoaDFSHKi8N1_rNgiBg#0

vibecode 

rule store  
conglomerate model and HR/LDAP  
corroboration 
bpmn
SBERT 
ML NER
mTLS
hange-point lite 
MAML  (model agnostic meta learning)
HMMs / CRFs  

Screen recording --- context (well established system)
Graph Anamoly/Outlier -- cant possible report to teams (windows floater/voice transcription)
Innovation-- expected vs actual (experience/ gut feeling)
Innovation 2 -- nuanced decision-making processes, intuitive problem-solving approaches, and contextual wisdom that constitute an expert's true value 
There is some unexpected stuff, do you want to mark as expert advice if yes then reason, show if else in real time

Noticing workflows and deriving context in real time storing them 

Screen plus outside world logger 
Life tacit recorder per person pipeline 
Organization knowledge accumulation 
Specific nodal knowledge transfer 
At each point neuroplasticic memory and generalization 


Enterprise AI Architecture Series: How to Build a Knowledge Intelligence Architecture (Part 1) - Enterprise Knowledge https://share.google/yrnGCa9HQSxSHZ30d

How to Develop AI Knowledge Management Software? - Matellio Inc https://share.google/yCHEup93MXnNR9AZO


11 Ways to Use AI in Knowledge Management - Evalueserve https://share.google/S2uOfDobt2h1uhibK

https://youtube.com/shorts/6yHEdHCMvyE?si=2e015hes9u6A2xtW
https://youtube.com/shorts/w-HXo9M3Woc?si=AWkPL9uJkgpd9wwF
https://youtube.com/shorts/SVADfETFyh0?si=YTYIEsKp8vFxBLTq
https://youtube.com/shorts/9tZ2TC7GBo8?si=s1-xBPddSl2wMhGp
https://youtu.be/dRKGd4tDHsg?si=c24I_BolKESSlOIJ