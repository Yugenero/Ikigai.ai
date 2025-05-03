const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const config = getDefaultConfig(__dirname);

// Add support for all file types
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'js', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
  
  // Special handling for problematic expo module paths
  extraNodeModules: {
    'expo-modules-core': path.resolve(__dirname, 'node_modules/expo-modules-core')
  },
  
  // Handle relative imports between modules
  resolveRequest: (context, moduleName, platform) => {
    // Handle relative path imports to expo-modules-core
    if (moduleName.includes('../../expo-modules-core/build')) {
      return {
        filePath: path.resolve(__dirname, 'node_modules/expo-modules-core/build/index.js'),
        type: 'sourceFile',
      };
    }
    
    // Let Metro handle everything else
    return context.resolveRequest(context, moduleName, platform);
  }
};

module.exports = config;