export const Roles = {
    Admin: 'admin',
    User: 'user',
} as const;

export type Roles = typeof Roles[keyof typeof Roles];
