import {
  integer,
  serial,
  varchar,
  pgTable,
  timestamp,
  text,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const Report = pgTable("report", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  location: text("location").notNull(),
  wasteType: varchar("waste_type", { length: 255 }).notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
  imageUrl: varchar("image_url"),
  verificationResult: jsonb("verification_result").notNull(),
  status: varchar("status", { length: 255 })
    .notNull()
    .$default(() => "pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  collectorId: integer("collector_id").references(() => Users.id),
});

export const Rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userID: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
  point: integer("point").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  isAvailable: boolean("is_available").notNull().default(true),
  description: text("description"),
  name: varchar("name", { length: 255 }).notNull(),
  collectionInfo: text("collection_info").notNull(),
});

export const CollectoredWastess = pgTable("collected_wasted", {
  id: serial("id").primaryKey(),
  reportID: integer("report_id")
    .references(() => Report.id)
    .notNull(),
  collectorID: integer("collector_id")
    .references(() => Users.id)
    .notNull(),
  collectionDate: timestamp("collection_date").notNull(),
  status: varchar("status", { length: 255 }).notNull().default("collected"),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userID: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userID: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});
