export const envConfig = () => {
  const envFiles = {
    development: '.env.dev',
    production: '.env.local',
    local: '',
  };

  const env = process.env.NODE_ENV || 'development';
  const envFilePath = envFiles[env];

  return {
    envFilePath,
  };
};
