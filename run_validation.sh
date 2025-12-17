#!/usr/bin/env bash

set -e

echo "Running project validation..."
node validate_project.js

# TypeScript compilation
npx tsc --noEmit

# Build the project
pnpm build

echo "All checks passed."
