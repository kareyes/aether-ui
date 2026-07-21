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
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Map card -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="52"
			y="50"
			width="136"
			height="130"
			rx="18"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Map texture -->
	<path
		d="M62 76c20 6 30 22 24 40"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 4"
		opacity="0.5"
	/>
	<path
		d="M178 96c-18 4-30 18-26 38"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 4"
		opacity="0.5"
	/>
	<circle cx="70" cy="150" r="2" fill="var(--illustration-secondary)" opacity="0.5" />
	<circle cx="168" cy="70" r="2" fill="var(--illustration-secondary)" opacity="0.5" />

	<!-- Empty pin placeholder -->
	<path
		d="M120 62c-16.6 0-30 13.4-30 30c0 22.5 30 58 30 58s30-35.5 30-58c0-16.6-13.4-30-30-30z"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="2"
		stroke-dasharray="4 4"
	/>
	<circle
		cx="120"
		cy="92"
		r="9"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="2.5 2.5"
	/>

	<!-- Floating unassigned-pin badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="182"
			cy="64"
			r="22"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<path
		d="M182 55c-4.4 0-8 3.6-8 8c0 6.4 8 16 8 16s8-9.6 8-16c0-4.4-3.6-8-8-8z"
		fill="var(--illustration-primary)"
	/>
	<line
		x1="173"
		y1="55"
		x2="191"
		y2="73"
		stroke="var(--illustration-secondary)"
		stroke-width="2.5"
		stroke-linecap="round"
	/>

	<!-- Decorative sparkles -->
	<circle cx="46" cy="168" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="200" cy="150" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M60 60l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
