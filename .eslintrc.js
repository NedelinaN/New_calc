const path = require('path')

module.exports = {
	// Используем данные конфигурации (готовые наборы правил)
	extends: [
		// Рекомендуемый набор правил
		'eslint:recommended',

		// Проверка правильных импортов модулей
		'plugin:import/errors',

		// Правила специфичные для React
		'plugin:react/recommended',

		// Довольно строгие требования к коду, лучшие практики
		// Пока отключил, слишком строго
		// 'eslint-config-airbnb',

		// Отключаем проверку правил форматирования в ESLint, давая Prettier самому форматировать код
		'eslint-config-prettier',
		'eslint-config-prettier/react',

		//Проверка безопсаности кода
		'plugin:security/recommended',
	],

	plugins: [
		// Используем eslint-plugin-react
		'react',
		'react-hooks',
		'security',
	],

	settings: {
		react: {
			version: 'detect',
		},
	},

	// Здесь переопределяем правила из extends
	rules: {
		// Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies
		'import/no-extraneous-dependencies': 'error',

		// enforces a maximum number of lines in a file
		'max-lines': ['error', 300],

		// Ограничиваем максимальную длину функции в строках
		'max-lines-per-function': ['warn', { max: 100, skipBlankLines: true, skipComments: true, IIFEs: true }],

		// Ограничиваем максимальное количество statements в функции
		'max-statements': ['warn', 30],

		// Ограничиваем максимальное количество параметров функции
		'max-params': ['error', 4],

		// Ограничиваем максимальное количество вложенных коллбеков
		'max-nested-callbacks': ['error', 4],

		// Ограничиваем количество независимых путей выполнения кода
		complexity: ['error', 30],

		// Webpack does tree shaking, but you should delete unused vars
		'no-unused-vars': 'warn',

		// Переходим на let/const
		'no-var': 'error',

		// Рекомендовать const вместо let, если переменная не изменяется
		'prefer-const': 'error',

		// Отключаем проверку символов перевода строк (LF/CRLF)
		'linebreak-style': 'off',

		// Разрешаем использовать только явные методы console
		'no-console': ['error', { allow: ['warn', 'error', 'info'] }],

		// Добавить prop-types validation в будущем
		'react/prop-types': 'warn',

		// Ensure no casing typos were made declaring static class properties and lifecycle methods
		'react/no-typos': 'error',

		// Разрешаем использовать JSX в *.js
		'react/jsx-filename-extension': 'off',

		// Разрешаем использовать функции до объявления потому что все равно hoisting
		'no-use-before-define': ['error', { functions: false, classes: true }],

		//  использовать короткий синтаксис литерала объекта (let obj = {x})
		'object-shorthand': 'warn',

		// Разрешаем затенение переменных внешней области видимости
		'no-shadow': 'off',

		// Не рекомендуется изменять параметры функций, side effects, not pure functions!
		'no-param-reassign': 'warn',

		// Не предупреждать, если _ в идентификаторе. Нормально, потому что такие идентификаторы находятся в MongoDB
		'no-underscore-dangle': 'off',

		// ?
		'react/display-name': 'off',

		// Prevent usage of dangerous JSX properties
		'react/no-danger': 'error',

		// Предупреждаем об избыточных конструкциях в условных операторах
		'no-else-return': ['error', { allowElseIf: false }],

		// Нужно прописывать default-кейс в switсh, чтобы отлавливать баги, например, выбрасывать ошибку, если все случаи уже рассмотрены
		'default-case': 'warn',

		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
}
