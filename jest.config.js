export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],

  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }],
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  clearMocks: true,
  restoreMocks: true,
};
