// @vitest-environment happy-dom
import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDebounce from "./use-debounce";

describe("useDebounce", () => {
  it("should return the initial value", () => {
    const { result } = renderHook(() => useDebounce("initial value", 500));
    expect(result.current).toBe("initial value");
  });

  it("should debounce the value", () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial value", delay: 500 },
      },
    );

    act(() => {
      rerender({ value: "updated value", delay: 500 });
    });

    expect(result.current).toBe("initial value");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated value");

    vi.useRealTimers();
  });
});
