export type UserRole = "organizer" | "vendor" | "admin";

export interface UserEntity {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
}
