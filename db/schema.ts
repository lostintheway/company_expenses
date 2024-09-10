import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  blob,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  googleId: text("google_id").unique(),
  passwordHash: text("password_hash"),
  username: text("username").unique(),

  email: text("email").unique().notNull(),
  isEmailVerified: integer("is_email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`current_timestamp`
  ),
});

export const oauthAccount = sqliteTable("oauth_account", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

// export const users = sqliteTable("users", {
//   userId: text("user_id").primaryKey({ autoIncrement: true }),
//   username: text("username").notNull().unique(),
//   email: text("email").notNull().unique(),
//   passwordHash: text("password_hash").notNull(),
//   createdAt: integer("created_at", { mode: "timestamp" })
//     .notNull()
//     .default(sql`current_timestamp`),
//   updatedAt: integer("updated_at", { mode: "timestamp" })
//     .notNull()
//     .default(sql`current_timestamp`),
// });

export const categories = sqliteTable("categories", {
  categoryId: integer("category_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`current_timestamp`),
});

export const ledgerEntries = sqliteTable("ledger_entries", {
  entryId: integer("entry_id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  description: text("description").notNull(),
  amount: blob("amount", { mode: "bigint" }).notNull(), // Using blob for DECIMAL
  entryDate: integer("entry_date", { mode: "timestamp" }).notNull(),
  entryType: text("entry_type", { enum: ["income", "expense"] }).notNull(),
  categoryId: integer("category_id").references(() => categories.categoryId),
  imageUrl: text("image_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`current_timestamp`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`current_timestamp`),
});

export const images = sqliteTable("images", {
  imageId: integer("image_id").primaryKey({ autoIncrement: true }),
  entryId: integer("entry_id")
    .notNull()
    .references(() => ledgerEntries.entryId, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`current_timestamp`),
});

export const tags = sqliteTable("tags", {
  tagId: integer("tag_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`current_timestamp`),
});

export const ledgerEntryTags = sqliteTable(
  "ledger_entry_tags",
  {
    entryId: integer("entry_id")
      .notNull()
      .references(() => ledgerEntries.entryId, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.tagId, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.entryId, table.tagId] }),
  })
);

export type userTableInsert = typeof userTable.$inferInsert;
export type userTableSelect = typeof userTable.$inferSelect;

export type oauthAccountInsert = typeof oauthAccount.$inferInsert;
export type oauthAccountSelect = typeof oauthAccount.$inferSelect;

export type sessionTableInsert = typeof sessionTable.$inferInsert;
export type sessionTableSelect = typeof sessionTable.$inferSelect;

export type categoriesInsert = typeof categories.$inferInsert;
export type categoriesSelect = typeof categories.$inferSelect;

export type ledgerEntriesInsert = typeof ledgerEntries.$inferInsert;
export type ledgerEntriesSelect = typeof ledgerEntries.$inferSelect;

export type imagesInsert = typeof images.$inferInsert;
export type imagesSelect = typeof images.$inferSelect;

export type tagsInsert = typeof tags.$inferInsert;
export type tagsSelect = typeof tags.$inferSelect;

export type ledgerEntryTagsInsert = typeof ledgerEntryTags.$inferInsert;
export type ledgerEntryTagsSelect = typeof ledgerEntryTags.$inferSelect;
