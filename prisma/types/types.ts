import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string;
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Timestamp | null;
    refreshTokenExpiresAt: Timestamp | null;
    scope: string | null;
    password: string | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
export type Comment = {
    id: string;
    text: string;
    createdAt: Generated<Timestamp>;
    userId: string;
    dealId: string;
};
export type Deal = {
    id: string;
    title: string;
    link: string;
    newPrice: number;
    oldPrice: number | null;
    description: string | null;
    imageUrls: string[];
    temperature: Generated<number>;
    createdAt: Generated<Timestamp>;
    authorId: string;
};
export type Session = {
    id: string;
    expiresAt: Timestamp;
    token: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string;
};
export type User = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    karma: Generated<number>;
};
export type Verification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Timestamp;
    createdAt: Timestamp;
    updatedAt: Timestamp;
};
export type Vote = {
    id: string;
    value: number;
    userId: string;
    dealId: string;
    createdAt: Generated<Timestamp>;
};
export type DB = {
    account: Account;
    comment: Comment;
    deal: Deal;
    session: Session;
    user: User;
    verification: Verification;
    vote: Vote;
};
