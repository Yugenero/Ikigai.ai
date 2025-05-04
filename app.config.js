import 'dotenv/config';

export default {
  expo: {
    name: "Ikigai",
    slug: "Ikigai",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "ikigai",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "ai.ikigai.app"
    },
    extra: {
      // Firebase
      firebaseApiKey:     process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId:  process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId:      process.env.FIREBASE_APP_ID,
      // Google
      googleWebClientId:  process.env.GOOGLE_WEB_CLIENT_ID,
      googleIosClientId:  process.env.GOOGLE_IOS_CLIENT_ID,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "ai.ikigai.app" // Add Android package name
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: [
      "expo-router",
      ["@react-native-google-signin/google-signin"],
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    }
  }
};