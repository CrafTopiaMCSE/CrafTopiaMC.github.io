// ===== CrafTopia - تنظیمات اصلی سایت (نسخه بدون لوگو) =====
const DEFAULT_CONFIG = {
  siteName: "CrafTopia",
  // logo خالی گذاشتم، بعداً خودت میتونی لینک عکس بذاری
  logo: "",
  themeColor: "#FF6B00",   // نارنجی اصلی
  themeColorDark: "#B34700", // نارنجی تیره (hover)
  themeBg: "#0D0D0D",      // مشکی
  themeBgCard: "#1A1A1A",  // مشکی روشنتر برای کارت‌ها
  themeText: "#FFFFFF",    // متن سفید
  themeAccent: "#FFB74D",  // نارنجی روشن
  primaryLang: "en",
  serverIP: "",
  gamemodes: [],
  pages: [],
  adminPassword: "CrafTopiaA123H",
  description: "Survival, Economy, PvP & more - join the best Minecraft experience!"
};

// ===== ذخیره و بارگذاری تنظیمات =====
let CONFIG = { ...DEFAULT_CONFIG };

function loadConfig() {
  const saved = localStorage.getItem("crafTopia_config");
  if (saved) {
    try { CONFIG = { ...DEFAULT_CONFIG, ...JSON.parse(saved) }; }
    catch(e) { CONFIG = { ...DEFAULT_CONFIG }; }
  }
  return CONFIG;
}

function saveConfig() {
  localStorage.setItem("crafTopia_config", JSON.stringify(CONFIG));
}

// ===== زبان (هر کاربر برای خودش) =====
let LANG = localStorage.getItem("crafTopia_lang") || "en";

const TRANSLATIONS = {
  en: {
    home: "Home", play: "Play Now", gamemodes: "Game Modes",
    copyIP: "Copy IP", copied: "Copied!", admin: "Admin",
    settings: "Settings", language: "Language"
  },
  fa: {
    home: "خانه", play: "بازی کن", gamemodes: "حالت‌های بازی",
    copyIP: "کپی آدرس", copied: "کپی شد!", admin: "ادمین",
    settings: "تنظیمات", language: "زبان"
  }
};

function t(key) {
  return (TRANSLATIONS[LANG] && TRANSLATIONS[LANG][key]) || TRANSLATIONS["en"][key] || key;
}
