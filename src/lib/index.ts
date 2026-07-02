// Aether UI Component Library
// All components export both Primitives (namespace with all parts) and shorthand (Root component)

// Re-export primitives using `export * as` for better bundler compatibility
export * as EmptyPrimitives from "./components/ui/empty/index.js";
export * as AccordionPrimitives from "./components/ui/accordion/index.js";
export * as AlertPrimitives from "./components/ui/alert/index.js";
export * as AlertDialogPrimitives from "./components/ui/alert-dialog/index.js";
export * as AvatarPrimitives from "./components/ui/avatar/index.js";
export * as BadgePrimitives from "./components/ui/badge/index.js";
export * as BreadcrumbPrimitives from "./components/ui/breadcrumb/index.js";
export * as ButtonPrimitives from "./components/ui/button/index.js";
export * as ButtonGroupPrimitives from "./components/ui/button-group/index.js";
export * as CalendarPrimitives from "./components/ui/calendar/index.js";
export * as CardPrimitives from "./components/ui/card/index.js";
export * as ChatboxPrimitives from "./components/ui/chatbox/index.js";
export * as CodeBlockPrimitives from "./components/ui/code-block/index.js";
export * as CheckboxPrimitives from "./components/ui/checkbox/index.js";
export * as ComboBoxPrimitives from "./components/ui/combobox/index.js";
export * as CommandPrimitives from "./components/ui/command/index.js";
export * as DataTablePrimitives from "./components/ui/data-table/index.js";
export * as DatePickerPrimitives from "./components/ui/date-picker/index.js";
export * as DialogPrimitives from "./components/ui/dialog/index.js";
export * as DropdownMenuPrimitives from "./components/ui/dropdown-menu/index.js";
export * as FieldPrimitives from "./components/ui/field/index.js";
export * as FileInputPrimitives from "./components/ui/file-input/index.js";
export * as InputPrimitives from "./components/ui/input/index.js";
export * as InputGroupPrimitives from "./components/ui/input-group/index.js";
export * as InputOTPPrimitives from "./components/ui/input-otp/index.js";
export * as LabelPrimitives from "./components/ui/label/index.js";
export * as NumberSpinnerPrimitives from "./components/ui/number-spinner/index.js";
export * as PopoverPrimitives from "./components/ui/popover/index.js";
export * as ProgressPrimitives from "./components/ui/progress/index.js";
export * as RadioGroupPrimitives from "./components/ui/radio/index.js";
export * as RangeCalendarPrimitives from "./components/ui/range-calendar/index.js";
export * as SelectPrimitives from "./components/ui/select/index.js";
export * as SeparatorPrimitives from "./components/ui/separator/index.js";
export * as SheetPrimitives from "./components/ui/sheet/index.js";
export * as SidebarPrimitives from "./components/ui/sidebar/index.js";
export * as SkeletonPrimitives from "./components/ui/skeleton/index.js";
export * as SliderPrimitives from "./components/ui/slider/index.js";
export * as SonnerPrimitives from "./components/ui/sonner/index.js";
export * as SpinnerPrimitives from "./components/ui/spinner/index.js";
export * as StepperPrimitives from "./components/ui/stepper/index.js";
export * as SwitchPrimitives from "./components/ui/switch/index.js";
export * as TablePrimitives from "./components/ui/table/index.js";
export * as TabsPrimitives from "./components/ui/tabs/index.js";
export * as TextareaPrimitives from "./components/ui/textarea/index.js";
export * as TooltipPrimitives from "./components/ui/tooltip/index.js";
export * as NavigationMenuPrimitives from "./components/ui/navigation-menu/index.js";
export * as DarkModePrimitives from "./components/ui/dark-mode/index.js";

// NavigationMenu trigger style helper
export { navigationMenuTriggerStyle } from "./components/ui/navigation-menu/index.js";

// DarkMode utilities from mode-watcher
export {
	mode,
	setMode,
	toggleMode,
	resetMode,
} from "./components/ui/dark-mode/index.js";

