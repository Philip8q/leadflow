# How to Add the Next Case Study to My Portfolio

**Target Platform:** [https://philipomondi.netlify.app](https://philipomondi.netlify.app)  
**Repository:** `https://github.com/Philip8q/portfolio` (Branch `master`)  
**Data Registry File:** [`src/data/projects.js`](file:///C:/Users/ADMIN/Desktop/flyrank%20intern/portfolio/src/data/projects.js)  
**Display Component:** [`src/components/home/ProjectsGrid.js`](file:///C:/Users/ADMIN/Desktop/flyrank%20intern/portfolio/src/components/home/ProjectsGrid.js)  
**Card Component:** [`src/components/home/ProjectCard.js`](file:///C:/Users/ADMIN/Desktop/flyrank%20intern/portfolio/src/components/home/ProjectCard.js)  
**Deploy Trigger:** Automatic Netlify Edge deployment on `git push origin master`  

---

## 1. Exactly Where the Case Study Goes

The case study is registered directly in the featured projects list that powers the "What I Build" section on the portfolio homepage at [https://philipomondi.netlify.app/#projects](https://philipomondi.netlify.app/#projects).

In the portfolio codebase, project cards are dynamically driven by the typed `projects` array exported from `src/data/projects.js`. Updating or adding a case study requires modifying the structured object in that array:

```javascript
// src/data/projects.js
{
  id: 3,
  title: "Weekly Review Assistant",
  description:
    "Autonomous engineering telemetry and weekly synthesis agent. Watches GitHub commits across active repositories, audits n8n automation executions, and generates an honest weekly executive briefing every Monday morning. Expanded with a live production web dashboard.",
  tech: ["Next.js", "n8n", "Groq", "Gemini", "GitHub API", "Tailwind CSS"],
  github: "https://github.com/Philip8q/leadflow/blob/main/docs/ai-fluency/personal-agent/WEEKLY_REVIEW_ASSISTANT_SPEC.md",
  live: "https://philipomondi.netlify.app/weekly-review", // Production web dashboard
  image: "/images/projects/weekly-review.svg",
}
```

The rendering engine in `src/components/home/ProjectsGrid.js` maps over this array with staggered Framer Motion entrances (`staggerChildren: 0.1`) and renders accessible `ProjectCard` components with live GitHub links, demo anchors, and tech tags.

---

## 2. The Three-Beat Shape (Reusing Week 2)

Every case study on this platform follows the proven three-beat narrative arc so it proves verified engineering rather than superficial claims:

### Beat 1: The Problem (Context & Pain)
* **What was broken:** During intense engineering sprints across multiple repositories (`leadflow`, `expense-tracker`, `portfolio`, and automation flows), track was lost of what had actually landed versus what had stalled. Answering "what did I actually ship this week?" required manual `git log` digging across parallel branches and triaging silent n8n execution failures.
* **The cost:** Context switching overhead, lost momentum on stalled tasks, and lack of verified visibility across simultaneous build streams.
* **The constraint:** Zero tolerance for hallucinated progress—every item in the executive summary must be grounded in real git commit SHAs and verified workflow execution IDs.

### Beat 2: What You Did (The Build & AI Role)
* **The architecture:** Engineered an automated weekly synthesis pipeline pairing an n8n schedule trigger with GitHub REST API commit ingestion, n8n execution telemetry, and a dual-engine LLM summarizer (Groq LPU for low latency + Gemini for structured reasoning). Expanded the pipeline into a responsive Next.js production web dashboard displaying live commit volume, execution health, and sprint commitments.
* **The AI pair programming role:** Utilized AI to architect strict evaluation prompt guards (enforcing zero hallucinations and explicit disclosure of missing data sources), construct JSON schema validators, and implement responsive telemetry components.
* **The hardest technical hurdle:** Handling silent API token expirations gracefully (treating auth errors as "telemetry unavailable" rather than "zero activity") and sanitizing raw commit logs to suppress cosmetic whitespace commits.

### Beat 3: What Came of It (The Impact & Honest Limitation)
* **The measurable outcome:** Transformed manual sprint retrospectives into an unattended 5-minute briefing delivered every Monday morning. 100% commit provenance verified across all active repositories with zero invented deliverables.
* **The honest limitation:** FlyRank assignment progress is currently ingested via a 30-second weekly manual status snapshot paste rather than an unofficial web scraper to maintain high reliability and avoid fragile credential storage.

---

## 3. Four-Step 30-Minute Deployment Workflow

1. **Open Preserved AI Workspace:** Launch the local session in `C:\Users\ADMIN\Desktop\flyrank intern\portfolio`.
2. **Draft the Three Beats:** Feed recent commit logs and dashboard screenshots to the assistant to generate the concise description.
3. **Update the Registry:** Update the `Weekly Review Assistant` object in `src/data/projects.js` with the live dashboard URL and updated metrics.
4. **Deploy to Production Edge:**
   ```powershell
   git -C "C:\Users\ADMIN\Desktop\flyrank intern\portfolio" add src/data/projects.js
   git -C "C:\Users\ADMIN\Desktop\flyrank intern\portfolio" commit -m "feat(portfolio): publish Weekly Review Assistant dashboard case study"
   git -C "C:\Users\ADMIN\Desktop\flyrank intern\portfolio" push origin master
   ```
   Netlify Edge detects the push, runs the Next.js static build, and deploys globally in under 45 seconds.
