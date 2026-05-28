<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "$lib/components/ui/tabs";
  import { fn } from "storybook/test";
  import { Home, User, Settings } from "@lucide/svelte";
  import { type Args } from "storybook/internal/types";

  const { Story } = defineMeta({
    title: "Components/Tabs",
    component: Tabs,
    tags: ["autodocs"],
    argTypes: {
      // Main props we want to control
      // variant: {
      //   control: { type: "select" },
      //   options: ["default", "underline", "pills", "solid", "segmented"],
      //   description: "Visual style variant of the tabs",
      //   table: {
      //     type: { summary: "string" },
      //     defaultValue: { summary: "default" },
      //   },
      // },
      // size: {
      //   control: { type: "select" },
      //   options: ["sm", "default", "lg"],
      //   description: "Size of the tabs",
      //   table: {
      //     type: { summary: "string" },
      //     defaultValue: { summary: "default" },
      //   },
      // },
      // animation: {
      //   control: { type: "select" },
      //   options: ["none", "fade", "slide", "scale"],
      //   description: "Animation effect for content transitions",
      //   table: {
      //     type: { summary: "string" },
      //     defaultValue: { summary: "fade" },
      //   },
      // },
      // padding: {
      //   control: { type: "select" },
      //   options: ["none", "sm", "default", "lg"],
      //   description: "Top padding of content area",
      //   table: {
      //     type: { summary: "string" },
      //     defaultValue: { summary: "default" },
      //   },
      // },
      value: {
        control: { type: "text" },
        description: "Currently active tab value",
        table: {
          type: { summary: "string" },
          defaultValue: { summary: "undefined" },
        },
      },

      // Hide unwanted props from controls
      class: {
        control: false,
        table: { disable: true },
      },
      ref: {
        control: false,
        table: { disable: true },
      },
      children: {
        control: false,
        table: { disable: true },
      },
      onValueChange: {
        control: false,
        table: { disable: true },
        description: "Value change handler (not controllable in Storybook)",
      },
    },
    args: {
      onValueChange: fn(),
    },

    // Disable automatic prop extraction
    parameters: {
      docs: {
        extractArgTypes: false,
      },
    },
  });
</script>

<!-- Default Variant -->
<Story name="Default" args={{ value: "account" }}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Account Information</h3>
      <p class="text-sm text-muted-foreground">
        View and manage your account details here.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="password">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Password Settings</h3>
      <p class="text-sm text-muted-foreground">
        Change your password and security preferences.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="settings">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Application Settings</h3>
      <p class="text-sm text-muted-foreground">
        Configure your application preferences.
      </p>
    </div>
  </TabsContent>
</Story>

<!-- Underline Variant -->
<Story name="Underline" args={{ value: "overview" }}>
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
    <TabsTrigger variant="underline" value="analytics">Analytics</TabsTrigger>
    <TabsTrigger variant="underline" value="reports">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Overview Dashboard</h3>
      <p class="text-sm text-muted-foreground">
        Your main dashboard overview with key metrics.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="analytics">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Analytics</h3>
      <p class="text-sm text-muted-foreground">
        Detailed analytics and performance metrics.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="reports">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Reports</h3>
      <p class="text-sm text-muted-foreground">
        Generate and view comprehensive reports.
      </p>
    </div>
  </TabsContent>
</Story>

<!-- Pills Variant -->
<Story name="Pills" args={{ value: "home" }}>
  <TabsList variant="pills">
    <TabsTrigger variant="pills" value="home">
      <Home class="size-4" />
      Home
    </TabsTrigger>
    <TabsTrigger variant="pills" value="profile">
      <User class="size-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger variant="pills" value="settings">
      <Settings class="size-4" />
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="home">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Home Page</h3>
      <p class="text-sm text-muted-foreground">Welcome to your home page.</p>
    </div>
  </TabsContent>
  <TabsContent value="profile">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">User Profile</h3>
      <p class="text-sm text-muted-foreground">
        View and edit your profile information.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="settings">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">User Settings</h3>
      <p class="text-sm text-muted-foreground">Customize your experience.</p>
    </div>
  </TabsContent>
</Story>

<!-- Solid Variant -->
<Story name="Solid" args={{ value: "inbox" }}>
  <TabsList variant="solid">
    <TabsTrigger variant="solid" value="inbox">Inbox</TabsTrigger>
    <TabsTrigger variant="solid" value="scheduled">Scheduled</TabsTrigger>
    <TabsTrigger variant="solid" value="alerts">Alerts</TabsTrigger>
  </TabsList>
  <TabsContent value="inbox">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Inbox Messages</h3>
      <p class="text-sm text-muted-foreground">
        View all your incoming messages.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="scheduled">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Scheduled Items</h3>
      <p class="text-sm text-muted-foreground">
        Manage your scheduled messages.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="alerts">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Alert Center</h3>
      <p class="text-sm text-muted-foreground">Review important alerts.</p>
    </div>
  </TabsContent>
