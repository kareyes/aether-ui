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
		<radialGradient id="{uid}-glow" cx="50%" cy="50%" r="50%">
			<stop offset="0%" stop-color="var(--illustration-glow)" />
			<stop offset="100%" stop-color="var(--illustration-glow)" stop-opacity="0" />
		</radialGradient>

		<linearGradient id="{uid}-ring" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0%" stop-color="var(--illustration-secondary)" />
			<stop offset="100%" stop-color="var(--illustration-primary)" />
		</linearGradient>

		<filter id="{uid}-blur" x="-60%" y="-60%" width="220%" height="220%">
			<feGaussianBlur stdDeviation="18" />
		</filter>

		<filter id="{uid}-shadow" x="-40%" y="-40%" width="180%" height="180%">
			<feDropShadow
				dx="0"
				dy="10"
				stdDeviation="14"
				flood-color="var(--illustration-shadow)"
			/>
		</filter>
	</defs>

	<!-- Ambient glow -->
	<circle cx="120" cy="108" r="76" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="200" rx="58" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Clock face -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="120"
			cy="108"
			r="56"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Inner ring -->
	<circle cx="120" cy="108" r="40" stroke="url(#{uid}-ring)" stroke-width="4" opacity="0.9" />

	<!-- Hour marks -->
	<circle cx="120" cy="68" r="2.5" fill="var(--illustration-primary)" opacity="0.7" />
	<circle cx="120" cy="148" r="2.5" fill="var(--illustration-primary)" opacity="0.7" />
	<circle cx="80" cy="108" r="2.5" fill="var(--illustration-primary)" opacity="0.7" />
	<circle cx="160" cy="108" r="2.5" fill="var(--illustration-primary)" opacity="0.7" />

	<!-- Hands -->
	<line
		x1="120"
		y1="108"
		x2="120"
		y2="86"
		stroke="var(--illustration-secondary)"
		stroke-width="4"
		stroke-linecap="round"
	/>
	<line
		x1="120"
		y1="108"
		x2="140"
		y2="122"
		stroke="var(--illustration-secondary)"
		stroke-width="4"
		stroke-linecap="round"
	/>
	<circle cx="120" cy="108" r="5" fill="var(--illustration-secondary)" />

	<!-- Floating success badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="172"
			cy="156"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<path
		d="M162 156l7 7 12-14"
		stroke="var(--aether-success)"
		stroke-width="3.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>

	<!-- Decorative sparkles -->
	<circle cx="54" cy="66" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="52" cy="146" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M190 54l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
