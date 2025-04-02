
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UserManagement = () => {
  const { allUsers } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = allUsers.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container px-4 lg:px-8 mx-auto flex-grow mt-16">
        <div className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="size-6" />
              User Management
            </h1>
            
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-logistics-dark/50 rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-logistics-light-gray dark:bg-logistics-dark/70 text-left">
                  <tr>
                    <th className="px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Username</th>
                    <th className="px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Email</th>
                    <th className="px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5">
                        <td className="px-6 py-4 text-sm">{user.username}</td>
                        <td className="px-6 py-4 text-sm">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <Button variant="outline" size="sm">View Data</Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-sm text-muted-foreground">
                        No users found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagement;
