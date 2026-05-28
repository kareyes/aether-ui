<script lang="ts" context="module">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Avatar from "../avatar.svelte";
	import AvatarGroup from "../avatar-group.svelte";

	const { Story } = defineMeta({
		title: "Components/Avatar/Single",
		component: Avatar,
		tags: ["autodocs"],
		argTypes: {
			size: {
				control: "select",
				options: ["xs", "sm", "default", "lg", "xl", "2xl"],
			},
			shape: {
				control: "select",
				options: ["circle", "square", "rounded"],
			},
			variant: {
				control: "select",
				options: ["default", "bordered", "solid"],
			},
			color: {
				control: "select",
				options: ["default", "primary", "secondary", "green", "yellow", "red", "blue", "purple", "pink", "gradient"],
			},
			status: {
				control: "select",
				options: [undefined, "online", "offline", "away", "busy"],
				description: "Status indicator",
			},
			showNotification: {
				control: "boolean",
				description: "Show notification badge",
			},
			notificationCount: {
				control: "number",
				description: "Notification count",
			},
		},
	});
</script>

<script lang="ts">
	const userImage = "https://i.pravatar.cc/150?img=1";
	const userImage2 = "https://i.pravatar.cc/150?img=2";
	const userImage3 = "https://i.pravatar.cc/150?img=3";
	const userImage4 = "https://i.pravatar.cc/150?img=4";
	const userImage5 = "https://i.pravatar.cc/150?img=5";
</script>

<!-- Default -->
<Story name="Default"
	args={{
		src: userImage,
		alt: "User Avatar",
		fallback: "JD"
	}}
/>

