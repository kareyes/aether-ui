// Primary declarative API
import Stepper from "./stepper.svelte";

// Primitive API — for advanced composition (custom icons, per-step children)
import Root from "./stepper-root.svelte";
import Step from "./stepper-step.svelte";
import Separator from "./stepper-separator.svelte";

export {
	// Declarative wrapper (preferred)
	Stepper,
	// Primitive base
	Root as StepperRoot,
	Step as StepperStep,
	Separator as StepperSeparator,
};

export type {
	StepperOrientation,
	StepperSize,
	StepperVariant,
	StepperVariants,
	StepperMobileLayout,
	StepState,
	StepItem,
} from "./stepper-variants.js";
