
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, ShieldCheck, User } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="size-6" />
              User Management
            </h1>
            
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
          
          <Card className="bg-white dark:bg-logistics-dark/50 shadow-subtle border-border overflow-hidden">
            <CardHeader className="bg-logistics-light-gray dark:bg-logistics-dark/70 py-4 px-6">
              <CardTitle className="text-lg font-medium">User Directory</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-logistics-light-gray dark:bg-logistics-dark/70 text-left">
                    <tr>
                      <th className="px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Username</th>
                      <th className="hidden md:table-cell px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Email</th>
                      <th className="px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Account Type</th>
                      <th className="px-6 py-3 text-sm font-medium text-logistics-dark dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <motion.tr 
                          key={user.id} 
                          className="hover:bg-gray-50 dark:hover:bg-white/5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className={`h-8 w-8 rounded-full ${user.isTestAccount ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-logistics-blue/10'} flex items-center justify-center`}>
                                {user.isTestAccount ? (
                                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                ) : (
                                  <User className="h-4 w-4 text-logistics-blue" />
                                )}
                              </div>
                              <span>{user.username}</span>
                            </div>
                          </td>
                          <td className="hidden md:table-cell px-6 py-4 text-sm">{user.email}</td>
                          <td className="px-6 py-4 text-sm">
                            {user.isTestAccount ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                                <ShieldCheck className="h-3 w-3" />
                                Test Account
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                Regular Account
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <Button variant="outline" size="sm" className="hover:bg-logistics-blue/10 hover:text-logistics-blue transition-colors">
                              View Data
                            </Button>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-muted-foreground">
                          No users found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagement;
