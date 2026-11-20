import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Reads a brand SVG from /public and returns it as a data URI with the given fill colour. */
export async function brandSvgDataUri(file: string, fill: string) {
  const svg = await readFile(join(process.cwd(), "public", file), "utf8");
  const coloured = svg.replace(/currentColor/g, fill);
  return `data:image/svg+xml;base64,${Buffer.from(coloured).toString("base64")}`;
}


/** Reads a bundled TTF (SIL OFL, from Google Fonts) for ImageResponse. */
export async function loadFont(file: string) {
  const buf = await readFile(join(process.cwd(), "src/assets/fonts", file));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}
