/**
 * app configuration
 */
import dotenv from 'dotenv';


export default function () {
  dotenv.load();
  process.hope = {
    app: {
      key: process.env.APP_KEY || 'my_app_key',
      env: process.env.APP_ENV || 'development',
      name: process.env.APP_NAME || 'my site',
      api_url: process.env.API_URL,
      web_url: process.env.WEB_URL,
      app_url: process.env.APP_URL,
      app_store: 'https://itunes.apple.com/us/app/hcp-space/id1336646829?mt=8',
      play_store: 'https://play.google.com/store/apps/details?id=com.imshealth.hcpspace',
      port: process.env.APP_PORT || 5000,
      debug: process.env.APP_DEBUG || true,
    },

    log: {
      level: process.env.LOG_LEVEL || 'debug',
      file: process.env.LOG_FILE || 'app',
    },

    db: {
      queue_driver: process.env.QUEUE_DRIVER,
      connection: process.env.DB_CONNECTION || 'mysql',
      database: process.env.DB_DATABASE || '',
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_HOST || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
    },

    mail: {
      driver: process.env.MAIL_DRIVER,
      name: process.env.MAIL_NAME,
      encryption: process.env.MAIL_ENCRYPTION,
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
    },

    hash: {
      salt_round: 10,
      otp: 600,
      token: 600,
      refresh_token_expire: '90d',
      access_token_expire: '90d',
      hash_algorith: '',
      encrypt_algorithm: 'aes192',
    },
  };
}
