export const adSlots = {
  top: process.env.EXPO_PUBLIC_ADSENSE_SLOT_TOP ?? '',
  benchmark: process.env.EXPO_PUBLIC_ADSENSE_SLOT_BENCHMARK ?? '',
  result: process.env.EXPO_PUBLIC_ADSENSE_SLOT_RESULT ?? '',
} as const;