</Story>

<!-- Segmented Variant -->
<Story name="Segmented" args={{ value: "daily" }}>
  <TabsList variant="segmented">
    <TabsTrigger variant="segmented" value="daily">Daily</TabsTrigger>
    <TabsTrigger variant="segmented" value="weekly">Weekly</TabsTrigger>
    <TabsTrigger variant="segmented" value="monthly">Monthly</TabsTrigger>
  </TabsList>
  <TabsContent value="daily">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Daily Statistics</h3>
      <p class="text-sm text-muted-foreground">
        View your daily performance metrics.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="weekly">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Weekly Overview</h3>
      <p class="text-sm text-muted-foreground">
        Weekly aggregated data and trends.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="monthly">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Monthly Report</h3>
      <p class="text-sm text-muted-foreground">
        Comprehensive monthly performance report.
      </p>
    </div>
  </TabsContent>
</Story>

<!-- Small Size -->
<Story name="Small" args={{ value: "tab1" }}>
  <TabsList size="sm">
    <TabsTrigger size="sm" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger size="sm" value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger size="sm" value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" padding="sm">
    <p class="text-sm text-muted-foreground">Small size content</p>
  </TabsContent>
  <TabsContent value="tab2" padding="sm">
    <p class="text-sm text-muted-foreground">Compact for dense UIs</p>
  </TabsContent>
  <TabsContent value="tab3" padding="sm">
    <p class="text-sm text-muted-foreground">Minimal spacing</p>
  </TabsContent>
</Story>

<!-- Large Size -->
<Story name="Large" args={{ value: "tab1" }}>
  <TabsList size="lg">
    <TabsTrigger size="lg" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger size="lg" value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger size="lg" value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" padding="lg">
    <p class="text-sm text-muted-foreground">
      Large size for better touch targets
    </p>
  </TabsContent>
  <TabsContent value="tab2" padding="lg">
    <p class="text-sm text-muted-foreground">More prominent appearance</p>
  </TabsContent>
  <TabsContent value="tab3" padding="lg">
    <p class="text-sm text-muted-foreground">Enhanced spacing</p>
  </TabsContent>
</Story>

<!-- Slide Animation -->
<Story name="Slide Animation" args={{ value: "slide1" }}>
  <TabsList variant="pills">
    <TabsTrigger variant="pills" value="slide1">Slide 1</TabsTrigger>
    <TabsTrigger variant="pills" value="slide2">Slide 2</TabsTrigger>
    <TabsTrigger variant="pills" value="slide3">Slide 3</TabsTrigger>
  </TabsList>
  <TabsContent value="slide1" animation="slide">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Content slides in from bottom</p>
    </div>
  </TabsContent>
  <TabsContent value="slide2" animation="slide">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Smooth slide transition effect</p>
    </div>
  </TabsContent>
  <TabsContent value="slide3" animation="slide">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Enhanced visual feedback</p>
    </div>
  </TabsContent>
</Story>

<!-- Scale Animation -->
<Story name="Scale Animation" args={{ value: "scale1" }}>
  <TabsList variant="solid">
    <TabsTrigger variant="solid" value="scale1">Scale 1</TabsTrigger>
    <TabsTrigger variant="solid" value="scale2">Scale 2</TabsTrigger>
    <TabsTrigger variant="solid" value="scale3">Scale 3</TabsTrigger>
  </TabsList>
  <TabsContent value="scale1" animation="scale">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Content zooms in on appear</p>
    </div>
  </TabsContent>
  <TabsContent value="scale2" animation="scale">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Zoom transition effect</p>
    </div>
  </TabsContent>
  <TabsContent value="scale3" animation="scale">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Subtle scale animation</p>
    </div>
  </TabsContent>
</Story>

<!-- No Animation -->
<Story name="No Animation" args={{ value: "tab1" }}>
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger variant="underline" value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger variant="underline" value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1" animation="none">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Instant content switch without animation</p>
    </div>
  </TabsContent>
  <TabsContent value="tab2" animation="none">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">No transition effects</p>
    </div>
  </TabsContent>
  <TabsContent value="tab3" animation="none">
    <div class="rounded-lg border border-border p-4">
      <p class="text-sm">Immediate display</p>
    </div>
  </TabsContent>
</Story>

