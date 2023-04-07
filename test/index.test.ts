import "../src/index.ts";
import { test, assert, expect } from "vitest";

test("XMLHttpRequest is a global", () => {
  expect(globalThis).toHaveProperty("XMLHttpRequest");
  const xhr = new XMLHttpRequest();
});

test("ProgressEvent is a global", () => {
  expect(globalThis).toHaveProperty("ProgressEvent");
  const event = new ProgressEvent("test");
});
