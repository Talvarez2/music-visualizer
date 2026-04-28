export const themes = {
  neon: (i, count, val) => `hsl(${(i / count) * 120 + 160}, 100%, ${50 + val * 30}%)`,
  sunset: (i, count, val) => `hsl(${(i / count) * 60 + 10}, ${80 + val * 20}%, ${45 + val * 25}%)`,
  ocean: (i, count, val) => `hsl(${(i / count) * 40 + 180}, ${70 + val * 30}%, ${40 + val * 30}%)`,
  monochrome: (_, __, val) => `hsl(0, 0%, ${30 + val * 60}%)`
};

export const bgColors = {
  neon: v => `rgba(${v * 20}, ${v * 5}, ${v * 30}, 0.2)`,
  sunset: v => `rgba(${30 + v * 40}, ${10 + v * 10}, ${v * 5}, 0.2)`,
  ocean: v => `rgba(${v * 5}, ${10 + v * 15}, ${20 + v * 30}, 0.2)`,
  monochrome: v => `rgba(${v * 15}, ${v * 15}, ${v * 15}, 0.2)`
};
