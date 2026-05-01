import eslintComments from 'eslint-plugin-eslint-comments';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  globalIgnores(['dist', 'node_modules', 'coverage']),
  // Warning on unused vars but allow the ones prefixed with '_'
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Forbids disabling eslint rules without description, and unused disable/enable comments.
  {
    plugins: {
      'eslint-comments': eslintComments,
    },
    rules: {
      // Require description after eslint-disable
      'eslint-comments/require-description': 'error',
      // Prevent disabling all rules (e.g. /* eslint-disable */)
      'eslint-comments/no-unlimited-disable': 'error',
      // Prevent unused eslint-disable comments
      'eslint-comments/no-unused-disable': 'error',
      // Prevent unused eslint-enable comments
      'eslint-comments/no-unused-enable': 'error',
    },
  },

  // Enforce kebab-case in file names for consistency
  {
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],
    },
  },

  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Forbid importing from "private" folders outside their owning directory.
            // This enforces encapsulation, simulating something similar to "protected" exports.
            {
              group: [
                '**/private/**/*',
                // Allow local relative access
                '!./private/**',
              ],
              message:
                'Do not import from a private folder outside its owning directory.',
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
