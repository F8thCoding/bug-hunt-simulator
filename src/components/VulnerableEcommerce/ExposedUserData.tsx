import { User } from "@/types/ecommerce";

interface ExposedUserDataProps {
  users: User[];
}

export const ExposedUserData = ({ users }: ExposedUserDataProps) => {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-bold text-red-500">⚠️ Exposed User Data ⚠️</h2>
      {users.map((user) => (
        <div key={user.id} className="border p-4 rounded-lg bg-red-50">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Password:</strong> {user.password}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>
  );
};