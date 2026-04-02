/* ------------------------------------------------------------------ */
/*  Win95-ish theme. All the colors and bevel shadows live here.      */
/* ------------------------------------------------------------------ */

// Core greys
export const GREY_BG = '#e8e8e8';        // Primary background
export const GREY_ALT = '#d8d8d8';        // Alternating row darker
export const GREY_DARK = '#808080';       // Borders, dividers
export const GREY_SKELETON = '#a0a0a0';   // Skeleton loader blocks
export const GREY_HEADER = '#a0a0a0';     // Table header bg

// Blues
export const BLUE_PRIMARY = '#135997';    // Section headers, title bars, active tabs
export const BLUE_DARK = '#0d3d6e';       // Inactive nav, header border
export const BLUE_ACTIVE = '#0a2a4a';     // Active nav button
export const BLUE_NAVY = '#000080';       // Accent text (wind speed, low temps)

// Text
export const TEXT_BLACK = '#000';
export const TEXT_DARK = '#444';
export const TEXT_RED = '#cc0000';        // High temps, extreme severity
export const TEXT_LINK = '#135997';        // Links

// Alert severity
export const SEVERITY = {
  Extreme: '#cc0000',
  Severe:  '#e06000',
  Moderate:'#cc9900',
  Minor:   '#669900',
};

// grey bevels — the classic Win95 raised/sunken look
export const BEVEL_RAISED = 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf';
export const BEVEL_SUNKEN = 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080';

// blue bevels for the title bars and active nav tabs
export const BEVEL_BLUE_RAISED = 'inset -1px -1px #051a30, inset 1px 1px #7abcf0, inset -2px -2px #0a2a4a, inset 2px 2px #4a8abf';
export const BEVEL_BLUE_SUNKEN = 'inset -1px -1px #7abcf0, inset 1px 1px #051a30, inset -2px -2px #4a8abf, inset 2px 2px #0a2a4a';

// handy style presets so we're not copy-pasting everywhere
export const titleBarStyle = {
  background: BLUE_PRIMARY,
  color: '#fff',
  fontWeight: 'bold',
  boxShadow: BEVEL_BLUE_RAISED,
};

export const panelStyle = {
  background: GREY_BG,
  boxShadow: BEVEL_RAISED,
};

export const sunkenPanelStyle = {
  background: GREY_BG,
  boxShadow: BEVEL_SUNKEN,
};
