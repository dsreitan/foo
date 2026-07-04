/**
 * DAM (digital asset management) CDN — the future source for logos,
 * fonts, icons and imagery. Create one client per environment:
 *
 *   export const dam = createDam({ baseUrl: "https://dam.gyldendal.no" });
 *   <img src={dam.previewUrl("asset-id", { width: 240, format: "webp" })} ... />
 *
 * ASSUMPTION: endpoint shapes below (/original/:id and /preview/:id
 * with query params) are placeholders until the real DAM API docs
 * land — adjust here only; consumers go through this module.
 */

export interface DamConfig {
  /** Environment base URL, e.g. https://dam.gyldendal.no */
  baseUrl: string;
}

export interface DamPreviewOptions {
  /** Pixel width of the preview */
  width?: number;
  /** Pixel height of the preview */
  height?: number;
  /** 1–100 */
  quality?: number;
  /** Crop strategy applied server-side */
  crop?: "fit" | "fill" | "none";
  /** File ending of the preview */
  format?: "webp" | "avif" | "jpg" | "png";
}

export function createDam({ baseUrl }: DamConfig) {
  const base = baseUrl.replace(/\/+$/, "");

  return {
    /** The untouched uploaded file. */
    originalUrl(assetId: string): string {
      return `${base}/original/${encodeURIComponent(assetId)}`;
    },

    /** A derived preview with the requested size/quality/crop/format. */
    previewUrl(assetId: string, options: DamPreviewOptions = {}): string {
      const params = new URLSearchParams();
      if (options.width !== undefined) params.set("width", String(options.width));
      if (options.height !== undefined) params.set("height", String(options.height));
      if (options.quality !== undefined) params.set("quality", String(options.quality));
      if (options.crop) params.set("crop", options.crop);
      if (options.format) params.set("format", options.format);
      const query = params.toString();
      return `${base}/preview/${encodeURIComponent(assetId)}${query ? `?${query}` : ""}`;
    },
  };
}

export type DamClient = ReturnType<typeof createDam>;
