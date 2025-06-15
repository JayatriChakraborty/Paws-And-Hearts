
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

// Mock data to simulate users from a database
const mockUsers = [
  { id: 'u001', name: 'Alice', email: 'alice@example.com', role: 'User' as const },
  { id: 'u002', name: 'Bob', email: 'bob@example.com', role: 'User' as const },
  { id: 'u003', name: 'Charlie', email: 'charlie@example.com', role: 'User' as const },
  { id: 'u004', name: 'Admin User', email: 'jayatric305@gmail.com', role: 'Admin' as const },
  { id: 'u005', name: 'Diana', email: 'diana@example.com', role: 'User' as const },
];

type User = typeof mockUsers[number];

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleRoleChange = (userId: string, newRole: 'User' | 'Admin') => {
    const userEmail = users.find(u => u.id === userId)?.email;
    setUsers(currentUsers =>
      currentUsers.map(user => (user.id === userId ? { ...user, role: newRole } : user))
    );
    toast.success(`Role updated for ${userEmail}.`);
  };

  const handleDeleteUser = (userId: string) => {
    const userEmail = users.find(u => u.id === userId)?.email;
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
    toast.success(`User ${userEmail} has been deleted.`);
  };

  if (users.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">All users have been deleted.</p>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Select
                value={user.role}
                onValueChange={(value: 'User' | 'Admin') => handleRoleChange(user.id, value)}
                disabled={user.role === 'Admin'}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" disabled={user.role === 'Admin'}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete user</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the user account for {user.email}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className={buttonVariants({ variant: "destructive" })}
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
