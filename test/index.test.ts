import { afterEach } from 'node:test';

import chalk from 'chalk';
import { beforeEach, describe, expect, Mock, test, vi } from 'vitest';

import { Inkdent } from '@/src/index';

describe('Inkdent', () => {
  let consoleLogMock: Mock;
  let consoleInfoMock: Mock;
  let consoleWarnMock: Mock;
  let consoleErrorMock: Mock;

  beforeEach(() => {
    const noop = () => {};
    consoleLogMock = vi.spyOn(console, 'log').mockImplementation(noop);
    consoleInfoMock = vi.spyOn(console, 'info').mockImplementation(noop);
    consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(noop);
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(noop);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('methods', () => {
    test('Flushing without input does nothing', () => {
      const ink = new Inkdent();

      ink.log();
      expect(consoleLogMock).not.toHaveBeenCalled();

      ink.info();
      expect(consoleInfoMock).not.toHaveBeenCalled();

      ink.warn();
      expect(consoleWarnMock).not.toHaveBeenCalled();

      ink.error();
      expect(consoleErrorMock).not.toHaveBeenCalled();
    });

    test('Clear', () => {
      const ink = new Inkdent();
      ink.string('foobar');
      ink.clear();
      ink.log();
      expect(consoleLogMock).not.toHaveBeenCalled();
    });

    test('Console methods', () => {
      const ink = new Inkdent();

      ink.string('log msg').log();
      expect(consoleLogMock).lastCalledWith(`${chalk.blue('│ ')}log msg`);

      ink.string('info msg').info();
      expect(consoleInfoMock).lastCalledWith(`${chalk.gray('│ ')}info msg`);

      ink.string('warn msg').warn();
      expect(consoleWarnMock).lastCalledWith(`${chalk.yellow('│ ')}warn msg`);

      ink.string('error msg').error();
      expect(consoleErrorMock).lastCalledWith(`${chalk.red('│ ')}error msg`);
    });
  });

  describe('indentation', () => {
    test('push&pop', () => {
      const ink = new Inkdent();
      ink.string('level 1');
      ink.push().string('level 2');
      ink.push().string('level 3');
      ink.pop().string('level 2');
      ink.pop().string('level 1');
      ink.pop().string('still level 1');
      ink.log();

      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}level 1`,
          `${chalk.blue('│ ')}  level 2`,
          `${chalk.blue('│ ')}    level 3`,
          `${chalk.blue('│ ')}  level 2`,
          `${chalk.blue('│ ')}level 1`,
          `${chalk.blue('│ ')}still level 1`,
        ].join('\n')
      );
    });

    test('reset indentation', () => {
      const ink = new Inkdent();
      ink.string('level 1');
      ink.push().string('level 2');
      ink.push().string('level 3');
      ink.resetIndentation().string('level 1');
      ink.log();

      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}level 1`,
          `${chalk.blue('│ ')}  level 2`,
          `${chalk.blue('│ ')}    level 3`,
          `${chalk.blue('│ ')}level 1`,
        ].join('\n')
      );
    });

    test('handle new lines', () => {
      const ink = new Inkdent();
      ink.string('line1\nline2').nl().string('line3').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line1`,
          `${chalk.blue('│ ')}line2`,
          `${chalk.blue('│ ')}line3`,
        ].join('\n')
      );
    });

    test('new lines respect intendation', () => {
      const ink = new Inkdent();
      ink
        .string('line1')
        .push()
        .string('\nline2\nline3')
        .push()
        .string('line4')
        .log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line1`,
          `${chalk.blue('│ ')}  line2`,
          `${chalk.blue('│ ')}  line3`,
          `${chalk.blue('│ ')}    line4`,
        ].join('\n')
      );
    });
  });

  describe('options', () => {
    test('default options', () => {
      const ink = new Inkdent();
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}line1`, `${chalk.blue('│ ')}  line2`].join('\n')
      );
    });

    test('options.indent', () => {
      const ink = new Inkdent({ indent: '・・' });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}line1`, `${chalk.blue('│ ')}・・line2`].join('\n')
      );
    });

    test('options.keepEmptyLines', () => {
      const ink = new Inkdent({ keepEmptyLines: true });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line1`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}  line2`,
        ].join('\n')
      );
    });

    test('options.ns', () => {
      const ink = new Inkdent({ ns: 'NS' });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.bgBlue(' NS ')}${chalk.blue('│ ')}line1`,
          `    ${chalk.blue('│ ')}  line2`,
        ].join('\n')
      );
    });

    test('options.nsPadding (string)', () => {
      const ink = new Inkdent({ ns: 'NS', nsPadding: '*' });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.bgBlue('*NS*')}${chalk.blue('│ ')}line1`,
          `    ${chalk.blue('│ ')}  line2`,
        ].join('\n')
      );
    });

    test('options.nsPadding (tuple)', () => {
      const ink = new Inkdent({ ns: 'NS', nsPadding: ['[', ']'] });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.bgBlue('[NS]')}${chalk.blue('│ ')}line1`,
          `    ${chalk.blue('│ ')}  line2`,
        ].join('\n')
      );
    });

    test('options.nsSeparator', () => {
      const ink = new Inkdent({ nsSeparator: '> ' });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('> ')}line1`, `${chalk.blue('> ')}  line2`].join('\n')
      );
    });

    test('options.styles', () => {
      const ink = new Inkdent({ styles: { log: chalk.green } });
      ink.string('line1\n').push().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.green('│ ')}line1`, `${chalk.green('│ ')}  line2`].join('\n')
      );
    });
  });

  describe('new lines', () => {
    test('nl() ensures a new, non-duplicated line', () => {
      const ink = new Inkdent();
      // normal, 1 nl()
      ink.string('line1').nl().string('line2').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}line1`, `${chalk.blue('│ ')}line2`].join('\n')
      );
      // 2 nl() removes duplicates
      ink.string('line3').nl().nl().string('line4').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}line3`, `${chalk.blue('│ ')}line4`].join('\n')
      );
      // \n is also handled together with nl()
      ink.string('line5\n').nl().string('line6').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}line5`, `${chalk.blue('│ ')}line6`].join('\n')
      );
    });

    test('empty lines are removed', () => {
      const ink = new Inkdent();
      ink.string('line1\n\n\nline2').nl().nl().nl().string('line3').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line1`,
          `${chalk.blue('│ ')}line2`,
          `${chalk.blue('│ ')}line3`,
        ].join('\n')
      );
    });

    test('empty() lines are always kept', () => {
      const ink = new Inkdent();
      ink
        .string('line1')
        .empty()
        .string('line2')
        .empty(3)
        .string('line3')
        .log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line1`,
          '',
          `${chalk.blue('│ ')}line2`,
          '',
          '',
          '',
          `${chalk.blue('│ ')}line3`,
        ].join('\n')
      );
    });

    test('empty lines can be preserved via constructor options', () => {
      const ink = new Inkdent({ keepEmptyLines: true });
      // \n are preserved
      ink.string('line1\n\n\nline2').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line1`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}line2`,
        ].join('\n')
      );
      // nl() are preserved
      ink.string('line3').nl().nl().nl().string('line4').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line3`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}line4`,
        ].join('\n')
      );
      // mixed \n and nl() are preserved too
      ink.string('line5\n').nl().nl().string('\nline6').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}line5`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}`,
          `${chalk.blue('│ ')}line6`,
        ].join('\n')
      );
    });
  });

  describe('namespaces', () => {
    test('no namespaces by default', () => {
      const ink = new Inkdent();
      ink.string('Plain text').log();
      expect(consoleLogMock).lastCalledWith(`${chalk.blue('│ ')}Plain text`);
    });

    test('namespace can be set', () => {
      const ink = new Inkdent();
      ink.ns('Namespace').string('With namespace').log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.bgBlue(' Namespace ')}${chalk.blue('│ ')}With namespace`
      );
    });

    test('namespace only prints at the top of a print operation', () => {
      const ink = new Inkdent();

      ink.ns('Namespace').string('First line').nl().string('Second line').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.bgBlue(' Namespace ')}${chalk.blue('│ ')}First line`,
          `           ${chalk.blue('│ ')}Second line`,
        ].join('\n')
      );

      ink.string('Next log').log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.bgBlue(' Namespace ')}${chalk.blue('│ ')}Next log`].join('\n')
      );

      ink.string('line1\nline2\nline3').log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.bgBlue(' Namespace ')}${chalk.blue('│ ')}line1`,
          `           ${chalk.blue('│ ')}line2`,
          `           ${chalk.blue('│ ')}line3`,
        ].join('\n')
      );
    });
  });

  describe('formatting', () => {
    test('string', () => {
      const ink = new Inkdent();
      ink.string('Foobar').log();
      expect(consoleLogMock).lastCalledWith(`${chalk.blue('│ ')}Foobar`);
    });

    test('number', () => {
      const ink = new Inkdent();
      ink.number(1234.567).nl().number(BigInt(-123456)).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}${chalk.yellow(1234.567)}`,
          `${chalk.blue('│ ')}${chalk.dim.yellow(-123456)}`,
        ].join('\n')
      );
    });

    test('pctg', () => {
      const ink = new Inkdent();
      ink
        .pctg(0)
        .nl()
        .pctg(0.5123)
        .nl()
        .pctg(1.56789)
        .nl()
        .pctg(1.56789, 0)
        .log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}${chalk.yellow('0.00')}${chalk.dim.yellow('%')}`,
          `${chalk.blue('│ ')}${chalk.yellow('51.23')}${chalk.dim.yellow('%')}`,
          `${chalk.blue('│ ')}${chalk.yellow('156.79')}${chalk.dim.yellow('%')}`,
          `${chalk.blue('│ ')}${chalk.yellow('157')}${chalk.dim.yellow('%')}`,
        ].join('\n')
      );
    });

    test('fraction', () => {
      const ink = new Inkdent();

      ink.fraction(3, 8).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}`,
          `${chalk.yellow('3')}/${chalk.yellow('8')}`,
        ].join('')
      );

      ink.fraction(50, 100, true).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}`,
          `${chalk.yellow('50')}/${chalk.yellow('100')}`,
          ` (${chalk.yellow('50.00')}${chalk.dim.yellow('%')})`,
        ].join('')
      );

      ink.fraction(75, 21, true, 3).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}`,
          `${chalk.yellow('75')}/${chalk.yellow('21')}`,
          ` (${chalk.yellow('357.143')}${chalk.dim.yellow('%')})`,
        ].join('')
      );
    });

    test('duration', () => {
      const ink = new Inkdent();
      ink.duration(123).nl(); // ms
      ink.duration(1234).nl(); // s
      ink.duration(123456).nl(); // m
      ink.duration(12345678).nl(); // h
      ink.duration(123456789).nl(); // day
      ink.duration(1234567890).nl(); // days
      ink.log();
      expect(consoleLogMock).lastCalledWith(
        [
          [`${chalk.green(123)}${chalk.dim.green('ms')}`].join(' '),
          [
            `${chalk.green(1)}${chalk.dim.green('s')}`,
            `${chalk.green(234)}${chalk.dim.green('ms')}`,
          ].join(' '),
          [
            `${chalk.green(2)}${chalk.dim.green('m')}`,
            `${chalk.green(3)}${chalk.dim.green('s')}`,
            `${chalk.green(456)}${chalk.dim.green('ms')}`,
          ].join(' '),
          [
            `${chalk.green(3)}${chalk.dim.green('h')}`,
            `${chalk.green(25)}${chalk.dim.green('m')}`,
            `${chalk.green(45)}${chalk.dim.green('s')}`,
            `${chalk.green(678)}${chalk.dim.green('ms')}`,
          ].join(' '),
          [
            `${chalk.green(1)}${chalk.dim.green('day')}`,
            `${chalk.green(10)}${chalk.dim.green('h')}`,
            `${chalk.green(17)}${chalk.dim.green('m')}`,
            `${chalk.green(36)}${chalk.dim.green('s')}`,
            `${chalk.green(789)}${chalk.dim.green('ms')}`,
          ].join(' '),
          [
            `${chalk.green(14)}${chalk.dim.green('days')}`,
            `${chalk.green(6)}${chalk.dim.green('h')}`,
            `${chalk.green(56)}${chalk.dim.green('m')}`,
            `${chalk.green(7)}${chalk.dim.green('s')}`,
            `${chalk.green(890)}${chalk.dim.green('ms')}`,
          ].join(' '),
        ]
          .map((line) => `${chalk.blue('│ ')}${line}`)
          .join('\n')
      );
    });

    test('bool', () => {
      const ink = new Inkdent();
      ink.bool(true).log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.blue('│ ')}${chalk.yellow('true')}`
      );
    });

    test('path', () => {
      const ink = new Inkdent();
      ink.path('/some/random/path').log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.blue('│ ')}${chalk.green('/some/random/path')}`
      );
    });

    test('link', () => {
      const ink = new Inkdent();
      ink.link('/some/random/link').log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.blue('│ ')}${chalk.underline.blue('/some/random/link')}`
      );
    });

    test('task', () => {
      const ink = new Inkdent();

      ink
        .task('task 1', true)
        .task('task 2', false)
        .task('task 3', true, 12345)
        .task('task 4', false, 123456789)
        .task('task 5', false, 1234567890)
        .log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}${chalk.green('✓ ')}task 1`,
          `${chalk.blue('│ ')}${chalk.red('✗ ')}task 2`,
          `${chalk.blue('│ ')}${chalk.green('✓ ')}task 3 ${chalk.green(12)}${chalk.dim.green('s')} ${chalk.green(345)}${chalk.dim.green('ms')}`,
          [
            `${chalk.blue('│ ')}${chalk.red('✗ ')}task 4`,
            `${chalk.green(1)}${chalk.dim.green('day')}`,
            `${chalk.green(10)}${chalk.dim.green('h')}`,
            `${chalk.green(17)}${chalk.dim.green('m')}`,
            `${chalk.green(36)}${chalk.dim.green('s')}`,
            `${chalk.green(789)}${chalk.dim.green('ms')}`,
          ].join(' '),
          [
            `${chalk.blue('│ ')}${chalk.red('✗ ')}task 5`,
            `${chalk.green(14)}${chalk.dim.green('days')}`,
            `${chalk.green(6)}${chalk.dim.green('h')}`,
            `${chalk.green(56)}${chalk.dim.green('m')}`,
            `${chalk.green(7)}${chalk.dim.green('s')}`,
            `${chalk.green(890)}${chalk.dim.green('ms')}`,
          ].join(' '),
        ].join('\n')
      );
    });

    test('taskResult', () => {
      const ink = new Inkdent();

      ink.string('task 1').taskResult(true).log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}task 1${chalk.green(' ✓')}`].join('\n')
      );

      ink.string('task 2').taskResult(false).log();
      expect(consoleLogMock).lastCalledWith(
        [`${chalk.blue('│ ')}task 2${chalk.red(' ✗')}`].join('\n')
      );

      ink.string('task 3').taskResult(true, 123).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}task 3${chalk.green(' ✓')} ${chalk.green('123')}${chalk.dim.green('ms')}`,
        ].join('\n')
      );

      ink.string('task 4').taskResult(false, 456).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}task 4${chalk.red(' ✗')} ${chalk.green('456')}${chalk.dim.green('ms')}`,
        ].join('\n')
      );
    });

    test('symbol', () => {
      const ink = new Inkdent();
      ink.symbol(Symbol()).nl().symbol(Symbol('DESC')).log();
      expect(consoleLogMock).lastCalledWith(
        [
          `${chalk.blue('│ ')}${chalk.grey('Symbol()')}`,
          `${chalk.blue('│ ')}${chalk.grey('Symbol(')}${chalk.cyan('DESC')}${chalk.grey(')')}`,
        ].join('\n')
      );
    });

    test('array', () => {
      const ink = new Inkdent();
      ink.array([1, 'abc', null]).log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.blue('│ ')}[${chalk.yellow(1)}, "abc", ${chalk.red(null)}]`
      );
    });

    test('object', () => {
      const ink = new Inkdent();
      ink
        .object({ s: 'string', n: 123.456, o: { f: false, t: true, n: null } })
        .log();
      expect(consoleLogMock).lastCalledWith(
        [
          `{`,
          `  s: "string",`,
          `  n: ${chalk.yellow(123.456)},`,
          `  o: {`,
          `    f: ${chalk.yellow('false')},`,
          `    t: ${chalk.yellow('true')},`,
          `    n: ${chalk.red('null')},`,
          `  },`,
          `}`,
        ]
          .map((line) => `${chalk.blue('│ ')}${line}`)
          .join('\n')
      );
    });

    test('any', () => {
      const ink = new Inkdent();
      expect(ink.any('string')).toBe(ink.string('string'));
      expect(ink.any(-123.456)).toBe(ink.number(-123.456));
      expect(ink.any(true)).toBe(ink.bool(true));
      expect(ink.any(false)).toBe(ink.bool(false));
      expect(ink.any(Symbol())).toBe(ink.symbol(Symbol()));
      expect(ink.any(Symbol('Name'))).toBe(ink.symbol(Symbol('Name')));
      expect(ink.any([1, 2, 3])).toBe(ink.array([1, 2, 3]));
      expect(ink.any({ n: 1, s: 'str' })).toBe(ink.object({ n: 1, s: 'str' }));
    });

    test('table', () => {
      const ink = new Inkdent();
      ink
        .table(
          [
            ['foo', 'bar', 'center', 'right'],
            ['Long cell', 'baz', 'x', 'x'],
            ['Long cell', 'baz', 'xx', 'xx'],
          ],
          {
            header: [
              { title: 'Col 1' },
              { title: 'Long header' },
              { title: 'Centered Col', align: 'center' },
              { title: 'Right Col', align: 'right' },
            ],
          }
        )
        .log();

      expect(consoleLogMock).lastCalledWith(
        [
          '┌───────────┬─────────────┬──────────────┬───────────┐',
          '│ Col 1     │ Long header │ Centered Col │ Right Col │',
          '├───────────┼─────────────┼──────────────┼───────────┤',
          '│ foo       │ bar         │    center    │     right │',
          '├───────────┼─────────────┼──────────────┼───────────┤',
          '│ Long cell │ baz         │      x       │         x │',
          '├───────────┼─────────────┼──────────────┼───────────┤',
          '│ Long cell │ baz         │      xx      │        xx │',
          '└───────────┴─────────────┴──────────────┴───────────┘',
        ]
          .map((line) => `${chalk.blue('│ ')}${line}`)
          .join('\n')
      );
    });
  });

  describe('clone', () => {
    test('basic clone', () => {
      const ink = new Inkdent({
        indent: '..',
        ns: 'NS',
        nsSeparator: ':',
        nsPadding: '~',
      });
      ink.push().string('original');
      const copy = ink.clone();

      ink.log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.bgBlue('~NS~')}${chalk.blue(':')}..original`
      );

      // it should copy all the options by default, but not the state
      // (only the namespace)
      copy.string('copied').log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.bgBlue('~NS~')}${chalk.blue(':')}copied`
      );
    });

    test('custom clone', () => {
      const ink = new Inkdent();
      ink.ns('NS').push().string('original');
      const copy = ink.clone({
        state: { ns: true, nsPad: true, indent: true },
      });

      ink.log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.bgBlue(' NS ')}${chalk.blue('│ ')}  original`
      );

      copy.string('copied').log();
      expect(consoleLogMock).lastCalledWith(
        `${chalk.bgBlue(' NS ')}${chalk.blue('│ ')}  copied`
      );
    });
  });
});
