const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// WatermelonDB: add support for .mjs and simba modules
config.resolver.sourceExts.push('mjs');

module.exports = config;
