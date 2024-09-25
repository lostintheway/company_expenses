import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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

// Ledger entries table
export const ledgerEntries = sqliteTable("ledger_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date").notNull(),
  description: text("description"),
  accountType: text("account_type", {
    enum: ["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"],
  }).notNull(),
  accountName: text("account_name").notNull(),
  debit: integer("debit").notNull().default(0),
  credit: integer("credit").notNull().default(0),
});

// Trial balance table
export const trialBalance = sqliteTable("trial_balance", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date").notNull(),
  accountType: text("account_type", {
    enum: ["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"],
  }).notNull(),
  accountName: text("account_name").notNull(),
  debitBalance: integer("debit_balance").notNull().default(0),
  creditBalance: integer("credit_balance").notNull().default(0),
});

// Income statement table
export const incomeStatement = sqliteTable("income_statement", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date").notNull(),
  accountType: text("account_type", {
    enum: ["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"],
  }).notNull(),
  accountName: text("account_name").notNull(),
  amount: integer("amount").notNull(),
});

// Balance sheet table
export const balanceSheet = sqliteTable("balance_sheet", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date").notNull(),
  accountType: text("account_type", {
    enum: ["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"],
  }).notNull(),
  accountName: text("account_name").notNull(),
  amount: integer("amount").notNull(),
});
export type userTableInsert = typeof userTable.$inferInsert;
export type userTableSelect = typeof userTable.$inferSelect;

export type oauthAccountInsert = typeof oauthAccount.$inferInsert;
export type oauthAccountSelect = typeof oauthAccount.$inferSelect;

export type sessionTableInsert = typeof sessionTable.$inferInsert;
export type sessionTableSelect = typeof sessionTable.$inferSelect;

export type ledgerEntriesInsert = typeof ledgerEntries.$inferInsert;
export type ledgerEntriesSelect = typeof ledgerEntries.$inferSelect;

export type trialBalanceInsert = typeof trialBalance.$inferInsert;
export type trialBalanceSelect = typeof trialBalance.$inferSelect;

export type incomeStatementInsert = typeof incomeStatement.$inferInsert;
export type incomeStatementSelect = typeof incomeStatement.$inferSelect;

export type balanceSheetInsert = typeof balanceSheet.$inferInsert;
export type balanceSheetSelect = typeof balanceSheet.$inferSelect;
