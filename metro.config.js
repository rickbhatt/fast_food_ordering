const { withNativeWind } = require("nativewind/metro");
const {
  getSentryExpoConfig
} = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname);
config.resolver.alias = {
  "@": "./src",
  "@assets": "./assets",
};

module.exports = withNativeWind(config, { input: "./src/app/globals.css" });