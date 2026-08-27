<script lang="ts">
	import {
		AccordionPrimitives,
		Alert,
		Avatar,
		Badge,
		Button,
		Card,
		Checkbox,
		DialogPrimitives,
		Input,
		Progress,
		RadioGroup,
		Select,
		Slider,
		Switch,
		TablePrimitives,
		TabsPrimitives,
		Textarea,
		TooltipPrimitives,
	} from "$lib";
	import { pelicanSwitch } from "../theme.svelte.js";
	import LeafIcon from "@lucide/svelte/icons/leaf";
	import CoinsIcon from "@lucide/svelte/icons/coins";
	import GemIcon from "@lucide/svelte/icons/gem";
	import HeartIcon from "@lucide/svelte/icons/heart";

	const swatches = [
		{ token: "--background", role: "page" },
		{ token: "--card", role: "panel" },
		{ token: "--primary", role: "wood" },
		{ token: "--secondary", role: "parchment" },
		{ token: "--muted", role: "aged" },
		{ token: "--foreground", role: "ink" },
		{ token: "--success", role: "crop" },
		{ token: "--warning", role: "coin" },
		{ token: "--info", role: "sky" },
		{ token: "--destructive", role: "heart" },
	];

	const seasons = [
		{ value: "spring", label: "Spring" },
		{ value: "summer", label: "Summer" },
		{ value: "fall", label: "Fall" },
		{ value: "winter", label: "Winter" },
	];

	const farms = [
		{ id: "farm-standard", value: "standard", label: "Standard farm" },
		{ id: "farm-riverland", value: "riverland", label: "Riverland farm" },
		{ id: "farm-forest", value: "forest", label: "Forest farm" },
	];

	const shipping = [
		{ item: "Ancient Fruit", season: "All", value: "550g" },
		{ item: "Starfruit", season: "Summer", value: "750g" },
		{ item: "Pumpkin", season: "Fall", value: "320g" },
		{ item: "Cauliflower", season: "Spring", value: "175g" },
		{ item: "Winter Root", season: "Winter", value: "70g" },
	];

	const bag = [
		{ id: "parsnip", icon: LeafIcon, qty: 24 },
		{ id: "coin", icon: CoinsIcon, qty: 99 },
		{ id: "gem", icon: GemIcon, qty: 3 },
		{ id: "heart", icon: HeartIcon, qty: 7 },
	];

	let farmName = $state("Whiskers Ranch");
	let saveFile = $state("Save_00000000");
	let letter = $state("The farm is doing well. The chickens have names now.");
	let season = $state("fall");
	let farm = $state("standard");
	let watered = $state(true);
	let mines = $state(false);
	let sprinklers = $state(true);
	let volume = $state(70);
	let tab = $state("bag");
	let selling = $state(false);
</script>

<svelte:head>
	<title>Pelican — aether-ui</title>
</svelte:head>

