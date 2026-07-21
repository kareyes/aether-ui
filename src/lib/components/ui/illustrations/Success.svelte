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
			<stop offset="0%" stop-color="var(--aether-success)" stop-opacity="0.28" />
			<stop offset="100%" stop-color="var(--aether-success)" stop-opacity="0" />
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
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--aether-success)" opacity="0.12" />

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
	<circle cx="120" cy="104" r="48" stroke="var(--aether-success)" stroke-width="3" opacity="0.25" />

	<!-- Success core -->
	<circle cx="120" cy="104" r="34" fill="var(--aether-success)" />
	<path
		d="M104 104l11 11 22-22"
		stroke="var(--success-foreground)"
		stroke-width="6"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>

	<!-- Floating sparkle badge -->
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
		d="M180 54l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"
		fill="var(--aether-success)"
	/>

	<!-- Confetti -->
	<rect
		x="50"
		y="56"
		width="8"
		height="8"
		rx="1.5"
		fill="var(--aether-warning)"
		transform="rotate(45 54 60)"
	/>
	<rect
		x="182"
		y="150"
		width="10"
		height="4"
		rx="2"
		fill="var(--aether-success)"
		opacity="0.75"
		transform="rotate(-20 187 152)"
	/>
	<circle cx="54" cy="160" r="3" fill="var(--illustration-secondary)" />
	<circle cx="200" cy="102" r="2.5" fill="var(--illustration-secondary)" />
	<path
		d="M66 182l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
