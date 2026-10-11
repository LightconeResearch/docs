#!/usr/bin/env bash
# Run, hidden, inside the new project: what you would write by hand between
# `lc init` and the first run, namely the specification, the scripts, the
# data, and a license so the CLI maintains an RO-Crate.
set -euo pipefail
src="$(dirname "$0")/project"
cp "$src/astra.yaml" .
cp -r "$src/src" .
cp "$src/data/points.csv" data/
cp "$src/universes/baseline.yaml" universes/
sed -i '/^\[project\]/a license = "CC-BY-4.0"' pyproject.toml
