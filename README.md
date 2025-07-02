# Copybara SoT ⭐️

[![Mirror to public](https://github.com/stepankuzmin/copybara-sot/actions/workflows/mirror-to-public.yml/badge.svg)](https://github.com/stepankuzmin/copybara-sot/actions/workflows/mirror-to-public.yml)

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

- `copy.bara.sky`: Defines two workflows:
  - `push`: Iterative mode that syncs each commit from SoT to destination
  - `pr`: Change request mode that imports PRs from destination back to SoT

### Key Transformations

1. **Push workflow**:
   - Moves content from `project/` to root in destination
   - Preserves original author metadata

2. **PR workflow**:
   - Moves content from root to `project/` in SoT
   - Adds PR metadata to commit messages

### Workflow System

The repository uses a multi-workflow system for different purposes:

#### SoT Repository Workflows

- `.github/workflows/mirror-to-public.yml`: Automatically syncs changes from SoT to destination repository
- `.github/workflows/import-public-pr.yml`: Imports PRs from destination repository back to SoT
  - Can be triggered manually at https://github.com/stepankuzmin/copybara-sot/actions/workflows/import-public-pr.yml
  - Requires the public PR number as input
- `.github/workflows/project-ci.yml`: Runs CI for the sample project

#### Destination Repository Workflows

- `project/.github/workflows/pr-notify.yml`: Notifies SoT repository when PRs are opened
- `project/.github/workflows/ci.yml`: Runs CI for the destination repository

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
java -jar copybara.jar validate copy.bara.sky
```

### Run Push Workflow (SoT → Destination)

```bash
# Initial sync with history
java -jar copybara.jar migrate copy.bara.sky push \
  --force \
  --ignore-noop \
  --init-history

# Regular sync
java -jar copybara.jar migrate copy.bara.sky push --ignore-noop
```

### Run PR Workflow (Destination → SoT)

```bash
java -jar copybara.jar migrate copy.bara.sky pr <PR_NUMBER>
```
