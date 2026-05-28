<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field } from '../index.js';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Checkbox, CheckboxGroup, type CheckboxGroupOption } from '$lib/components/ui/checkbox';
  import { Switch } from '$lib/components/ui/switch';
  import  { Select } from '$lib/components/ui/select';
  import  {RadioGroup, type RadioGroupOption} from '$lib/components/ui/radio';
  import { Slider } from '$lib/components/ui/slider';
  import  {InputOTP} from '$lib/components/ui/input-otp';
  import { NumberSpinner } from '$lib/components/ui/number-spinner';
  import  {FileInput} from '$lib/components/ui/file-input';
  import { DatePicker } from '$lib/components/ui/date-picker';
  import Mail from '@lucide/svelte/icons/mail';
  import Lock from '@lucide/svelte/icons/lock';
  import User from '@lucide/svelte/icons/user';
  import Phone from '@lucide/svelte/icons/phone';
  import CreditCard from '@lucide/svelte/icons/credit-card';

  const { Story } = defineMeta({
    title: 'Components/Field',
    component: Field,
    tags: ['autodocs'],
    parameters: {
      layout: 'padded',
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<script>



  let email = $state('');
  let password = $state('');
  let bio = $state('');
  let acceptTerms = $state(false);
  let notifications = $state(false);
  let country = $state('');
  let plan = $state('free');
  let volume = $state(50);
  let otp = $state('');
  let quantity = $state(0.5);
  let date = $state(undefined);
  let phoneNumber = $state('');

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' }
  ];

  const planOptions: RadioGroupOption[] = [
    { id: "free", label: "Free", value: "free", description: "$0/month - Basic features" },
    { id: "pro", label: "Pro", value: "pro", description: "$29/month - Advanced features" },
    { id: "enterprise", label: "Enterprise", value: "enterprise", description: "$99/month - Full features" },
  ];

  	const preferencesOptions: CheckboxGroupOption[] = [
		{ id: "email", label: "Email notifications", value: "email" },
		{ id: "sms", label: "SMS notifications", value: "sms" },
		{ id: "push", label: "Push notifications", value: "push" },
		{ id: "newsletter", label: "Newsletter", value: "newsletter", disabled: true },
  ];
</script>

<!-- Basic Input Field -->
<Story name="Input - Basic">
  {#snippet template()}
    <Field label="Email" description="Enter your email address">
      <Input type="email" bind:value={email} placeholder="you@example.com" />
    </Field>
  {/snippet}
</Story>

<Story name="Input - With Icon">
  {#snippet template()}
    <Field label="Email" description="We'll never share your email">
      <Input type="email" bind:value={email} placeholder="you@example.com">
        {#snippet startIcon()}
          <Mail class="size-4" />
        {/snippet}
      </Input>
    </Field>
  {/snippet}
</Story>


<Story name="Input - With Error and Required">
  {#snippet template()}
    <Field label="Email" error="Please enter a valid email address" required>
      <Input type="email" error={true} bind:value={email} placeholder="you@example.com" />
    </Field>
  {/snippet}
</Story>



<Story name="Input - Password with Icon">
  {#snippet template()}
    <Field label="Password" description="At least 8 characters" required>
      <Input type="password" bind:value={password} placeholder="••••••••">
        {#snippet startIcon()}
          <Lock class="size-4" />
        {/snippet}
      </Input>
    </Field>
  {/snippet}
</Story>

<Story name="Input - Phone with Mask">
  {#snippet template()}
    <Field label="Phone number" description="Enter your phone number">
      <Input mask="phone" bind:value={phoneNumber} placeholder="(555) 555-5555">
        {#snippet startIcon()}
          <Phone class="size-4" />
        {/snippet}
      </Input>
    </Field>
  {/snippet}
</Story>


<!-- Textarea Field -->
<Story name="Textarea - Basic">
  {#snippet template()}
    <Field label="Biography" description="Tell us about yourself">
      <Textarea bind:value={bio} placeholder="Write your bio here..." rows={4} />
    </Field>
  {/snippet}
</Story>


<Story name="Textarea - With Error">
  {#snippet template()}
    <Field label="Biography" error="Biography must be at least 50 characters" required>
      <Textarea bind:value={bio} error={true} placeholder="Write your bio..." />
    </Field>
  {/snippet}
</Story>

<!-- Checkbox Field -->
<Story name="Checkbox - Horizontal"> 
  {#snippet template()}
    <Field
      label="Accept terms and conditions"
      description="You must accept to continue"
      labelPosition="after"
      orientation="horizontal"
    >
      <Checkbox bind:checked={acceptTerms} />
    </Field>
  {/snippet}
</Story>

<Story name="Checkbox - Vertical">
  {#snippet template()}
    <Field label="Marketing emails" 
    description="Receive promotional emails and updates"
    labelPosition="before"
    orientation="horizontal"
    >
      <Checkbox bind:checked={acceptTerms} />
    </Field>
  {/snippet}
</Story>

<Story name="Checkbox - With Error">
  {#snippet template()}
    <Field
      label="Accept terms"
      error="You must accept the terms to continue"
      orientation="horizontal"
      labelPosition="after"
      required
    >
      <Checkbox bind:checked={acceptTerms} />
    </Field>
  {/snippet}
</Story>

<Story name="CheckboxGroup - Error State">
  {#snippet template()}
    <Field label="Select your preferences" error="Please select at least one preference" description="Choose all that apply">
      <CheckboxGroup options={preferencesOptions}  />
    </Field>
  {/snippet}

</Story>

<!-- Switch Field -->
<Story name="Switch - Horizontal">
  {#snippet template()}
    <Field
      label="Enable notifications"
      description="Receive email notifications for updates"
      orientation="horizontal"
    >
      <Switch bind:checked={notifications} />
    </Field>
  {/snippet}
</Story>



<Story name="Switch - Error">
  {#snippet template()}
    <Field
      label="Beta features"
      description="Not available in your plan"
      disabled
      error="You cannot enable beta features"
      orientation="horizontal"
      labelPosition="before"
    >
      <Switch checked={false} disabled error />
    </Field>
  {/snippet}
</Story>

<!-- Select Field -->
<Story name="Select - Basic">
  {#snippet template()}
    <Field label="Country" description="Select your country of residence">
      <Select options={countries} bind:value={country} placeholder="Select a country" />
    </Field>
  {/snippet}
</Story>



<Story name="Select - With Error">
  {#snippet template()}
    <Field label="Country" error="Please select a country" required>
      <Select options={countries} bind:value={country} placeholder="Select a country" error={true} />
    </Field>
  {/snippet}
</Story>

<!-- Radio Group Field -->
<Story name="RadioGroup - Plans">
  {#snippet template()}
    <Field label="Select a plan" description="Choose the plan that works best for you">
     <RadioGroup options={planOptions} bind:value={plan} />
    </Field>
  {/snippet}
</Story>

<Story name="RadioGroup - With Error">
  {#snippet template()}
    <Field label="Select a plan" error="Please select a plan" description="Choose the plan that works best for you">
     <RadioGroup options={planOptions} error bind:value={plan} />
    </Field>
  {/snippet}
</Story>

<!-- Slider Field -->
<Story name="Slider - Basic">
  {#snippet template()}
    <Field label="Volume" description={`Current volume: ${volume}%`}>
      <Slider type="single" bind:value={volume} min={0} max={100} step={1} />
    </Field>
  {/snippet}
</Story>

<Story name="Slider - With Error">
  {#snippet template()}
    <Field label="Volume" error="Volume must be between 0 and 100" description={`Current volume: ${volume}%`}>
      <Slider type="single" bind:value={volume} min={0} max={100} step={1} />
    </Field>
  {/snippet}
</Story>

<!-- Input OTP Field -->
<Story name="InputOTP - Verification Code">
  {#snippet template()}
    <Field label="Verification code" description="Enter the 6-digit code sent to your email">
      <InputOTP maxlength={6} groups={2} bind:value={otp} />
    </Field>
  {/snippet}
</Story>

<Story name="InputOTP - With Error">
  {#snippet template()}
    <Field label="Verification code" error="Invalid verification code" description="Enter the 6-digit code sent to your email">
      <InputOTP error maxlength={6} groups={2} bind:value={otp} />
    </Field>
  {/snippet}
</Story>

<!-- Number Spinner Field -->
<Story name="NumberSpinner - Quantity">
  {#snippet template()}
    <Field label="Quantity" description="Select the number of items" class="max-w-xs">
      <NumberSpinner bind:value={quantity} min={1} max={100} />
    </Field>
  {/snippet}
</Story>

<Story name="NumberSpinner - With Error">
  {#snippet template()}
    <Field label="Quantity" error="Quantity must be between 1 and 100" description="Select the number of items" class="max-w-xs">
      <NumberSpinner  error bind:value={quantity} min={1} max={100} />
    </Field>
  {/snippet}
</Story>


<!-- File Input Field -->
<Story name="FileInput - Regular">
  {#snippet template()}
    <Field label="Upload resume" description="PDF or Word document (max 5MB)">
      <FileInput
        mode="regular"
        validation={{ 
						maxFiles: 3,
						acceptedTypes: ['.doc', '.docx', '.txt'] 
					}}
      />
    </Field>
  {/snippet}
</Story>

<Story name="FileInput - Drag Drop">
  {#snippet template()}
    <Field label="Upload images" description="Drag and drop or click to browse">
      <FileInput
         mode="drag-drop"
         validation={{ 
						maxSize: 10 * 1024 * 1024, 
						acceptedTypes: ['image/*', '.pdf'],
            
					}} 
          dragDropProps={{
						label: "Drop images or PDFs here",
						description: "Max 10MB per file",
						showFileList: true
					}}/>
    </Field>
  {/snippet}
</Story>

<Story name="FileInput - With Error">
  {#snippet template()}
    <Field label="Upload document" error="File size exceeds 5MB limit">
      <FileInput mode="regular" validation={{ 
						maxSize: 5 * 1024 * 1024, 
						acceptedTypes: ['application/pdf'] 
					}}  />
    </Field>
  {/snippet}
</Story>

<!-- Date Picker Field -->
<Story name="DatePicker - Basic">
  {#snippet template()}
    <Field label="Date of birth" description="Select your birth date">
      <DatePicker bind:value={date} />
    </Field>
  {/snippet}
</Story>

<Story name="DatePicker - With Error">
  {#snippet template()}
    <Field label="Start date" error="Invalid start date" description="Project start date" required>
      <DatePicker bind:value={date} error />
    </Field>
  {/snippet}
</Story>


<!-- Complete Form Example -->
<Story name="Complete Form - Login">
  {#snippet template()}
    <form class="space-y-4 max-w-md">
      <Field label="Email" description="Enter your email address" required>
        <Input type="email" bind:value={email} placeholder="you@example.com">
          {#snippet startIcon()}
            <Mail class="size-4" />
          {/snippet}
        </Input>
      </Field>

      <Field label="Password" description="At least 8 characters" required>
        <Input type="password" bind:value={password} placeholder="••••••••">
          {#snippet startIcon()}
            <Lock class="size-4" />
          {/snippet}
        </Input>
      </Field>

      <Field
        label="Remember me"
        description="Stay logged in for 30 days"
        labelPosition="after"
        orientation="horizontal"
      >
        <Checkbox bind:checked={acceptTerms} />
      </Field>
    </form>
  {/snippet}
</Story>
