import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { User, Mail, LogOut } from 'lucide-react';
import LastUpdate from './LastUpdate';

export default function UserProfile({ email, lastUpdated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/landingpage');
  };

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <span className="block text-sm font-medium text-gray-700">Email</span>
            <span className="block text-gray-900">{email || "No email provided"}</span>
          </div>
          {lastUpdated && <LastUpdate timestamp={lastUpdated} />}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
