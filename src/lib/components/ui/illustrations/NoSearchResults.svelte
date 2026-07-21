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
		<radialGradient id="{uid}-glow" cx="50%" cy="44%" r="55%">
			<stop offset="0%" stop-color="var(--illustration-glow)" />
			<stop offset="100%" stop-color="var(--illustration-glow)" stop-opacity="0" />
		</radialGradient>

		<linearGradient id="{uid}-ring" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="var(--illustration-secondary)" />
			<stop offset="100%" stop-color="var(--illustration-primary)" />
		</linearGradient>

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
	<circle cx="120" cy="116" r="80" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- List card (results underneath) -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="56"
			y="58"
			width="128"
			height="130"
			rx="16"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Faded ghost rows (no matches) -->
	<rect
		x="72"
		y="148"
		width="70"
		height="8"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
		opacity="0.55"
	/>
	<rect
		x="72"
		y="162"
		width="54"
		height="8"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
		opacity="0.55"
	/>
	<rect
		x="72"
		y="176"
		width="62"
		height="8"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
		opacity="0.4"
	/>

	<!-- Magnifying glass -->
	<line
		x1="128"
		y1="128"
		x2="152"
		y2="152"
		stroke="url(#{uid}-ring)"
		stroke-width="8"
		stroke-linecap="round"
	/>
	<circle
		cx="104"
		cy="104"
		r="32"
		fill="var(--illustration-outline)"
		fill-opacity="0.4"
		stroke="url(#{uid}-ring)"
		stroke-width="6"
	/>
	<path
		d="M88 92a20 20 0 0 1 18-12"
		stroke="var(--illustration-secondary)"
		stroke-width="2.5"
		stroke-linecap="round"
		opacity="0.6"
	/>

	<!-- Floating no-match badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="178"
			cy="160"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<line
		x1="170"
		y1="152"
		x2="186"
		y2="168"
		stroke="var(--illustration-secondary)"
		stroke-width="3"
		stroke-linecap="round"
	/>
	<line
		x1="186"
		y1="152"
		x2="170"
		y2="168"
		stroke="var(--illustration-secondary)"
		stroke-width="3"
		stroke-linecap="round"
	/>

	<!-- Decorative sparkles -->
	<circle cx="48" cy="76" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="196" cy="70" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M60 172l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
