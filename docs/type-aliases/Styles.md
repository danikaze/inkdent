[**inkdent**](../README.md)

---

# Type Alias: Styles

```ts
type Styles = {
  error?: Styler;
  info?: Styler;
  log?: Styler;
  warn?: Styler;
};
```

Defined in: [index.ts:55](https://github.com/danikaze/inkdent/blob/50865bd9a966fafb19fc7e36fb9495fead18c485/src/index.ts#L55)

Object defining the styles to use for each log level

## Properties

| Property                             | Type                  | Description                              |
| ------------------------------------ | --------------------- | ---------------------------------------- |
| <a id="property-error"></a> `error?` | [`Styler`](Styler.md) | Defines the color of the `error()` level |
| <a id="property-info"></a> `info?`   | [`Styler`](Styler.md) | Defines the color of the `info()` level  |
| <a id="property-log"></a> `log?`     | [`Styler`](Styler.md) | Defines the color of the `log()` level   |
| <a id="property-warn"></a> `warn?`   | [`Styler`](Styler.md) | Defines the color of the `warn()` level  |
