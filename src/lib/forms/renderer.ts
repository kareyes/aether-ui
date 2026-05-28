/**
 * Framework-agnostic form renderer utilities
 *
 * Provides the core rendering logic that can be adapted
 * to any UI framework (Svelte, React, Vue, etc.)
 */
import { Schema, Effect } from "effect";
import type {
	ExtractedField,
	ExtractedSection,
	ExtractedStep,
	ExtractedForm,
} from "./layout.js";
import {
	extractForm,
	buildDefaultValues,
	getColSpanClasses,
	getGridClasses,
} from "./layout.js";
import {
	validateSync,
	validateField,
	type FieldErrors,
	type ValidationResult,
} from "./validation.js";

// ============================================================================
// Form State Types
// ============================================================================

/** Current state of a form field */
export interface FieldState {
	readonly value: unknown;
	readonly error: string | undefined;
	readonly touched: boolean;
	readonly dirty: boolean;
	readonly validating: boolean;
}

/** Complete form state */
export interface FormState<T extends Record<string, unknown>> {
	readonly values: T;
	readonly errors: FieldErrors;
	readonly touched: Record<string, boolean>;
	readonly dirty: Record<string, boolean>;
	readonly isSubmitting: boolean;
	readonly isValidating: boolean;
	readonly isValid: boolean;
	readonly isDirty: boolean;
	readonly submitCount: number;
	readonly currentStep: number;
	readonly validationVersion: number; // Increments when errors or touched changes
}

/** Form configuration options */
export interface FormConfig<T extends Record<string, unknown>> {
	readonly initialValues?: Partial<T>;
	readonly validateOnChange?: boolean;
	readonly validateOnBlur?: boolean;
	readonly validateOnMount?: boolean;
	readonly revalidateOnChange?: boolean;
}

// ============================================================================
// Form State Management
// ============================================================================

/**
 * Create initial form state from schema
 */
export const createFormState = <A extends Record<string, unknown>, I>(
	schema: Schema.Schema<A, I, never>,
	config: FormConfig<A> = {},
): FormState<Partial<A>> => {
	const form = extractForm(schema);
	const defaultValues = buildDefaultValues<A>(form.fields);
	const values = { ...defaultValues, ...config.initialValues } as Partial<A>;

	// Initial validation if configured
	let errors: FieldErrors = {};
	if (config.validateOnMount) {
		const result = validateSync(schema, values);
		if (!result.valid) {
			errors = result.errors;
		}
	}

	return {
		values,
		errors,
		touched: {},
		dirty: {},
		isSubmitting: false,
		isValidating: false,
		isValid: Object.keys(errors).length === 0,
		isDirty: false,
		submitCount: 0,
		currentStep: 1,
		validationVersion: 0,
	};
};

/**
 * Form state reducer actions
 */
export type FormAction<T> =
	| { type: "SET_VALUE"; field: string; value: unknown }
	| { type: "SET_VALUES"; values: Partial<T> }
	| { type: "SET_ERROR"; field: string; error: string | undefined }
	| { type: "SET_ERRORS"; errors: FieldErrors }
	| { type: "SET_TOUCHED"; field: string }
	| { type: "SET_TOUCHED_FIELDS"; fields: string[] }
	| { type: "SET_SUBMITTING"; isSubmitting: boolean }
	| { type: "SET_VALIDATING"; isValidating: boolean }
	| { type: "SET_STEP"; step: number }
	| { type: "NEXT_STEP" }
	| { type: "PREV_STEP" }
	| { type: "INCREMENT_SUBMIT_COUNT" }
	| { type: "RESET"; values?: Partial<T> };

/**
 * Form state reducer
 */
export const formReducer = <T extends Record<string, unknown>>(
	state: FormState<Partial<T>>,
	action: FormAction<T>,
): FormState<Partial<T>> => {
	switch (action.type) {
		case "SET_VALUE":
			return {
				...state,
				values: { ...state.values, [action.field]: action.value },
				dirty: { ...state.dirty, [action.field]: true },
				isDirty: true,
			};

		case "SET_VALUES":
			return {
				...state,
				values: { ...state.values, ...action.values },
				isDirty: true,
			};

		case "SET_ERROR":
			const newErrors = { ...state.errors };
			if (action.error === undefined) {
				delete newErrors[action.field];
			} else {
				newErrors[action.field] = action.error;
			}
			return {
				...state,
				errors: newErrors,
				isValid: Object.keys(newErrors).length === 0,
				validationVersion: state.validationVersion + 1,
			};

		case "SET_ERRORS":
			return {
				...state,
				errors: action.errors,
				isValid: Object.keys(action.errors).length === 0,
				validationVersion: state.validationVersion + 1,
			};

		case "SET_TOUCHED":
			return {
				...state,
				touched: { ...state.touched, [action.field]: true },
				validationVersion: state.validationVersion + 1,
			};

		case "SET_TOUCHED_FIELDS":
			const touchedUpdates = action.fields.reduce(
				(acc, field) => ({ ...acc, [field]: true }),
				{},
			);
			return {
				...state,
				touched: { ...state.touched, ...touchedUpdates },
				validationVersion: state.validationVersion + 1,
			};

		case "SET_SUBMITTING":
			return { ...state, isSubmitting: action.isSubmitting };

		case "SET_VALIDATING":
			return { ...state, isValidating: action.isValidating };

		case "SET_STEP":
			return { ...state, currentStep: action.step };

		case "NEXT_STEP":
			return { ...state, currentStep: state.currentStep + 1 };

		case "PREV_STEP":
			return { ...state, currentStep: Math.max(1, state.currentStep - 1) };

		case "INCREMENT_SUBMIT_COUNT":
			return { ...state, submitCount: state.submitCount + 1 };

		case "RESET":
			return {
				values: action.values ?? ({} as Partial<T>),
				errors: {},
				touched: {},
				dirty: {},
				isSubmitting: false,
				isValidating: false,
				isValid: true,
				isDirty: false,
				submitCount: 0,
				currentStep: 1,
				validationVersion: 0,
			};

		default:
			return state;
	}
};

