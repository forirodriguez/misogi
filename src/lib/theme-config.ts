export type GradientType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "hero"
  | "features"
  | "timeline"
  | "challenge"
  | "pricing";

export const themeConfig = {
  light: {
    gradients: {
      primary: "from-purple-500 to-pink-500",
      secondary: "from-blue-500 to-purple-500",
      tertiary: "from-pink-500 to-orange-500",
      hero: "from-purple-500 to-pink-500",
      features: "from-indigo-500 to-purple-500",
      timeline: "from-blue-500 to-indigo-500",
      challenge: "from-purple-500 via-pink-500 to-orange-500",
      pricing: "from-pink-500 to-rose-500",
    },
    text: {
      gradient: "from-purple-500 to-pink-500",
    },
  },
  dark: {
    gradients: {
      primary: "from-purple-400 to-pink-400",
      secondary: "from-blue-400 to-purple-400",
      tertiary: "from-pink-400 to-orange-400",
      hero: "from-slate-900 via-purple-900 to-slate-900",
      features: "from-slate-900 via-indigo-900 to-slate-900",
      timeline: "from-slate-900 via-blue-900 to-slate-900",
      challenge: "from-slate-900 via-purple-900 to-slate-900",
      pricing: "from-slate-900 via-pink-900 to-slate-900",
    },
    text: {
      gradient: "from-purple-400 to-pink-400",
    },
  },
};

export const getGradientClasses = (
  theme: "light" | "dark",
  type: GradientType
) => {
  return themeConfig[theme].gradients[type];
};

export const getTextGradientClass = (theme: "light" | "dark") => {
  return themeConfig[theme].text.gradient;
};
