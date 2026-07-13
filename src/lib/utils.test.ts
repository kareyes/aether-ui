import { describe, expect, it } from "bun:test";
import { rangeFieldNames } from "./utils.js";

describe("rangeFieldNames", () => {
	it("should suffix the picker name with .start / .end", () => {
		expect(rangeFieldNames("dates")).toEqual({
			start: "dates.start",
			end: "dates.end",
		});
	});

	it("should keep the two endpoints distinct", () => {
		const { start, end } = rangeFieldNames("leave");
		expect(start).not.toBe(end);
	});
});
