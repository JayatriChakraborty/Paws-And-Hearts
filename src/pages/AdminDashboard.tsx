import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, PlusCircle } from 'lucide-react';
import { AddPetForm } from '@/components/AddPetForm';

// Mock data to simulate adoption interests from a database
const adoptionInterests = [
  { petId: 'p001', petName: 'Buddy', userName: 'Alice', userEmail: 'alice@example.com' },
  { petId: 'p002', petName: 'Lucy', userName: 'Bob', userEmail: 'bob@example.com' },
  { petId: 'p001', petName: 'Buddy', userName: 'Charlie', userEmail: 'charlie@example.com' },
  { petId: 'p003', petName: 'Max', userName: 'Diana', userEmail: 'diana@example.com' },
  { petId: 'p001', petName: 'Buddy', userName: 'Eve', userEmail: 'eve@example.com' },
  { petId: 'p002', petName: 'Lucy', userName: 'Frank', userEmail: 'frank@example.com' },
];

const AdminDashboard = () => {
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate('/login');
      } else if (!isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [currentUser, loading, isAdmin, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('You have been logged out.');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out.');
    }
  };

  // Process data to find pets with multiple interests
  const interestCounts = adoptionInterests.reduce((acc, interest) => {
    acc[interest.petName] = (acc[interest.petName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const popularPets = Object.entries(interestCounts)
    .map(([petName, count]) => ({ petName, count }))
    .filter(pet => pet.count > 1)
    .sort((a, b) => b.count - a.count);

  if (loading || !currentUser || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {currentUser.email}! Here's an overview of your platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="lg:col-span-2 xl:col-span-2">
              <CardHeader>
                <CardTitle>Pets with Multiple Adoption Interests</CardTitle>
                <CardDescription>
                  These pets have more than one person interested in adopting them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {popularPets.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pet Name</TableHead>
                        <TableHead className="text-right">No. of Interests</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {popularPets.map((pet) => (
                        <TableRow key={pet.petName}>
                          <TableCell className="font-medium">{pet.petName}</TableCell>
                          <TableCell className="text-right">{pet.count}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No pets currently have multiple adoption interests.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage users, roles, and permissions.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-start">
                <p>User management features are coming soon.</p>
                 <Button className="mt-4" disabled>View All Users</Button>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Add New Pet
              </CardTitle>
              <CardDescription>
                Fill out the form to add a new pet to the listings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddPetForm />
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <Button onClick={handleLogout} variant="destructive">
              Log Out
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
