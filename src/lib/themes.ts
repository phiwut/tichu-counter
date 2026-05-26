/**
 * @file DaisyUI theme names available in the app.
 */

export const DAISYUI_THEMES = [
	'dark',
	'light',
	'cupcake',
	'bumblebee',
	'emerald',
	'corporate',
	'synthwave',
	'retro',
	'cyberpunk',
	'valentine',
	'halloween',
	'garden',
	'forest',
	'aqua',
	'lofi',
	'pastel',
	'fantasy',
	'wireframe',
	'black',
	'luxury',
	'dracula'
] as const;

export type DaisyTheme = (typeof DAISYUI_THEMES)[number];
