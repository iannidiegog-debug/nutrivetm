create extension if not exists "pgcrypto";

do $$
begin
  create type public.diet_plan_status as enum ('draft', 'published', 'archived');
exception when duplicate_object then null;
end $$;

do $$
begin
  create type public.plan_item_type as enum ('food', 'supplement', 'superfood');
exception when duplicate_object then null;
end $$;

alter table public.pets
  add column if not exists age text,
  add column if not exists neutered_status text,
  add column if not exists current_food text,
  add column if not exists visible_clinical_notes text,
  add column if not exists internal_clinical_notes text,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.patient_measurements (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.pets(id) on delete cascade,
  label text not null,
  value text,
  unit text,
  measured_at date default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.patient_photos (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.pets(id) on delete cascade,
  storage_path text not null,
  caption text,
  created_at timestamptz not null default now()
);

create table if not exists public.supplement_library_items (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references public.clinics(id) on delete cascade,
  name text not null,
  group_name text,
  description text,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.superfood_library_items (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references public.clinics(id) on delete cascade,
  name text not null,
  group_name text,
  description text,
  visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.diet_plans (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.pets(id) on delete cascade,
  tutor_id uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  title text not null,
  plan_type text,
  status public.diet_plan_status not null default 'draft',
  objective text,
  start_date date,
  estimated_duration text,
  daily_total_quantity text,
  daily_total_unit text,
  meals_per_day text,
  general_notes text,
  internal_notes text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.plan_general_advice (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.diet_plans(id) on delete cascade,
  text text not null,
  enabled boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.plan_selected_items (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.diet_plans(id) on delete cascade,
  item_type public.plan_item_type not null,
  item_id uuid,
  item_name text not null,
  category text,
  quantity text,
  unit text,
  frequency text,
  preparation_notes text,
  tutor_notes text,
  internal_notes text,
  item_status text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_meals (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.diet_plans(id) on delete cascade,
  meal_name text not null,
  sort_order integer not null default 0,
  total_quantity text,
  unit text,
  notes text
);

create table if not exists public.daily_meal_items (
  id uuid primary key default gen_random_uuid(),
  daily_meal_id uuid not null references public.daily_meals(id) on delete cascade,
  item_type public.plan_item_type,
  item_id uuid,
  item_name text,
  quantity text,
  unit text,
  notes text
);

create table if not exists public.transition_steps (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.diet_plans(id) on delete cascade,
  label text not null,
  start_day integer,
  end_day integer,
  sort_order integer not null default 0,
  notes text
);

create table if not exists public.transition_step_meals (
  id uuid primary key default gen_random_uuid(),
  transition_step_id uuid not null references public.transition_steps(id) on delete cascade,
  meal_name text not null,
  notes text
);

create table if not exists public.transition_step_meal_items (
  id uuid primary key default gen_random_uuid(),
  transition_step_meal_id uuid not null references public.transition_step_meals(id) on delete cascade,
  item_type public.plan_item_type,
  item_id uuid,
  item_name text,
  quantity text,
  unit text,
  notes text
);

create table if not exists public.supplement_schedules (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.diet_plans(id) on delete cascade,
  supplement_id uuid,
  supplement_name text not null,
  dose_quantity text,
  dose_unit text,
  frequency_text text,
  monday boolean not null default false,
  tuesday boolean not null default false,
  wednesday boolean not null default false,
  thursday boolean not null default false,
  friday boolean not null default false,
  saturday boolean not null default false,
  sunday boolean not null default false,
  time_of_day text,
  tutor_notes text,
  internal_notes text
);

create table if not exists public.weekly_ration_examples (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.diet_plans(id) on delete cascade,
  week_number integer,
  title text,
  objective text,
  notes text,
  sort_order integer not null default 0
);

create table if not exists public.weekly_ration_meals (
  id uuid primary key default gen_random_uuid(),
  weekly_ration_example_id uuid not null references public.weekly_ration_examples(id) on delete cascade,
  meal_name text not null,
  notes text,
  sort_order integer not null default 0
);

create table if not exists public.weekly_ration_meal_items (
  id uuid primary key default gen_random_uuid(),
  weekly_ration_meal_id uuid not null references public.weekly_ration_meals(id) on delete cascade,
  item_type public.plan_item_type,
  item_id uuid,
  item_name text,
  quantity text,
  unit text,
  notes text
);

create table if not exists public.tutor_tracking_logs (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.pets(id) on delete cascade,
  plan_id uuid references public.diet_plans(id) on delete set null,
  tutor_id uuid references public.profiles(id) on delete set null,
  logged_on date not null default current_date,
  appetite_status text,
  ate_all text,
  vomiting boolean,
  stool_status text,
  ate_grass boolean,
  symptoms text,
  comments text,
  photo_urls text[],
  created_at timestamptz not null default now()
);

alter table public.patient_measurements enable row level security;
alter table public.patient_photos enable row level security;
alter table public.supplement_library_items enable row level security;
alter table public.superfood_library_items enable row level security;
alter table public.diet_plans enable row level security;
alter table public.plan_general_advice enable row level security;
alter table public.plan_selected_items enable row level security;
alter table public.daily_meals enable row level security;
alter table public.daily_meal_items enable row level security;
alter table public.transition_steps enable row level security;
alter table public.transition_step_meals enable row level security;
alter table public.transition_step_meal_items enable row level security;
alter table public.supplement_schedules enable row level security;
alter table public.weekly_ration_examples enable row level security;
alter table public.weekly_ration_meals enable row level security;
alter table public.weekly_ration_meal_items enable row level security;
alter table public.tutor_tracking_logs enable row level security;
