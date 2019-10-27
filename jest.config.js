// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	bail: 5,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coveragePathIgnorePatterns: ['/node_modules/'],
	coverageReporters: ['json', 'text', 'lcov', 'clover'],
	coverageThreshold: {
		gloabl: {
			statements: 80,
			functions: 90,
			branches: 50,
			lines: 50
		}
	},
	moduleDirectories: [
		'node_modules',
		'src/utils', // a utility folder
		__dirname // the root directory
	],
	testEnvironment: 'jsdom',
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/'],
	watchman: true
}
