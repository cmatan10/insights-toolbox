import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowRight, User, Upload, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ProfileData {
  profileImage: string;
  username: string;
  contactEmail: string;
  contactPhone: number;
  companyName: string;
  businessEmail: string;
  businessPhone: number;
  companyDescription: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  twitter: string;
}

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // המידע שמוצג בפועל כשלא בעריכה
  const [profile, setProfile] = useState<ProfileData>({
    profileImage: '',
    username: 'משתמש לדוגמה',
    contactEmail: 'user@example.com',
    contactPhone: 501234567,
    companyName: 'חברה לדוגמה',
    businessEmail: 'business@example.com',
    businessPhone: 39876543,
    companyDescription: 'חברה לדוגמה המתמחה בפתרונות תוכנה מתקדמים',
    linkedin: 'https://linkedin.com/in/example',
    instagram: 'https://instagram.com/example',
    facebook: 'https://facebook.com/example',
    twitter: 'https://twitter.com/example'
  });

  // המידע שהמשתמש מקליד בפועל בעת עריכה
  const [tempProfile, setTempProfile] = useState<ProfileData>({ ...profile });

  const handleStartEditing = () => {
    setTempProfile({
      profileImage: '',
      username: '',
      contactEmail: '',
      contactPhone: 0,
      companyName: '',
      businessEmail: '',
      businessPhone: 0,
      companyDescription: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      twitter: ''
    });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    setProfile(tempProfile);
    setShowSaveDialog(false);
    setIsEditing(false);
    toast.success("השינויים נשמרו בהצלחה!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isEditing) {
          setTempProfile({ ...tempProfile, profileImage: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10 p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/' }
            className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors"
          >
            <ArrowRight className="ml-2" /> חזרה לדף הבית
          </Button>
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={handleStartEditing}
              className="bg-white hover:bg-[#9b87f5]/10 text-[#7E69AB] border-[#9b87f5]"
            >
              ערוך
            </Button>
          ) : (
            <Button
              onClick={handleSaveClick}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              שמור
            </Button>
          )}
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm border border-[#9b87f5]/20 shadow-lg rounded-xl">
          <CardHeader className="flex flex-row-reverse justify-between items-center border-b border-[#9b87f5]/10 pb-6">
            <div className="relative w-32 h-32">
              <div className="w-full h-full rounded-full border-2 border-[#9b87f5] overflow-hidden">
                {!isEditing ? (
                  profile.profileImage ? (
                    <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-[#9b87f5]/10">
                      <User className="text-[#7E69AB] w-16 h-16" />
                    </div>
                  )
                ) : (
                  tempProfile.profileImage ? (
                    <img src={tempProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-[#9b87f5]/10">
                      <Upload className="text-[#7E69AB] w-16 h-16" />
                    </div>
                  )
                )}
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                )}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#222222]">פרופיל משתמש</h2>
          </CardHeader>

          <CardContent className="mt-8 space-y-10">
            {/* Contact Details Section */}
            <section>
              <h3 className="text-xl font-semibold text-[#222222] mb-6">פרטי איש קשר</h3>
              <div className="space-y-4">
                {(['username', 'contactEmail', 'contactPhone'] as const).map((field) => (
                  <div key={field} className="flex items-center group">
                    <label htmlFor={field} className="w-40 text-right ml-4 text-sm font-medium text-[#8E9196]">
                      {field === 'username' 
                        ? 'שם משתמש'
                        : field === 'contactEmail'
                          ? 'מייל איש קשר'
                          : 'טלפון איש קשר'}
                    </label>
                    <div className="flex-1 relative">
                      <Input
                        id={field}
                        type={field.includes('Phone') ? 'number' : 'text'}
                        disabled={!isEditing}
                        placeholder={!isEditing ? profile[field].toString() : ""}
                        value={isEditing ? tempProfile[field].toString() : ""}
                        onChange={(e) => setTempProfile({ ...tempProfile, [field]: field.includes('Phone') ? Number(e.target.value) : e.target.value })}
                        className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
                      />
                    </div>
                    {isEditing && <Pencil className="mr-3 text-[#9b87f5] opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                ))}
              </div>
            </section>

            {/* Business Details Section */}
            <section>
              <h3 className="text-xl font-semibold text-[#222222] mb-6">פרטי העסק</h3>
              <div className="space-y-4">
                {(['companyName', 'businessEmail', 'businessPhone', 'companyDescription'] as const).map((field) => (
                  <div key={field} className="flex items-center group">
                    <label htmlFor={field} className="w-40 text-right ml-4 text-sm font-medium text-[#8E9196]">
                      {field === 'companyName'
                        ? 'שם חברה'
                        : field === 'businessEmail'
                          ? 'מייל עסקי'
                          : field === 'businessPhone'
                            ? 'טלפון עסקי'
                            : 'תיאור חברה'}
                    </label>
                    <div className="flex-1 relative">
                      {field === 'companyDescription' ? (
                        <textarea
                          id={field}
                          disabled={!isEditing}
                          placeholder={!isEditing ? profile[field] : ""}
                          value={isEditing ? tempProfile[field] : ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, [field]: e.target.value })}
                          className="w-full p-3 border border-[#9b87f5]/20 rounded-md focus:border-[#9b87f5] focus:ring-[#9b87f5] disabled:bg-transparent resize-none"
                          rows={4}
                        />
                      ) : (
                        <Input
                          id={field}
                          type={field.includes('Phone') ? 'number' : 'text'}
                          disabled={!isEditing}
                          placeholder={!isEditing ? profile[field].toString() : ""}
                          value={isEditing ? tempProfile[field].toString() : ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, [field]: field.includes('Phone') ? Number(e.target.value) : e.target.value })}
                          className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
                        />
                      )}
                    </div>
                    {isEditing && <Pencil className="mr-3 text-[#9b87f5] opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                ))}
              </div>
            </section>

            {/* Social Media Section */}
            <section>
              <h3 className="text-xl font-semibold text-[#222222] mb-6">רשתות חברתיות</h3>
              <div className="space-y-4">
                {[
                  { field: 'linkedin', label: 'לינקדאין', icon: <Linkedin className="text-[#0e76a8] ml-10" /> },
                  { field: 'instagram', label: 'אינסטגרם', icon: <Instagram className="text-pink-500 ml-10" /> },
                  { field: 'facebook', label: 'פייסבוק', icon: <Facebook className="text-blue-600 ml-10" /> },
                  { field: 'twitter', label: 'טוויטר', icon: <Twitter className="text-blue-400 ml-10" /> },
                ].map(({ field, label, icon }) => (
                  <div key={field} className="flex items-center group">
                    <label htmlFor={field} className="w-40 text-right ml-4 text-sm font-medium text-[#8E9196]">
                      {label}
                    </label>
                    <div className="flex items-center flex-1">
                      {icon}
                      <div className="flex-1 relative">
                        <Input
                          id={field}
                          disabled={!isEditing}
                          placeholder={!isEditing ? profile[field] : ""}
                          value={isEditing ? tempProfile[field] : ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, [field]: e.target.value })}
                          className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5]"
                        />
                      </div>
                    </div>
                    {isEditing && <Pencil className="mr-3 text-[#9b87f5] opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>

        {/* Save Changes Dialog */}
        <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <AlertDialogContent className="text-right" dir="rtl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#222222]">האם אתה בטוח שברצונך לשמור את השינויים?</AlertDialogTitle>
              <AlertDialogDescription className="text-[#8E9196]">
                פעולה זו תשמור את כל השינויים שבוצעו בפרופיל.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-row-reverse gap-2">
              <AlertDialogCancel className="text-[#8E9196] hover:text-[#222222] border-[#9b87f5]/20">ביטול</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmSave}
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              >
                שמור
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserProfilePage;