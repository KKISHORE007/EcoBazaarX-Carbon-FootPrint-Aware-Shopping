import { Avatar, AvatarFallback } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Shield } from 'lucide-react';
import type { User } from '../../App';

export default function AdminProfile({ user }: { user: User }) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl bg-gradient-to-r from-[#69F0AE] to-[#2E7D32] text-white">
        <CardContent className="p-8 text-center">
          <Avatar className="h-24 w-24 border-4 border-white mx-auto mb-4">
            <AvatarFallback className="bg-white text-[#2E7D32] text-2xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Shield className="h-8 w-8 mx-auto mb-2" />
          <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
          <p className="text-white/90 mb-1">{user.email}</p>
          <p className="text-white/90">{user.phone}</p>
          <p className="mt-4 text-lg">Administrator Access</p>
        </CardContent>
      </Card>
    </div>
  );
}
