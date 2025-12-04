# HR Workflow Designer – Prototype

A visual **HR workflow designer** built with **React, Vite, TypeScript and React Flow v11**.

The goal of this prototype is to let an HR admin visually model internal workflows such as **onboarding**, **leave approval**, or **document verification**, configure each step, and then run a simple simulation of the designed flow.

> This project implements the case study: **“HR Workflow Designer Module (React + React Flow)”**.

---

## ✨ Features

### 1. Workflow Canvas (React Flow)

- Interactive canvas with **React Flow v11**
- **Custom node types**:
  - `Start` – Entry point of the workflow
  - `Task` – Human tasks (collect docs, send forms, etc.)
  - `Approval` – Manager / HR approval steps
  - `Automated Step` – System actions (send email, generate document)
  - `End` – Workflow completion
- Dotted background, zoom & pan
- Built-in React Flow **controls** and **mini-map**
- Nodes can be:
  - Added from the **left sidebar palette**
  - Connected with edges
  - Selected for editing
  - Rearranged by drag-and-drop

### 2. Node Configuration / Edit Panel (Right Sidebar)

When a node is selected, a **dynamic configuration form** appears in the right panel.

**Shared field for all node types**

- `Title` – main label shown on the canvas

**Start Node**

- `Metadata` – string input parsed into `Record<string, string>`  
  (format: `key1=value1,key2=value2`)

**Task Node**

- `Description`
- `Assignee`
- `Due Date` (HTML date input)
- (internally supports `customFields` for future extension)

**Approval Node**

- `Approver Role` (e.g. Manager, HRBP, Director)
- `Auto Approve Threshold` (number)

**Automated Step Node**

- `Action` – select from **mock /automations API**
- `Params` – string input parsed into `Record<string, string>`  
  (format: `key=value,key2=value2`)

**End Node**

- `End Message`
- `Include Summary` flag (boolean toggle)

All inputs are **controlled components**, and changes are persisted into the node’s `data` via a central context.

### 3. Mock API Layer

A light mock data layer simulates the required endpoints:

- `GET /automations`  
  - Implemented as `getAutomations()` in `src/api/automations.ts`
  - Returns a list of automation actions:

    ```json
    [
      { "id": "send_email", "label": "Send Email", "params": ["to", "subject"] },
      { "id": "generate_doc", "label": "Generate Document", "params": ["template", "recipient"] }
    ]
    ```

- `POST /simulate`  
  - Implemented as `simulateWorkflow()` in `src/api/simulate.ts`
  - Accepts the **workflow graph** (`nodes` + `edges`)
  - Returns:
    - `valid` – overall validity flag
    - `errors[]` – validation errors (missing Start / End, unreachable nodes, etc.)
    - `steps[]` – step-by-step execution log

> Implementation detail: both functions are simple async functions with artificial `setTimeout` delays to mimic real HTTP calls, but the rest of the app treats them like real APIs.

### 4. Workflow Test / Sandbox Panel

At the bottom of the center column is the **Workflow Sandbox**:

- Button: **“Run Simulation”**
- On click:
  - Serializes the current workflow (`nodes`, `edges`) from context
  - Calls `simulateWorkflow(graph)`
  - Displays:
    - Overall **status**: VALID / INVALID
    - **Errors list** (e.g. “No Start node found”, “Some nodes are not reachable from Start node”)
    - **Execution steps**:
      - Step index
      - Node ID, type & label
      - A simple human-readable log message
    - Collapsible **Raw JSON** view of the workflow graph

This demonstrates reasoning about a graph structure and simulating execution of the designed workflow.

---

## 🧱 Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **React Flow v11.11.4**
- No backend server / DB (mock APIs are in-memory functions)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
