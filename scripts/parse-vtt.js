/**
 * A single parsed caption cue.
 * @typedef {Object} VTTCue
 * @property {number} start - Cue start time, in seconds.
 * @property {number} end - Cue end time, in seconds.
 * @property {string} text - Cue text with all VTT markup stripped.
 */

/**
 * Parse the raw text of a WebVTT file into an array of caption cues.
 *
 * Handles BOM/CRLF normalization, optional cue IDs, trailing cue settings,
 * inline VTT tags, and SRT-style comma decimal separators.
 *
 * @param {string} vttText - The raw contents of a `.vtt` file.
 * @returns {VTTCue[]} The parsed cues, in document order.
 */
export function parseVTT(vttText) {
  // Normalize line endings and strip BOM
  const normalized = vttText
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");

  const blocks = normalized.split(/\n{2,}/);
  const cues = [];

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (!lines.length) continue;

    // Skip WEBVTT header, NOTE blocks, STYLE blocks, REGION blocks
    const firstLine = lines[0].trim();
    if (
      firstLine.startsWith("WEBVTT") ||
      firstLine.startsWith("NOTE") ||
      firstLine.startsWith("STYLE") ||
      firstLine.startsWith("REGION")
    )
      continue;

    // Find the timestamp line (may be preceded by an optional cue id)
    let timingLineIdx = 0;
    if (!lines[0].includes("-->") && lines.length > 1) {
      timingLineIdx = 1;
    }

    const timingLine = lines[timingLineIdx];
    if (!timingLine || !timingLine.includes("-->")) continue;

    const arrowIdx = timingLine.indexOf("-->");
    const startStr = timingLine.slice(0, arrowIdx).trim();
    // Strip any trailing cue settings after the end timestamp
    const endStr = timingLine
      .slice(arrowIdx + 3)
      .trim()
      .split(/\s+/)[0];

    const start = parseVTTTime(startStr);
    const end = parseVTTTime(endStr);

    if (isNaN(start) || isNaN(end)) continue;

    // All remaining lines after the timing line are cue text
    const rawText = lines
      .slice(timingLineIdx + 1)
      .join("\n")
      .trim();
    // Strip VTT tags like <v Speaker>, <c>, <00:00:10.500>, etc.
    const text = rawText.replace(/<[^>]+>/g, "").trim();

    if (!text) continue;

    cues.push({ start, end, text });
  }

  return cues;
}

/**
 * Convert a VTT/SRT timestamp to a number of seconds.
 *
 * Accepts `HH:MM:SS.mmm` or `MM:SS.mmm`, with either `.` or `,` as the
 * decimal separator.
 *
 * @param {string} timeString - A timestamp like `"00:01:23.456"`.
 * @returns {number} The time in seconds, or `NaN` if it can't be parsed.
 */
function parseVTTTime(timeString) {
  const parts = timeString.trim().split(":");
  let hours = 0,
    minutes = 0,
    seconds = 0;

  if (parts.length === 3) {
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
    seconds = parseFloat(parts[2].replace(",", "."));
  } else if (parts.length === 2) {
    minutes = parseInt(parts[0], 10);
    seconds = parseFloat(parts[1].replace(",", "."));
  } else {
    return NaN;
  }

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return NaN;
  return hours * 3600 + minutes * 60 + seconds;
}
