import { currencyFormat } from "@/lib/use-currency";

test("Test function to render currency with correct symbol", () => {
  expect(currencyFormat(2)).toBe("$2.00");
});
