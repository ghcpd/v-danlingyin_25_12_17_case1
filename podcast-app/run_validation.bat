@echo off
REM Podcast App Validation Script for Windows

echo.
echo ========================================
echo  Podcast Listening App - Validation
echo ========================================
echo.

REM Run the validation script
node validate_project.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Validation PASSED
    exit /b 0
) else (
    echo.
    echo ❌ Validation FAILED
    exit /b 1
)
