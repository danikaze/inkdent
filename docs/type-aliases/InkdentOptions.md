[**inkdent**](../README.md)

---

# Type Alias: InkdentOptions

```ts
type InkdentOptions = {
  indent?: string;
  keepEmptyLines?: boolean;
  ns?: string;
  nsPadding?: string | [string, string];
  nsSeparator?: string;
  styles?: Styles;
};
```

Defined in: [index.ts:4](https://github.com/danikaze/inkdent/blob/50865bd9a966fafb19fc7e36fb9495fead18c485/src/index.ts#L4)

## Properties

| Property                                               | Type                               | Description                                                        |
| ------------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------ |
| <a id="property-indent"></a> `indent?`                 | `string`                           | String used to indent levels (Default: 2 spaces `' '`)             |
| <a id="property-keepemptylines"></a> `keepEmptyLines?` | `boolean`                          | Whether to output empty lines (Default: `false`)                   |
| <a id="property-ns"></a> `ns?`                         | `string`                           | Default NameSpace to use                                           |
| <a id="property-nspadding"></a> `nsPadding?`           | `string` \| \[`string`, `string`\] | String around left and right of the namespace, with the same style |
| <a id="property-nsseparator"></a> `nsSeparator?`       | `string`                           | Separator between the namespace and the logged text                |
| <a id="property-styles"></a> `styles?`                 | [`Styles`](Styles.md)              | Custom styles to use                                               |
