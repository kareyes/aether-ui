<script lang="ts">
	interface Props {
		size?: number;
		class?: string;
	}

	let { size = 240, class: className = "" }: Props = $props();

	const uid = $props.id();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 240 240"
	role="img"
	aria-hidden="true"
	focusable="false"
	class={className}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<defs>
		<radialGradient id="{uid}-glow" cx="50%" cy="42%" r="55%">
			<stop offset="0%" stop-color="var(--illustration-glow)" />
			<stop offset="100%" stop-color="var(--illustration-glow)" stop-opacity="0" />
		</radialGradient>

		<filter id="{uid}-blur" x="-60%" y="-60%" width="220%" height="220%">
			<feGaussianBlur stdDeviation="20" />
		</filter>

		<filter id="{uid}-shadow" x="-40%" y="-40%" width="180%" height="180%">
			<feDropShadow
				dx="0"
				dy="12"
				stdDeviation="16"
				flood-color="var(--illustration-shadow)"
			/>
		</filter>
	</defs>

	<!-- Ambient glow -->
	<circle cx="120" cy="104" r="80" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Backdrop disc -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="118"
			cy="98"
			r="58"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Cloud (sync target, unreachable) -->
	<path
		d="M94 116c-9.9 0-18-8.1-18-18c0-9.4 7.2-17.1 16.4-17.9C93 70.3 101.6 64 112 64c11.6 0 21.2 8.4 22.9 19.4C143.9 84.8 150 92.2 150 101c0 9.9-8.1 18-18 18H94Z"
		fill="var(--illustration-outline)"
	/>

	<!-- Offline slash -->
	<line
		x1="76"
		y1="76"
		x2="156"
		y2="126"
		stroke="var(--aether-warning)"
		stroke-width="5"
		stroke-linecap="round"
	/>

	<!-- Pending sync trail -->
	<line
		x1="118"
		y1="128"
		x2="118"
		y2="140"
		stroke="var(--illustration-outline)"
		stroke-width="2"
		stroke-dasharray="2 3"
		stroke-linecap="round"
	/>
	<circle cx="118" cy="148" r="3" fill="var(--illustration-outline)" opacity="0.7" />
	<circle cx="118" cy="158" r="2.5" fill="var(--illustration-outline)" opacity="0.45" />
	<circle cx="118" cy="167" r="2" fill="var(--illustration-outline)" opacity="0.25" />

	<!-- Floating no-signal badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="176"
			cy="152"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<path
		d="M164 148a17 17 0 0 1 24 0"
		stroke="var(--aether-warning)"
		stroke-width="2.5"
		stroke-linecap="round"
		opacity="0.6"
	/>
	<path
		d="M170 154a9 9 0 0 1 12 0"
		stroke="var(--aether-warning)"
		stroke-width="2.5"
		stroke-linecap="round"
	/>
	<circle cx="176" cy="161" r="2.5" fill="var(--aether-warning)" />
	<line
		x1="164"
		y1="144"
		x2="188"
		y2="167"
		stroke="var(--aether-warning)"
		stroke-width="3"
		stroke-linecap="round"
	/>

	<!-- Decorative sparkles -->
	<circle cx="48" cy="70" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="196" cy="86" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M56 158l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
