DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  seller_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  category VARCHAR(255) NOT NULL,
  image_url_one VARCHAR(255) NOT NULL,
  available BOOLEAN,
  sold BOOLEAN
);