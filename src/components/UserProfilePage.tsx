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
  contactPhone: string;
  companyName: string;
  businessEmail: string;
  businessPhone: string;
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
    contactPhone: '050-1234567',
    companyName: 'חברה לדוגמה',
    businessEmail: 'business@example.com',
    businessPhone: '03-9876543',
    companyDescription: 'חברה לדוגמה המתמחה בפתרונות תוכנה מתקדמים',
    linkedin: 'https://linkedin.com/in/example',
    instagram: 'https://instagram.com/example',
    facebook: 'https://facebook.com/example',
    twitter: 'https://twitter.com/example'
  });

  // המידע שהמשתמש מקליד בפועל בעת עריכה
  const [tempProfile, setTempProfile] = useState<ProfileData>({ ...profile });

  // מעבר למצב עריכה: ננקה את הטפסים כדי שיהיו ריקים
  const handleStartEditing = () => {
    setTempProfile({
      profileImage: '',
      username: '',
      contactEmail: '',
      contactPhone: '',
      companyName: '',
      businessEmail: '',
      businessPhone: '',
      companyDescription: '',
      linkedin: '',
      instagram: '',
      facebook: '',
      twitter: ''
    });
    setIsEditing(true);
  };

  // לחיצה על כפתור "שמור" תפתח את הפופאפ
  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  // אישור שמירה בפופאפ
  const confirmSave = () => {
    // כאן נעדכן את ה־profile במה שהמשתמש הקליד
    setProfile(tempProfile);
    setShowSaveDialog(false);
    setIsEditing(false);
    toast.success("השינויים נשמרו בהצלחה!");
  };

  // טיפול בהעלאת תמונה (כאן הגיוני יותר לשמור ב־tempProfile אם רוצים שכאשר לא שומרים – לא יחליף)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // בזמן עריכה נעדכן את התמונה ב־tempProfile
        if (isEditing) {
          setTempProfile({ ...tempProfile, profileImage: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto text-right" dir="rtl">
      {/* שורה עליונה עם כפתור "חזרה לדף הבית" וכפתורי "ערוך"/"שמור" */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" onClick={() => window.location.href = '/' }>
          <ArrowRight className="text-[#05baff]" /> חזרה לדף הבית
        </Button>
        {!isEditing ? (
          <Button
            style={{ backgroundColor: '#d1d5db', color: '#333' }}
            onClick={handleStartEditing}
          >
            ערוך
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: '#05baff', color: '#fff' }}
            onClick={handleSaveClick}
          >
            שמור
          </Button>
        )}
      </div>
      
      <Card className="shadow-lg rounded-2xl p-4 border border-gray-200">
        <CardHeader className="flex flex-row-reverse justify-between items-center border-b pb-4">
          {/* תמונת פרופיל */}
          <div className="relative w-28 h-28 rounded-full border border-gray-300 overflow-hidden">
            {/* הצגת תמונה אם לא בעריכה או שהעלינו קובץ חדש, אחרת נראה אייקון */}
            {!isEditing ? (
              profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <User className="text-gray-500 w-12 h-12" />
                </div>
              )
            ) : (
              tempProfile.profileImage ? (
                <img src={tempProfile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <Upload className="text-gray-500 w-12 h-12" />
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
          <h2 className="text-3xl font-bold text-black">פרופיל משתמש</h2>
        </CardHeader>

        <CardContent className="mt-6 space-y-8">
          {/* פרטי איש קשר */}
          <section>
            <h3 className="text-xl font-semibold text-black mb-4">פרטי איש קשר</h3>
            <div className="space-y-4">
              {(['username', 'contactEmail', 'contactPhone'] as const).map((field) => (
                <div key={field} className="flex items-center">
                  <label htmlFor={field} className="w-40 text-right mr-4 text-sm font-medium text-gray-700">
                    {field === 'username' 
                      ? 'שם משתמש'
                      : field === 'contactEmail'
                        ? 'מייל איש קשר'
                        : 'טלפון איש קשר'}
                  </label>
                  <div className="flex-1 relative">
                    <Input
                      id={field}
                      disabled={!isEditing}
                      // placeholder בעת צפייה – הערך הישן
                      placeholder={!isEditing ? profile[field] : ""}
                      // value בעת עריכה – מה שהמשתמש מקליד (tempProfile)
                      // בעת צפייה – "" כדי לא להציג ערך כלל (רק placeholder)
                      value={isEditing ? tempProfile[field] : ""}
                      onChange={(e) => setTempProfile({ ...tempProfile, [field]: e.target.value })}
                    />
                  </div>
                  {isEditing && <Pencil className="ml-3 text-[#05baff]" />}
                </div>
              ))}
            </div>
          </section>

          {/* פרטי העסק */}
          <section>
            <h3 className="text-xl font-semibold text-black mb-4">פרטי העסק</h3>
            <div className="space-y-4">
              {(['companyName', 'businessEmail', 'businessPhone', 'companyDescription'] as const).map((field) => (
                <div key={field} className="flex items-center">
                  <label htmlFor={field} className="w-40 text-right mr-4 text-sm font-medium text-gray-700">
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
                        className="w-full p-2 border rounded-md disabled:bg-gray-100"
                        rows={4}
                      />
                    ) : (
                      <Input
                        id={field}
                        disabled={!isEditing}
                        placeholder={!isEditing ? profile[field] : ""}
                        value={isEditing ? tempProfile[field] : ""}
                        onChange={(e) => setTempProfile({ ...tempProfile, [field]: e.target.value })}
                      />
                    )}
                  </div>
                  {isEditing && <Pencil className="ml-3 text-[#05baff]" />}
                </div>
              ))}
            </div>
          </section>

          {/* רשתות חברתיות */}
          <section>
            <h3 className="text-xl font-semibold text-black mb-4">רשתות חברתיות</h3>
            <div className="space-y-4">
              {([
                { field: 'linkedin',   label: 'לינקדאין', icon: <Linkedin className="text-[#0e76a8] ml-10" /> },
                { field: 'instagram',  label: 'אינסטגרם', icon: <Instagram className="text-pink-500 ml-10" /> },
                { field: 'facebook',   label: 'פייסבוק',  icon: <Facebook className="text-blue-600 ml-10" /> },
                { field: 'twitter',    label: 'טוויטר',   icon: <Twitter className="text-blue-400 ml-10" /> },
              ] as const).map(({ field, label, icon }) => (
                <div key={field} className="flex items-center">
                  <label htmlFor={field} className="w-40 text-right mr-4 text-sm font-medium text-gray-700">
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
                      />
                    </div>
                  </div>
                  {isEditing && <Pencil className="ml-3 text-[#05baff]" />}
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* AlertDialog לאישור שמירת השינויים */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent className="text-right" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>האם אתה בטוח שברצונך לשמור את השינויים?</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו תשמור את כל השינויים שבוצעו בפרופיל.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>שמור</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfilePage;
