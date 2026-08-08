# Aman Sharma

### Production Data Engineer × AI Systems Builder

> **Build the data layer. Earn trust in the intelligence layer.**

I'm a **Data Engineer at Tata Consultancy Services** building production data systems while specializing in **AI/GenAI engineering**.

My edge is the combination of both — building reliable data foundations and intelligent systems on top of them.

* ⚙️ **Data Engineering** — ETL, PySpark, SQL, AWS Glue, S3, PostgreSQL
* 🧠 **AI Engineering** — RAG, hybrid retrieval, agents, reranking, MCP
* ☁️ **Cloud** — AWS-native data and application architectures
* 🛡️ **Production Thinking** — validation, idempotency, citations, HITL and failure handling

---

## 🧩 The Bridge Engineer

Most engineers specialize in either **data** or **AI**.

I work across both.

```text
                 ┌──────────────────────────┐
                 │       AI SYSTEMS         │
                 │                          │
                 │  RAG · Agents · LLMs    │
                 │  Hybrid Retrieval       │
                 │  Reranking · MCP        │
                 │  HITL · Evaluation      │
                 └────────────┬─────────────┘
                              │
                       Evidence + Context
                              │
                 ┌────────────▼─────────────┐
                 │     DATA FOUNDATION      │
                 │                          │
                 │  AWS Glue · PySpark      │
                 │  S3 · SQL · PostgreSQL   │
                 │  ETL · Validation       │
                 │  Partitioning · SCD2     │
                 └──────────────────────────┘
```

> The goal isn't simply to make an LLM respond.
> **The goal is to make the system reliable enough to trust.**

---

## 🚀 What I Build

### Data Engineering

* AWS Glue ETL pipelines
* PySpark transformations
* S3-based data architectures
* SQL & PL/pgSQL
* Aurora PostgreSQL
* Incremental processing
* Data validation & quality checks
* SCD Type 2
* Idempotent reprocessing
* Partitioning & performance optimization
* Airflow / AWS-native orchestration

### AI Engineering

* Retrieval-Augmented Generation (RAG)
* Hybrid retrieval — BM25 + dense vectors
* Cross-encoder reranking
* LangChain & LangGraph
* Agentic workflows
* MCP tool execution
* FastAPI AI services
* Human-in-the-loop systems
* Citation-grounded responses
* LLM evaluation & regression testing

### Cloud & Infrastructure

* AWS Glue
* Amazon S3
* Amazon Aurora PostgreSQL
* AWS Lambda
* Amazon Athena
* AWS Step Functions
* Amazon EventBridge
* Amazon SNS
* Amazon CloudWatch
* Docker

---

# 🏗️ Selected Systems

## 🤖 Enterprise AI Support Copilot

**Enterprise AI / Multi-Agent**

An AI support assistant that classifies incidents, retrieves relevant evidence and historical incidents, and produces a **cited root-cause recommendation**.

### Architecture

```text
Incoming Incident
       │
       ▼
LangGraph Classifier
       │
       ▼
Hybrid Retrieval
 ┌─────┴─────┐
 │           │
BM25     Dense Vectors
 │           │
 └─────┬─────┘
       ▼
Cross-Encoder Reranker
       │
       ▼
Synthesis Agent
       │
       ▼
Confidence / HITL Gate
   ┌───┴────┐
   │        │
 Cite    Escalate
```

### Highlights

* Hybrid BM25 + dense retrieval
* Cross-encoder reranking
* LangGraph orchestration
* MCP-based diagnostics
* Human-in-the-loop safety gates
* Citation-backed recommendations
* ~35% better recall than a vector-only baseline on the evaluated sample

**Stack:** `LangGraph` `RAG` `BM25` `Vector Search` `MCP` `FastAPI` `HITL`

---

# ⚖️ LegalMind — Indian Legal AI Agent

A source-grounded legal AI system designed to reduce hallucinated legal answers and unsupported citations.

### Architecture

```text
User Query
    │
    ▼
Legal-BERT Embeddings
    │
    ▼
Pinecone Top-K Retrieval
    │
    ▼
Context + Citation Tracking
    │
    ▼
LangGraph ReAct Agent
 ┌──┼────────────────┐
 │  │                │
Search  Summarise  Clause Extract
 │
 └──────────► HITL
                 │
                 ▼
        FastAPI Streaming API
                 │
                 ▼
              Streamlit
```

### Engineering Decisions

* Legal-BERT for domain-specific semantic understanding
* Pinecone for vector retrieval
* Stateful reasoning through LangGraph
* Citation-enforced responses
* HITL escalation for uncertain answers
* Manual QA across ambiguous and adversarial queries

**Stack:** `Legal-BERT` `Pinecone` `LangGraph` `FastAPI` `Streamlit`

