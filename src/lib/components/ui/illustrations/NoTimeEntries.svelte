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
	<circle cx="120" cy="116" r="80" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="208" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- List card -->
	<g filter="url(#{uid}-shadow)">
		<rect
			x="54"
			y="46"
			width="132"
			height="142"
			rx="18"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>

	<!-- Column headers -->
	<rect x="72" y="64" width="36" height="6" rx="3" fill="var(--illustration-secondary)" opacity="0.6" />
	<rect x="148" y="64" width="24" height="6" rx="3" fill="var(--illustration-secondary)" opacity="0.6" />
	<line x1="72" y1="80" x2="172" y2="80" stroke="var(--illustration-outline)" stroke-width="1.5" />

	<!-- Empty rows -->
	<circle
		cx="80"
		cy="99"
		r="5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="2.5 2.5"
	/>
	<rect
		x="94"
		y="94"
		width="78"
		height="10"
		rx="5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>

	<circle
		cx="80"
		cy="119"
		r="5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="2.5 2.5"
	/>
	<rect
		x="94"
		y="114"
		width="78"
		height="10"
		rx="5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
	/>

	<circle
		cx="80"
		cy="139"
		r="5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="2.5 2.5"
		opacity="0.55"
	/>
	<rect
		x="94"
		y="134"
		width="78"
		height="10"
		rx="5"
		fill="none"
		stroke="var(--illustration-outline)"
		stroke-width="1.5"
		stroke-dasharray="3 3"
		opacity="0.55"
	/>

	<!-- Floating add-entry badge -->
	<g filter="url(#{uid}-shadow)">
		<circle cx="182" cy="168" r="22" fill="var(--illustration-primary)" />
	</g>
	<line
		x1="182"
		y1="160"
		x2="182"
		y2="176"
		stroke="var(--primary-foreground)"
		stroke-width="3.5"
		stroke-linecap="round"
	/>
	<line
		x1="174"
		y1="168"
		x2="190"
		y2="168"
		stroke="var(--primary-foreground)"
		stroke-width="3.5"
		stroke-linecap="round"
	/>

	<!-- Decorative sparkles -->
	<circle cx="48" cy="70" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="198" cy="98" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M56 158l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
