/** @type {import('lint-staged').Configuration} */
export default {
	'*.{js,cjs}': ['eslint --fix'],
	'*.css': ['stylelint --fix'],
	'*.(md|json|yml)': ['prettier --ignore-path .gitignore --write'],
	'.!(npm|browserslist)*rc': ['prettier --ignore-path .gitignore --parser json --write']
};
