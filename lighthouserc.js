module.exports = {
	ci: {
		assert: {
			preset: 'lighthouse:no-pwa',
			assertions: {
				'color-contrast': 'off',
				'uses-http2': 'off',
			},
		},
		collect: {
			settings: {
				formFactor: 'mobile',
			},
			startServerCommand: 'npm run start',
			startServerReadyPattern: 'ready on',
			url: [
				'http://localhost:3000/',
				'http://localhost:3000/cv',
				'http://localhost:3000/skill-profile',
			],
		},
	},
}
