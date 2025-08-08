import { TextEncoder, TextDecoder } from "util";
import "@testing-library/jest-dom";

declare let global: typeof globalThis;

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder as typeof globalThis.TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder as typeof globalThis.TextDecoder;
}
