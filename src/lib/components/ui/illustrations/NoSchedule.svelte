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
	<circle cx="120" cy="114" r="80" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="208" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Calendar card -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="52"
			y="48"
			width="136"
			height="140"
			rx="18"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Header -->
	<rect x="72" y="66" width="60" height="8" rx="4" fill="var(--illustration-secondary)" />
	<line x1="72" y1="86" x2="168" y2="86" stroke="var(--illustration-outline)" stroke-width="1.5" />

	<!-- Day grid (empty — no shifts assigned) -->
	<g stroke="var(--illustration-outline)" stroke-width="1.5" stroke-dasharray="2.5 2.5">
		<rect x="72" y="100" width="18" height="18" rx="5" fill="none" />
		<rect x="98" y="100" width="18" height="18" rx="5" fill="none" />
		<rect x="124" y="100" width="18" height="18" rx="5" fill="none" />
		<rect x="150" y="100" width="18" height="18" rx="5" fill="none" />

		<rect x="72" y="126" width="18" height="18" rx="5" fill="none" />
		<rect x="98" y="126" width="18" height="18" rx="5" fill="none" />
		<rect x="124" y="126" width="18" height="18" rx="5" fill="none" />
		<rect x="150" y="126" width="18" height="18" rx="5" fill="none" />

		<rect x="72" y="152" width="18" height="18" rx="5" fill="none" />
		<rect x="98" y="152" width="18" height="18" rx="5" fill="none" />
		<rect x="124" y="152" width="18" height="18" rx="5" fill="none" />
		<rect x="150" y="152" width="18" height="18" rx="5" fill="none" />
	</g>

	<!-- Today marker (highlighted, still empty) -->
	<rect
		x="98"
		y="100"
		width="18"
		height="18"
		rx="5"
		fill="none"
		stroke="var(--illustration-primary)"
		stroke-width="2"
		opacity="0.7"
	/>

	<!-- Floating mini-calendar badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="178"
			cy="168"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<rect
		x="170"
		y="161"
		width="16"
		height="14"
		rx="3"
		fill="none"
		stroke="var(--illustration-primary)"
		stroke-width="2"
	/>
	<line x1="174" y1="157" x2="174" y2="162" stroke="var(--illustration-primary)" stroke-width="2" stroke-linecap="round" />
	<line x1="182" y1="157" x2="182" y2="162" stroke="var(--illustration-primary)" stroke-width="2" stroke-linecap="round" />
	<line x1="171" y1="168" x2="185" y2="168" stroke="var(--illustration-secondary)" stroke-width="1.5" />

	<!-- Decorative sparkles -->
	<circle cx="46" cy="72" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="200" cy="96" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M56 168l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
