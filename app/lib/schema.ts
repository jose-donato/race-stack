import { type InferModel, relations } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({
      autoIncrement: true,
    }),
    email: text("email").notNull(),
    password: text("password"),
    avatar: text("avatar"),
    name: text("name"),
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.email),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  usersToGroups: many(usersToTeams),
}));

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  name: text("name").notNull(),
  avatar: text("avatar"),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  usersToTeams: many(usersToTeams),
}));

export const usersToTeams = sqliteTable(
  "usersToTeams",
  {
    userId: integer("userId")
      .notNull()
      .references(() => users.id),
    teamId: integer("teamId")
      .notNull()
      .references(() => teams.id),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.teamId),
  })
);

export const usersToTeamsRelations = relations(usersToTeams, ({ one }) => ({
  team: one(teams, {
    fields: [usersToTeams.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [usersToTeams.userId],
    references: [users.id],
  }),
}));