---

# 🧬 Production Data Engineering

At **Tata Consultancy Services**, I design and maintain AWS-based ETL systems processing **5–10 GB of regulated pharmaceutical data daily**.

### Production Flow

```text
Third-Party Lab Data
        │
        ▼
       S3
        │
        ▼
AWS Glue + PySpark
 ├── Schema Validation
 ├── Deduplication
 ├── Transformation
 └── Data Quality
        │
        ▼
PL/pgSQL + SCD Type 2
        │
        ▼
Aurora PostgreSQL
        │
        ▼
Athena / Analytics
```

### Impact

| Metric                |                    Result |
| --------------------- | ------------------------: |
| Daily regulated data  |               **5–10 GB** |
| Glue runtime          |       **42 min → ~6 min** |
| Manual preparation    |        **~70% reduction** |
| SQL / S3 optimization | **~25% faster execution** |
| Records processed     |         **100K+ per run** |

One optimization replaced a shuffle-heavy PySpark transformation with a **broadcast join**, reducing a Glue job from approximately **42 minutes to 6 minutes**.

---

# 🛠️ Engineering Principles

### Data Systems

* **Idempotency** over accidental duplication
* **Validation** before downstream consumption
* **Explicit history** through SCD Type 2
* **Partitioning** based on access patterns
* **Safe reprocessing** without corrupting existing data

### AI Systems

* **Evidence over confidence**
* **Retrieval before generation**
* **Reranking before synthesis**
* **Citations over unsupported claims**
* **Human escalation when uncertainty matters**

---

# 💻 Tech Stack

### Languages

`Python` `SQL` `PL/pgSQL` `Java`

### Data Engineering

`PySpark` `AWS Glue` `Apache Airflow` `ETL` `SCD Type 2`

### AWS

`S3` `Glue` `Aurora PostgreSQL` `Athena` `Lambda`
`Step Functions` `EventBridge` `SNS` `CloudWatch`

### AI / GenAI

`RAG` `LangChain` `LangGraph` `Hybrid Search`
`BM25` `Vector Search` `Cross-Encoder` `MCP` `LLM Agents`

### AI Infrastructure

`FastAPI` `Docker` `Pinecone` `FAISS` `Chroma` `Qdrant`

---

# 📈 Experience

### Data Engineer — Tata Consultancy Services

**Nov 2024 — Present**

* Design and maintain AWS Glue ETL pipelines processing **5–10 GB of regulated pharmaceutical data daily**
* Built automated quality and incremental loading workflows, reducing manual preparation by **70%**
* Optimized a shuffle-heavy PySpark transformation from **42 minutes to ~6 minutes**
* Optimized SQL and S3 partitioning strategy, reducing execution time by **~25%**
* Designed reliable data processing and reprocessing workflows

### LLM Data Contributor — Shipd Datacurve

**May 2024 — Nov 2024 · Part-time**

* Authored **100+ DSA problems** for LLM training and benchmarking
* Designed comprehensive test suites for model evaluation
* Worked across algorithms, difficulty levels and edge cases

### Subject Matter Expert — Chegg

**Part-time**

* Solved **100+ Computer Science questions**
* Covered coding, DBMS, computer networks and related subjects

---

# 🏆 Achievements

* 🥇 **AIR 90 — CodeKaze 2023**
* 🏅 **1st in college** among **100K+ participants**
* 💻 **700+ DSA problems solved**
* 🧠 Strong foundation in algorithms and computer science fundamentals

---

# ☁️ Certification

### AWS Certified Cloud Practitioner — CLF-C02

Core areas:

`S3` `IAM` `Athena` `Glue` `Lambda` `Cloud Security`

---

# 🎯 What I'm Looking For

I'm interested in roles where **Data Engineering and AI Engineering intersect**.

```text
        Data Engineering
              +
         AI Engineering
              │
              ▼
     ┌───────────────────┐
     │  Reliable AI      │
     │     Systems       │
     └───────────────────┘
```

Interested in:

* 🤖 AI Engineer
* 🧠 Generative AI Engineer
* ⚙️ Data Engineer
* 🔗 AI / Data Platform Engineer
* 🧩 RAG / Agentic AI Engineer

I'm especially interested in teams solving **real production problems**, not just building demos.

---

# 🔗 Connect With Me

<p align="left">
  <a href="https://amansharmamudgal.netlify.app/">
    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=google-chrome&logoColor=white" />
  </a>
  <a href="https://github.com/AmanSharma114">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/amansharmam114/">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:amansharmamudgal114@gmail.com">
    <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
</p>

---

<p align="center">

### Build the data layer.

### Earn trust in the intelligence layer.

**Aman Sharma**

</p>
