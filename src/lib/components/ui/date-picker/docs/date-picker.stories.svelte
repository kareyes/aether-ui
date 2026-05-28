<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DatePicker } from "$lib/components/ui/date-picker";
	import { type DateValue, today, getLocalTimeZone } from "@internationalized/date";
	import * as Field from '$lib/components/ui/field';
    import {type Args } from "storybook/internal/types";

	const { Story } = defineMeta({
		title: "Components/DatePicker/DatePicker",
		component: DatePicker,
		tags: ["autodocs"],
	});
</script>

<script lang="ts">
	let singleDate = $state<DateValue | undefined>();
	let disabledDate = $state<DateValue | undefined>();
	let customFormatDate = $state<DateValue | undefined>();
</script>


<Story name="Default">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePicker bind:value={singleDate} {...args} />
		{#if singleDate}
			<div class="mt-2 text-sm text-muted-foreground">
				Selected: {singleDate.toDate(getLocalTimeZone()).toLocaleDateString()}
			</div>
		{/if}
	</div>
	{/snippet}
</Story>


<Story name="With Initial Value">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePicker value={today(getLocalTimeZone())} {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			Initialized with today's date
		</div>
	</div>
	{/snippet}
</Story>


<Story name="Disabled">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePicker bind:value={disabledDate} disabled {...args} />
		<div class="mt-2 text-sm text-muted-foreground">
			This date picker is disabled
		</div>
	</div>
	{/snippet}
</Story>

<Story name="Custom Format">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePicker 
			bind:value={customFormatDate}
			format={(date) => {
				if (!date?.toDate) return "Select date";
				return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric"
				});
			}}
			{...args}
		/>
		{#if customFormatDate}
			<div class="mt-2 text-sm text-muted-foreground">
				Custom format: "Weekday, Month Day, Year"
			</div>
		{/if}
	</div>
	{/snippet}
</Story>



<Story name="All Button Variants">
	{#snippet template()}
	<div class="space-y-4 max-w-md">
		<div class="space-y-2">
			<div class="text-sm font-medium">Default</div>
			<DatePicker buttonVariant="default" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Outline</div>
			<DatePicker buttonVariant="outline" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Ghost</div>
			<DatePicker buttonVariant="ghost" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Secondary</div>
			<DatePicker buttonVariant="secondary" />
		</div>
		<div class="space-y-2">
			<div class="text-sm font-medium">Destructive</div>
			<DatePicker buttonVariant="destructive" />
		</div>
	</div>
	{/snippet}
</Story>

<Story name="Custom Button Styling">
	{#snippet template(args: Args)}
	<div class="max-w-md">
		<DatePicker 
			buttonClass="w-64 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950 dark:hover:bg-blue-900"
			{...args}
		/>
		<div class="mt-2 text-sm text-muted-foreground">
			Custom button with blue background
		</div>
	</div>
	{/snippet}
</Story>



<Story name="Field with Label">
	{#snippet template(args: Args)}
		<Field.Field
			label="Date of Birth"
			description="Select your birth date"
		>
			<DatePicker {...args}/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Validation">
	{#snippet template(args: Args)}
		<Field.Field
			label="Project Start Date"
			description="When will your project begin?"
			required
			error="Please select a start date"
		>
			<DatePicker 
				error={true}
				{...args}
			/>
		</Field.Field>
	{/snippet}
</Story>

<Story name="Field with Button Variants">
	{#snippet template(args: Args)}
		<div class="space-y-6 max-w-md">
			<Field.Field
				label="Deadline"
				description="Project completion deadline"
			>
				<DatePicker 
					buttonVariant="outline"
					buttonClass="w-full"
					{...args}
				/>
			</Field.Field>
			
			<Field.Field
				label="Meeting Date"
				description="Schedule your meeting"
			>
				<DatePicker 
					buttonVariant="ghost"
					{...args}
				/>
			</Field.Field>
	</div>
	{/snippet}
</Story>


