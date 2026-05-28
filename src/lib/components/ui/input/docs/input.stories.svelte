<script module>
    import { defineMeta } from '@storybook/addon-svelte-csf';
    import Input from "../input.svelte";
    import { InputGroupButton } from '$lib/components/ui/input-group';
    import Search from '@lucide/svelte/icons/search';
    import Mail from '@lucide/svelte/icons/mail';
    import Lock from '@lucide/svelte/icons/lock';
    import Phone from '@lucide/svelte/icons/phone';
    import CreditCard from '@lucide/svelte/icons/credit-card';
    import Copy from '@lucide/svelte/icons/copy';
    import Send from '@lucide/svelte/icons/send';
    import Eye from '@lucide/svelte/icons/eye';
    import EyeOff from '@lucide/svelte/icons/eye-off';
    import X from '@lucide/svelte/icons/x';
    import * as Field from '$lib/components/ui/field';

    const { Story } = defineMeta({
        title: 'Components/Input',
        component: Input,
        tags: ['autodocs'],
        argTypes: {
            // Main props we want to control
            variant: {
                control: { type: 'select' },
                options: ['default', 'outline', 'filled', 'ghost', 'underline'],
                description: 'Visual variant of the input',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            size: {
                control: { type: 'select' },
                options: ['sm', 'default', 'lg'],
                description: 'Size of the input',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'default' },
                },
            },
            type: {
                control: { type: 'select' },
                options: ['text', 'email', 'password', 'number', 'tel', 'url'],
                description: 'HTML input type',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'text' },
                },
            },
            mask: {
                control: { type: 'select' },
                options: [undefined, 'phone', 'ssn', 'creditCard', 'date', 'time'],
                description: 'Input mask pattern for formatting (predefined masks or custom MaskPattern object)',
                table: {
                    type: { summary: 'MaskType | MaskPattern | undefined' },
                    defaultValue: { summary: 'undefined' },
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
            loading: {
                control: { type: 'boolean' },
                description: 'Loading state - when true, shows a spinner and disables the input',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' },
                },
            },
            placeholder: {
                control: { type: 'text' },
                description: 'Placeholder text',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            value: {
                control: { type: 'text' },
                description: 'Input value',
                table: {
                    type: { summary: 'string' },
                    defaultValue: { summary: 'undefined' },
                },
            },
            error: {
                control: { type: 'boolean' },
                description: 'Error state - when true, applies error styling via aria-invalid',
                table: {
                    type: { summary: 'boolean' },
                    defaultValue: { summary: 'false' },
                },
            },
            onError: {
                control: false,
                description: 'Callback function called when error state changes',
                table: {
                    type: { summary: '(error: boolean) => void' },
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
            autocomplete: {
                control: false,
                table: { disable: true },
            },
            onInput: {
                control: false,
                table: { disable: true },
            },
            onChange: {
                control: false,
                table: { disable: true },
            },
        },
        args: {
            variant: 'default',
            size: 'default',
            type: 'text',
            placeholder: 'Enter text...',
        },
        
        parameters: {
            layout: 'centered',
            docs: {
                extractArgTypes: false, // Disable automatic prop extraction
            },
        },
    });




</script>

<Story name="Default" args={{}} />
<Story name="Disabled" args={{ disabled: true, value: 'Cannot edit this', placeholder: 'Disabled input' }} />
<Story name="Loading State" args={{ loading: true, value: 'Loading...', placeholder: 'Loading input' }} />
<Story name="Error State" args={{ error: true, placeholder: 'This field has an error' }} />
<Story name="Error with Value" args={{ error: true, value: 'invalid@email', placeholder: 'Email address' }} />

<Story name="Default Variant" args={{ variant: 'default', placeholder: 'Default variant' }} />
<Story name="Outline Variant" args={{ variant: 'outline', placeholder: 'Outline variant' }} />
<Story name="Filled Variant" args={{ variant: 'filled', placeholder: 'Filled variant' }} />
<Story name="Ghost Variant" args={{ variant: 'ghost', placeholder: 'Ghost variant' }} />
<Story name="Underline Variant" args={{ variant: 'underline', placeholder: 'Underline variant' }} />

<Story name="Phone Mask" args={{ mask: 'phone', placeholder: '(555) 123-4567' }} />
<Story name="SSN Mask" args={{ mask: 'ssn', placeholder: '123-45-6789' }} />
<Story name="Credit Card Mask" args={{ mask: 'creditCard', placeholder: '1234 5678 9012 3456' }} />
<Story name="Date Mask" args={{ mask: 'date', placeholder: 'MM/DD/YYYY' }} />
<Story name="Time Mask" args={{ mask: 'time', placeholder: 'HH:MM' }} />
<Story name="Custom Mask" args={{ 
  mask: {
    pattern: /^#[A-Fa-f0-9]*$/,
    placeholder: '#FF5733',
    maxLength: 7,
    transform: (value) => {
      if (!value.startsWith('#')) return '#' + value;
      return value.toUpperCase();
    }
  },
  placeholder: 'Hex color'
}} />

<Story name="With Start Icon">
  {#snippet template()}
      <Input placeholder="Search...">
        {#snippet startIcon()}
        <Search class="size-4" />
        {/snippet}
    </Input>
  {/snippet}

</Story>

<Story name="With End Icon">
    {#snippet template()}
        <Input type="email" placeholder="Enter email">
            {#snippet endIcon()}
            <Mail class="size-4" />
        {/snippet}
    </Input>
    {/snippet}

</Story>

<Story name="With Both Icons">
  {#snippet template()}
      <Input placeholder="Secure input">
        {#snippet startIcon()}
        <Lock class="size-4" />
        {/snippet}
        {#snippet endIcon()}
        <Lock class="size-4 text-green-600" />
        {/snippet}
    </Input>
  {/snippet}

</Story>

<Story name="With Start Text" args={{
  placeholder: "example.com",
  startText: "https://"
}} />

<Story name="With End Text" args={{
  placeholder: "username",
  endText: "@company.com"
}} />

<Story name="With Start and End Text" args={{
  placeholder: "example",
  startText: "https://",
  endText: ".com"
}} />

<Story name="Currency Input" args={{
  type: "number",
  placeholder: "0.00",
  startText: "$",
  endText: "USD"
}} />

<Story name="With Search Button">
   {#snippet template()}
    <Input placeholder="Search...">
        {#snippet endButton()}
        <InputGroupButton size="xs">
            Search
        </InputGroupButton>
        {/snippet}
    </Input>
  {/snippet}
</Story>

<Story name="With Copy Button">
   {#snippet template()}
    <Input readonly value="https://example.com">
        {#snippet endButton()}
        <InputGroupButton size="icon-xs" variant="ghost">
            <Copy class="size-4" />
        </InputGroupButton>
        {/snippet}
    </Input>
  {/snippet}
</Story>



<Story name="Phone with Icon and Mask">
   {#snippet template()}
    <Input mask="phone" placeholder="(555) 555-5555">
        {#snippet startIcon()}
        <Phone class="size-4" />
        {/snippet}
    </Input>
  {/snippet}
</Story>

<Story name="Credit Card with Icon and Mask">
  {#snippet template()}  
    <Input mask="creditCard" placeholder="1234 5678 9012 3456">
        {#snippet startIcon()}
        <CreditCard class="size-4" />
        {/snippet}
    </Input>
    {/snippet}
</Story>



<script>
  let showPassword = $state(false);
  let searchValue = $state('');
</script>

<Story name="Password Toggle">
    {#snippet template()}
        <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
        >
            {#snippet startIcon()}
            <Lock class="size-4" />
            {/snippet}
            {#snippet endButton()}
            <InputGroupButton
                size="icon-xs"
                variant="ghost"
                onclick={() => showPassword = !showPassword}
            >
                {#if showPassword}
                <EyeOff class="size-4" />
                {:else}
                <Eye class="size-4" />
                {/if}
            </InputGroupButton>
            {/snippet}
        </Input>
    {/snippet}
</Story>

<Story name="Clearable Search">
    {#snippet template()}
    <Input bind:value={searchValue} placeholder="Type to search...">
        {#snippet startIcon()}
        <Search class="size-4" />
        {/snippet}
        {#if searchValue}
        {#snippet endButton()}
            <InputGroupButton
            size="icon-xs"
            variant="ghost"
            onclick={() => searchValue = ''}
            >
            <X class="size-4" />
            </InputGroupButton>
        {/snippet}
        {/if}
    </Input>
  {/snippet}
</Story>


<Story name="Custom Addon with Status">
    {#snippet template()}
    <Input placeholder="Enter value">
        {#snippet startAddon()}
        <div class="flex items-center gap-2">
            <div class="size-2 rounded-full bg-green-500 animate-pulse"></div>
            <span class="text-xs font-medium">Live</span>
        </div>
        {/snippet}
    </Input>
  {/snippet}
</Story>

<Story name="Custom Addon with Multiple Buttons">
  {#snippet template()} 
    <Input placeholder="Type your message...">
        {#snippet endAddon()}
        <div class="flex items-center gap-1">
            <InputGroupButton size="icon-xs" variant="ghost">
            <span>😀</span>
            </InputGroupButton>
            <InputGroupButton size="icon-xs" variant="default">
            <Send class="size-4" />
            </InputGroupButton>
        </div>
        {/snippet}
    </Input>
    {/snippet}
</Story>

<Story name="With Field Error">
    {#snippet template()}
    <Field.Field label="Email" error="Invalid email address" required>
        <Input error={true} value="invalid@" placeholder="Enter email">
            {#snippet startIcon()}
            <Mail class="size-4" />
            {/snippet}
        </Input>
  </Field.Field>
  {/snippet}
</Story>

<Story name="Field with Description">
    {#snippet template()}
    <Field.Field 
        label="Username" 
        description="Choose a unique username for your account"
        required
    >
        <Input placeholder="johndoe">
            {#snippet startIcon()}
            <Search class="size-4" />
            {/snippet}
        </Input>
    </Field.Field>
    {/snippet}
</Story>


<Story name="Complete Form with Field">
    {#snippet template()}
    <div class="w-full max-w-lg space-y-4">
        <Field.Set>
            <Field.Legend>Account Information</Field.Legend>
            <Field.Description>Create your account</Field.Description>
            
            <Field.Separator />
            
            <Field.Group class="gap-4">
                <Field.Field label="Email" description="We'll never share your email" required>
                    <Input type="email" placeholder="you@example.com">
                        {#snippet startIcon()}
                        <Mail class="size-4" />
                        {/snippet}
                    </Input>
                </Field.Field>
                
                <Field.Field label="Password" description="At least 8 characters" required>
                    <Input type="password" placeholder="••••••••">
                        {#snippet startIcon()}
                        <Lock class="size-4" />
                        {/snippet}
                    </Input>
                </Field.Field>
                
                <Field.Field label="Phone" description="For account verification">
                    <Input mask="phone" placeholder="(555) 555-5555">
                        {#snippet startIcon()}
                        <Phone class="size-4" />
                        {/snippet}
                    </Input>
                </Field.Field>
            </Field.Group>
        </Field.Set>
    </div>
    {/snippet}
</Story>


