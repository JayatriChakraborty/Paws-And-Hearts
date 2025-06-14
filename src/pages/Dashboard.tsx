
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button, buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut, deleteUser } from 'firebase/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

const Dashboard = () => {
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        navigate('/login');
      } else if (isAdmin) {
        navigate('/admin/dashboard');
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

  const handleDeleteAccount = async () => {
    if (!currentUser) return;
    try {
      await deleteUser(currentUser);
      toast.success("Your account has been permanently deleted.");
      navigate("/");
    } catch (error: any) {
      if (error.code === 'auth/requires-recent-login') {
        toast.error("This action requires recent login. Please log out and log back in to delete your account.");
      } else {
        toast.error("Failed to delete account.");
      }
      console.error("Error deleting user account:", error);
    }
  };

  if (loading || !currentUser || isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-secondary/50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Dashboard</CardTitle>
              <CardDescription>Welcome back, {currentUser.email}!</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is your personal dashboard. More features coming soon!</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button onClick={handleLogout} variant="outline">
                  Log Out
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={handleDeleteAccount}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
