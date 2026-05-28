<script context="module" lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import AvatarGroup from '../avatar-group.svelte';
	import Avatar from '../avatar.svelte';

	const { Story } = defineMeta({
		component: AvatarGroup,
		title: 'Components/Avatar/Group',
		tags: ['autodocs'],
		argTypes: {
			spacing: {
				control: 'select',
				options: ['tight', 'default', 'loose'],
				description: 'Spacing between avatars',
			},
			size: {
				control: 'select',
				options: ['xs', 'sm', 'default', 'lg', 'xl', '2xl'],
				description: 'Size of avatars in the group',
			},
			max: {
				control: 'number',
				description: 'Maximum number of avatars to display',
			},
		},
	});
</script>

<script lang="ts">
	const users = [
		{ image: 'https://i.pravatar.cc/150?img=1', name: 'User 1' },
		{ image: 'https://i.pravatar.cc/150?img=2', name: 'User 2' },
		{ image: 'https://i.pravatar.cc/150?img=3', name: 'User 3' },
		{ image: 'https://i.pravatar.cc/150?img=4', name: 'User 4' },
		{ image: 'https://i.pravatar.cc/150?img=5', name: 'User 5' },
	];
</script>

<Story name="Default">
	<AvatarGroup>
		{#each users as user}
			<Avatar src={user.image} alt={user.name} fallback={user.name} />
		{/each}
	</AvatarGroup>
</Story>

<Story name="Tight Spacing" args={{ spacing: 'tight' }}>

			{#each users as user}
				<Avatar src={user.image} alt={user.name} fallback={user.name} />
			{/each}

</Story>

<Story name="Loose Spacing" args={{ spacing: 'loose' }}>

			{#each users as user}
				<Avatar src={user.image} alt={user.name} fallback={user.name} />
			{/each}
</Story>

<Story name="Small Size" args={{ size: 'sm', spacing: 'default' }}>

			{#each users as user}
				<Avatar src={user.image} alt={user.name} fallback={user.name} size={"sm"} />
			{/each}

</Story>

<Story name="Large Size" args={{ size: 'lg', spacing: 'default' }}>

			{#each users as user}
				<Avatar src={user.image} alt={user.name} fallback={user.name} size={"lg"} />
			{/each}

</Story>

<Story name="Extra Large Size" args={{ size: 'xl', spacing: 'default' }}>

			{#each users as user}
				<Avatar src={user.image} alt={user.name} fallback={user.name} size={"xl"} />
			{/each}

</Story>

<Story name="With Fallbacks Only">
		<Avatar fallback="John Doe" color="primary" />
		<Avatar fallback="Jane Smith" color="green" />
		<Avatar fallback="Bob Wilson" color="purple" />
		<Avatar fallback="Alice Brown" color="pink" />
		<Avatar fallback="Charlie Davis" color="blue" />
</Story>

<Story name="Bordered Avatars" args={{ spacing: 'default' }}>

			{#each users as user, i}
				<Avatar 
					src={user.image} 
					alt={user.name} 
					fallback={user.name}
					variant="bordered"
					color={(['primary', 'green', 'purple', 'pink', 'blue'] as const)[i]}
				/>
			{/each}
</Story>

<Story name="Bordered with Tight Spacing" args={{ spacing: 'tight' }}>

			{#each users as user, i}
				<Avatar 
					src={user.image} 
					alt={user.name} 
					fallback={user.name}
					variant="bordered"
					color={(['primary', 'green', 'red', 'purple', 'blue'] as const)[i]}
					size="lg"
				/>
			{/each}
</Story>

<Story name="Mixed Shapes" args={{ spacing: 'default' }}>

			<Avatar src={users[0].image} alt={users[0].name} shape="circle" variant="bordered" color="primary" />
			<Avatar src={users[1].image} alt={users[1].name} shape="rounded" variant="bordered" color="green" />
			<Avatar src={users[2].image} alt={users[2].name} shape="square" variant="bordered" color="purple" />
			<Avatar src={users[3].image} alt={users[3].name} shape="circle" variant="bordered" color="pink" />
			<Avatar src={users[4].image} alt={users[4].name} shape="rounded" variant="bordered" color="blue" />

</Story>


<Story name="With Status Indicators" args={{ spacing: 'default' }}>

		<Avatar 
			src={users[0].image} 
			alt={users[0].name} 
			size="lg" 
			variant="bordered"
			status="online"
		/>
		<Avatar 
			src={users[1].image} 
			alt={users[1].name} 
			size="lg" 
			variant="bordered"
			status="away"
		/>
		<Avatar 
			src={users[2].image} 
			alt={users[2].name} 
			size="lg" 
			variant="bordered"
			status="busy"
		/>
		<Avatar 
			src={users[3].image} 
			alt={users[3].name} 
			size="lg" 
			variant="bordered"
			status="offline"
		/>
</Story>

<Story name="With Notifications" args={{ spacing: 'default' }}>
		<Avatar 
			src={users[0].image} 
			alt={users[0].name} 
			size="lg" 
			variant="bordered"
			showNotification
			notificationCount={3}
		/>
		<Avatar 
			src={users[1].image} 
			alt={users[1].name} 
			size="lg" 
			variant="bordered"
			showNotification
			notificationCount={12}
		/>
		<Avatar 
			src={users[2].image} 
			alt={users[2].name} 
			size="lg" 
			variant="bordered"
			showNotification
			notificationCount={99}
		/>
		<Avatar 
			src={users[3].image} 
			alt={users[3].name} 
			size="lg" 
			variant="bordered"
			showNotification
		/>
</Story>

<Story name="Status and Notifications" args={{ spacing: 'tight' }}>
		<Avatar 
			src={users[0].image} 
			alt={users[0].name} 
			size="xl" 
			variant="bordered"
			color="primary"
			status="online"
			showNotification
			notificationCount={5}
		/>
		<Avatar 
			src={users[1].image} 
			alt={users[1].name} 
			size="xl" 
			variant="bordered"
			color="green"
			status="busy"
			showNotification
			notificationCount={2}
		/>
		<Avatar 
			src={users[2].image} 
			alt={users[2].name} 
			size="xl" 
			variant="bordered"
			color="purple"
			status="away"
			showNotification
			notificationCount={8}
		/>
</Story>

<Story name="Gradient Colors Group">
		<Avatar fallback="AC" color="gradient" variant="bordered" size="lg" />
		<Avatar fallback="BD" color="purple" variant="bordered" size="lg" />
		<Avatar fallback="CE" color="pink" variant="bordered" size="lg" />
		<Avatar fallback="DF" color="blue" variant="bordered" size="lg" />
		<Avatar fallback="EG" color="gradient" variant="bordered" size="lg" />
</Story>

<!-- <Story name="Team Members">
	<div class="flex items-center gap-4">
		<AvatarGroup spacing="tight">
			{#each users as user}
				<Avatar src={user.image} alt={user.name} variant="bordered" color="primary" size="lg" />
			{/each}
		</AvatarGroup>
		<div class="text-sm">
			<p class="font-medium">Team Alpha</p>
			<p class="text-muted-foreground">{users.length} members</p>
		</div>
	</div>
</Story>

<Story name="Interactive Controls" args={{ spacing: 'default', size: 'default' }}>
	{#snippet children(args)}
		<div class="space-y-4">
			<div class="flex gap-4 text-sm">
				<div>
					<strong>Spacing:</strong> {args.spacing}
				</div>
				<div>
					<strong>Size:</strong> {args.size}
				</div>
			</div>
			<AvatarGroup spacing={args.spacing}>
				{#each users as user}
					<Avatar 
						src={user.image} 
						alt={user.name} 
						fallback={user.name}
						size={args.size}
						variant="bordered"
						color="primary"
					/>
				{/each}
			</AvatarGroup>
		</div>
	{/snippet}
</Story> -->
