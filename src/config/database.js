const env = process.env.NODE_ENV;

const dialect = env === 'test' ? 'sqlite' : 'postgres';

module.exports = {
  local: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'user_db',
    dialect,
    pool: {
      max: 100,
      min: 1,
      idle: 200000,
      acquire: 200000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  },
  test: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'user_db',
    dialect,
    storage: "./__tests__/database.sqlite",
    pool: {
      max: 100,
      min: 1,
      idle: 200000,
      acquire: 200000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  },
  development: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'user_db',
    dialect,
    pool: {
      max: 100,
      min: 1,
      idle: 200000,
      acquire: 200000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  },
  release: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'user_db',
    dialect,
    pool: {
      max: 100,
      min: 1,
      idle: 200000,
      acquire: 200000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  },
  production: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_DATABASE || 'user_db',
    dialect,
    pool: {
      max: 100,
      min: 1,
      idle: 200000,
      acquire: 200000
    },
    define: {
      timestamps: true,
      underscored: true
    }
  }
};
