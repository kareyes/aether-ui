import Root from "./input-otp-root.svelte";
import Group from "./input-otp-group.svelte";
import Slot from "./input-otp-slot.svelte";
import Separator from "./input-otp-separator.svelte";
import InputOtp from "./input-otp.svelte";
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";

import type { InputOTPSize, InputOTPVariant } from "./input-otp-root.svelte";
// import type

export {
	Root,
	Group,
	Slot,
	Separator,
	Root as InputOTPRoot,
	Group as InputOTPGroup,
	Slot as InputOTPSlot,
	Separator as InputOTPSeparator,
	InputOtp as InputOTP,
	REGEXP_ONLY_DIGITS,
	REGEXP_ONLY_DIGITS_AND_CHARS,
	type InputOTPSize,
	type InputOTPVariant,
};
