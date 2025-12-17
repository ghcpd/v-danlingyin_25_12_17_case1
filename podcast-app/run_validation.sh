#!/bin/bash

# Podcast App Validation Script for Unix/Linux/macOS

echo ""
echo "========================================"
echo "  Podcast Listening App - Validation"
echo "========================================"
echo ""

# Run the validation script
node validate_project.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Validation PASSED"
    exit 0
else
    echo ""
    echo "❌ Validation FAILED"
    exit 1
fi
