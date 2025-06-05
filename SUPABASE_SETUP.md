# Supabase Integration Guide for Verve99

This document describes how to configure Supabase for the coworking marketplace and how the Next.js frontend should use the data.

## 1. Create a Supabase Project
1. Sign in to the [Supabase dashboard](https://app.supabase.com/).
2. Click **New project** and choose a name, organization and database password.
3. Wait for the project to initialize. You will see your **Supabase URL** and **anon key** in the project settings under **API**.
4. Copy these values into `.env.local` (see `.env.local.example`). Keep the **service_role** key private on the server only.

## 2. Environment Variables
In `lib/supabaseClient.js` the client is created from environment variables:

```javascript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
```

Create `.env.local` using `.env.local.example` and fill in your keys. Never commit `.env.local` to git.

## 3. Database Schema
Run the following SQL in the Supabase SQL editor to create the tables.

```sql
create table profiles (
  id uuid primary key references auth.users(id),
  username text unique,
  avatar_url text,
  full_name text,
  is_host boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table cities (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  image_url text
);

create table space_types (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  description text,
  icon_name text
);

create table listings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  city_id uuid references cities(id),
  address text,
  latitude numeric,
  longitude numeric,
  price_per_day numeric,
  price_per_month numeric,
  amenities jsonb,
  images jsonb,
  available_from date,
  available_to date,
  rating numeric,
  reviews_count integer,
  is_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table listing_space_types (
  listing_id uuid references listings(id) on delete cascade,
  space_type_id uuid references space_types(id) on delete cascade,
  primary key (listing_id, space_type_id)
);
```

## 4. Seed Data
Example inserts for cities and space types:

```sql
insert into cities (name, slug, image_url) values
  ('Delhi','delhi','https://example.com/img/delhi.jpg'),
  ('Mumbai','mumbai','https://example.com/img/mumbai.jpg'),
  ('Bangalore','bangalore','https://example.com/img/bangalore.jpg');

insert into space_types (name, slug, description, icon_name) values
  ('Coworking Space','coworking-space','Shared workspace','office-building'),
  ('Virtual Office','virtual-office','Business address service','mail'),
  ('Day Pass','day-pass','Daily access','ticket'),
  ('Shared Office','shared-office','Office with multiple companies','briefcase'),
  ('Meeting Room','meeting-room','Bookable meeting room','conference'),
  ('Private Office','private-office','Private cabin','door');
```

Insert demo listings (20 per city shown for Delhi and Mumbai; adjust as needed):

```sql
-- Example for Delhi
insert into listings (host_id,title,description,city_id,address,latitude,longitude,price_per_day,price_per_month,amenities,images,available_from,available_to,rating,reviews_count,is_verified)
select
  (select id from profiles limit 1),
  'Workspace ' || g, 'Great location in Delhi', (select id from cities where slug='delhi'),
  'Address ' || g, 28.6 + g/1000.0, 77.2 + g/1000.0, 500 + g, 10000 + g*10,
  '["Wi-Fi","Coffee","AC"]', '["https://example.com/delhi' || g || '.jpg"]',
  '2024-01-01','2024-12-31', 4.5, 10, true
from generate_series(1,20) g;

-- Example for Mumbai
insert into listings (host_id,title,description,city_id,address,latitude,longitude,price_per_day,price_per_month,amenities,images,available_from,available_to,rating,reviews_count,is_verified)
select
  (select id from profiles limit 1),
  'Mumbai Spot ' || g, 'Prime location in Mumbai', (select id from cities where slug='mumbai'),
  'Address ' || g, 19.0 + g/1000.0, 72.8 + g/1000.0, 600 + g, 12000 + g*10,
  '["Wi-Fi","Coffee","AC"]', '["https://example.com/mumbai' || g || '.jpg"]',
  '2024-01-01','2024-12-31', 4.7, 8, true
from generate_series(1,20) g;
```

Associate listings with space types:

```sql
-- Give each listing a Day Pass and Coworking Space type
insert into listing_space_types (listing_id, space_type_id)
select l.id, st.id
from listings l
join space_types st on st.slug in ('day-pass','coworking-space');
```

## 5. Row Level Security
Enable RLS and create policies.

```sql
alter table profiles enable row level security;
create policy "Users can manage own profile" on profiles
  for all using (auth.uid() = id);

alter table listings enable row level security;
create policy "Public read" on listings
  for select using (true);
create policy "Hosts manage own listings" on listings
  for all using (auth.uid() = host_id);
```

## 6. Fetching Data in the Frontend
Use the Supabase JS client to query data. Example to list all listings for a city slug:

```javascript
import { supabase } from '@/lib/supabaseClient';

export async function getListingsByCity(slug) {
  const { data: city } = await supabase
    .from('cities')
    .select('id')
    .eq('slug', slug)
    .single();

  const { data: listings } = await supabase
    .from('listings')
    .select('*')
    .eq('city_id', city.id);
  return listings;
}
```

You can call similar functions for space type pages or details by id. Render the data in cards with image carousels, price, rating and amenities.

## 7. Third-Party Integrations
Store external IDs (e.g., stripe_customer_id) as additional columns in relevant tables. Use Supabase Edge Functions to call external APIs securely so that secrets stay on the server.

## 8. Card Design Data
Include multiple image URLs, a short description, amenities array, price per day/month, rating and reviews count to build rich cards on the frontend.

---
This guide provides the SQL and usage patterns for integrating Supabase with your marketplace.
