/**
 * USDA Hardiness Zone lookup via phzmapi.org
 * Free, no API key required. Accepts 5-digit US ZIP codes.
 */
export async function getZoneFromZip(zip: string): Promise<string | null> {
  if (zip.length !== 5 || !/^\d{5}$/.test(zip)) return null;
  try {
    const response = await fetch(`https://phzmapi.org/${zip}.json`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    // Response shape: { zone: "7a", temperature_range: "...", ... }
    return typeof data.zone === 'string' ? data.zone : null;
  } catch {
    return null;
  }
}
