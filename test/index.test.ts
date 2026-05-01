import { describe, expect, it } from 'vitest';

import { hello } from '@/src/index';

describe('hello', () => {
  it('returns a greeting with the given name', () => {
    expect(hello('world')).toBe('Hello, world!');
  });
});
