/**
 * The package's configuration constants, in one place.
 *
 * Reachable as **`aether-ui/constants`** — a dedicated entry point, because
 * these are the parts of the library a consumer may need without wanting any of
 * its components. The motivating case is a SvelteKit `+layout.server.ts` that
 * has to read the sidebar cookie the provider writes: importing the barrel to
 * get one string would drag every Svelte component into the server bundle. They
 * are re-exported from the main barrel too, so component-side code that already
 * imports `aether-ui` needs no second import.
 *
 * **Nothing in this file may import Svelte, or anything that does.** That is the
 * property the entry point sells; a single stray import silently makes it
 * useless for the case it exists for.
 *
 * ### What belongs here
 *
 * Cross-cutting values that are part of the **public contract** — a consumer has
 * to agree with them for their code to interoperate with the components. A
 * cookie name, a keyboard shortcut, the widths the layout is built around, the
 * breakpoint the responsive helpers switch at.
 *
 * ### What does not
 *
 * A component's internal styling tables (`ICON_SIZE_MAP`, `TIMELINE_ICON_SIZE`,
 * `FILE_TYPE_GROUPS`), its context keys, and its private helpers stay beside the
 * component. They are implementation, they change with it, and hoisting them
 * here would make this file know about every component in the library — which is
 * how a constants module becomes a junk drawer. The test is whether a *caller*
 * needs the value, not whether it happens to be a `const`.
 */

// ---------------------------------------------------------------------------
// Responsive
// ---------------------------------------------------------------------------

/**
 * The width, in px, below which the library's responsive helpers treat a
 * viewport as a phone. `IsMobile` builds its query from this, and `DataTable`'s
 * `responsiveMode="auto"` uses it as the default card threshold.
 *
 * Exported because consumers build their own layout rules against the same
 * boundary and a second hand-written 768 drifts silently — the failure is a
 * sidebar and a page body disagreeing about which mode they are in, with
 * nothing to point at.
 */
export const DEFAULT_MOBILE_BREAKPOINT = 768;

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

/**
 * The cookie `Sidebar.Provider` writes on every `setOpen`. An app that wants the
 * collapsed state to survive a reload has to read this same key back, which is
 * the reason this module has its own entry point — see the header.
 *
 * **`sidebar_state`, not `sidebar:state`** (the shadcn-svelte original, which
 * this was until 2026-08-13). A cookie name is a `token` (RFC 6265 §4.1.1), and
 * `token` excludes the separators listed in RFC 2616 §2.2 — `:` among them. So
 * the old name was never conformant; it worked only because browsers and the
 * `cookie` package parse liberally.
 *
 * Nothing rejects it *today* — `cookie@1`'s validator deliberately admits `:`
 * (its name pattern spans `!-:`, excluding only `;` and `=`). But
 * that library has already tightened its name validation once, the direction of
 * travel is toward the grammar, and upstream shadcn/ui renamed this constant for
 * the same reason. An underscore costs nothing and cannot be the thing that
 * breaks.
 *
 * The rename resets the stored preference once per browser — the sidebar comes
 * back at its default and is re-persisted on the next toggle. Deliberately no
 * fallback read of the old name: it is a boolean UI preference on a 7-day
 * cookie, and a migration shim for that would outlive the problem by years.
 */
export const SIDEBAR_COOKIE_NAME = "sidebar_state";

/** Lifetime of {@link SIDEBAR_COOKIE_NAME}, in seconds. Seven days. */
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/** Width of the expanded sidebar column. */
export const SIDEBAR_WIDTH = "16rem";

/** Width of the sheet the sidebar becomes below {@link DEFAULT_MOBILE_BREAKPOINT}. */
export const SIDEBAR_WIDTH_MOBILE = "18rem";

/** Width of the collapsed rail under `collapsible="icon"`. */
export const SIDEBAR_WIDTH_ICON = "3rem";

/** Toggles the sidebar with the platform's modifier (`cmd` / `ctrl`). */
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
