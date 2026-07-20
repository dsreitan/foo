# DAM asset CDN

This is a reference proposal, not a verified DAM contract. The PoC
used placeholder icons, a system-font fallback and a wordmark logo; it
never connected to a live DAM.

The PoC assumed that logos, fonts, icons and imagery would be served
from a DAM CDN, with `createDam` as one client per environment:

```ts
import { createDam } from "kobber";

const dam = createDam({ baseUrl: "https://dam.gyldendal.no" });

dam.originalUrl("asset-id");
// -> https://dam.gyldendal.no/original/asset-id

dam.previewUrl("asset-id", { width: 240, quality: 80, crop: "fill", format: "webp" });
// -> https://dam.gyldendal.no/preview/asset-id?width=240&quality=80&crop=fill&format=webp
```

**The endpoint paths and query names are assumptions.** The real
repository must confirm authentication, asset IDs, transforms, caching,
privacy and failure behavior against official DAM documentation before
adopting any API shape. Keep the useful principle—centralize URL
construction—but do not copy `dam.ts` as a contract.

Potential consumers in the real system are Logo, PP Mori font files and
the icon set. App-level font loading and product imagery should remain
consumer concerns unless Kobber explicitly owns their delivery.