<!-- Sizes -->
<Story name="Extra Small"
	args={{
		size: "xs",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Small"
	args={{
		size: "sm",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Large"
	args={{
		size: "lg",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Extra Large"
	args={{
		size: "xl",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<!-- <Story name="2 Extra Large"
	args={{
		size: "2xl",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/> -->

<!-- All Sizes -->
<!-- <Story name="All Sizes">
	<div class="flex items-end gap-4">
		<AvatarEnhanced size="xs" src={userImage} alt="XS" fallback="XS" />
		<AvatarEnhanced size="sm" src={userImage} alt="SM" fallback="SM" />
		<AvatarEnhanced size="default" src={userImage} alt="MD" fallback="MD" />
		<AvatarEnhanced size="lg" src={userImage} alt="LG" fallback="LG" />
		<AvatarEnhanced size="xl" src={userImage} alt="XL" fallback="XL" />
		<AvatarEnhanced size="2xl" src={userImage} alt="2XL" fallback="2XL" />
	</div>
</Story> -->

<!-- Shapes -->
<Story name="Circle Shape"
	args={{
		shape: "circle",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Square Shape"
	args={{
		shape: "square",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Rounded Shape"
	args={{
		shape: "rounded",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<!-- All Shapes -->
<!-- <Story name="All Shapes">
	<div class="flex items-center gap-4">
		<AvatarEnhanced shape="circle" src={userImage} alt="Circle" fallback="CI" />
		<AvatarEnhanced shape="rounded" src={userImage} alt="Rounded" fallback="RO" />
		<AvatarEnhanced shape="square" src={userImage} alt="Square" fallback="SQ" />
	</div>
</Story> -->

<!-- Variants -->
<Story name="Default Variant"
	args={{
		variant: "default",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Bordered Variant"
	args={{
		variant: "bordered",
		src: userImage,
		alt: "User",
		fallback: "JD"
	}}
/>

<Story name="Solid Variant"
	args={{
		variant: "solid",
		color: "primary",
		fallback: "JD"
	}}
/>

<!-- Colors -->
<Story name="Primary Color"
	args={{
		color: "primary",
		fallback: "PR"
	}}
/>

<Story name="Secondary Color"
	args={{
		color: "secondary",
		fallback: "SE"
	}}
/>

<Story name="Green Color"
	args={{
		color: "green",
		fallback: "SU"
	}}
/>

<Story name="Yellow Color"
	args={{
		color: "yellow",
		fallback: "WA"
	}}
/>

<Story name="Red Color"
	args={{
		color: "red",
		fallback: "DA"
	}}
/>

<Story name="Blue Color"
	args={{
		color: "blue",
		fallback: "IN"
	}}
/>

<Story name="Purple Color"
	args={{
		color: "purple",
		fallback: "PU"
	}}
/>

<Story name="Pink Color"
	args={{
		color: "pink",
		fallback: "PI"
	}}
/>

<Story name="Gradient Color"
	args={{
		color: "gradient",
		fallback: "GR"
	}}
/>

<!-- All Colors -->
<!-- <Story name="All Colors">
	<div class="flex flex-wrap items-center gap-4">
		<AvatarEnhanced color="default" fallback="DF" />
		<AvatarEnhanced color="primary" fallback="PR" />
		<AvatarEnhanced color="secondary" fallback="SE" />
		<AvatarEnhanced color="success" fallback="SU" />
		<AvatarEnhanced color="warning" fallback="WA" />
		<AvatarEnhanced color="danger" fallback="DA" />
		<AvatarEnhanced color="info" fallback="IN" />
		<AvatarEnhanced color="purple" fallback="PU" />
		<AvatarEnhanced color="pink" fallback="PI" />
		<AvatarEnhanced color="gradient" fallback="GR" />
	</div>
</Story> -->

<!-- Fallback -->
<Story name="With Fallback Text"
	args={{
		fallback: "John Doe",
		size: "lg"
	}}
/>

<Story name="Without Image"
	args={{
		fallback: "AB",
		color: "primary"
	}}
/>

<Story name="Default Fallback Icon"
	args={{}}
/>

<!-- Custom Fallback -->
<!-- <Story name="Custom Fallback">
	<AvatarEnhanced size="lg">
		{#snippet customFallback()}
			<svg class="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		{/snippet}
	</AvatarEnhanced>
</Story> -->

<!-- Avatar Groups -->
<!-- <Story name="Avatar Group">
	<AvatarGroup>
		<AvatarEnhanced src={userImage} alt="User 1" fallback="U1" variant="bordered" />
		<AvatarEnhanced src={userImage2} alt="User 2" fallback="U2" variant="bordered" />
		<AvatarEnhanced src={userImage3} alt="User 3" fallback="U3" variant="bordered" />
		<AvatarEnhanced src={userImage4} alt="User 4" fallback="U4" variant="bordered" />
	</AvatarGroup>
</Story>

<Story name="Avatar Group Tight Spacing">
	<AvatarGroup spacing="tight">
		<AvatarEnhanced src={userImage} alt="User 1" fallback="U1" variant="bordered" />
		<AvatarEnhanced src={userImage2} alt="User 2" fallback="U2" variant="bordered" />
		<AvatarEnhanced src={userImage3} alt="User 3" fallback="U3" variant="bordered" />
		<AvatarEnhanced src={userImage4} alt="User 4" fallback="U4" variant="bordered" />
		<AvatarEnhanced src={userImage5} alt="User 5" fallback="U5" variant="bordered" />
	</AvatarGroup>
</Story>

<Story name="Avatar Group Loose Spacing">
	<AvatarGroup spacing="loose">
		<AvatarEnhanced src={userImage} alt="User 1" fallback="U1" variant="bordered" />
		<AvatarEnhanced src={userImage2} alt="User 2" fallback="U2" variant="bordered" />
		<AvatarEnhanced src={userImage3} alt="User 3" fallback="U3" variant="bordered" />
	</AvatarGroup>
</Story>

<Story name="Avatar Group Large">
	<AvatarGroup>
		<AvatarEnhanced src={userImage} alt="User 1" fallback="U1" variant="bordered" size="lg" />
		<AvatarEnhanced src={userImage2} alt="User 2" fallback="U2" variant="bordered" size="lg" />
		<AvatarEnhanced src={userImage3} alt="User 3" fallback="U3" variant="bordered" size="lg" />
		<AvatarEnhanced src={userImage4} alt="User 4" fallback="U4" variant="bordered" size="lg" />
	</AvatarGroup>
</Story>

<Story name="Avatar Group With Colors">
	<AvatarGroup>
		<AvatarEnhanced fallback="AB" color="primary" variant="bordered" />
		<AvatarEnhanced fallback="CD" color="success" variant="bordered" />
		<AvatarEnhanced fallback="EF" color="warning" variant="bordered" />
		<AvatarEnhanced fallback="GH" color="danger" variant="bordered" />
		<AvatarEnhanced fallback="IJ" color="purple" variant="bordered" />
	</AvatarGroup>
</Story> -->

<!-- Combined Examples -->
<Story name="Bordered with Color"
	args={{
		variant: "bordered",
		color: "primary",
		size: "lg",
		fallback: "BC"
	}}
/>

<Story name="Square Bordered"
	args={{
		shape: "square",
		variant: "bordered",
		src: userImage,
		alt: "User",
		fallback: "SB",
		size: "lg"
	}}
/>

<!-- Status Indicators -->
<Story name="Online Status"
	args={{
		status: "online",
		src: userImage,
		alt: "User",
		fallback: "ON",
		size: "lg"
	}}
/>

<Story name="Offline Status"
	args={{
		status: "offline",
		src: userImage,
		alt: "User",
		fallback: "OF",
		size: "lg"
	}}
/>

<Story name="Away Status"
	args={{
		status: "away",
		src: userImage,
		alt: "User",
		fallback: "AW",
		size: "lg"
	}}
/>

<Story name="Busy Status"
	args={{
		status: "busy",
		src: userImage,
		alt: "User",
		fallback: "BS",
		size: "lg"
	}}
/>

<!-- Notifications -->
<Story name="With Notification"
	args={{
		showNotification: true,
		src: userImage,
		alt: "User",
		fallback: "NT",
		size: "lg"
	}}
/>

<Story name="Notification with Count"
	args={{
		showNotification: true,
		notificationCount: 5,
		src: userImage,
		alt: "User",
		fallback: "NC",
		size: "lg"
	}}
/>

<Story name="Notification High Count"
	args={{
		showNotification: true,
		notificationCount: 99,
		src: userImage,
		alt: "User",
		fallback: "HC",
		size: "lg"
	}}
/>

<Story name="Notification Overflow"
	args={{
		showNotification: true,
		notificationCount: 150,
		src: userImage,
		alt: "User",
		fallback: "OF",
		size: "lg"
	}}
/>

<!-- Combined Features -->
<Story name="Status with Notification"
	args={{
		status: "busy",
		showNotification: true,
		notificationCount: 3,
		src: userImage,
		alt: "User",
		fallback: "SN",
		size: "lg"
	}}
/>

<Story name="Bordered with Status"
	args={{
		variant: "bordered",
		color: "primary",
		status: "online",
		src: userImage,
		alt: "User",
		fallback: "BS",
		size: "xl"
	}}
/>

<Story name="All Features Combined"
	args={{
		variant: "bordered",
		color: "purple",
		status: "away",
		showNotification: true,
		notificationCount: 12,
		src: userImage,
		alt: "User",
		fallback: "AF",
		size: "xl"
	}}
/>

<!-- <Story name="All Variants Comparison">
	<div class="flex items-center gap-4">
		<div class="text-center">
			<AvatarEnhanced variant="default" src={userImage} alt="Default" fallback="DF" size="lg" />
			<p class="text-xs mt-2">Default</p>
		</div>
		<div class="text-center">
			<AvatarEnhanced variant="bordered" src={userImage} alt="Bordered" fallback="BO" size="lg" />
			<p class="text-xs mt-2">Bordered</p>
		</div>
		<div class="text-center">
			<AvatarEnhanced variant="solid" color="primary" fallback="SO" size="lg" />
			<p class="text-xs mt-2">Solid</p>
		</div>
	</div>
</Story> -->
