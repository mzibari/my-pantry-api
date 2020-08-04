CREATE TABLE items (
    id SERIAL NOT NULL,
    usrId INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    item_type INTEGER REFERENCES item_type(id) ON DELETE CASCADE NOT NULL,
    expiration TEXT NOT NULL,
    CONSTRAINT single_item PRIMARY KEY (id, usrid)
);