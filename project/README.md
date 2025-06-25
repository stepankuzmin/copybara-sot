# Copybara Dst ☘️

[![CI](https://github.com/stepankuzmin/copybara-dst/actions/workflows/ci.yml/badge.svg)](https://github.com/stepankuzmin/copybara-dst/actions/workflows/ci.yml)

This is a simple Copybara configuration for a monorepo project. Please see [README.md](https://github.com/stepankuzmin/copybara-sot/tree/main?tab=readme-ov-file) for more details.

This repo acts as a destination repo, aka "public repo". Every PR in this repo will be transformed and transferred to the [SoT](https://github.com/stepankuzmin/copybara-sot) repo.

## Pre-requisite

- [GitHub Personal access token](https://github.com/settings/tokens) with `repo` permissions
- Source of Truth (SoT) repo: https://github.com/stepankuzmin/copybara-sot
- Destination repo: https://github.com/stepankuzmin/copybara-dst
