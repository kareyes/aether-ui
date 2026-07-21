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
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Report card -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="50"
			y="50"
			width="140"
			height="130"
			rx="18"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Header -->
	<rect x="68" y="68" width="50" height="8" rx="4" fill="var(--illustration-secondary)" />
	<rect x="68" y="84" width="76" height="6" rx="3" fill="var(--illustration-secondary)" opacity="0.6" />

	<!-- Baseline -->
	<line x1="68" y1="160" x2="172" y2="160" stroke="var(--illustration-outline)" stroke-width="1.5" />

	<!-- Ghost bars (flat — no data recorded) -->
	<rect
		x="76"
		y="150"
		width="14"
		height="10"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>
	<rect
		x="100"
		y="152"
		width="14"
		height="8"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>
	<rect
		x="124"
		y="148"
		width="14"
		height="12"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>
	<rect
		x="148"
		y="153"
		width="14"
		height="7"
		rx="4"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>

	<!-- Floating chart badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="182"
			cy="62"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<rect x="173" y="58" width="4" height="12" rx="1.5" fill="var(--illustration-primary)" />
	<rect x="180" y="52" width="4" height="18" rx="1.5" fill="var(--illustration-primary)" />
	<rect x="187" y="62" width="4" height="8" rx="1.5" fill="var(--illustration-secondary)" />

	<!-- Decorative sparkles -->
	<circle cx="46" cy="168" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="60" cy="60" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M198 138l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
