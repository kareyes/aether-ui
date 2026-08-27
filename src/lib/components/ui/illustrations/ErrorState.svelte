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
		<radialGradient id="{uid}-glow" cx="50%" cy="46%" r="55%">
			<stop offset="0%" stop-color="var(--aether-danger)" stop-opacity="0.24" />
			<stop offset="100%" stop-color="var(--aether-danger)" stop-opacity="0" />
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
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--aether-danger)" opacity="0.12" />

	<!-- Backdrop disc -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="120"
			cy="104"
			r="64"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Soft ring -->
	<circle cx="120" cy="104" r="48" stroke="var(--aether-danger)" stroke-width="3" opacity="0.25" />

	<!-- Error core -->
	<circle cx="120" cy="104" r="34" fill="var(--aether-danger)" />
	<line
		x1="120"
		y1="90"
		x2="120"
		y2="108"
		stroke="var(--destructive-foreground)"
		stroke-width="6"
		stroke-linecap="round"
	/>
	<circle cx="120" cy="118" r="3.5" fill="var(--destructive-foreground)" />

	<!-- Broken link -->
	<ellipse
		cx="64"
		cy="168"
		rx="9"
		ry="6"
		stroke="var(--illustration-outline)"
		stroke-width="2.5"
		transform="rotate(-20 64 168)"
	/>
	<ellipse
		cx="86"
		cy="178"
		rx="9"
		ry="6"
		stroke="var(--illustration-outline)"
		stroke-width="2.5"
		opacity="0.5"
		transform="rotate(-20 86 178)"
	/>

	<!-- Floating alert badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="180"
			cy="64"
			r="20"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<path
		d="M180 54l9 16h-18z"
		stroke="var(--aether-danger)"
		stroke-width="2"
		stroke-linejoin="round"
	/>
	<line x1="180" y1="59" x2="180" y2="64" stroke="var(--aether-danger)" stroke-width="2" stroke-linecap="round" />
	<circle cx="180" cy="67.5" r="1.3" fill="var(--aether-danger)" />

	<!-- Decorative sparkles -->
	<circle cx="200" cy="130" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="52" cy="100" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M196 58l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
