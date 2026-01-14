module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // වෙනත් plugins තිබේ නම් ඒවා මෙතනට...
      'react-native-reanimated/plugin', // මෙය අනිවාර්යයෙන්ම ලැයිස්තුවේ අවසානයට තිබිය යුතුය.
    ],
  };
};