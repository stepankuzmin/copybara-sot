# Copybara SoT ⭐️

[![Copybara SoT](https://github.com/stepankuzmin/copybara-sot/actions/workflows/project-copybara-push.yml/badge.svg)](https://github.com/stepankuzmin/copybara-sot/actions/workflows/copybara.yml)

This is a Copybara configuration repository that manages bidirectional synchronization between:
- **Source of Truth (SoT)**: [`stepankuzmin/copybara-sot`](https://github.com/stepankuzmin/copybara-sot) (this repository)
- **Destination**: [`stepankuzmin/copybara-dst`](https://github.com/stepankuzmin/copybara-dst)

The repository uses Google's [Copybara](https://github.com/google/copybara/) to maintain sync between a private monorepo and a public repository.

```
 Source of Truth                  Destination

+---------------+   Copybara   +---------------+
|     `main`    +------------> |     `main`    |
+-------+-------+              +---------------+
        ^
        |
        |
+-------+-------+   Copybara   +---------------+
| Pull Requests | <------------+ Pull Requests |
+---------------+              +---------------+
```

## Pre-requisite

- [GitHub Personal access token](https://github.com/settings/tokens) with `repo` permissions
- Source of Truth (SoT) repo: https://github.com/stepankuzmin/copybara-sot
- Destination repo: https://github.com/stepankuzmin/copybara-dst

## Architecture

### Project Structure

The `project/` folder contains a sample TypeScript project that is synchronized between repositories. Everything in the `project/` folder (except `copy.bara.sky`) is synchronized to the root of the [destination repository](https://github.com/stepankuzmin/copybara-dst).

**Bidirectional flow**:
  - Changes to files in `project/` are pushed to the [destination repository](https://github.com/stepankuzmin/copybara-dst)
  - PRs made to the [destination repository](https://github.com/stepankuzmin/copybara-dst) are imported back into the `project/` folder

This structure demonstrates how Copybara can manage a subdirectory in a monorepo and present it as a standalone repository for public use.

### Core Configuration File

- `project/copy.bara.sky`: Defines two workflows:
  - `push`: Iterative mode that syncs each commit from SoT to destination
  - `pr`: Change request mode that imports PRs from destination back to SoT

### Key Transformations

1. **Push workflow**:
   - Moves content from `project/` to root in destination
   - Replaces `#PR` references with `internal-PR`
   - Preserves original author metadata

2. **PR workflow**:
   - Moves content from root to `project/` in SoT
   - Excludes `copy.bara.sky` and `.github/**` to prevent config conflicts
   - Adds PR metadata (title, body, URL) to commit message

### Workflow System

The repository uses a multi-workflow system for different purposes:

#### SoT Repository Workflows

- `.github/workflows/project-copybara-push.yml`: Automatically syncs changes from SoT to destination repository
  - Triggers on pushes to `project/**` (excluding `copy.bara.sky`)
  - Only runs on default branch

- `.github/workflows/project-copybara-pr.yml`: Imports PRs from destination repository
  - Uses `workflow_dispatch` with `pr_number` input
  - Can be triggered manually or by destination repo's workflow

- `.github/workflows/project-ci.yml`: Runs SoT CI in the `project/` folder

#### Destination Repository Workflow

- `project/.github/workflows/copybara.yml`: Triggers PR import in SoT repository
  - Runs on `pull_request_target` events
  - Uses GitHub API to dispatch workflow in SoT repository

### Branch Protection Rulesets

The repository includes GitHub rulesets in the `rulesets/` directory:

- `Require a PR in SoT repo.json`: Enforces pull request requirements for the SoT repository
- `Restrict default branch in dst repo.json`: Protects the default branch in the destination repository from pushes

## Debug

```bash
# Install Java
brew install openjdk

# Download Copybara JAR from https://github.com/google/copybara/releases
wget https://github.com/google/copybara/releases/download/v20250623/copybara_deploy.jar -O copybara.jar
```

### Validate Configuration

```bash
java -jar copybara.jar validate project/copy.bara.sky
```

### Run Push Workflow (SoT → Destination)

```bash
# Initial sync with history
java -jar copybara.jar migrate project/copy.bara.sky push \
  --ignore-noop \
  --force \
  --init-history

# Regular sync
java -jar copybara.jar migrate project/copy.bara.sky push
```

### Run PR Workflow (Destination → SoT)

```bash
java -jar copybara.jar migrate project/copy.bara.sky pr <PR_NUMBER>
```
