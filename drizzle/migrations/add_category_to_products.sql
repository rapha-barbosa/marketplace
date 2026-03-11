ALTER TABLE products ADD COLUMN IF NOT EXISTS category text;
UPDATE products SET category = 'Eletrônicos' WHERE category IS NULL;
