# Copybara Dst ☘️

[![CI](https://github.com/stepankuzmin/copybara-dst/actions/workflows/ci.yml/badge.svg)](https://github.com/stepankuzmin/copybara-dst/actions/workflows/ci.yml)

This is a Copybara configuration repository that manages bidirectional synchronization between:
- **Source of Truth (SoT)**: [`stepankuzmin/copybara-sot`](https://github.com/stepankuzmin/copybara-sot)
- **Destination**: [`stepankuzmin/copybara-dst`](https://github.com/stepankuzmin/copybara-dst) (this repository)

The repository uses Google's [Copybara](https://github.com/google/copybara/) to maintain sync between a private monorepo and a public repository.

Please see [SoT README.md](https://github.com/stepankuzmin/copybara-sot/tree/main?tab=readme-ov-file) for more details.

This repo acts as a destination repo, aka "public repo". Every PR in this repo will be transformed and transferred to the [SoT](https://github.com/stepankuzmin/copybara-sot) repo.
After PR lands on the SoT repo, it's being automatically propagated to this repo! 🚀
