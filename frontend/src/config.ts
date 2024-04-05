const config = {
  HTTP_URL: process.env.HTTP_URL!,
  WS_URL: process.env.WS_URL!,
  CACHE_TIME: 1000 * 60 * 10, // 10 minutes
};

for (const key in config)
  if (!config[key as keyof typeof config] && process.env.NODE_ENV !== "test")
    throw new Error(`Environment variable ${key} is not defined`);

export default config;
