# CodeRabbit CLI Usage Guide

## Overview
CodeRabbit CLI allows you to perform AI-powered code reviews directly from your terminal, perfect for testing code before committing or creating pull requests.

## Installation & Authentication

### Check if installed:
```bash
coderabbit --version
```

### Authentication Status:
```bash
coderabbit auth status
```

### Login (if needed):
```bash
coderabbit auth login
```

## Correct Command Syntax

### ❌ Old/Wrong Syntax:
```bash
coderabbit --plain              # ❌ This doesn't work
coderabbit --type uncommitted  # ❌ This doesn't work
```

### ✅ New/Correct Syntax:
```bash
coderabbit review --plain -t uncommitted  # Review uncommitted changes in plain text
coderabbit review --prompt-only -t uncommitted  # For AI agent integration (Cursor)
coderabbit review --plain -t all  # Review all files
coderabbit review --plain -t committed  # Review committed changes only
```

## Common Use Cases

### 1. Review Uncommitted Changes (Most Common)
Review files you've modified but haven't committed yet:
```bash
coderabbit review --plain -t uncommitted
```

### 2. Review with AI Agent Integration (Cursor)
Optimized for Cursor AI integration:
```bash
coderabbit review --prompt-only -t uncommitted
```

### 3. Review All Files in Repository
Review entire codebase:
```bash
coderabbit review --plain -t all
```

### 4. Review Committed Changes
Review changes that have been committed:
```bash
coderabbit review --plain -t committed
```

### 5. Compare Against Base Branch
Compare your current branch against another branch:
```bash
coderabbit review --plain --base master
```

## Command Options

| Flag | Description |
|------|-------------|
| `--plain` | Output in plain text format (non-interactive) |
| `--prompt-only` | Show only AI agent prompts (implies --plain) |
| `-t, --type <type>` | Review type: `all`, `committed`, `uncommitted` (default: "all") |
| `--base <branch>` | Base branch for comparison |
| `--base-commit <commit>` | Base commit on current branch for comparison |
| `-c, --config <files...>` | Additional instructions for CodeRabbit AI |
| `--cwd <path>` | Working directory path |
| `--no-color` | Disable colored output |

## Best Practices

### 1. Review Before Committing
Always review uncommitted changes before committing:
```bash
coderabbit review --plain -t uncommitted
```

### 2. Use Prompt-Only Mode with AI Agents
When using with Cursor or other AI agents:
```bash
coderabbit review --prompt-only -t uncommitted
```

### 3. Limit Review Frequency
Don't run CodeRabbit more than 3 times for the same set of changes to avoid rate limiting.

### 4. Review Specific Areas
Focus reviews on the code you're actively working on using uncommitted review type.

### 5. Configuration File
Use `.coderabbit.yaml` to customize review behavior:
- Set default review type
- Configure ignored files
- Set integration preferences

## Troubleshooting

### Error: "No files found for review"
- **Cause**: No uncommitted or staged changes
- **Solution**: Make some changes to your code first, or use `-t all` to review all files

### Error: "Review failed: Unknown error"
- **Cause**: Network issue, service downtime, or authentication problem
- **Solutions**:
  1. Check authentication: `coderabbit auth status`
  2. Verify internet connection
  3. Try again after a few minutes
  4. Check CodeRabbit service status

### Error: "Authentication failed"
- **Solution**: Run `coderabbit auth login` to re-authenticate

## Configuration File (.coderabbit.yaml)

The configuration file allows you to:
- Set default review preferences
- Ignore specific files or directories
- Configure AI integration settings

Example configuration is created at: `.coderabbit.yaml`

## Workflow Example

1. Make code changes
2. Review before committing:
   ```bash
   coderabbit review --plain -t uncommitted
   ```
3. Fix any issues found
4. Commit your changes
5. Optionally review committed changes:
   ```bash
   coderabbit review --plain -t committed
   ```

## Integration with Cursor

For autonomous development loops with Cursor:

1. Add to `.cursorrules`:
```plaintext
# Running the CodeRabbit CLI
CodeRabbit is already installed in the terminal. Run it as a way to review your code. 
Run the command: coderabbit review -h for details on commands available.

IMPORTANT: When running CodeRabbit to review code changes, run:
- For uncommitted changes: `coderabbit review --prompt-only -t uncommitted`
- Don't run it more than 3 times in a given set of changes.
```

2. Cursor will automatically run CodeRabbit reviews during development

## Quick Reference

```bash
# Check version
coderabbit --version

# Check auth status
coderabbit auth status

# Login
coderabbit auth login

# Review uncommitted changes (plain text)
coderabbit review --plain -t uncommitted

# Review uncommitted changes (for AI agents)
coderabbit review --prompt-only -t uncommitted

# Review all files
coderabbit review --plain -t all

# Get help
coderabbit review --help
coderabbit --help
```

