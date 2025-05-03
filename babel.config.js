module.exports = function(api) {
	api.cache(true);
	return {
	  presets: ['babel-preset-expo'],
	  plugins: [
		// This ensures node_modules are processed for ESM compatibility
		["module-resolver", {
		  "alias": {
			// Create aliases for problematic modules
			"expo-auth-session": "./node_modules/expo-auth-session/build",
			"expo-modules-core": "./node_modules/expo-modules-core/build"
		  }
		}]
	  ]
	};
};