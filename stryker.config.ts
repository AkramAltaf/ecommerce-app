import { StrykerOptions } from '@stryker-mutator/api/core';

const config: Partial<StrykerOptions> = {
  mutate: ["src/routes/shop.tsx"],
  testRunner: "vitest", // Use 'vitest' instead of 'jest'
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "perTest",
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
};

export default config;
