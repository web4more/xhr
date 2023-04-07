import XMLHttpRequest from "../src/XMLHttpRequest.ts";
import { test, assert, expect } from "vitest";
import { pEvent } from "p-event";

test("it works async", async () => {
  const xhr = new XMLHttpRequest();
  const loadPromise = pEvent(xhr, "load");
  xhr.open("GET", "https://example.org/");
  xhr.send();
  await loadPromise;
  assert(xhr.response);
});

test("it works sync", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://example.org/", false);
  xhr.send();
  assert(xhr.response);
});

test("it emits an ErrorEvent on network errors", async () => {
  const xhr = new XMLHttpRequest();
  const errorPromise = pEvent(xhr, "error");
  xhr.open("GET", "about:blank");
  xhr.send();
  await errorPromise;
  assert();
});