<div class="pelican-field min-h-screen p-6 sm:p-10">
	<div class="mx-auto flex max-w-5xl flex-col gap-10">
		<!-- Hero ---------------------------------------------------------- -->
		<header class="pelican-frame">
			<span class="pelican-label">A theme for aether-ui</span>
			<h1 class="mt-2 text-4xl font-bold sm:text-5xl">Pelican</h1>
			<p class="text-muted-foreground mt-3 max-w-prose">
				Every component below is stock aether-ui. The theme is a scoped
				re-declaration of the token layer plus a chrome pass keyed on
				<code>data-slot</code> — no component file knows about it. It is
				applied to the whole preview app, so every other demo page is
				wearing it too.
			</p>

			<div class="mt-6 flex flex-wrap items-center gap-4">
				<label class="flex items-center gap-3 text-sm">
					<Switch bind:checked={pelicanSwitch.enabled} />
					<span>Pelican {pelicanSwitch.enabled ? "on" : "off"}</span>
				</label>
				<span class="text-muted-foreground text-sm">
					Same switch as the nav's, and the choice is remembered. Use the
					dark-mode toggle to see day and night.
				</span>
			</div>
		</header>

		<!-- Tokens -------------------------------------------------------- -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-semibold">Tokens</h2>
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
				{#each swatches as swatch (swatch.token)}
					<div class="border-border overflow-hidden rounded-sm border-3">
						<div class="h-16" style="background: var({swatch.token})"></div>
						<div class="bg-card border-border border-t-3 px-2 py-1.5">
							<span class="pelican-label">{swatch.token}</span>
							<span class="text-muted-foreground text-xs">{swatch.role}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Buttons ------------------------------------------------------- -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-semibold">Button</h2>
			<Card title="Press to sink 4px">
				<div class="flex flex-col gap-5">
					<div class="flex flex-wrap items-center gap-3">
						<Button text="Default" />
						<Button text="Secondary" variant="secondary" />
						<Button text="Plant seeds" color="green" icon={LeafIcon} />
						<Button text="Ship for 340g" color="yellow" icon={CoinsIcon} />
						<Button text="Sell the lot" variant="destructive" />
						<Button text="Outline" variant="outline" />
						<Button text="Ghost" variant="ghost" />
						<Button text="Disabled" disabled />
					</div>
					<div class="flex flex-wrap items-center gap-3">
						<Button text="Small" size="sm" />
						<Button text="Default" />
						<Button text="Large" size="lg" />
						<Button icon={HeartIcon} size="icon" variant="secondary" />
					</div>
				</div>
			</Card>
		</section>

		<!-- Form ---------------------------------------------------------- -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-semibold">Form</h2>
			<div class="grid gap-5 md:grid-cols-2">
				<Card title="Save file">
					<div class="flex flex-col gap-4">
						<div class="flex flex-col gap-1.5">
							<span class="pelican-label">Farm name</span>
							<Input bind:value={farmName} />
						</div>
						<div class="flex flex-col gap-1.5">
							<span class="pelican-label">Save slot</span>
							<Input bind:value={saveFile} error />
							<span class="text-destructive text-xs">
								That file name is already taken.
							</span>
						</div>
						<div class="flex flex-col gap-1.5">
							<span class="pelican-label">Letter to Grandpa</span>
							<Textarea bind:value={letter} />
						</div>
						<div class="flex flex-col gap-1.5">
							<span class="pelican-label">Starting season</span>
							<Select options={seasons} bind:value={season} />
						</div>
					</div>
				</Card>

				<Card title="Chores">
					<div class="flex flex-col gap-5">
						<div class="flex flex-col gap-2.5">
							<Checkbox bind:checked={watered} label="Water the crops" />
							<Checkbox bind:checked={mines} label="Visit the mines" />
							<Checkbox checked={false} disabled label="Fix the bus (40,000g)" />
						</div>
						<RadioGroup options={farms} bind:value={farm} label="Farm layout" />
						<label class="flex items-center gap-3 text-sm">
							<Switch bind:checked={sprinklers} />
							<span>Auto-water sprinklers</span>
						</label>
						<div class="flex flex-col gap-2">
							<span class="pelican-label">Music volume — {volume}</span>
							<Slider type="single" bind:value={volume} max={100} step={1} />
						</div>
					</div>
				</Card>
			</div>
		</section>

		<!-- Containers ---------------------------------------------------- -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-semibold">Container</h2>
			<div class="grid gap-5 md:grid-cols-2">
				<div class="flex flex-col gap-3">
					<Alert
						variant="success"
						title="Bundle complete"
						description="The greenhouse has been restored."
					/>
					<Alert
						variant="warning"
						title="It's 1:20 AM"
						description="Get to bed or you'll wake up in the clinic."
					/>
					<Alert
						variant="error"
						title="You passed out"
						description="Doctor's fee: 1,000g. Some items were lost."
					/>
					<Alert
						variant="info"
						title="Museum donation"
						description="Gunther has a reward waiting at 40 pieces."
					/>
				</div>

				<Card title="Community Center">
					<AccordionPrimitives.Root type="single" value="friendship">
						<AccordionPrimitives.Item value="friendship">
							<AccordionPrimitives.Trigger>
								How do I raise friendship?
							</AccordionPrimitives.Trigger>
							<AccordionPrimitives.Content>
								Talk to villagers daily and give gifts twice a week. Loved gifts
								on birthdays count eight times over.
							</AccordionPrimitives.Content>
						</AccordionPrimitives.Item>
						<AccordionPrimitives.Item value="greenhouse">
							<AccordionPrimitives.Trigger>
								What does the greenhouse do?
							</AccordionPrimitives.Trigger>
							<AccordionPrimitives.Content>
								It ignores the season. Anything planted inside keeps growing
								through winter, including trees.
							</AccordionPrimitives.Content>
						</AccordionPrimitives.Item>
						<AccordionPrimitives.Item value="cart">
							<AccordionPrimitives.Trigger>
								Where is the traveling cart?
							</AccordionPrimitives.Trigger>
							<AccordionPrimitives.Content>
								South of the farm in Cindersap Forest, Fridays and Sundays.
								Prices are bad. Buy anyway.
							</AccordionPrimitives.Content>
						</AccordionPrimitives.Item>
					</AccordionPrimitives.Root>

					<div class="mt-4 flex flex-wrap gap-3">
						<Button text="Sell the ancient fruit" onclick={() => (selling = true)} />
						<TooltipPrimitives.Provider>
							<TooltipPrimitives.Root>
								<TooltipPrimitives.Trigger>
									<Button text="Hover an item" variant="secondary" size="sm" />
								</TooltipPrimitives.Trigger>
								<TooltipPrimitives.Content>
									Restores 125 energy
								</TooltipPrimitives.Content>
							</TooltipPrimitives.Root>
						</TooltipPrimitives.Provider>
					</div>
				</Card>
			</div>
		</section>

		<!-- Display ------------------------------------------------------- -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-semibold">Display</h2>
			<div class="grid gap-5 md:grid-cols-2">
				<Card title="Badge, progress, avatar">
					<div class="flex flex-col gap-5">
						<div class="flex flex-wrap gap-2">
							<Badge text="DEFAULT" />
							<Badge text="SPRING" color="green" />
							<Badge text="SUMMER" color="yellow" />
							<Badge text="FALL" color="orange" />
							<Badge text="WINTER" color="blue" />
							<Badge text="OVERDUE" color="red" />
						</div>
						<Progress value={68} label="Farming · level 7" showValue />
						<Progress value={42} label="Shipping goal" variant="warning" showValue />
						<Progress value={80} label="Friendship · Abigail" variant="destructive" showValue />
						<div class="flex flex-wrap items-center gap-3">
							<Avatar fallback="MU" />
							<Avatar fallback="AB" color="green" />
							<Avatar fallback="LW" color="yellow" />
							<Avatar fallback="SB" size="sm" color="blue" />
						</div>
					</div>
				</Card>

				<Card title="Shipping bin">
					<TablePrimitives.Root>
						<TablePrimitives.Header>
							<TablePrimitives.Row>
								<TablePrimitives.Head>Item</TablePrimitives.Head>
								<TablePrimitives.Head>Season</TablePrimitives.Head>
								<TablePrimitives.Head>Value</TablePrimitives.Head>
							</TablePrimitives.Row>
						</TablePrimitives.Header>
						<TablePrimitives.Body>
							{#each shipping as row (row.item)}
								<TablePrimitives.Row>
									<TablePrimitives.Cell>{row.item}</TablePrimitives.Cell>
									<TablePrimitives.Cell>{row.season}</TablePrimitives.Cell>
									<TablePrimitives.Cell>{row.value}</TablePrimitives.Cell>
								</TablePrimitives.Row>
							{/each}
						</TablePrimitives.Body>
					</TablePrimitives.Root>
				</Card>
			</div>
		</section>

		<!-- The farmhouse menu -------------------------------------------- -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-semibold">Farmhouse menu</h2>
			<div class="pelican-frame">
				<div class="grid gap-6 md:grid-cols-[220px_1fr]">
					<div class="flex flex-col gap-3">
						<Avatar fallback="MU" size="xl" />
						<div class="bg-primary text-primary-foreground border-border rounded-sm border-3 px-3 py-2 text-center text-sm">
							Muy of Whiskers Ranch
						</div>
						<Progress value={81} label="Energy" showValue />
						<Progress value={100} label="Health" variant="destructive" showValue />
						<div class="flex flex-wrap gap-2">
							<Badge text="FALL 14" color="orange" />
							<Badge text="YEAR 2" />
						</div>
					</div>

					<TabsPrimitives.Root bind:value={tab}>
						<TabsPrimitives.List>
							<TabsPrimitives.Trigger value="bag">BAG</TabsPrimitives.Trigger>
							<TabsPrimitives.Trigger value="skills">SKILLS</TabsPrimitives.Trigger>
						</TabsPrimitives.List>
						<TabsPrimitives.Content value="bag">
							<div class="grid grid-cols-6 gap-2">
								{#each bag as slot (slot.id)}
									{@const Icon = slot.icon}
									<div class="pelican-slot relative">
										<Icon class="size-5" />
										<span class="pelican-label absolute right-1 bottom-0.5">
											{slot.qty}
										</span>
									</div>
								{/each}
								{#each Array.from({ length: 8 }, (_, i) => i) as empty (empty)}
									<div class="pelican-slot opacity-60"></div>
								{/each}
							</div>
							<div class="mt-4 flex flex-wrap gap-2">
								<Button text="Organize" size="sm" color="green" />
								<Button text="Trash all" size="sm" variant="outline" />
							</div>
						</TabsPrimitives.Content>
						<TabsPrimitives.Content value="skills">
							<div class="flex flex-col gap-3">
								<Progress value={88} label="Farming" showValue />
								<Progress value={55} label="Mining" variant="warning" showValue />
								<Progress value={33} label="Fishing" variant="secondary" showValue />
							</div>
						</TabsPrimitives.Content>
					</TabsPrimitives.Root>
				</div>
			</div>
		</section>
	</div>
</div>

<DialogPrimitives.Root bind:open={selling}>
	<DialogPrimitives.Content>
		<DialogPrimitives.Header>
			<DialogPrimitives.Title>Sell the ancient fruit?</DialogPrimitives.Title>
			<DialogPrimitives.Description>
				You have three in the bag. Once they're on the truck, Pierre won't sell
				them back.
			</DialogPrimitives.Description>
		</DialogPrimitives.Header>
		<DialogPrimitives.Footer>
			<Button text="Keep them" variant="outline" onclick={() => (selling = false)} />
			<Button text="Sell for 1,650g" variant="destructive" onclick={() => (selling = false)} />
		</DialogPrimitives.Footer>
	</DialogPrimitives.Content>
</DialogPrimitives.Root>
