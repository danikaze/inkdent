import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

export type InkdentOptions = {
  /** String used to indent levels (Default: 2 spaces `'  '`) */
  indent?: string;
  /** Whether to output empty lines (Default: `false`) */
  keepEmptyLines?: boolean;
  /** Default NameSpace to use */
  ns?: string;
  /** String around left and right of the namespace, with the same style */
  nsPadding?: string | [left: string, right: string];
  /** Separator between the namespace and the logged text */
  nsSeparator?: string;
  /** Custom styles to use */
  styles?: Styles;
};

export type Styler = (...args: unknown[]) => string;

/**
 * Internal state of a `Inkdent` instance.
 */
export type InkdentState = {
  /** Current level of indentation */
  indent: number;
  /** Current namespace */
  ns: string;
  /** Space to print when the ns is not printed */
  nsPad: string;
  /** Whether to show the namespace on the next line */
  printNs: boolean;
  /** Whether the next input requires a new line */
  nl: boolean;
};

export type CloneOptions = {
  /**
   * Whether to clone the current instance options (`true`) or use the default
   * options (`false`), or an object with what option to clone.
   */
  options?: boolean | Partial<Record<keyof InkdentOptions, boolean>>;
  /**
   * Whether to clone the whole current instance state (`true`) or use the
   * default state (`false`), or an object with what option to clone (by
   * default it clones the namespace and its padding to preserve the visual
   * options (`{ ns: true, nsPad: true }`)
   */
  state?: boolean | Partial<Record<keyof InkdentState, boolean>>;
};

/**
 * Object defining the styles to use for each log level
 */
export type Styles = {
  /** Defines the color of the `log()` level */
  log?: Styler;
  /** Defines the color of the `info()` level */
  info?: Styler;
  /** Defines the color of the `warn()` level */
  warn?: Styler;
  /** Defines the color of the `error()` level */
  error?: Styler;
  /** Default styles of the table() method */
  table?: Omit<TableOptions, 'header'>;
};

export type TableOptions = {
  header?: TableColumnDefinition[];
  padding?: string | [left: string, right: string];
  vertical?: string;
  horizontal?: string;
  topLeft?: string;
  top?: string;
  ropRight?: string;
  left?: string;
  center?: string;
  right?: string;
  bottomLeft?: string;
  bottom?: string;
  bottomRight?: string;
};

export type TableColumnDefinition = {
  /** Title to show in the header row */
  title: string;
  /** Alignment to use for the column */
  align?: TextAlignment;
  /** Alignment to use for the column title. Defaults to `align` */
  titleAlign?: TextAlignment;
};

export type TextAlignment = 'left' | 'center' | 'right';

const DEFAULT_OPTIONS: Required<InkdentOptions> = {
  indent: '  ',
  ns: '',
  nsSeparator: '│ ',
  nsPadding: ' ',
  keepEmptyLines: false,
  styles: {
    log: chalk.blue,
    info: chalk.gray,
    warn: chalk.yellow,
    error: chalk.red,
    table: {
      padding: ' ',
      vertical: '│',
      horizontal: '─',
      topLeft: '┌',
      top: '┬',
      ropRight: '┐',
      left: '├',
      center: '┼',
      right: '┤',
      bottomLeft: '└',
      bottom: '┴',
      bottomRight: '┘',
    },
  },
};

const DEFAULT_STATE: InkdentState = {
  indent: 0,
  ns: '',
  nsPad: '',
  printNs: true,
  nl: false,
};

const EMPTY_LINE = Symbol();
type EmptyLine = typeof EMPTY_LINE;

/**
 * Simple logging library with scoped indentation and semantical formatting.
 */
export class Inkdent {
  private options: Required<InkdentOptions>;
  private state: InkdentState = { ...DEFAULT_STATE };
  private lines: (EmptyLine | [ns: string, line: string])[] = [];

