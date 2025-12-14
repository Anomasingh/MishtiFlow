const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/.next/", "/components/ui/", "/lib/utils.ts"],
  collectCoverageFrom: ["app/api/**/*.ts", "lib/**/*.ts", "!lib/utils.ts", "!**/*.d.ts"],
}

module.exports = createJestConfig(customJestConfig)
