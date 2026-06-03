const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Support for .cjs files (needed by some packages)
config.resolver.sourceExts.push('cjs');

module.exports = config;
