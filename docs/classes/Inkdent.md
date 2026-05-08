[**inkdent**](../README.md)

---

# Class: Inkdent

Defined in: [index.ts:94](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L94)

Simple logging library with scoped indentation and semantical formatting.

## Constructors

### Constructor

```ts
new Inkdent(options?: InkdentOptions): Inkdent;
```

Defined in: [index.ts:99](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L99)

#### Parameters

| Parameter  | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `options?` | [`InkdentOptions`](../type-aliases/InkdentOptions.md) |

#### Returns

`Inkdent`

## Methods

### any()

```ts
any(data: unknown): this;
```

Defined in: [index.ts:558](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L558)

Adds any kind of data to the content to log, but it can't properly format
some type of overlapping data (i.e. it can't detect a string as a path,
etc.)

#### Parameters

| Parameter | Type      | Description  |
| --------- | --------- | ------------ |
| `data`    | `unknown` | Data to log. |

#### Returns

`this`

Current instance for chaining

---

### array()

```ts
array<T>(data: T[]): this;
```

Defined in: [index.ts:514](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L514)

Adds a formatted array of arbitrary data to the content to log.

#### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

#### Parameters

| Parameter | Type  | Description  |
| --------- | ----- | ------------ |
| `data`    | `T`[] | Data to log. |

#### Returns

`this`

Current instance for chaining

---

### bool()

```ts
bool(data: unknown): this;
```

Defined in: [index.ts:398](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L398)

Adds a boolean to the content to log.

#### Parameters

| Parameter | Type      | Description                                               |
| --------- | --------- | --------------------------------------------------------- |
| `data`    | `unknown` | Data to log as a boolean (evaluated to `true` or `false`) |

#### Returns

`this`

Current instance for chaining

---

### clear()

```ts
clear(): this;
```

Defined in: [index.ts:212](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L212)

Clears the pending input

#### Returns

`this`

Current instance for chaining

#### Example

```ts
ink.string('Fobar');
ink.clear();
ink.log(); // will output nothing
```

---

### clone()

```ts
clone(options?: CloneOptions): Inkdent;
```

Defined in: [index.ts:119](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L119)

Create a clone of the current instance.

By default, style options and namespace will be cloned, but other options
as well as the internal state can be included in the clone as well.

#### Parameters

| Parameter  | Type                                              | Description                                           |
| ---------- | ------------------------------------------------- | ----------------------------------------------------- |
| `options?` | [`CloneOptions`](../type-aliases/CloneOptions.md) | Options to change the behavior of the cloning process |

#### Returns

`Inkdent`

a copy of the current instance

---

### duration()

```ts
duration(ms: number): this;
```

Defined in: [index.ts:388](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L388)

Adds a number to be formatted as a duration to the content log.

#### Parameters

| Parameter | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `ms`      | `number` | Number of milliseconds to format as duration. |

#### Returns

`this`

Current instance for chaining

---

### empty()

```ts
empty(n?: number): this;
```

Defined in: [index.ts:193](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L193)

Add an empty line.

Unlinke `nl()`, inserting an empty line with this method won't show any
prefix like the namespace or the `nsSeparator`.

#### Parameters

| Parameter | Type     | Default value | Description                                  |
| --------- | -------- | ------------- | -------------------------------------------- |
| `n`       | `number` | `1`           | How many empty lines to add (one by default) |

#### Returns

`this`

Current instance for chaining

---

### error()

```ts
error(): this;
```

Defined in: [index.ts:264](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L264)

Commit the constructed contents to the `error` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining

---

### fraction()

```ts
fraction(
   numerator: number,
   denominator: number,
   showPctg?: boolean,
   pctgDecimals?: number): this;
```

Defined in: [index.ts:362](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L362)

Adds a fraction `A/B` the content to log.

#### Parameters

| Parameter       | Type      | Default value | Description                                                                    |
| --------------- | --------- | ------------- | ------------------------------------------------------------------------------ |
| `numerator`     | `number`  | `undefined`   | numerator of the fraction                                                      |
| `denominator`   | `number`  | `undefined`   | denominator of the fraction                                                    |
| `showPctg?`     | `boolean` | `undefined`   | whether to show the calcualted percentage of the fraction                      |
| `pctgDecimals?` | `number`  | `2`           | Optional number of decimals to display when `showPctg` is true. Defaults to 2. |

#### Returns

`this`

Current instance for chaining

#### Since

0.2.0

---

### info()

```ts
info(): this;
```

Defined in: [index.ts:240](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L240)

Commit the constructed contents to the `info` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining

---

### link()

```ts
link(url: string): this;
```

Defined in: [index.ts:420](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L420)

Adss a string formatted as a link to the content to log.

#### Parameters

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| `url`     | `string` | URL to format |

#### Returns

`this`

Current instance for chaining

#### Since

0.2.0

---

### log()

```ts
log(): this;
```

Defined in: [index.ts:228](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L228)

Commit the constructed contents to the `log` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining

---

### nl()

```ts
nl(n?: number): this;
```

Defined in: [index.ts:169](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L169)

Ensure a new line after the last logs.
By default (unless the `keepEmptyLines` option is given at the constructor),
it will ensure only one new line without empty lines in between.
To override this behavior, use the `n` parameter.

Note that a new line added with this method will still show the
`nsSeparator`. To insert a full empty line, use the `empty()` method.

#### Parameters

