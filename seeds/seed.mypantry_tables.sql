BEGIN;

TRUNCATE 
users,
item_type,
items 
RESTART IDENTITY CASCADE;

INSERT INTO users (username, email, user_password)
VALUES 
('mahmood', 'mahmood@email.com', 'password1'),
('falafel', 'falafel@sandwich.eat', 'password2'),
('gwyn soul of cinder', 'linkthefire@lordran.kiln', 'bonfire');

INSERT INTO item_type (item_name)
VALUES 
('Produce'),
('Frozen'),
('Canned Goods'),
('Dried Foods');

INSERT INTO items (usrid, item_name, quantity, item_type, expiration)
VALUES
(1, 'Apples', 2, 1, 'Jul-07-2020'),
(1, 'Banana', 2, 1, 'Jul-07-2020'),
(2, 'Ground Beef', 1, 2, 'Jul-07-2020'),
(2, 'Corn', 2, 3, 'Jul-07-2020'),
(1, 'Pineapple', 2, 1, 'Jul-07-2020'),
(3, 'Jalapano', 2, 4, 'Jul-07-2020');

COMMIT;