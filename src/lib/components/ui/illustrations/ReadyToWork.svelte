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

		<linearGradient id="{uid}-photo" x1="0" y1="0" x2="1" y2="1">
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
	<circle cx="120" cy="112" r="80" fill="url(#{uid}-glow)" filter="url(#{uid}-blur)" />

	<!-- Platform shadow -->
	<ellipse cx="120" cy="206" rx="56" ry="10" fill="var(--illustration-primary)" opacity="0.1" />

	<!-- Badge card (tilted) -->
	<g transform="rotate(-6 120 120)">
		<g filter="url(#{uid}-shadow)">
			<rect
				x="72"
				y="52"
				width="96"
				height="136"
				rx="18"
				fill="var(--illustration-surface)"
				stroke="var(--illustration-outline)"
				stroke-width="2"
			/>
		</g>

		<!-- Lanyard clip -->
		<rect
			x="104"
			y="40"
			width="32"
			height="16"
			rx="6"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
		<circle cx="120" cy="48" r="3" fill="var(--illustration-outline)" />

		<!-- Photo placeholder -->
		<rect
			x="90"
			y="70"
			width="60"
			height="46"
			rx="10"
			fill="url(#{uid}-photo)"
			opacity="0.18"
		/>
		<rect
			x="90"
			y="70"
			width="60"
			height="46"
			rx="10"
			stroke="var(--illustration-primary)"
			stroke-opacity="0.4"
			stroke-width="2"
		/>

		<!-- Name / role bars -->
		<rect x="90" y="128" width="48" height="8" rx="4" fill="var(--illustration-secondary)" opacity="0.7" />
		<rect x="90" y="142" width="34" height="6" rx="3" fill="var(--illustration-secondary)" opacity="0.6" />

		<!-- Barcode dots -->
		<rect x="90" y="164" width="6" height="10" rx="2" fill="var(--illustration-outline)" />
		<rect x="100" y="164" width="6" height="10" rx="2" fill="var(--illustration-outline)" />
		<rect x="110" y="164" width="10" height="10" rx="2" fill="var(--illustration-outline)" />
		<rect x="124" y="164" width="6" height="10" rx="2" fill="var(--illustration-outline)" />
		<rect x="134" y="164" width="16" height="10" rx="2" fill="var(--illustration-outline)" />
	</g>

	<!-- Floating clock-in badge -->
	<g filter="url(#{uid}-shadow)">
		<circle
			cx="176"
			cy="150"
			r="24"
			fill="var(--illustration-surface)"
			stroke="var(--illustration-outline)"
			stroke-width="2"
		/>
	</g>
	<circle cx="176" cy="150" r="14" stroke="var(--illustration-primary)" stroke-width="2.5" />
	<line
		x1="176"
		y1="150"
		x2="176"
		y2="141"
		stroke="var(--illustration-primary)"
		stroke-width="2.5"
		stroke-linecap="round"
	/>
	<line
		x1="176"
		y1="150"
		x2="183"
		y2="154"
		stroke="var(--illustration-primary)"
		stroke-width="2.5"
		stroke-linecap="round"
	/>

	<!-- Decorative sparkles -->
	<circle cx="52" cy="72" r="2.5" fill="var(--illustration-secondary)" />
	<circle cx="60" cy="168" r="2" fill="var(--illustration-secondary)" />
	<path
		d="M186 66l2.2 4.8 4.8 2.2-4.8 2.2-2.2 4.8-2.2-4.8-4.8-2.2 4.8-2.2z"
		fill="var(--illustration-secondary)"
	/>
</svg>
