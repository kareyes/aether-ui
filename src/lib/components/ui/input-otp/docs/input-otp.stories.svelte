<script module lang="ts">
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import InputOTP from "../input-otp.svelte";
    import * as Field from '$lib/components/ui/field';
    import { Button } from '$lib/components/ui/button';
    import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";

    
    const { Story } = defineMeta({
        title: 'Components/InputOTP',
        component: InputOTP,
        tags: ['autodocs'],
        argTypes: {
            maxlength: {
                control: { type: 'number', min: 1, max: 12 },
                description: 'Maximum length of the OTP input',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '6' },
                },
            },
            variant: {
                control: { type: 'select' },
                options: ['default', 'outline', 'underline'],
                description: 'Visual variant of the input slots',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            size: {
                control: { type: 'select' },
                options: ['sm', 'default', 'lg'],
                description: 'Size of the input slots',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            groups: {
                control: { type: 'number', min: 1, max: 6 },
                description: 'Number of groups to split the input into',
                table: {
                    type: { summary: 'number' },
                    defaultValue: { summary: '1' },
                },
            },
            showSeparator: {
                control: { type: 'boolean' },
                description: 'Show separator between groups (defaults to true when groups > 1)',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'true when groups > 1' },
                },
            },
            disabled: {
                control: { type: 'boolean' },
                description: 'Whether the input is disabled',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' },
                },
            },
            error: {
                control: { type: 'boolean' },
                description: 'Error state - applies error styling to all slots',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' },
                },
            },
            pattern: {
                control: { type: 'text' },
                description: 'Regex pattern string to validate input characters',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            value: {
                control: { type: 'text' },
                description: 'Current OTP value',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: '""' },
                },
            },
        },
        args: {
            maxlength: 6,
            variant: 'default',
            size: 'default',
            groups: 2,
            disabled: false,
            error: false,
        },
        
        parameters: {
            layout: 'centered',
            docs: {
                extractArgTypes: false,
            },
        },
    });

</script>

<!-- Basic States -->
<Story name="Default" args={{}} />
<Story name="Single Group" args={{ groups: 1 }} />
<Story name="Two Groups" args={{ groups: 2 }} />
<Story name="Three Groups" args={{ groups: 3 }} />
<Story name="Disabled" args={{ disabled: true }} />
<Story name="Error State" args={{ error: true }} />
<Story name="Without Separator" args={{ groups: 2, showSeparator: false }} />

<!-- Variants -->
<Story name="Default Variant" args={{ variant: 'default', groups: 2 }} />
<Story name="Outline Variant" args={{ variant: 'outline', groups: 2 }} />
<Story name="Underline Variant" args={{ variant: 'underline', groups: 2 }} />

<!-- Sizes -->
<Story name="Small Size" args={{ size: 'sm', groups: 1 }} />
<Story name="Default Size" args={{ size: 'default', groups: 1 }} />
<Story name="Large Size" args={{ size: 'lg', groups: 1 }} />



<!-- Different Lengths -->
<Story name="Four Digits" args={{maxlength: 4, groups: 1 }} />
<Story name="Six Digits" args={{ maxlength: 6, groups: 2 }} />
<Story name="Eight Digits" args={{ maxlength: 8, groups: 2 }} />

<!-- Pattern Validation -->
<Story name="Digits Only" args={{ maxlength: 6, groups: 1, pattern: '^\\d+$' }} />
<Story name="Alphanumeric" args={{ maxlength: 6, groups: 1, pattern: '^[a-zA-Z0-9]+$' }} />

<!-- Combinations -->
<Story name="Large Outline Two Groups" args={{ 
    variant: 'outline', 
    size: 'lg', 
    groups: 2 
}} />
<Story name="Small Underline Three Groups" args={{ 
    variant: 'underline', 
    size: 'sm', 
    groups: 3 
}} />



<Story name="With Field Component" >
    {#snippet template()}
        <Field.Field label="Input OTP" error={"Invalid OTP"}>
            <InputOTP maxlength={6} groups={2} variant="outline" size="lg" error={true} />
        </Field.Field>
    {/snippet}
</Story>

<!-- With Field Component Examples -->
<Story name="Field with Label and Description">
    {#snippet template()}
        <Field.Field
            label="Verification Code"
            description="Enter the 6-digit code sent to your phone"
        >
            <InputOTP maxlength={6} groups={2} />
        </Field.Field>
    {/snippet}
</Story>

<Story name="Field with Validation">
    {#snippet template()}
        <Field.Field
            label="OTP Code"
            description="Please enter the complete 6-digit code"
            required
            error="Code must be 6 digits"
        >
            <InputOTP 
                maxlength={6} 
                groups={2}
                pattern={REGEXP_ONLY_DIGITS}
                error={true}
            />
        </Field.Field>
    {/snippet}
</Story>

<Story name="Field with Outline Variant">
    {#snippet template()}
        <Field.Field
            label="Security Code"
            description="Outline variant for better visibility"
        >
            <InputOTP 
                maxlength={6} 
                variant="outline"
                groups={3}
                size="lg"
            />
        </Field.Field>
    {/snippet}
</Story>

<Story name="Field with Underline Variant">
    {#snippet template()}
        <Field.Field
            label="Access Code"
            description="Underline variant for minimal design"
        >
            <InputOTP 
                maxlength={4} 
                variant="underline"
                groups={1}
            />
        </Field.Field>
    {/snippet}
</Story>

<Story name="Field with Alphanumeric Pattern">
    {#snippet template()}
        <Field.Field
            label="Backup Code"
            description="Enter your 8-character backup code"
        >
            <InputOTP 
                maxlength={8} 
                groups={2}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                variant="outline"
            />
        </Field.Field>
    {/snippet}
</Story>

<Story name="Complete Two-Factor Form">
    {#snippet template()}
        <div class="w-full max-w-md space-y-6">
            <Field.Set>
                <Field.Legend>Two-Factor Authentication</Field.Legend>
                <Field.Description>
                    Enter the verification codes to access your account
                </Field.Description>
                
                <Field.Separator />
                
                <Field.Group class="gap-4">
                    <Field.Field
                        label="Verification Code"
                        description="Enter the 6-digit code from your authenticator app"
                        required
                    >
                        <InputOTP
                            maxlength={6}
                            groups={2}
                            pattern={REGEXP_ONLY_DIGITS}
                            variant="outline"
                            size="lg"
                        />
                    </Field.Field>
                    
                    <Field.Field
                        label="Backup Code (Optional)"
                        description="Use a backup code if you don't have access to your authenticator"
                    >
                        <InputOTP
                            maxlength={8}
                            groups={2}
                            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            variant="underline"
                        />
                    </Field.Field>
                </Field.Group>
                
                <div class="flex gap-4 pt-4">
                    <Button type="submit">Verify & Login</Button>
                    <Button variant="outline" type="button">Resend Code</Button>
                </div>
            </Field.Set>
        </div>
    {/snippet}
</Story>