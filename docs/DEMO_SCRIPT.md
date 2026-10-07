# LeadFlow Walkthrough Script: 3-5 Minute Live Demonstration (FL-09)

**Timing Target**: 3 Minutes 45 Seconds  
**Format**: Screen capture of live production application at `https://leadflow-ten-sage.vercel.app/demo/lead-chat`  
**Rule**: No slides - 100% live software run with microphone narration.  
**Author**: Philip Omondi  

---

### [00:00 - 00:35] Part 1: Introduction & The Core Problem
*(Visual: Browser showing `https://leadflow-ten-sage.vercel.app/demo/lead-chat`. Cursor rests on empty state starter prompts).*

> "Hi everyone, I'm Philip Omondi, and today I'm presenting LeadFlow, an autonomous lead qualification and scoring engine built as my FlyRank AI Engineering capstone.
>
> In high-value real estate and B2B services, the biggest operational bottleneck is lead triage. Sales teams spend dozens of hours every week manually chasing casual browsers who lack intent or budget, while high-intent prospects wait hours for a reply and drop off. 
> 
> LeadFlow solves this by placing an autonomous conversational agent directly in the prospect flow. It conducts an intelligent discovery chat, extracts qualification metrics, and deterministically calculates an actionable lead score card."

---

### [00:35 - 01:30] Part 2: Live Inbound Flow & Token Streaming
*(Visual: Click the pre-configured starter prompt: "I'm looking to buy a 2-bedroom in the next few months". Click Send).*

> "Let's watch it run live in production on Vercel. 
> 
> When I submit an inquiry, the browser initiates a real-time stream via the Vercel AI SDK. Notice how smooth the token streaming is. Under the hood, this is running on Next.js 16 App Router using server-side `streamText` connected to a high-throughput Llama 3.3 model on OpenRouter.
>
> The assistant acknowledges my inquiry and asks clarifying discovery questions: What area am I targeting? Do I have a budget range in mind? How would I prefer to be contacted?"

*(Visual: Type response into textarea: "I am targeting Kilimani or Westlands with a budget of 35 million KES. My WhatsApp is +254712345678" and press Send).*

---

### [01:30 - 02:25] Part 3: Tool Execution & One Real Design Decision
*(Visual: Assistant processes input, shows Thinking state, then the dynamic `LeadScoreCard` appears with 85/100 Hot Lead tier).*

> "Here is where the intelligence happens. The model determines it has gathered sufficient qualification signal and invokes our server-side tool: `scoreLead`.
>
> Now, I want to explain **one key design decision** we made here:
> 
> We explicitly refused to let the language model invent a score through raw text generation. In early prototypes, asking an LLM to 'rate this prospect out of 100' caused massive hallucinations and inconsistent scores across identical dialogues.
>
> Instead, our architecture treats the model strictly as an entity extraction engine. The model calls `scoreLead` with a rigid Zod schema: intent, timeline, budget certainty, and contact method. The actual mathematical score and tier assignment - 85 out of 100, Tier: Hot - is calculated by a deterministic business logic rubric. The model never touches the math. That guarantees auditability and business trust."

---

### [02:25 - 03:10] Part 4: Honesty About One Real Limitation
*(Visual: Show the chat interface, then open the browser DevTools console or demonstrate page refresh).*

> "Now, to be completely transparent, let's address **one real limitation** of our current production architecture:
>
> Today, LeadFlow's conversation state is strictly in-memory within the client's browser session. If a user refreshes the page, the active conversational history resets. While we enforce defensive input caps - capping conversations at 25 turns and 1,500 characters per message to protect production API quotas - we do not yet persist ongoing sessions into a durable database or Supabase user account across device handoffs.
>
> In our next development sprint, we will bind these sessions to a persistent CRM database table with webhook synchronization to n8n for automated SMS follow-ups."

---

### [03:10 - 03:45] Part 5: AI Transparency & Conclusion
*(Visual: Switch tab to `https://github.com/Philip8q/leadflow/blob/main/README.md` showing the architecture diagram and 32 passing tests).*

> "Regarding AI Fluency and transparency: I built LeadFlow using Claude Code and Gemini as pair-programming assistants. AI accelerated our implementation of W3C ARIA accessibility components and Vitest test fixtures. However, all scoring mechanics, serverless timeout hardening, abuse prevention filters, and our 100/100 Lighthouse accessibility compliance were manually tested, audited, and verified by me.
>
> You can clone and run LeadFlow directly from our GitHub repository, or test the live demo at `leadflow-ten-sage.vercel.app`. Thank you!"
