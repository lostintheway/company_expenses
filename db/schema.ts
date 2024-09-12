import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  id: text("id").primaryKey(),
  googleId: text("google_id").unique(),
  passwordHash: text("password_hash"),
  username: text("username").unique(),

  email: text("email").unique().notNull(),
  isEmailVerified: integer("is_email_verified", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at"),
  updatedAt: integer("updated_at").notNull(),
});

export const oauthAccount = sqliteTable("oauth_account", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  userId: text("user_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  expiresAt: integer("expires_at").notNull(),
});

export const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const categories = sqliteTable("categories", {
  categoryId: integer("category_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  createdAt: integer("created_at"),
  updatedAt: integer("updated_at").notNull(),
});

export const ledgerEntries = sqliteTable("ledger_entries", {
  entryId: integer("entry_id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  description: text("description").notNull(),
  amount: integer("amount").notNull(), // Using blob for DECIMAL
  entryDate: integer("entry_date").notNull(),
  entryType: text("entry_type", { enum: ["income", "expense"] }).notNull(),
  categoryId: integer("category_id").notNull(),
  imageUrl: text("image_url"),
  createdAt: integer("created_at"),
  updatedAt: integer("updated_at").notNull(),
});

export const images = sqliteTable("images", {
  imageId: integer("image_id").primaryKey({ autoIncrement: true }),
  entryId: integer("entry_id").notNull(),
  fileName: text("file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  createdAt: integer("created_at"),
});

export const tags = sqliteTable("tags", {
  tagId: integer("tag_id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  createdAt: integer("created_at"),
});

export const ledgerEntryTags = sqliteTable(
  "ledger_entry_tags",
  {
    entryId: integer("entry_id").notNull(),
    tagId: integer("tag_id").notNull(),
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