  constructor(options?: InkdentOptions) {
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
      styles: {
        ...DEFAULT_OPTIONS.styles,
        ...options?.styles,
        table: { ...DEFAULT_OPTIONS.styles.table, ...options?.styles?.table },
      },
    };
    this.ns(this.options.ns);
  }

  /* Misc. methods */

  /**
   * Create a clone of the current instance.
   *
   * By default, style options and namespace will be cloned, but other options
   * as well as the internal state can be included in the clone as well.
   *
   * @param options Options to change the behavior of the cloning process
   * @returns a copy of the current instance
   */
  public clone(options?: CloneOptions): Inkdent {
    const cloneOptions = options?.options ?? true;
    const cloneState = options?.state ?? { ns: true, nsPad: true };
    const instance = new Inkdent();
    instance.options = Inkdent.#pickFields(
      DEFAULT_OPTIONS,
      this.options,
      cloneOptions
    );
    instance.state = Inkdent.#pickFields(DEFAULT_STATE, this.state, cloneState);
    return instance;
  }

  /**
   * Set the namespace to show on the log messages
   *
   * @param namespace Namespace to set
   * @param styler Optional style to apply instead of the default one
   * @returns Current instance for chaining
   */
  public ns(namespace: string, styler?: Styler): this {
    if (!namespace) {
      this.state.ns = '';
    } else {
      const s = styler ?? chalk.bgBlue;
      const ns = namespace.trim();
      const pad = this.options.nsPadding;
      this.state.ns = s(
        `${Array.isArray(pad) ? pad[0] : pad}${ns}${Array.isArray(pad) ? pad[1] : pad}`
      );
    }
    this.state.nsPad = ' '.repeat(stripAnsi(this.state.ns).length);
    this.state.printNs = this.state.nsPad.length > 0;
    return this;
  }

  /**
   * Ensure a new line after the last logs.
   * By default (unless the `keepEmptyLines` option is given at the constructor),
   * it will ensure only one new line without empty lines in between.
   * To override this behavior, use the `n` parameter.
   *
   * Note that a new line added with this method will still show the
   * `nsSeparator`. To insert a full empty line, use the `empty()` method.
   *
   * @param n How many lines to add. By default it will add just one, but
   * specifying the number explicitly, it will override the `keepEmptyLines`
   * behavior just for this time setting it to true.
   * @returns Current instance for chaining
   */
  public nl(n?: number): this {
    const { keepEmptyLines } = this.options;
    const keepThisEmptyLines = keepEmptyLines || n! > 1;
    const nLines = keepThisEmptyLines
      ? 1
      : Math.max(0, n || (keepThisEmptyLines ? 1 : 0));
    this.options.keepEmptyLines = keepThisEmptyLines;
    if (nLines > 0) {
      this.#addString('\n'.repeat(nLines), true);
    }
    this.options.keepEmptyLines = keepEmptyLines;
    this.state.nl = true;
    return this;
  }

  /**
   * Add an empty line.
   *
   * Unlinke `nl()`, inserting an empty line with this method won't show any
   * prefix like the namespace or the `nsSeparator`.
   *
   * @param n How many empty lines to add (one by default)
   * @returns Current instance for chaining
   */
  public empty(n: number = 1): this {
    const nLines = Math.max(1, n);
    for (let i = 0; i < nLines; i++) {
      this.lines.push(EMPTY_LINE);
    }
    this.state.nl = true;
    return this;
  }

  /**
   * Clears the pending input
   *
   * @returns Current instance for chaining
   *
   * @example
   * ink.string('Fobar');
   * ink.clear();
   * ink.log(); // will output nothing
   */
  public clear(): this {
    this.lines = [];
    this.state.printNs = true;
    this.state.nl = false;
    return this;
  }

  /* Log methods */

  /**
   * Commit the constructed contents to the `log` level.
   *
   * Calling this without any contents does nothing.
   *
   * @returns Current instance for chaining
   */
  public log(): this {
    this.#flush('log');
    return this;
  }

  /**
   * Commit the constructed contents to the `info` level.
   *
   * Calling this without any contents does nothing.
   *
   * @returns Current instance for chaining
   */
  public info(): this {
    this.#flush('info');
    return this;
  }

  /**
   * Commit the constructed contents to the `warn` level.
   *
   * Calling this without any contents does nothing.
   *
   * @returns Current instance for chaining
   */
  public warn(): this {
    this.#flush('warn');
    return this;
  }

  /**
   * Commit the constructed contents to the `error` level.
   *
   * Calling this without any contents does nothing.
   *
   * @returns Current instance for chaining
   */
  public error(): this {
    this.#flush('error');
    return this;
  }

  /**
   * Increase a level of indentation.
   *
   * This also sets the next added content to appear in a new line.
   *
   * @returns Current instance for chaining
   */
  public push(): this {
    this.state.indent++;
    this.state.nl = true;
    return this;
  }

  /**
   * Decrease a level of indentation. If it's already on the first level, the
   * indentation level doesn't change.
   *
   * This also sets the next added content to appear in a new line.
   *
   * @returns Current instance for chaining
   */
  public pop(): this {
    if (this.state.indent > 0) {
      this.state.indent--;
    }
    this.state.nl = true;
    return this;
  }

  /**
   * Reset the level of indentation to zero.
   * The next added content will appear in a new line.
   *
   * @returns Current instance for chaining
   *
   * @since 0.2.0
   */
  public resetIndentation(): this {
    this.state.nl = true;
    this.state.indent = 0;
    return this;
  }

  /* Formatting methods */

  /**
   * Adds a raw string to log.
   *
   * @param str String to add.
   * @returns Current instance for chaining
   */
  public string(str: string): this {
    return this.#addString(str);
  }

  /**
   * Adds a number to the content to log.
   *
   * @param n Number to add.
   * @returns Current instance for chaining
   */
  public number(n: number | BigInt | string): this {
    const styler = typeof n === 'bigint' ? chalk.dim.yellow : chalk.yellow;
    return this.#addString(styler(n.toString()));
  }

  /**
   * Adds a number formatted as a percentage to the content to log.
   *
   * @param ratio Ratio being 0 = 0% and 1 = 100%
   * @param decimals Optional number of decimals to display. Defaults to 2.
   * @returns Current instance for chaining
   *
   * @since 0.2.0
   */
  public pctg(ratio: number, decimals: number = 2): this {
    return this.#addString(
      chalk.yellow((ratio * 100).toFixed(decimals)) + chalk.dim.yellow('%')
    );
  }

  /**
   * Adds a fraction `A/B` the content to log.
   *
   * @param numerator numerator of the fraction
   * @param denominator denominator of the fraction
   * @param showPctg whether to show the calcualted percentage of the fraction
   * @param pctgDecimals Optional number of decimals to display when `showPctg`
   * is true. Defaults to 2.
   * @returns Current instance for chaining
   *
   * @since 0.2.0
   */
  public fraction(
    numerator: number,
    denominator: number,
    showPctg?: boolean,
    pctgDecimals: number = 2
  ): this {
    this.#addString(`${chalk.yellow(numerator)}/${chalk.yellow(denominator)}`);
    if (showPctg) {
      this.#addString(
        ' (' +
          chalk.yellow(
            ((numerator / denominator) * 100).toFixed(pctgDecimals)
          ) +
          chalk.dim.yellow('%') +
          ')'
      );
    }
    return this;
  }

  /**
   * Adds a number to be formatted as a duration to the content log.
   *
   * @param ms Number of milliseconds to format as duration.
   * @returns Current instance for chaining
   */
  public duration(ms: number): this {
    return this.#addString(Inkdent.#formatDuration(ms));
  }

  /**
   * Adds a boolean to the content to log.
   *
   * @param data Data to log as a boolean (evaluated to `true` or `false`)
   * @returns Current instance for chaining
   */
  public bool(data: unknown): this {
    return this.#addString(chalk.yellow(data ? 'true' : 'false'));
  }

  /**
   * Adds a string formatted as a path to the content to log.
   *
   * @param path String to log as a path
   * @returns Current instance for chaining
   */
  public path(path: string): this {
    return this.#addString(chalk.green(path));
  }

  /**
   * Adss a string formatted as a link to the content to log.
   *
   * @param url URL to format
   * @returns Current instance for chaining
   *
   * @since 0.2.0
   */
  public link(url: string): this {
    return this.#addString(chalk.underline.blue(url));
  }

  /**
   * Adds a task to the content to log. It can be formatted with an optional
   * passed or failed result, and an optional duration.
   *
   * @param taskName Name to show for the task
   * @param variant Style to show for the task:
   *   - `undefined` will show just a list item
   *   - `true` will show a passed task
   *   - `false` will show a failed task
   * @param durationMs Duration of the task in milliseconds
   * @returns Current instance for chaining
   *
   * @see taskResult
   */
  public task(taskName: string, variant?: boolean, durationMs?: number): this {
    this.state.nl = true;
    this.#addString(
      (variant === undefined
        ? chalk.yellow('- ')
        : variant
          ? chalk.green('✓ ')
          : chalk.red('✗ ')) +
        taskName +
        (durationMs !== undefined
          ? ` ${Inkdent.#formatDuration(durationMs)}`
          : '')
    );
    this.state.nl = true;
    return this;
  }

  /**
   * Adds a task result to the content to log.
   *
   * Similar to `task()` but it doesn't show the task name, only the result. So
   * it can be used for asynchronous tasks to show first the name, and then the
   * result after it finishes.
   *
   * @param result Whether the task succeeded or not:
   *   - `true` will show a passed task
   *   - `false` will show a failed task
   * @param durationMs Duration of the task in milliseconds
   * @returns Current instance for chaining
   *
   * @example
   * ink.string('- Starting task...');
   * const t0 = Date.now();
   * try {
   *  await task();
   *  ink.taskResult(true, Date.now() - t0);
   * } catch {
   *  ink.taskResult(false, Date.now() - t0);
   * }
   * @since 0.2.0
   * @see task
   */
  public taskResult(result: boolean, durationMs?: number): this {
    this.#addString(
      (result ? chalk.green(' ✓') : chalk.red(' ✗')) +
        (durationMs !== undefined
          ? ` ${Inkdent.#formatDuration(durationMs)}`
          : '')
    );
    this.state.nl = true;
    return this;
  }

  /**
   * Adds a formatted symbol to the content to log.
   *
   * @param symbol Symbol to log
   * @returns Current instance for chaining
   */
  public symbol(symbol: Symbol): this {
    if (symbol.description) {
      this.#addString(
        chalk.gray('Symbol(') + chalk.cyan(symbol.description) + chalk.gray(')')
      );
    } else {
      this.#addString(chalk.gray('Symbol()'));
    }
    return this;
  }

  /**
   * Adds a formatted array of arbitrary data to the content to log.
   *
   * @param data Data to log.
   * @returns Current instance for chaining
   */
  public array<T>(data: T[]): this {
    this.#addString('[');
    data.forEach((item, i, arr) => {
      this.any(item);
      this.state.nl = false;
      if (i < arr.length - 1) {
        this.#addString(', ');
      }
    });
    this.#addString(']');
    return this;
  }

  /**
   * Adds a formatted, arbitrary object to the content to log.
   *
   * @param data Data to log.
   * @returns Current instance for chaining
   */
  public object<T extends object>(data: T | null): this {
    if (data === null) {
      this.#addString(chalk.red('null'));
    } else {
      this.#addString('{').nl().push();
      Object.entries(data).forEach(([key, value]) => {
        this.#addString(key + ': ');
        this.any(value);
        this.state.nl = false;
        this.#addString(',').nl();
      });
      this.pop().#addString('}').nl();
    }

    return this;
  }

  /**
   * Adds any kind of data to the content to log, but it can't properly format
   * some type of overlapping data (i.e. it can't detect a string as a path,
   * etc.)
   *
   * @param data Data to log.
   * @returns Current instance for chaining
   */
  public any(data: unknown): this {
    if (typeof data === 'string') {
      this.#addString(`"${data}"`);
    } else if (typeof data === 'number' || typeof data === 'bigint') {
      this.number(data);
    } else if (typeof data === 'boolean') {
      this.bool(data);
    } else if (typeof data === 'symbol') {
      this.symbol(data);
    } else if (Array.isArray(data)) {
      this.array(data);
    } else if (typeof data === 'object') {
      this.object(data);
    }
    return this;
  }

  /**
   * Adds tabulated data to the content to log.
   *
   * @param data Data to tabulate
   * @param options Optional options to override the defaults or the ones given
   * in the constructor
   * @returns Current instance for chaining
   */
  public table(data: unknown[][], options: TableOptions = {}): this {
    const opt = {
      ...this.options.styles.table,
      ...options,
    } as Required<TableOptions>;
    // Cells as rows x columns x lines of text
    const cells: string[][][] = [];
    const heights: number[] = [];
    const widths: number[] = [];

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const cellsRow: string[][] = [];
      heights[i] = 0;
      for (let j = 0; j < row.length; j++) {
        const cellLines = String(row[j]).split('\n');
        const cellWidths = Math.max(
          ...cellLines.map((line) => stripAnsi(line).length)
        );
        heights[i] = Math.max(heights[i], cellLines.length);
        widths[j] = Math.max(widths[j] ?? 0, cellWidths);
        cellsRow.push(cellLines);
      }
      cells.push(cellsRow);
    }

    if (opt.header) {
      heights.unshift(1);
      cells.unshift(
        opt.header.map((col, j) => {
          const lines = col.title.split('\n').map((line) => line);
          heights[0] = Math.max(heights[0], lines.length);
          const cellWidth = Math.max(
            ...lines.map((line) => stripAnsi(line).length)
          );
          widths[j] = Math.max(widths[j] ?? 0, cellWidth);
          return lines;
        })
      );
    }

    this.#addString(Inkdent.#getTableSeparatorLine('top', widths, opt)).nl();
    if (opt.header) {
      const alignments = opt.header.map(
        (col) => col.titleAlign ?? col.align ?? 'left'
      );
      const strings = Inkdent.#getTableRowContent(
        cells[0],
        widths,
        heights[0],
        opt,
        alignments
      );
      for (const str of strings) {
        this.#addString(str).nl();
      }
      this.#addString(
        Inkdent.#getTableSeparatorLine('header', widths, opt)
      ).nl();
    }
    const alignments = opt.header.map((col) => col.align ?? 'left');
    const cellSeparator = Inkdent.#getTableSeparatorLine(
      'separator',
      widths,
      opt
    );
    for (let i = opt.header ? 1 : 0; i < cells.length; i++) {
      const strings = Inkdent.#getTableRowContent(
        cells[i],
        widths,
        heights[i],
        opt,
        alignments
      );
      for (const str of strings) {
        this.#addString(str).nl();
      }
      if (i < cells.length - 1) {
        this.#addString(cellSeparator).nl();
      }
    }
    this.#addString(Inkdent.#getTableSeparatorLine('bottom', widths, opt)).nl();

    return this;
  }

  /* Private methods */

  #addString(str: string, fromNl: boolean = false): this {
    if (!str) return this;
    const splittedText = str.split('\n');
    const [text, ...lines] = this.options.keepEmptyLines
      ? splittedText
      : splittedText.filter((line) => line.length > 0);

    if (fromNl && !lines[lines.length - 1]) {
      lines.pop();
    }

    const ns = this.state.printNs ? this.state.ns : this.state.nsPad;
    const nsPad = this.state.nsPad;
    const indent = this.options.indent.repeat(this.state.indent);
    this.state.printNs = false;

    const lastLine = this.lines[this.lines.length - 1];
    if (this.state.nl || !lastLine || lastLine == EMPTY_LINE) {
      this.lines.push([ns, indent + text]);
      this.state.nl = false;
    } else {
      lastLine[1] += text;
    }
    if (lines.length > 0) {
      this.lines.push(
        ...lines.map((line) => [nsPad, indent + line] as [string, string])
      );
    }
    return this;
  }

  #flush(method: 'log' | 'info' | 'warn' | 'error'): void {
    if (!this.lines.length) return;
    const styler = this.options.styles[method];
    const { nsSeparator } = this.options;
    const separatorLine = styler ? styler(nsSeparator) : nsSeparator;
    console[method](
      this.lines
        .map((line) => {
          if (line === EMPTY_LINE) return '';
          return line[0] + separatorLine + line[1];
        })
        .join('\n')
    );
    this.lines = [];
    this.state.printNs = true;
  }

  static #formatDuration(durationMs: number): string {
    const ms = Math.floor(durationMs) % 1000;
    const secs = Math.floor(durationMs / 1000) % 60;
    const mins = Math.floor(durationMs / 60_000) % 60;
    const hours = Math.floor(durationMs / 3_600_000) % 24;
    const days = Math.floor(durationMs / 86_400_000);

    return [
      days > 0 &&
        `${chalk.green(days)}${chalk.dim.green(days > 1 ? 'days' : 'day')}`,
      hours > 0 && `${chalk.green(hours)}${chalk.dim.green('h')}`,
      mins > 0 && `${chalk.green(mins)}${chalk.dim.green('m')}`,
      secs > 0 && `${chalk.green(secs)}${chalk.dim.green('s')}`,
      `${chalk.green(ms)}${chalk.dim.green('ms')}`,
    ]
      .filter((str) => str !== false)
      .join(' ');
  }

  static #pickFields<T extends object>(
    defaults: T,
    from: T,
    opt: boolean | Partial<Record<keyof T, boolean>>
  ): T {
    if (opt === true) return { ...from };
    if (opt === false) return { ...defaults };
    return Object.keys(defaults).reduce(
      (res, field) => {
        if (opt[field as keyof T]) {
          res[field as keyof T] = from[field as keyof T];
        }
        return res;
      },
      { ...defaults }
    );
  }

  static #getTableRowContent(
    row: string[][],
    widths: number[],
    height: number,
    options: Required<TableOptions>,
    alignments: TextAlignment[]
  ): string[] {
    const lines: string[] = [];
    const { vertical, padding } = options;

    for (let i = 0; i < height; i++) {
      const rowLine = row.map((lines) => lines[i] ?? []);
      const line = widths
        .map((w, j) => {
          const text = Inkdent.#alignText(rowLine[j] ?? '', w, alignments[j]);
          return padding + text.padEnd(w, ' ') + padding;
        })
        .join(vertical);
      lines.push(vertical + line + vertical);
    }

    return lines;
  }

  static #getTableSeparatorLine(
    type: 'top' | 'header' | 'separator' | 'bottom',
    widths: number[],
    options: Required<TableOptions>
  ): string {
    let left: string, center: string, right: string, horizontal: string;
    const padding = options.padding;

    if (type === 'top') {
      left = options.topLeft;
      center = options.top;
      right = options.ropRight;
      horizontal = options.horizontal;
    } else if (type === 'bottom') {
      left = options.bottomLeft;
      center = options.bottom;
      right = options.bottomRight;
      horizontal = options.horizontal;
    } else {
      left = options.left;
      center = options.center;
      right = options.right;
      horizontal = options.horizontal;
    }

    if (!left || !horizontal || !right) return '';
    return (
      left +
      widths
        .map((w) => horizontal.padEnd(w + padding.length * 2, horizontal))
        .join(center) +
      right
    );
  }

  static #alignText(
    text: string,
    width: number,
    alignment: TextAlignment
  ): string {
    const textLength = stripAnsi(text).length;
    if (textLength >= width) return text;
    const space = ' '.repeat(width - textLength);
    if (alignment === 'left') {
      return text + space;
    } else if (alignment === 'right') {
      return space + text;
    } else {
      const leftSpace = Math.floor((width - textLength) / 2);
      const rightSpace = width - textLength - leftSpace;
      return ' '.repeat(leftSpace) + text + ' '.repeat(rightSpace);
    }
  }
}
