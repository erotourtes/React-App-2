const config = {
  HTTP_URL: process.env.HTTP_URL!,
  WS_URL: process.env.WS_URL!,
};

for (const key in config)
  if (!config[key as keyof typeof config])
    throw new Error(`Environment variable ${key} is not defined`);

export default config;
