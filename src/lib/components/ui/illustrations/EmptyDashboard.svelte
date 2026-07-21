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
	<circle cx="120" cy="118" r="82" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="210" rx="58" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Dashboard card -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="44"
			y="48"
			width="152"
			height="140"
			rx="18"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Stat tile 1 -->
	<rect
		x="60"
		y="64"
		width="58"
		height="48"
		rx="10"
		fill="var(--illustration-outline)"
	/>
	<rect
		x="70"
		y="76"
		width="24"
		height="10"
		rx="3"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>
	<rect x="70" y="94" width="32" height="5" rx="2.5" fill="var(--illustration-secondary)" opacity="0.5" />

	<!-- Stat tile 2 -->
	<rect
		x="122"
		y="64"
		width="58"
		height="48"
		rx="10"
		fill="var(--illustration-outline)"
	/>
	<rect
		x="132"
		y="76"
		width="24"
		height="10"
		rx="3"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>
	<rect x="132" y="94" width="28" height="5" rx="2.5" fill="var(--illustration-secondary)" opacity="0.5" />

	<!-- Trend widget (flat — no activity) -->
	<rect
		x="60"
		y="122"
		width="120"
		height="48"
		rx="10"
		fill="var(--illustration-outline)"
	/>
	<path
		d="M72 146h96"
		stroke="var(--illustration-outline)"
		stroke-width="2"
		stroke-dasharray="4 4"
	/>
	<circle cx="96" cy="146" r="2.5" fill="var(--illustration-surface)" stroke="var(--illustration-outline)" stroke-width="1.5" />
	<circle cx="132" cy="146" r="2.5" fill="var(--illustration-surface)" stroke="var(--illustration-outline)" stroke-width="1.5" />
	<circle cx="156" cy="146" r="2.5" fill="var(--illustration-surface)" stroke="var(--illustration-outline)" stroke-width="1.5" />

	<!-- Floating widgets badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="184"
			cy="56"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<rect x="176" y="48" width="6" height="6" rx="1.5" fill="var(--illustration-primary)" />
	<rect x="185" y="48" width="6" height="6" rx="1.5" fill="var(--illustration-secondary)" />
	<rect x="176" y="57" width="6" height="6" rx="1.5" fill="var(--illustration-secondary)" />
	<rect x="185" y="57" width="6" height="6" rx="1.5" fill="var(--illustration-primary)" />

	<!-- Decorative sparkles -->
	<circle cx="42" cy="164" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="204" cy="130" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M52 62l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
