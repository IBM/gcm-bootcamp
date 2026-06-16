# Contributing to GCM Workshop

Thanks for contributing to the GCM Workshop. This guide covers everything you need to add or update content.

## Access

Contributors must have **write access** to the [IBM/gcm-bootcamp](https://github.com/IBM/gcm-bootcamp) repository. Contact the repo maintainer to request access.

## Local Setup

### Prerequisites

- Node.js 20 or later
- Git

### Clone and Install

```bash
git clone https://github.com/IBM/gcm-bootcamp.git
cd gcm-bootcamp/gcm-labs
npm install
```

### Run Locally

```bash
npm start
```

The site is served at `http://localhost:3000/gcm-bootcamp/`. Changes to Markdown files hot-reload automatically.

## Updating the Docs

### 1. Refresh — pull the latest changes

Before making edits, sync your local branch with the remote:

```bash
git pull origin main
```

### 2. Add and commit — stage and save your changes

After editing or adding files:

```bash
git add <file(s)>        # stage specific files, e.g. git add docs/lab-04-key-rotation/index.md
git commit -m "brief description of your change"
```

Or to stage all changes at once:

```bash
git add .
git commit -m "brief description of your change"
```

### 3. Push — publish your changes

```bash
git push origin main
```

GitHub Actions will build the site and deploy to GitHub Pages automatically. Check the [Actions tab](https://github.com/IBM/gcm-bootcamp/actions) to confirm deployment status.

> If the build fails (e.g. a broken link), the live site is **not** updated.

---

## Adding a New Lab

### 1. Create the lab folder

```
docs/
  lab-04-your-lab-title/
    _category_.json     ← required
    index.md            ← required (Lab Introduction page)
    01-step-title.md    ← one file per step
    02-step-title.md
```

### 2. Create `_category_.json`

```json
{
  "label": "Lab 4: Your Lab Title",
  "position": 6,
  "collapsible": true,
  "collapsed": false
}
```

Set `position` to the next available number after the existing labs.

### 3. Required frontmatter

Every Markdown file must include:

```yaml
---
sidebar_position: 1      # controls order within the folder; 1 = first
title: "Page Title"      # shown in the sidebar and as the browser tab title
---
```

### 4. Lab `index.md` template

```markdown
---
sidebar_position: 1
title: Lab Introduction
---

# Lab N: Your Title

**Tools:** ToolA, ToolB

## Objectives

- Objective 1
- Objective 2

## Estimated Duration

~X minutes

## Prerequisites

Complete **[Lab N-1: Previous Lab](../lab-0N-1-previous-lab/)** before starting this lab.

## Lab Steps

| Step | Description |
|------|-------------|
| [Step 1](./01-step-title) | Brief description |
```

### 5. Step file template

```markdown
---
sidebar_position: 2
title: "Step 1: Step Title"
---

# Step 1: Step Title

## What You'll Do

One sentence describing the goal.

## Instructions

1. ...
2. ...

## Verify

How the learner confirms they completed this step successfully.

---

Next: [Step 2 →](./02-next-step)
```

## File Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Lab folder | `lab-NN-short-title/` | `lab-04-key-rotation/` |
| Step files | `NN-step-title.md` | `01-environment-setup.md` |
| Images | `static/img/lab-NN-short-title/` | `static/img/lab-04-key-rotation/` |

- Use **kebab-case** (lowercase, hyphens) for all names
- Prefix lab folders and step files with a **two-digit number** to control sidebar order

## Images

Store images under `static/img/<lab-folder-name>/` to keep each lab's assets together:

```
static/
  img/
    lab-04-key-rotation/
      step1-dashboard.png
      step2-policy-editor.png
```

Reference them in Markdown using a path relative to the doc file:

```markdown
![Dashboard screenshot](../../../static/img/lab-04-key-rotation/step1-dashboard.png)
```
