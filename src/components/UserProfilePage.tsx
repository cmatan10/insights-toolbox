import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowRight, User, Upload } from 'lucide-react';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    profileImage: '',
    username: 'שם משתמש',
    contactEmail: 'מייל איש קשר',
    contactPhone: 'טלפון איש קשר',
    companyName: 'שם חברה',
    businessEmail: 'מייל עסקי',
    businessPhone: 'טלפון עסקי',
    companyDescription: 'תיאור חברה',
    linkedin: 'linkedin עסקי',
    instagram: 'instagram עסקי',
    facebook: 'facebook עסקי',
    twitter: 'twitter עסקי'
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, profileImage: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-right" dir="rtl">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" onClick={() => window.location.href = '/' }>
          <ArrowRight className="text-[#05baff]" /> חזרה לדף הבית
        </Button>
      </div>
      <Card className="shadow-lg rounded-2xl p-2 border border-gray-200">
        <CardHeader className="flex flex-row-reverse justify-between items-center border-b pb-4">
          <div className="relative w-28 h-28 rounded-full border border-gray-300 overflow-hidden">
            {isEditing ? (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <Upload className="text-gray-500 w-12 h-12" />
              </div>
            ) : profile.profileImage ? (
              <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <User className="text-gray-500 w-12 h-12" />
              </div>
            )}
            {isEditing && (
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-[#05baff]">פרופיל משתמש</h2>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          {Object.entries(profile).map(([key, value]) => (
            !['profileImage'].includes(key) && (
              <div key={key} className="flex items-center gap-2">
                <Input name={key} value={value} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} disabled={!isEditing} placeholder={value} />
                {isEditing && <Pencil className="text-[#05baff]" />}
              </div>
            )
          ))}
        </CardContent>
        <div className="flex justify-between mt-6">
          <Button style={{ backgroundColor: '#d1d5db', color: '#333' }} onClick={() => setIsEditing(true)}>ערוך</Button>
          <Button style={{ backgroundColor: '#05baff', color: '#fff' }} onClick={() => setIsEditing(false)}>שמור</Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfilePage;