// Shorthand component imports
import { Root as Accordion } from "./components/ui/accordion/index.js";
import { Alert } from "./components/ui/alert/index.js";
import { Root as AlertDialog } from "./components/ui/alert-dialog/index.js";
import { Avatar } from "./components/ui/avatar/index.js";
import { Badge } from "./components/ui/badge/index.js";
import { Breadcrumb } from "./components/ui/breadcrumb/index.js";
import { Button } from "./components/ui/button/index.js";
import { ButtonGroup } from "./components/ui/button-group/index.js";
import { Calendar, CalendarWeek } from "./components/ui/calendar/index.js";
import { Card } from "./components/ui/card/index.js";
import { Chatbox } from "./components/ui/chatbox/index.js";
import { CodeBlock } from "./components/ui/code-block/index.js";
import { Checkbox } from "./components/ui/checkbox/index.js";
import { CheckboxGroup } from "./components/ui/checkbox/index.js";
import { Combobox as ComboBox } from "./components/ui/combobox/index.js";
import { Root as Command } from "./components/ui/command/index.js";
import { DataTable } from "./components/ui/data-table/index.js";
import {
	DatePicker,
	DatePickerWithPresets,
	DateRangePicker,
	DateRangePickerWithPresets,
} from "./components/ui/date-picker/index.js";
import { Root as Dialog } from "./components/ui/dialog/index.js";
import { DropdownMenu } from "./components/ui/dropdown-menu/index.js";
import { Field } from "./components/ui/field/index.js";
import { Empty } from "./components/ui/empty/index.js";
import {
	FileInput,
	FileInputButton,
	FileInputDragDrop,
	FileInputRegular,
} from "./components/ui/file-input/index.js";
import { Input } from "./components/ui/input/index.js";
import { Root as InputGroup } from "./components/ui/input-group/index.js";
import { InputOTP } from "./components/ui/input-otp/index.js";
import { Label } from "./components/ui/label/index.js";
import { NumberSpinner } from "./components/ui/number-spinner/index.js";
import { Popover } from "./components/ui/popover/index.js";
import { Progress } from "./components/ui/progress/index.js";
import { RadioGroup } from "./components/ui/radio/index.js";
import { RangeCalendar } from "./components/ui/range-calendar/index.js";
import { Select } from "./components/ui/select/index.js";
import { Separator } from "./components/ui/separator/index.js";
import { Root as Sheet } from "./components/ui/sheet/index.js";
import { Root as Sidebar } from "./components/ui/sidebar/index.js";
import { Skeleton } from "./components/ui/skeleton/index.js";
import { Slider } from "./components/ui/slider/index.js";
import { Toaster as Sonner } from "./components/ui/sonner/index.js";
import { Spinner } from "./components/ui/spinner/index.js";
import { Stepper } from "./components/ui/stepper/index.js";
import { Switch } from "./components/ui/switch/index.js";
import { Root as Table } from "./components/ui/table/index.js";
import { Root as Tabs } from "./components/ui/tabs/index.js";
import { Textarea } from "./components/ui/textarea/index.js";
import { Root as Tooltip } from "./components/ui/tooltip/index.js";
import { Root as NavigationMenu } from "./components/ui/navigation-menu/index.js";
import {
	DarkModeToggle,
	DarkModeSwitch,
	DarkModeDropdown,
} from "./components/ui/dark-mode/index.js";

// Export shorthand components (Root component of each)
export {
	Accordion,
	Alert,
	AlertDialog,
	Avatar,
	Badge,
	Breadcrumb,
	Button,
	ButtonGroup,
	Calendar,
	CalendarWeek,
	Card,
	Chatbox,
	CodeBlock,
	Checkbox,
	CheckboxGroup,
	ComboBox,
	Command,
	DataTable,
	DatePicker,
	DatePickerWithPresets,
	DateRangePicker,
	DateRangePickerWithPresets,
	Dialog,
	DropdownMenu,
	Empty,
	Field,
	FileInput,
	FileInputButton,
	FileInputDragDrop,
	FileInputRegular,
	Input,
	InputGroup,
	InputOTP,
	Label,
	NumberSpinner,
	Popover,
	Progress,
	RadioGroup,
	RangeCalendar,
	Select,
	Separator,
	Sheet,
	Sidebar,
	Skeleton,
	Slider,
	Sonner,
	Spinner,
	Stepper,
	Switch,
	Table,
	Tabs,
	Textarea,
	Tooltip,
	NavigationMenu,
	DarkModeToggle,
	DarkModeSwitch,
	DarkModeDropdown,
};
