import { StrykerOptions } from '@stryker-mutator/api/core';

const config: Partial<StrykerOptions> = {
  mutate: ['src/**/*.ts', 'src/**/*.tsx'],
  testRunner: "vitest", 
  reporters: ["progress", "clear-text", "html"],
  coverageAnalysis: "perTest",
  thresholds: {
    high: 80,
    low: 60,
    break: 50,
  },
  vitest: {
    configFile: './vitest.config.ts',
  },
};

export default config;
