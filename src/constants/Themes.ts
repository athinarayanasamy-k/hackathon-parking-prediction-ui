import type { ThemeConfig } from "antd";

export const smartPalette = {
  siderBg: "#0F172A",     // dark navy
  headerBg: "#FFFFFF",
  paper: "#F5F7FB",
  primary: "#4F46E5",     // indigo
  success: "#22C55E",     // green
  danger: "#EF4444",      // red
  warning: "#FACC15",     // yellow
  gray: "#64748B",
};

export const smartTheme: ThemeConfig = {
  token: {
    colorPrimary: smartPalette.primary,
    colorSuccess: smartPalette.success,
    colorError: smartPalette.danger,
    colorBgLayout: smartPalette.paper,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "Inter, system-ui, sans-serif",
  },
  components: {
    Layout: {
      headerBg: smartPalette.headerBg,
      siderBg: smartPalette.siderBg,
    },
    Menu: {
      itemSelectedBg: "#312E81",
    },
    Button: {
      controlHeight: 42,
    },
  },
};
