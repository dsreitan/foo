# DAM asset CDN

Logos, fonts, icons and imagery will be served from the DAM CDN.
`createDam` in `packages/kobber/src/assets/dam.ts` is the single entry
point — one client per environment:

```ts
import { createDam } from "kobber";

const dam = createDam({ baseUrl: "https://dam.gyldendal.no" });

dam.originalUrl("asset-id");
// -> https://dam.gyldendal.no/original/asset-id

dam.previewUrl("asset-id", { width: 240, quality: 80, crop: "fill", format: "webp" });
// -> https://dam.gyldendal.no/preview/asset-id?width=240&quality=80&crop=fill&format=webp
```

**The endpoint paths and query names are assumptions** until the real DAM
API documentation lands. When it does, adjust `dam.ts` only — components
and apps must never build DAM URLs by hand.

Planned consumers: `Logo` (replace the placeholder wordmark with a DAM
image), the demo app's `@font-face` for PP Mori, and the icon set.