<!-- Disabled Tab -->
<Story name="Disabled" args={{ value: "enabled" }}>
  <TabsList>
    <TabsTrigger value="enabled">Enabled</TabsTrigger>
    <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    <TabsTrigger value="another">Another</TabsTrigger>
  </TabsList>
  <TabsContent value="enabled">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <p class="text-sm text-muted-foreground">
        This tab is enabled and active.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="disabled">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <p class="text-sm text-muted-foreground">This tab is disabled.</p>
    </div>
  </TabsContent>
  <TabsContent value="another">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <p class="text-sm text-muted-foreground">Another enabled tab.</p>
    </div>
  </TabsContent>
</Story>

<!-- Combination: Pills + Large + Slide -->
<Story name="Pills Large Slide" args={{ value: "home" }}>
  <TabsList variant="pills" size="lg">
    <TabsTrigger variant="pills" size="lg" value="home">
      <Home class="size-4" />
      Home
    </TabsTrigger>
    <TabsTrigger variant="pills" size="lg" value="profile">
      <User class="size-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger variant="pills" size="lg" value="settings">
      <Settings class="size-4" />
      Settings
    </TabsTrigger>
  </TabsList>
  <TabsContent value="home" animation="slide" padding="lg">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Home</h3>
      <p class="text-sm text-muted-foreground">
        Large pills with slide animation
      </p>
    </div>
  </TabsContent>
  <TabsContent value="profile" animation="slide" padding="lg">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Profile</h3>
      <p class="text-sm text-muted-foreground">Smooth transitions</p>
    </div>
  </TabsContent>
  <TabsContent value="settings" animation="slide" padding="lg">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Settings</h3>
      <p class="text-sm text-muted-foreground">Enhanced user experience</p>
    </div>
  </TabsContent>
</Story>

<!-- Combination: Underline + Small -->
<Story name="Underline Small" args={{ value: "tab1" }}>
  <TabsList variant="underline" size="sm">
    <TabsTrigger variant="underline" size="sm" value="tab1"
      >Compact 1</TabsTrigger
    >
    <TabsTrigger variant="underline" size="sm" value="tab2"
      >Compact 2</TabsTrigger
    >
    <TabsTrigger variant="underline" size="sm" value="tab3"
      >Compact 3</TabsTrigger
    >
  </TabsList>
  <TabsContent value="tab1" padding="sm">
    <p class="text-sm text-muted-foreground">Small underline tabs</p>
  </TabsContent>
  <TabsContent value="tab2" padding="sm">
    <p class="text-sm text-muted-foreground">Minimal design</p>
  </TabsContent>
  <TabsContent value="tab3" padding="sm">
    <p class="text-sm text-muted-foreground">Space-efficient</p>
  </TabsContent>
</Story>

<!-- Responsive: Many Tabs (Overflow Scroll) -->
<Story name="Responsive Overflow" args={{ value: "dashboard" }}>
  <TabsList variant="underline">
    <TabsTrigger variant="underline" value="dashboard">Dashboard</TabsTrigger>
    <TabsTrigger variant="underline" value="analytics">Analytics</TabsTrigger>
    <TabsTrigger variant="underline" value="reports">Reports</TabsTrigger>
    <TabsTrigger variant="underline" value="settings">Settings</TabsTrigger>
    <TabsTrigger variant="underline" value="billing">Billing</TabsTrigger>
    <TabsTrigger variant="underline" value="team">Team</TabsTrigger>
    <TabsTrigger variant="underline" value="integrations"
      >Integrations</TabsTrigger
    >
    <TabsTrigger variant="underline" value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="dashboard">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Dashboard</h3>
      <p class="text-sm text-muted-foreground">
        Resize the browser to see horizontal scroll on mobile. Tabs stay in a
        single row with hidden scrollbar.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="analytics">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Analytics</h3>
      <p class="text-sm text-muted-foreground">Analytics content panel.</p>
    </div>
  </TabsContent>
  <TabsContent value="reports">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Reports</h3>
      <p class="text-sm text-muted-foreground">Reports content panel.</p>
    </div>
  </TabsContent>
  <TabsContent value="settings">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Settings</h3>
      <p class="text-sm text-muted-foreground">Settings content panel.</p>
    </div>
  </TabsContent>
  <TabsContent value="billing">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Billing</h3>
      <p class="text-sm text-muted-foreground">Billing content panel.</p>
    </div>
  </TabsContent>
  <TabsContent value="team">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Team</h3>
      <p class="text-sm text-muted-foreground">Team content panel.</p>
    </div>
  </TabsContent>
  <TabsContent value="integrations">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Integrations</h3>
      <p class="text-sm text-muted-foreground">Integrations content panel.</p>
    </div>
  </TabsContent>
  <TabsContent value="security">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Security</h3>
      <p class="text-sm text-muted-foreground">Security content panel.</p>
    </div>
  </TabsContent>
