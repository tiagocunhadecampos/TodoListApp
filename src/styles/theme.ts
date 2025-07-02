export const theme = {
  colors: {
    primary: "#4F46E5",
    primaryLight: "#6366F1",
    primaryDark: "#3730A3",

    success: "#059669",
    successLight: "#10B981",
    successBg: "#D1FAE5",

    warning: "#D97706",
    warningLight: "#F59E0B",
    warningBg: "#FEF3C7",

    error: "#DC2626",
    errorLight: "#EF4444",
    errorBg: "#FEE2E2",

    gray: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },

    white: "#FFFFFF",
    black: "#000000",

    background: "#F9FAFB",
    surface: "#FFFFFF",

    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
      disabled: "#9CA3AF",
      inverse: "#FFFFFF",
    },

    border: "#E5E7EB",
    shadow: "rgba(0, 0, 0, 0.1)",
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    full: 9999,
  },

  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
} as const;

export type Theme = typeof theme;
