<script lang="ts" module>
	import type { FormController, FormState, FieldRenderContext, SectionRenderContext, StepRenderContext } from '../renderer.js';
	import type { ExtractedForm } from '../layout.js';
	import type { FieldErrors } from '../validation.js';

	export type {
		FormController,
		FormState,
		FieldRenderContext,
		SectionRenderContext,
		StepRenderContext,
		ExtractedForm,
		FieldErrors
	};

	export interface SchemaFormProps {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		controller: FormController<any, any, any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onSubmit?: (data: any) => Promise<void> | void;
		onError?: (errors: FieldErrors) => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onChange?: (values: any) => void;
		sectionVariant?: 'default' | 'card' | 'collapsible';
		showStepIndicator?: boolean;
		submitText?: string;
		nextText?: string;
		prevText?: string;
		class?: string;
	}
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { Button, StepperPrimitives, Spinner, Alert } from '$lib/index.js';
	import SchemaSection from './schema-section.svelte';
	import SchemaStep from './schema-step.svelte';
	import {
		createSectionContext,
		createStepContext,
		type FormController as FC
	} from '../renderer.js';
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	interface Props {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		controller: FC<any, any, any>;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onSubmit?: (data: any) => Promise<void> | void;
		onError?: (errors: FieldErrors) => void;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onChange?: (values: any) => void;
		sectionVariant?: 'default' | 'card' | 'collapsible';
		showStepIndicator?: boolean;
		submitText?: string;
		nextText?: string;
		prevText?: string;
		class?: string;
		header?: Snippet;
		footer?: Snippet<[{
			isSubmitting: boolean;
			isValid: boolean;
			isFirstStep: boolean;
			isLastStep: boolean;
			handleSubmit: () => void;
			handleNext: () => void;
			handlePrev: () => void;
		}]>;
	}

	let {
		controller,
		onSubmit,
		onError,
		onChange,
		sectionVariant = 'default',
		showStepIndicator = true,
		submitText = 'Submit',
		nextText = 'Next',
		prevText = 'Back',
		class: className,
		header,
		footer
	}: Props = $props();

	// Reactive state from controller - use $state since we manually update via subscription
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let formState: FormState<any> = $state(untrack(() => controller.state));

	// Subscribe to controller state changes
	$effect.pre(() => {
		const unsubscribe = controller.subscribe((newState) => {
			formState = newState;
		});
		return unsubscribe;
	});

	// Track previous values to avoid unnecessary onChange calls
	let prevValues: unknown = null;

	// Notify parent of value changes - only when values actually change
	$effect(() => {
		const values = formState.values;
		if (values !== prevValues) {
			prevValues = values;
			untrack(() => {
				onChange?.(values);
			});
		}
	});

	// Form extraction
	const form = $derived.by(() => controller.form);
	const isMultiStep = $derived.by(() => form.isMultiStep);
	const totalSteps = $derived.by(() => form.steps.length);
	const currentStep = $derived.by(() => formState.currentStep);
	const isFirstStep = $derived.by(() => currentStep === 1);
	const isLastStep = $derived.by(() => currentStep === totalSteps);

	// Track state changes that require context recreation
	// Use validationVersion which only changes when errors/touched actually change
	// This prevents infinite loops from object reference changes
	let contextVersion = $state(0);

	$effect(() => {
		// Track validationVersion (only increments on actual validation changes)
		void formState.validationVersion;
		void formState.currentStep;
		void formState.submitCount;

		untrack(() => {
			contextVersion++;
		});
	});

	// Create render contexts - recreate when errors/touched/step changes
	const sectionContexts = $derived.by(() => {
		void contextVersion;
		return form.sections.map((section) => createSectionContext(controller, section));
	});

	const stepContexts = $derived.by(() => {
		void contextVersion;
		return form.steps.map((step) => createStepContext(controller, step));
	});

	// Form-level error (non-field specific)
	let formError = $state<string | undefined>(undefined);

	// Handle form submission
	async function handleSubmit() {
		console.log('handleSubmit called');
		formError = undefined;

		const success = await controller.submit(async (data) => {
			try {
				await onSubmit?.(data);
			} catch (err) {
				if (err && typeof err === 'object' && 'field' in err && 'message' in err) {
					controller.setFieldError(err.field as string, err.message as string);
					onError?.(controller.state.errors);
				} else if (err instanceof Error) {
					formError = err.message;
				} else {
					formError = 'An unexpected error occurred';
				}
				throw err;
			}
		});
        console.log('success', success);
		if (!success) {
			onError?.(controller.state.errors);
		}
	}

	function handleNext() {
		controller.nextStep();
	}

	function handlePrev() {
		controller.prevStep();
	}

	function handleStepClick(stepIndex: number) {
		console.log('stepIndex', controller);
		const step = stepIndex + 1;
		if (step <= currentStep) {
			controller.goToStep(step);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && e.ctrlKey) {
			e.preventDefault();
			if (isMultiStep && !isLastStep) {
				handleNext();
			} else {
				handleSubmit();
			}
		}
	}

	// Convert 1-based step to 0-based for stepper component
	const activeStepIndex = $derived.by(() => currentStep - 1);

	console.log('SchemaForm rendered');
