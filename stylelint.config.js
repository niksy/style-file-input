export default {
	extends: ['stylelint-config-nitpick'],
	plugins: ['stylelint-prettier'],
	rules: {
		'prettier/prettier': [true, { severity: 'warning' }]
	}
};