// ============================================================================
// Form Controller
// ============================================================================

/** Field change handler */
export type FieldChangeHandler = (field: string, value: unknown) => void;

/** Field blur handler */
export type FieldBlurHandler = (field: string) => void;

/** Form submission handler */
export type SubmitHandler<T> = (values: T) => Promise<void> | void;

/**
 * Framework-agnostic form controller
 *
 * This provides all the logic needed for form handling,
 * which can then be adapted to any UI framework.
 */
export class FormController<
	A extends Record<string, unknown>,
	I = A,
	R = never,
> {
	readonly schema: Schema.Schema<A, I, R>;
	readonly form: ExtractedForm;
	private config: FormConfig<A>;
	private listeners: Set<(state: FormState<Partial<A>>) => void> = new Set();
	private _state: FormState<Partial<A>>;

	constructor(schema: Schema.Schema<A, I, R>, config: FormConfig<A> = {}) {
		this.schema = schema;
		this.form = extractForm(schema);
		this.config = {
			validateOnChange: true,
			validateOnBlur: true,
			revalidateOnChange: true,
			...config,
		};
		// Cast to never since we only do sync validation
		this._state = createFormState(schema as Schema.Schema<A, I, never>, config);
	}

	/** Get current state */
	get state(): FormState<Partial<A>> {
		return this._state;
	}

	/** Subscribe to state changes */
	subscribe(listener: (state: FormState<Partial<A>>) => void): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	/** Dispatch action and notify listeners */
	private dispatch(action: FormAction<Partial<A>>): void {
		this._state = formReducer(this._state, action);
		this.listeners.forEach((l) => l(this._state));
	}

	/** Set a field value */
	setValue(field: string, value: unknown): void {
		// Guard: don't dispatch if value hasn't changed
		// This prevents infinite loops from components calling setValue repeatedly
		const currentValue = this._state.values[field as keyof A];
		if (currentValue === value) {
			return;
		}

		this.dispatch({ type: "SET_VALUE", field, value });

		// Validate on change if configured
		if (this.config.validateOnChange) {
			this.validateField(field);
		}
	}

	/** Set multiple values */
	setValues(values: Partial<A>): void {
		this.dispatch({ type: "SET_VALUES", values });
	}

	/** Handle field blur */
	handleBlur(field: string): void {
		this.dispatch({ type: "SET_TOUCHED", field });

		// Validate on blur if configured
		if (this.config.validateOnBlur) {
			this.validateField(field);
		}
	}

	/** Validate a single field */
	validateField(field: string): string | undefined {
		const fieldDef = this.form.fields.find((f) => f.name === field);
		if (!fieldDef) return undefined;

		// Get field schema and validate
		const syncSchema = this.schema as Schema.Schema<A, I, never>;
		const result = validateSync(syncSchema, this._state.values);

		const error = result.valid ? undefined : result.errors[field];
		this.dispatch({ type: "SET_ERROR", field, error });

		return error;
	}

	/** Validate all fields */
	validate(): ValidationResult<A> {
		this.dispatch({ type: "SET_VALIDATING", isValidating: true });

		const syncSchema = this.schema as Schema.Schema<A, I, never>;
		const result = validateSync(syncSchema, this._state.values);

		if (!result.valid) {
			this.dispatch({ type: "SET_ERRORS", errors: result.errors });
		} else {
			this.dispatch({ type: "SET_ERRORS", errors: {} });
		}

		this.dispatch({ type: "SET_VALIDATING", isValidating: false });

		return result;
	}

	/** Validate current step fields only */
	validateStep(): boolean {
		const stepFields =
			this.form.steps.find((s) => s.step === this._state.currentStep)?.fields ??
			[];

		const stepFieldNames = new Set(stepFields.map((f) => f.name));
		const syncSchema = this.schema as Schema.Schema<A, I, never>;
		const result = validateSync(syncSchema, this._state.values);

		// Filter errors to only current step fields
		const stepErrors: Record<string, string | undefined> = {};
		if (!result.valid) {
			for (const [field, error] of Object.entries(result.errors)) {
				if (stepFieldNames.has(field)) {
					stepErrors[field] = error;
				}
			}
		}

		const hasErrors = Object.keys(stepErrors).length > 0;

		// Only mark fields as touched if validation failed
		// This prevents unnecessary context recreation when step is valid
		if (hasErrors) {
			this.dispatch({
				type: "SET_TOUCHED_FIELDS",
				fields: stepFields.map((f) => f.name),
			});
			this.dispatch({ type: "SET_ERRORS", errors: stepErrors as FieldErrors });
		}

		return !hasErrors;
	}

	/** Go to next step (with validation) */
	nextStep(): boolean {
		if (this.validateStep()) {
			const maxStep = Math.max(...this.form.steps.map((s) => s.step));
			if (this._state.currentStep < maxStep) {
				this.dispatch({ type: "NEXT_STEP" });
				return true;
			}
		}
		return false;
	}

	/** Go to previous step */
	prevStep(): void {
		this.dispatch({ type: "PREV_STEP" });
	}

	/** Go to specific step */
	goToStep(step: number): void {
		this.dispatch({ type: "SET_STEP", step });
	}

	/** Submit the form */
	async submit(handler: SubmitHandler<A>): Promise<boolean> {
		this.dispatch({ type: "INCREMENT_SUBMIT_COUNT" });
		this.dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

		try {
			const result = this.validate();

			if (!result.valid) {
				return false;
			}

			await handler(result.data);
			return true;
		} finally {
			this.dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
		}
	}

	/** Reset the form */
	reset(values?: Partial<A>): void {
		const defaultValues = buildDefaultValues<A>(this.form.fields);
		this.dispatch({
			type: "RESET",
			values:
				values ??
				({ ...defaultValues, ...this.config.initialValues } as Partial<A>),
		});
	}

	/** Set field error (for domain errors from API) */
	setFieldError(field: string, error: string): void {
		this.dispatch({ type: "SET_ERROR", field, error });
	}

	/** Set multiple errors (for domain errors from API) */
	setErrors(errors: FieldErrors): void {
		this.dispatch({ type: "SET_ERRORS", errors });
	}

	/** Get field state */
	getFieldState(field: string): FieldState {
		return {
			value: this._state.values[field as keyof A],
			error: this._state.errors[field],
			touched: this._state.touched[field] ?? false,
			dirty: this._state.dirty[field] ?? false,
			validating: false,
		};
	}

	/** Check if a field should show error */
	shouldShowError(field: string): boolean {
		const state = this.getFieldState(field);
		// Show error if touched or form has been submitted
		return (state.touched || this._state.submitCount > 0) && !!state.error;
	}
}