</script>

<form
	class={cn('space-y-6', className)}
	onsubmit={(e) => {
		e.preventDefault();
		console.log('onsubmit');
		if (isMultiStep && !isLastStep) {
			handleNext();
		} else {
			handleSubmit();
		}
	}}
	novalidate
>
	{#if header}
		{@render header()}
	{/if}

	{#if formError}
		<Alert variant="error">
			{formError}
		</Alert>
	{/if}

	{#if isMultiStep}
		{#if showStepIndicator}
			<StepperPrimitives.StepperRoot
				activeStep={activeStepIndex}
				clickable={true}
				onStepClick={handleStepClick}
				class="mb-8 hello"
			>
				{#each form.steps as step, i (step.step)}
					<StepperPrimitives.StepperStep
						step={i}
						label={step.title}
						description={step.description}
						completed={step.step < currentStep}
					/>
					{#if i < form.steps.length - 1}
						<StepperPrimitives.StepperSeparator />
					{/if}
				{/each}
			</StepperPrimitives.StepperRoot>
		{/if}

		{#each stepContexts as stepCtx (stepCtx.step.step)}
			<SchemaStep ctx={stepCtx} {sectionVariant} {currentStep} />
		{/each}
	{:else}
		<div class="space-y-6">
			{#each sectionContexts as sectionCtx (sectionCtx.section.id)}
				<SchemaSection ctx={sectionCtx} variant={sectionVariant} />
			{/each}
		</div>
	{/if}

	{#if footer}
		{@render footer({
			isSubmitting: formState.isSubmitting,
			isValid: formState.isValid,
			isFirstStep,
			isLastStep,
			handleSubmit,
			handleNext,
			handlePrev
		})}
	{:else}
		<div class="flex items-center justify-between pt-4">
			<div>
				{#if isMultiStep && !isFirstStep}
					<Button
						type="button"
						variant="outline"
						onclick={handlePrev}
						disabled={formState.isSubmitting}
					>
						{prevText}
					</Button>
				{/if}
			</div>

			<div class="flex items-center gap-2">
				{#if isMultiStep && !isLastStep}
					<Button
						type="submit"
						disabled={formState.isSubmitting}
						onclick={(e) => {
							console.log('next button clicked', e);
							e.preventDefault();
							handleNext();
						}}
					>
						{nextText}
					</Button>
				{:else}
					<Button
						type="submit"
						disabled={formState.isSubmitting}
						onclick={(e) => {
							console.log('submit button clicked', e);
							e.preventDefault();
							handleSubmit();
						}}
					>
						{#if formState.isSubmitting}
							<Spinner class="mr-2 h-4 w-4" />
							Submitting...
						{:else}
							{submitText}
						{/if}
					</Button>
				{/if}
			</div>
		</div>
	{/if}
</form>
