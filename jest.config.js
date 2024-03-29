const config = {
    verbose: true,
    testEnvironment: "node",
    collectCoverage: true,
    testTimeout: 1000 * 60 * 30,
    roots: ["<rootDir>/src/"],
    testMatch: ["**/?(*.)+(spec).ts?(x)", "**\\?(*.)+(spec).ts?(x)"]
};

module.exports = config;