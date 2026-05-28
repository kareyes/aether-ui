/**
 * Schema-First Form System for Effect + Svelte 5
 *
 * This module provides a production-ready form system that uses
 * @effect/schema as the single source of truth for:
 * - Validation rules
 * - Domain typing
 * - UI metadata
 * - Layout configuration
 *
 * @example
 * ```ts
 * import { Schema, pipe } from 'effect';
 * import {
 *   withField,
 *   withFormLayout,
 *   FormController,
 *   extractForm,
 *   validateSync
 * } from 'aether-ui/forms';
 *
 * // Define schema with annotations
 * const UserSchema = pipe(
 *   Schema.Struct({
 *     email: pipe(
 *       Schema.String,
 *       Schema.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
 *       withField({
 *         label: 'Email',
 *         inputType: 'email',
 *         section: 'account'
 *       })
 *     ),
 *     // ...more fields
 *   }),
 *   withFormLayout({
 *     columns: 2,
 *     sections: [{ id: 'account', title: 'Account Info' }]
 *   })
 * );
 *
 * // Create controller and use in Svelte component
 * const controller = new FormController(UserSchema);
 * ```
 */

// Annotations
export {
	withFieldUI,
	withFieldLayout,
	withField,
	withFormLayout,
	getFieldUI,
	getFieldLayout,
	getFormLayout,
	getFieldAnnotation,
	FieldUISymbol,
	FieldLayoutSymbol,
	FormLayoutSymbol,
	RequiredCheckbox,
	requiredCheckbox,
	RequiredSwitch,
	requiredSwitch,
	RequiredFile,
	requiredFile,
	type InputType,
	type FieldOption,
	type FieldOptionGroup,
	type FieldUIAnnotation,
	type FieldLayoutAnnotation,
	type FieldAnnotation,
	type ColumnSpan,
	type SectionConfig,
	type StepConfig,
	type FormLayoutConfig,
} from "./annotations.js";

// Validation
export {
	validateSync,
	validate,
	validateField,
	validateFields,
	createFieldValidator,
	validateAsync,
	createFieldState,
	updateFieldValue,
	touchField,
	setFieldError,
	hasErrors,
	getFirstError,
	type FieldErrors,
	type ValidationResult,
	type FieldState as ValidationFieldState,
} from "./validation.js";

// Layout extraction
export {
	extractFields,
	extractForm,
	groupFieldsBySection,
	groupFieldsByStep,
	getFieldsForStep,
	getFieldsForSection,
	getVisibleFields,
	getRequiredFields,
	getColSpanClasses,
	getGridClasses,
	buildDefaultValues,
	type ExtractedField,
	type ExtractedSection,
	type ExtractedStep,
	type ExtractedForm,
} from "./layout.js";

// Form renderer (framework-agnostic)
export {
	FormController,
	createFormState,
	formReducer,
	createFieldContext,
	createSectionContext,
	createStepContext,
	type FieldState,
	type FormState,
	type FormConfig,
	type FormAction,
	type FieldChangeHandler,
	type FieldBlurHandler,
	type SubmitHandler,
	type FieldRenderContext,
	type SectionRenderContext,
	type StepRenderContext,
} from "./renderer.js";

// Svelte 5 Components
export {
	SchemaField,
	SchemaSection,
	SchemaStep,
	SchemaForm,
} from "./components/index.js";