</Story>

<!-- Responsive: Vertical Tabs (auto horizontal on mobile) -->
<Story name="Responsive Vertical" args={{ value: "general" }}>
  {#snippet template(args: Args)}
    <Tabs orientation="vertical" value={args.value}>
      <TabsList variant="pills">
        <TabsTrigger variant="pills" value="general">General</TabsTrigger>
        <TabsTrigger variant="pills" value="appearance">Appearance</TabsTrigger>
        <TabsTrigger variant="pills" value="notifications"
          >Notifications</TabsTrigger
        >
        <TabsTrigger variant="pills" value="privacy">Privacy</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">General Settings</h3>
          <p class="text-sm text-muted-foreground">
            Vertical tabs convert to horizontal layout on mobile screens
            (≤640px). Resize the browser to see this in action.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="appearance">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">Appearance</h3>
          <p class="text-sm text-muted-foreground">
            Theme and display options.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">Notifications</h3>
          <p class="text-sm text-muted-foreground">Notification preferences.</p>
        </div>
      </TabsContent>
      <TabsContent value="privacy">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">Privacy</h3>
          <p class="text-sm text-muted-foreground">
            Privacy and security settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  {/snippet}
</Story>

<!-- Responsive: All Variants Overflow -->
<Story name="Responsive Pills Overflow" args={{ value: "t1" }}>
  <TabsList variant="pills">
    <TabsTrigger variant="pills" value="t1">
      <Home class="size-4" />
      Home
    </TabsTrigger>
    <TabsTrigger variant="pills" value="t2">
      <User class="size-4" />
      Profile
    </TabsTrigger>
    <TabsTrigger variant="pills" value="t3">
      <Settings class="size-4" />
      Settings
    </TabsTrigger>
    <TabsTrigger variant="pills" value="t4">Analytics</TabsTrigger>
    <TabsTrigger variant="pills" value="t5">Reports</TabsTrigger>
    <TabsTrigger variant="pills" value="t6">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="t1">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Home</h3>
      <p class="text-sm text-muted-foreground">
        Pills variant with many tabs. Touch-friendly 44px height on mobile with
        horizontal scroll.
      </p>
    </div>
  </TabsContent>
  <TabsContent value="t2">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Profile</h3>
      <p class="text-sm text-muted-foreground">Profile content.</p>
    </div>
  </TabsContent>
  <TabsContent value="t3">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Settings</h3>
      <p class="text-sm text-muted-foreground">Settings content.</p>
    </div>
  </TabsContent>
  <TabsContent value="t4">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Analytics</h3>
      <p class="text-sm text-muted-foreground">Analytics content.</p>
    </div>
  </TabsContent>
  <TabsContent value="t5">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Reports</h3>
      <p class="text-sm text-muted-foreground">Reports content.</p>
    </div>
  </TabsContent>
  <TabsContent value="t6">
    <div class="space-y-2 p-4 border border-border rounded-lg">
      <h3 class="text-lg font-medium">Billing</h3>
      <p class="text-sm text-muted-foreground">Billing content.</p>
    </div>
  </TabsContent>
</Story>

<!-- Dropdown on Mobile -->
<Story name="Dropdown on Mobile" args={{ value: "general" }}>
  {#snippet template(args: Args)}
    <Tabs
      value={args.value}
      dropdownOnMobile
      items={[
        { value: "general", label: "General" },
        { value: "appearance", label: "Appearance" },
        { value: "notifications", label: "Notifications" },
        { value: "privacy", label: "Privacy" },
      ]}
    >
      <TabsList variant="underline">
        <TabsTrigger variant="underline" value="general">General</TabsTrigger>
        <TabsTrigger variant="underline" value="appearance"
          >Appearance</TabsTrigger
        >
        <TabsTrigger variant="underline" value="notifications"
          >Notifications</TabsTrigger
        >
        <TabsTrigger variant="underline" value="privacy">Privacy</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">General Settings</h3>
          <p class="text-sm text-muted-foreground">
            On mobile (≤640px), tabs convert to a Select dropdown. Resize to see
            this in action.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="appearance">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">Appearance</h3>
          <p class="text-sm text-muted-foreground">
            Theme and display options.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">Notifications</h3>
          <p class="text-sm text-muted-foreground">Notification preferences.</p>
        </div>
      </TabsContent>
      <TabsContent value="privacy">
        <div class="space-y-2 p-4 border border-border rounded-lg">
          <h3 class="text-lg font-medium">Privacy</h3>
          <p class="text-sm text-muted-foreground">
            Privacy and security settings.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  {/snippet}
</Story>