| Parameter | Type     | Description                                                                                                                                                                         |
| --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `n?`      | `number` | How many lines to add. By default it will add just one, but specifying the number explicitly, it will override the `keepEmptyLines` behavior just for this time setting it to true. |

#### Returns

`this`

Current instance for chaining

---

### ns()

```ts
ns(namespace: string, styler?: Styler): this;
```

Defined in: [index.ts:139](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L139)

Set the namespace to show on the log messages

#### Parameters

| Parameter   | Type                                  | Description                                        |
| ----------- | ------------------------------------- | -------------------------------------------------- |
| `namespace` | `string`                              | Namespace to set                                   |
| `styler?`   | [`Styler`](../type-aliases/Styler.md) | Optional style to apply instead of the default one |

#### Returns

`this`

Current instance for chaining

---

### number()

```ts
number(n: string | number | BigInt): this;
```

Defined in: [index.ts:330](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L330)

Adds a number to the content to log.

#### Parameters

| Parameter | Type                             | Description    |
| --------- | -------------------------------- | -------------- |
| `n`       | `string` \| `number` \| `BigInt` | Number to add. |

#### Returns

`this`

Current instance for chaining

---

### object()

```ts
object<T>(data: T | null): this;
```

Defined in: [index.ts:533](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L533)

Adds a formatted, arbitrary object to the content to log.

#### Type Parameters

| Type Parameter         |
| ---------------------- |
| `T` _extends_ `object` |

#### Parameters

| Parameter | Type          | Description  |
| --------- | ------------- | ------------ |
| `data`    | `T` \| `null` | Data to log. |

#### Returns

`this`

Current instance for chaining

---

### path()

```ts
path(path: string): this;
```

Defined in: [index.ts:408](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L408)

Adds a string formatted as a path to the content to log.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `path`    | `string` | String to log as a path |

#### Returns

`this`

Current instance for chaining

---

### pctg()

```ts
pctg(ratio: number, decimals?: number): this;
```

Defined in: [index.ts:344](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L344)

Adds a number formatted as a percentage to the content to log.

#### Parameters

| Parameter  | Type     | Default value | Description                                            |
| ---------- | -------- | ------------- | ------------------------------------------------------ |
| `ratio`    | `number` | `undefined`   | Ratio being 0 = 0% and 1 = 100%                        |
| `decimals` | `number` | `2`           | Optional number of decimals to display. Defaults to 2. |

#### Returns

`this`

Current instance for chaining

#### Since

0.2.0

---

### pop()

```ts
pop(): this;
```

Defined in: [index.ts:290](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L290)

Decrease a level of indentation. If it's already on the first level, the
indentation level doesn't change.

This also sets the next added content to appear in a new line.

#### Returns

`this`

Current instance for chaining

---

### push()

```ts
push(): this;
```

Defined in: [index.ts:276](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L276)

Increase a level of indentation.

This also sets the next added content to appear in a new line.

#### Returns

`this`

Current instance for chaining

---

### resetIndentation()

```ts
resetIndentation(): this;
```

Defined in: [index.ts:306](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L306)

Reset the level of indentation to zero.
The next added content will appear in a new line.

#### Returns

`this`

Current instance for chaining

#### Since

0.2.0

---

### string()

```ts
string(str: string): this;
```

Defined in: [index.ts:320](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L320)

Adds a raw string to log.

#### Parameters

| Parameter | Type     | Description    |
| --------- | -------- | -------------- |
| `str`     | `string` | String to add. |

#### Returns

`this`

Current instance for chaining

---

### symbol()

```ts
symbol(symbol: Symbol): this;
```

Defined in: [index.ts:497](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L497)

Adds a formatted symbol to the content to log.

#### Parameters

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| `symbol`  | `Symbol` | Symbol to log |

#### Returns

`this`

Current instance for chaining

---

### task()

```ts
task(
   taskName: string,
   variant?: boolean,
   durationMs?: number): this;
```

Defined in: [index.ts:438](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L438)

Adds a task to the content to log. It can be formatted with an optional
passed or failed result, and an optional duration.

#### Parameters

| Parameter     | Type      | Description                                                                                                                             |
| ------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `taskName`    | `string`  | Name to show for the task                                                                                                               |
| `variant?`    | `boolean` | Style to show for the task: - `undefined` will show just a list item - `true` will show a passed task - `false` will show a failed task |
| `durationMs?` | `number`  | Duration of the task in milliseconds                                                                                                    |

#### Returns

`this`

Current instance for chaining

#### See

taskResult

---

### taskResult()

```ts
taskResult(result: boolean, durationMs?: number): this;
```

Defined in: [index.ts:480](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L480)

Adds a task result to the content to log.

Similar to `task()` but it doesn't show the task name, only the result. So
it can be used for asynchronous tasks to show first the name, and then the
result after it finishes.

#### Parameters

| Parameter     | Type      | Description                                                                                           |
| ------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| `result`      | `boolean` | Whether the task succeeded or not: - `true` will show a passed task - `false` will show a failed task |
| `durationMs?` | `number`  | Duration of the task in milliseconds                                                                  |

#### Returns

`this`

Current instance for chaining

#### Example

```ts
ink.string('- Starting task...');
const t0 = Date.now();
try {
  await task();
  ink.taskResult(true, Date.now() - t0);
} catch {
  ink.taskResult(false, Date.now() - t0);
}
```

#### Since

0.2.0

#### See

task

---

### warn()

```ts
warn(): this;
```

Defined in: [index.ts:252](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L252)

Commit the constructed contents to the `warn` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining
