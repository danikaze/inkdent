[**inkdent**](../README.md)

---

# Class: Inkdent

Defined in: [index.ts:94](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L94)

Simple logging library with scoped indentation and semantical formatting.

## Constructors

### Constructor

```ts
new Inkdent(options?: InkdentOptions): Inkdent;
```

Defined in: [index.ts:99](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L99)

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

Defined in: [index.ts:430](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L430)

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

Defined in: [index.ts:386](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L386)

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

Defined in: [index.ts:320](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L320)

Adds a boolean to the content to log.

#### Parameters

| Parameter | Type      | Description                                               |
| --------- | --------- | --------------------------------------------------------- |
| `data`    | `unknown` | Data to log as a boolean (evaluated to `true` or `false`) |

#### Returns

`this`

Current instance for chaining

---

### clone()

```ts
clone(options?: CloneOptions): Inkdent;
```

Defined in: [index.ts:119](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L119)

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

Defined in: [index.ts:310](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L310)

Adds a number to be formatted as a duration and added to the content log.

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

Defined in: [index.ts:193](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L193)

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

Defined in: [index.ts:247](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L247)

Commit the constructed contents to the `error` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining

---

### info()

```ts
info(): this;
```

Defined in: [index.ts:223](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L223)

Commit the constructed contents to the `info` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining

---

### log()

```ts
log(): this;
```

Defined in: [index.ts:211](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L211)

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

Defined in: [index.ts:169](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L169)

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

Defined in: [index.ts:139](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L139)

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

Defined in: [index.ts:299](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L299)

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

Defined in: [index.ts:405](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L405)

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

Defined in: [index.ts:330](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L330)

Adds a string formated as a path to the content to log.

#### Parameters

| Parameter | Type     | Description             |
| --------- | -------- | ----------------------- |
| `path`    | `string` | String to log as a path |

#### Returns

`this`

Current instance for chaining

---

### pop()

```ts
pop(): this;
```

Defined in: [index.ts:273](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L273)

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

Defined in: [index.ts:259](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L259)

Increase a level of indentation.

This also sets the next added content to appear in a new line.

#### Returns

`this`

Current instance for chaining

---

### string()

```ts
string(str: string): this;
```

Defined in: [index.ts:289](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L289)

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

Defined in: [index.ts:369](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L369)

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

Defined in: [index.ts:346](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L346)

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

---

### warn()

```ts
warn(): this;
```

Defined in: [index.ts:235](https://github.com/danikaze/inkdent/blob/42d74910ab6f23a463aefc31f17fd9681508e938/src/index.ts#L235)

Commit the constructed contents to the `warn` level.

Calling this without any contents does nothing.

#### Returns

`this`

Current instance for chaining
