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

		<linearGradient id="{uid}-timeline" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color="var(--illustration-primary)" />
			<stop offset="100%" stop-color="var(--illustration-primary)" stop-opacity="0.08" />
		</linearGradient>

		<linearGradient id="{uid}-progress" x1="0" y1="0" x2="1" y2="0">
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
	<circle cx="120" cy="114" r="82" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="210" rx="58" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Activity card -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="48"
			y="40"
			width="144"
			height="152"
			rx="20"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Header -->
	<rect x="66" y="58" width="56" height="8" rx="4" fill="var(--illustration-secondary)" />
	<rect x="66" y="74" width="84" height="6" rx="3" fill="var(--illustration-secondary)" opacity="0.6" />
	<line x1="66" y1="92" x2="174" y2="92" stroke="var(--illustration-outline)" stroke-width="1.5" />

	<!-- Timeline spine -->
	<line
		x1="92"
		y1="108"
		x2="92"
		y2="162"
		stroke="url(#{uid}-timeline)"
		stroke-width="2"
	/>

	<!-- Active node + row -->
	<circle cx="92" cy="110" r="11" fill="var(--illustration-primary)" opacity="0.15" />
	<circle cx="92" cy="110" r="6" fill="var(--illustration-primary)" />
	<rect x="110" y="106" width="44" height="6" rx="3" fill="var(--illustration-secondary)" opacity="0.7" />
	<rect x="110" y="117" width="28" height="5" rx="2.5" fill="var(--illustration-secondary)" opacity="0.5" />

	<!-- Pending node + ghost row -->
	<circle
		cx="92"
		cy="138"
		r="5"
		fill="var(--illustration-surface)"
		stroke="var(--illustration-outline)"
		stroke-width="2"
	/>
	<rect
		x="110"
		y="134"
		width="50"
		height="7"
		rx="3.5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>

	<!-- Future node + ghost row (fades out) -->
	<circle
		cx="92"
		cy="162"
		r="5"
		fill="var(--illustration-surface)"
		stroke="var(--illustration-outline)"
		stroke-width="2"
		opacity="0.5"
	/>
	<rect
		x="110"
		y="158"
		width="36"
		height="7"
		rx="3.5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
		opacity="0.5"
	/>

	<!-- Progress indicator -->
	<rect x="66" y="176" width="110" height="6" rx="3" fill="var(--illustration-outline)" />
	<rect x="66" y="176" width="22" height="6" rx="3" fill="url(#{uid}-progress)" />

	<!-- Floating clock badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="190"
			cy="54"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<circle cx="190" cy="54" r="12" stroke="var(--illustration-primary)" stroke-width="2.5" />
	<line
		x1="190"
		y1="54"
		x2="190"
		y2="46"
		stroke="var(--illustration-primary)"
		stroke-width="2.5"
		stroke-linecap="round"
	/>
	<line
		x1="190"
		y1="54"
		x2="196"
		y2="58"
		stroke="var(--illustration-primary)"
		stroke-width="2.5"
		stroke-linecap="round"
	/>

	<!-- Decorative particles -->
	<circle cx="46" cy="176" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="200" cy="150" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M56 60l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
