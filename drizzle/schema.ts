import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Categories ──────────────────────────────────────────────────────────────
export const categories = mysqlTable("categories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 128 }).notNull(),
  description: text("description"),
  color: varchar("color", { length: 32 }).notNull(), // hex color for left border
  icon: varchar("icon", { length: 64 }).notNull(),   // lucide icon name
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;

// ─── Resources ───────────────────────────────────────────────────────────────
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  organization: varchar("organization", { length: 256 }),
  description: text("description").notNull(),
  url: varchar("url", { length: 512 }),
  phone: varchar("phone", { length: 64 }),
  email: varchar("email", { length: 320 }),
  categoryId: int("categoryId").notNull(),
  // JSON array of province/territory codes e.g. ["BC","AB","National"]
  provinces: text("provinces").notNull(),
  whoItServes: text("whoItServes"),
  isCrisisLine: boolean("isCrisisLine").default(false).notNull(),
  isPublished: boolean("isPublished").default(false).notNull(),
  // Link integrity
  lastVerified: timestamp("lastVerified"),
  lastChecked: timestamp("lastChecked"),
  linkStatus: mysqlEnum("linkStatus", ["ok", "broken", "unchecked", "phone_only"]).default("unchecked").notNull(),
  httpStatus: int("httpStatus"),
  // Sort priority (lower = shown first)
  sortOrder: int("sortOrder").default(100).notNull(),
  // Metadata
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

// ─── Link Reports (user-submitted broken link reports) ───────────────────────
export const linkReports = mysqlTable("link_reports", {
  id: int("id").autoincrement().primaryKey(),
  resourceId: int("resourceId").notNull(),
  reporterEmail: varchar("reporterEmail", { length: 320 }),
  comment: text("comment"),
  status: mysqlEnum("status", ["pending", "reviewed", "resolved"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type LinkReport = typeof linkReports.$inferSelect;

// ─── Community Submissions ────────────────────────────────────────────────────
export const submissions = mysqlTable("submissions", {
  id: int("id").autoincrement().primaryKey(),
  resourceName: varchar("resourceName", { length: 256 }).notNull(),
  url: varchar("url", { length: 512 }),
  phone: varchar("phone", { length: 64 }),
  categorySlug: varchar("categorySlug", { length: 64 }),
  province: varchar("province", { length: 64 }),
  whoItServes: text("whoItServes"),
  description: text("description"),
  contactName: varchar("contactName", { length: 128 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  comment: text("comment"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Submission = typeof submissions.$inferSelect;
