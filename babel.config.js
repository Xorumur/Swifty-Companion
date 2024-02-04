module.exports = {
	presets: [
		'module:@react-native/babel-preset',
	],
	env: {
		production: {
			plugins: [
				'react-native-paper/babel',
				["module:react-native-dotenv", {
					"envName": "APP_ENV",
					"moduleName": "@env",
					"path": ".env",
					"safe": false,
					"allowUndefined": true,
				}],
			],
		},
	},
};
