import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import onlyWarn from 'eslint-plugin-only-warn';

export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  perfectionist.configs['recommended-natural'],
  ...tseslint.configs.recommended,
  { plugins: { turbo: turboPlugin } },
  { plugins: { onlyWarn } },
  { ignores: ['dist/**'] },
];
