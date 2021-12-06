const compareVersions = require("./index");
const each = require('jest-each').default;

describe('version validation', () => {
	test("test for invalid version type", () => {
		expect(compareVersions(1.0, '1.0.1')).toBe('Invalid version type');
		expect(compareVersions('1.0.0', 1.1)).toBe('Invalid version type');
		expect(compareVersions(true, '1.0.1')).toBe('Invalid version type');
		expect(compareVersions('1.0.0', false)).toBe('Invalid version type');		
	});

	test("test for invalid version format", () => {
		expect(compareVersions('a', 'b')).toBe('Invalid version format');
		expect(compareVersions('a.b', 'c.d')).toBe('Invalid version format');
		expect(compareVersions('a.b.c', 'd.e.f')).toBe('Invalid version format');
		expect(compareVersions('1', '2')).toBe('Invalid version format');
		expect(compareVersions('1.0', '2.0')).toBe('Invalid version format');
		expect(compareVersions('1.0.a', '2.0.b')).toBe('Invalid version format');
	});
});

describe('compareVersions function test', () => {
	each([
		{v1: '1.0.0', v2: '2.0.0', expected: '2.0.0'},
		{v1: '2.0.0', v2: '1.0.0', expected: '2.0.0'},
		{v1: '2.0.0', v2: '2.1.0', expected: '2.1.0'},
		{v1: '2.1.0', v2: '2.0.0', expected: '2.1.0'},
		{v1: '2.1.0', v2: '2.1.1', expected: '2.1.1'},
		{v1: '2.1.1', v2: '2.1.0', expected: '2.1.1'},
		{v1: '1.0.0', v2: '1.0.0-alpha', expected: '1.0.0'},
		{v1: '1.0.0', v2: '1.0.0-beta', expected: '1.0.0'},
		{v1: '1.0.0', v2: '1.0.0-rc', expected: '1.0.0'},
		{v1: '1.0.0-alpha', v2: '1.0.0-alpha.1', expected: '1.0.0-alpha.1'},
		{v1: '1.0.0-alpha.1', v2: '1.0.0-alpha.beta', expected: '1.0.0-alpha.beta'},
		{v1: '1.0.0-alpha.beta', v2: '1.0.0-beta', expected: '1.0.0-beta'},
		{v1: '1.0.0-alpha.beta', v2: '1.0.0-beta.2', expected: '1.0.0-beta.2'},
		{v1: '1.0.0-alpha.beta.2', v2: '1.0.0-beta.11', expected: '1.0.0-beta.11'},
		{v1: '1.0.0-alpha.beta.11', v2: '1.0.0-rc.1', expected: '1.0.0-rc.1'},
	]).test('returns the result of comparing version $v1 with $v2', ({v1, v2, expected}) => {
		
		expect(compareVersions(v1, v2)).toBe(expected);
	});
});
