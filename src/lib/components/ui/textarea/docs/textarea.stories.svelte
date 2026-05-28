<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Textarea from "../textarea.svelte";
	import * as Field from '$lib/components/ui/field';
	import { Button } from '$lib/components/ui/button';

	const { Story } = defineMeta({
		title: "Components/Textarea",
		component: Textarea,
		tags: ["autodocs"],
		argTypes: {
			// Main props we want to control
			variant: {
				control: { type: "select" },
				options: ["default", "outline", "filled", "ghost", "underline"],
				description: "Visual variant of the textarea",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			size: {
				control: { type: "select" },
				options: ["sm", "default", "lg"],
				description: "Size of the textarea",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "default" },
				},
			},
			resize: {
				control: { type: "select" },
				options: ["none", "vertical", "horizontal", "both"],
				description: "Resize behavior",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "vertical" },
				},
			},
			maxLength: {
				control: { type: "number" },
				description: "Maximum character length",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			showCount: {
				control: { type: "boolean" },
				description: "Show character counter",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			autoResize: {
				control: { type: "boolean" },
				description: "Auto-resize based on content",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			minRows: {
				control: { type: "number" },
				description: "Minimum rows for auto-resize",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			maxRows: {
				control: { type: "number" },
				description: "Maximum rows for auto-resize",
				table: {
					type: { summary: "number" },
					defaultValue: { summary: "undefined" },
				},
			},
			disabled: {
				control: { type: "boolean" },
				description: "Whether the textarea is disabled",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			loading: {
				control: { type: "boolean" },
				description: "Loading state - when true, shows a spinner and disables the textarea",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			placeholder: {
				control: { type: "text" },
				description: "Placeholder text",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "undefined" },
				},
			},
			value: {
				control: { type: "text" },
				description: "Textarea value",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "undefined" },
				},
			},
			error: {
				control: { type: "boolean" },
				description: "Error state - when true, applies error styling via aria-invalid",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			onError: {
				control: false,
				description: "Callback function called when error state changes",
				table: {
					type: { summary: "(error: boolean) => void" },
				},
			},

			// Hide unwanted props from controls
			class: {
				control: false,
				table: { disable: true },
			},
			id: {
				control: false,
				table: { disable: true },
			},
			name: {
				control: false,
				table: { disable: true },
			},
			required: {
				control: false,
				table: { disable: true },
			},
			readonly: {
				control: false,
				table: { disable: true },
			},
			rows: {
				control: false,
				table: { disable: true },
			},
			cols: {
				control: false,
				table: { disable: true },
			},
		},
		args: {
			variant: "default",
			size: "default",
			resize: "vertical",
			showCount: false,
			autoResize: false,
			placeholder: "Type your message here...",
		},

		parameters: {
			docs: {
				extractArgTypes: false,
			},
		},
	});
</script>

<!-- Basic States -->
<Story name="Default" args={{}} />
<Story name="Disabled" args={{ disabled: true, value: "This textarea is disabled" }} />
<Story name="Loading State" args={{ loading: true, value: "Loading...", placeholder: "Loading textarea" }} />
<Story name="Error State" args={{ error: true, placeholder: "This field has an error" }} />
<Story name="Error with Count" args={{ error: true, maxLength: 100, showCount: true, value: "This message has an error and shows character count" }} />

<!-- Variants -->
<Story name="Default Variant" args={{ variant: "default", placeholder: "Default variant" }} />
<Story name="Outline Variant" args={{ variant: "outline", placeholder: "Outline variant" }} />
<Story name="Filled Variant" args={{ variant: "filled", placeholder: "Filled variant" }} />
<Story name="Ghost Variant" args={{ variant: "ghost", placeholder: "Ghost variant" }} />
<Story name="Underline Variant" args={{ variant: "underline", placeholder: "Underline variant" }} />

<!-- Sizes -->
<Story name="Small Size" args={{ size: "sm", placeholder: "Small textarea" }} />
<Story name="Default Size" args={{ size: "default", placeholder: "Default textarea" }} />
<Story name="Large Size" args={{ size: "lg", placeholder: "Large textarea" }} />

<!-- Resize Options -->
<Story name="Resize None" args={{ resize: "none", placeholder: "Cannot be manually resized" }} />
<Story name="Resize Vertical" args={{ resize: "vertical", placeholder: "Resize vertically only (default)" }} />
<Story name="Resize Horizontal" args={{ resize: "horizontal", placeholder: "Resize horizontally only" }} />
<Story name="Resize Both" args={{ resize: "both", placeholder: "Resize in any direction" }} />

<!-- Features -->
<Story name="With Character Count" args={{ showCount: true, placeholder: "Type to see character count..." }} />
<Story name="With Max Length" args={{ maxLength: 200, showCount: true, placeholder: "Maximum 200 characters..." }} />
<Story name="Auto Resize" args={{ autoResize: true, minRows: 2, maxRows: 6, placeholder: "Type multiple lines to see auto-resize..." }} />

<!-- With Field Component -->
<Story name="Field with Label">
  {#snippet template()}
    <Field.Field
      label="Biography"
      description="Tell us about yourself"
    >
      <Textarea placeholder="Write your bio here..." rows={4} />
    </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Character Counter">
  {#snippet template()}
    <Field.Field
      label="Description"
      description="Maximum 200 characters"
    >
      <Textarea 
        maxLength={200}
        showCount
        placeholder="Enter description..."
      />
    </Field.Field>
  {/snippet}
</Story>



<Story name="Field with Error">
  {#snippet template()}
    <Field.Field
      label="Message"
      description="Minimum 50 characters"
      required
      error="Message must be at least 50 characters"
    >
      <Textarea 
        placeholder="Type your message..."
        aria-invalid={true}
        rows={4}
      />
    </Field.Field>
  {/snippet}
</Story>


<Story name="Complete Form with Field">
  {#snippet template()}
    <div class="w-full max-w-md space-y-6">
      <Field.Set>
        <Field.Legend>Project Details</Field.Legend>
        <Field.Description>Provide information about your project</Field.Description>
        
        <Field.Separator />
        
        <Field.Group class="gap-4">
          <Field.Field
            label="Description"
            description="Detailed description (minimum 50 characters)"
            required
          >
            <Textarea 
              variant="outline"
              size="lg"
              maxLength={1000}
              showCount
              autoResize
              minRows={4}
              maxRows={10}
              placeholder="Describe your project..."
            />
          </Field.Field>
          
          <Field.Field
            label="Additional Notes"
            description="Any other information"
          >
            <Textarea 
              variant="filled"
              autoResize
              minRows={3}
              maxRows={6}
              placeholder="Optional notes..."
            />
          </Field.Field>
        </Field.Group>
        
        <div class="flex gap-4 pt-4">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </div>
      </Field.Set>
    </div>
  {/snippet}
</Story>

