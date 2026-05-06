[**inkdent**](../README.md)

---

# Type Alias: CloneOptions

```ts
type CloneOptions = {
  options?: boolean | Partial<Record<keyof InkdentOptions, boolean>>;
  state?: boolean | Partial<Record<keyof InkdentState, boolean>>;
};
```

Defined in: [index.ts:37](https://github.com/danikaze/inkdent/blob/887bf9fd56767aa0dd0a97122855cee89c26b31a/src/index.ts#L37)

## Properties

| Property                                 | Type                                                                                            | Description                                                                                                                                                                                                                                            |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="property-options"></a> `options?` | \| `boolean` \| `Partial`\<`Record`\<keyof [`InkdentOptions`](InkdentOptions.md), `boolean`\>\> | Whether to clone the current instance options (`true`) or use the default options (`false`), or an object with what option to clone.                                                                                                                   |
| <a id="property-state"></a> `state?`     | \| `boolean` \| `Partial`\<`Record`\<keyof [`InkdentState`](InkdentState.md), `boolean`\>\>     | Whether to clone the whole current instance state (`true`) or use the default state (`false`), or an object with what option to clone (by default it clones the namespace and its padding to preserve the visual options (`{ ns: true, nsPad: true }`) |
