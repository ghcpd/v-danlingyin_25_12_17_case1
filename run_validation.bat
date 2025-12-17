@echo off

echo Running project validation...
node validate_project.js

rem TypeScript compilation
npx tsc --noEmit

rem Build the project
pnpm build

if %ERRORLEVEL% EQU 0 (
  echo All checks passed.
) else (
  echo Validation failed.
)
