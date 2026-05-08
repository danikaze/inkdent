[**inkdent**](../README.md)

---

# Type Alias: InkdentState

```ts
type InkdentState = {
  indent: number;
  nl: boolean;
  ns: string;
  nsPad: string;
  printNs: boolean;
};
```

Defined in: [index.ts:24](https://github.com/danikaze/inkdent/blob/5874b67e1db4fd33214fb7d2ccd7cecc1503e79c/src/index.ts#L24)

Internal state of a `Inkdent` instance.

## Properties

| Property                                | Type      | Description                                    |
| --------------------------------------- | --------- | ---------------------------------------------- |
| <a id="property-indent"></a> `indent`   | `number`  | Current level of indentation                   |
| <a id="property-nl"></a> `nl`           | `boolean` | Whether the next input requires a new line     |
| <a id="property-ns"></a> `ns`           | `string`  | Current namespace                              |
| <a id="property-nspad"></a> `nsPad`     | `string`  | Space to print when the ns is not printed      |
| <a id="property-printns"></a> `printNs` | `boolean` | Whether to show the namespace on the next line |
