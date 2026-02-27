# Contributing to INDHACK Schema Generator

Thank you for your interest in contributing to the INDHACK Schema Generator!

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/indhack/indhack-schema-generator/issues)
2. If not, create a new issue with:
   - A clear, descriptive title
   - Steps to reproduce the bug
   - Expected vs actual behavior
   - Your environment (browser, OS, React version)

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its use case
3. Explain why it would be useful

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit with a clear message
6. Push to your fork
7. Open a Pull Request

### Code Style

- Use TypeScript
- Follow existing code patterns
- Add types for all props and functions
- Write meaningful commit messages

### Adding New Schema Types

1. Add the type definition in `src/types.ts`
2. Add the form fields in `src/SchemaGenerator.tsx`
3. Add the JSON-LD generation logic
4. Add an example in `examples/`
5. Update the README

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/indhack-schema-generator.git

# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test
```

## Questions?

Feel free to open an issue or contact us at contact@indhack.com

---

Thank you for contributing!
