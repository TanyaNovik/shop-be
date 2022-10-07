create extension if not exists "uuid-ossp";

create table products (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  price integer
);

create table stocks (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid,
  count integer CHECK (count > 0),
  foreign key ("product_id") references "products" ("id")
);

insert into products (title, description, price) values
('carrot', 'vegetable', 2),
  ('tomato', 'vegetable', 5),
  ('batat', 'vegetable', 10),
  ('avocado', 'vegetable', 25),
  ('cucumber', 'vegetable', 3),
  ('zucchini', 'vegetable', 2);
select * from products;

insert into stocks (product_id, count) values
('7239c7ac-8436-4aa2-8951-35ce2ce801d3', 100),
  ('ddc09dd8-8d52-4424-8f03-bc945d52eb42', 20),
  ('4c0f0ec5-6d4e-4914-b882-8d66c0464458', 10),
  ('5858cd13-dc97-4d61-949e-ddeb2f2e773a', 6),
  ('df7cb6d3-c44a-4188-be12-30e849204585', 25),
  ('095a3efa-4740-4bcf-a92b-0effd787f1f6', 100);