// ============================================================================
// Render Helpers
// ============================================================================

/** Field render context */
export interface FieldRenderContext {
	readonly field: ExtractedField;
	readonly value: unknown;
	readonly error: string | undefined;
	readonly showError: boolean;
	readonly touched: boolean;
	readonly dirty: boolean;
	readonly colSpanClass: string;
	readonly onChange: (value: unknown) => void;
	readonly onBlur: () => void;
}

/**
 * Create render context for a field
 */
export const createFieldContext = <A extends Record<string, unknown>, I, R>(
	controller: FormController<A, I, R>,
	field: ExtractedField,
): FieldRenderContext => {
	const state = controller.getFieldState(field.name);
	return {
		field,
		value: state.value,
		error: state.error,
		showError: controller.shouldShowError(field.name),
		touched: state.touched,
		dirty: state.dirty,
		colSpanClass: getColSpanClasses(field),
		onChange: (value) => controller.setValue(field.name, value),
		onBlur: () => controller.handleBlur(field.name),
	};
};

/** Section render context */
export interface SectionRenderContext {
	readonly section: ExtractedSection;
	readonly fields: readonly FieldRenderContext[];
	readonly gridClass: string;
}

/**
 * Create render context for a section
 */
export const createSectionContext = <A extends Record<string, unknown>, I, R>(
	controller: FormController<A, I, R>,
	section: ExtractedSection,
): SectionRenderContext => ({
	section,
	fields: section.fields.map((f) => createFieldContext(controller, f)),
	gridClass: getGridClasses(controller.form.layout),
});

/** Step render context */
export interface StepRenderContext {
	readonly step: ExtractedStep;
	readonly sections: readonly SectionRenderContext[];
	readonly isActive: boolean;
	readonly isCompleted: boolean;
	readonly canNavigateTo: boolean;
}

/**
 * Create render context for a step
 */
export const createStepContext = <A extends Record<string, unknown>, I, R>(
	controller: FormController<A, I, R>,
	step: ExtractedStep,
): StepRenderContext => {
	const currentStep = controller.state.currentStep;
	return {
		step,
		sections: step.sections.map((s) => createSectionContext(controller, s)),
		isActive: step.step === currentStep,
		isCompleted: step.step < currentStep,
		canNavigateTo: step.step <= currentStep,
	};
};
