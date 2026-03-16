# AI Freelancing Firm — Agent System

**Charles Shalua | AI-Powered Freelancing Firm | March 2026**

15 agent definitions for running client projects in 1-week Agile sprints. Each `.md` file in `definitions/` is a complete, self-contained agent — paste its system prompt into Claude and it operates immediately.

---

## Agent Roster

| # | File | Name | Type | Model |
|---|------|------|------|-------|
| 01 | `01_orchestrator.md` | Orchestrator | execution | claude-opus-4-6 |
| 02 | `02_research.md` | Research Agent | execution | claude-opus-4-6 |
| 03 | `03_data.md` | Data Agent | execution | claude-opus-4-6 |
| 04 | `04_ml.md` | ML Agent | execution | claude-opus-4-6 |
| 05 | `05_llm.md` | LLM Agent | execution | claude-opus-4-6 |
| 06 | `06_frontend.md` | Frontend Agent | execution | claude-opus-4-6 |
| 07 | `07_backend.md` | Backend Agent | execution | claude-opus-4-6 |
| 08 | `08_qa.md` | QA Agent | execution | claude-sonnet-4-6 |
| 09 | `09_docs.md` | Docs Agent | execution | claude-sonnet-4-6 |
| 10 | `10_prompt_rewriter.md` | Prompt Rewriter | support | claude-haiku-4-5-20251001 |
| 11 | `11_document_manager.md` | Document Manager | support | claude-sonnet-4-6 |
| 12 | `12_memory_keeper.md` | Memory Keeper | support | claude-sonnet-4-6 |
| 13 | `13_security_engineer.md` | Security Engineer | support | claude-opus-4-6 |
| 14 | `14_observer.md` | Observer | support | claude-opus-4-6 |
| 15 | `15_secretary.md` | Secretary | support | claude-sonnet-4-6 |

---

## How to Use an Agent

### Option A — Claude.ai (Browser)
1. Open `definitions/{agent_file}.md`
2. Copy the entire file content
3. Start a new Claude conversation
4. Paste the content as your first message (it becomes the system context)
5. Provide the required inputs listed in the agent's **Inputs You Require** section

### Option B — Claude Code (CLI)
```bash
# Invoke via Claude Code Agent tool
# Provide the agent .md file path as context
# Pass required inputs per the agent's schema
```

### Option C — API Integration
Each agent's JSON output format can be parsed and chained programmatically. The `next_agent` field in every output tells you which agent receives the result.

---

## Communication Flow

```
Charles (raw instruction)
         │
         ▼
┌─────────────────────┐
│  10_prompt_rewriter  │  ← rewrites messy instructions into structured prompts
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│   01_orchestrator    │  ← decomposes into sprint tasks, assigns agents
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│    02_research       │  ← ⚠️ Charles approval required before build starts
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│     03_data          │  ← ingests, cleans, validates data, builds pipeline
└─────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌────────┐
│ 04_ml  │ │ 05_llm │  ← run sequentially (model + LLM features)
└────────┘ └────────┘
    └────┬────┘
         │
    ┌────┴────┐
    ▼         ▼
┌──────────┐ ┌──────────┐
│06_frontend│ │07_backend│  ← run sequentially (UI + API)
└──────────┘ └──────────┘
         │
         ▼
┌─────────────────────┐
│ 13_security_engineer │  ← ⚠️ BLOCKS deployment on critical/high vulns
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│       08_qa          │  ← ⚠️ Charles approval required before sprint complete
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│       09_docs        │  ← produces delivery package
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│     14_observer      │  ← sprint review + retrospective
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│     15_secretary     │  ← final brief to Charles
└─────────────────────┘

Always available (any agent can call these at any time):
  11_document_manager  ← store/retrieve/version all project files
  12_memory_keeper     ← store/retrieve decisions, patterns, client profiles
```

---

## Approval Gates

Three points in every sprint require Charles's explicit "yes" before work continues:

| Gate | When | What Charles reviews |
|------|------|---------------------|
| **Research gate** | After `02_research` | Tech recommendations and project direction |
| **Security gate** | After `13_security_engineer` | Vulnerability findings — deploy-approved or blocked |
| **QA gate** | After `08_qa` | Test results — sprint pass/fail verdict |

---

## Agent Sequencing Rule

**Agents run sequentially, not in parallel.** Even when the flow diagram shows two agents at the same level (e.g., ML + LLM, Frontend + Backend), they run one at a time. This preserves token budget and keeps the context manageable for Charles.

---

## Verification — Test the System

1. Open `agents/definitions/10_prompt_rewriter.md`
2. Copy the full file content
3. Start a new Claude conversation and paste it
4. Type: `"we need a dashboard thing for a client with some messy data"`
5. **Expected result**: The agent asks for clarifying inputs OR produces a fully structured prompt with: project context, target agent identified, all vague terms replaced with specific requirements, output format specified, constraints listed
6. **Not acceptable**: A prompt that just rephrases the input without adding structure or specificity

Repeat with `01_orchestrator.md` using the Prompt Rewriter's output as the input brief.

---

## Project Directory Structure

When a project starts, `11_document_manager` scaffolds this structure automatically:

```
projects/
└── {project_name}/
    ├── briefs/          ← start brief, sprint briefs, stop brief
    ├── research/        ← Research Agent findings
    ├── data/            ← raw, cleaned datasets, pipeline scripts
    ├── models/          ← ML artifacts, model cards, eval reports
    ├── llm/             ← system prompts, RAG specs, eval reports
    ├── frontend/        ← component specs, design notes
    ├── backend/         ← API spec, deployment config, env template
    ├── security/        ← audit reports
    ├── qa/              ← test reports
    ├── docs/            ← API reference, user guide, handoff package
    ├── prompts/         ← rewritten prompts (audit trail)
    └── archive/         ← final delivery bundle
```

---

## Sprint Cadence

| Phase | Agents Active | Charles Action |
|-------|--------------|----------------|
| **Sprint Planning** | Orchestrator, Prompt Rewriter, Secretary | Review and approve sprint backlog |
| **Research** | Research Agent, Observer | ⚠️ Approve research findings before build |
| **Build** | Data, ML/LLM, Frontend/Backend, Docs | Monitor via Secretary standups |
| **Security Review** | Security Engineer | ⚠️ Acknowledge audit results |
| **QA** | QA Agent | ⚠️ Approve sprint — sign off on pass/fail |
| **Sprint Close** | Observer, Secretary, Memory Keeper | Read sprint summary, plan next sprint |
