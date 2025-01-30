import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Upload, Linkedin, Instagram, Facebook, Twitter, Building2, Mail, Phone, Pencil } from 'lucide-react';
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

interface SectionEditState {
  profile: boolean;
  contact: boolean;
  business: boolean;
  social: boolean;
}

const UserProfilePage = () => {
  const [editSections, setEditSections] = useState<SectionEditState>({
    profile: false,
    contact: false,
    business: false,
    social: false
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activeSection, setActiveSection] = useState<keyof SectionEditState | null>(null);
  const [profile, setProfile] = useState<ProfileData>({
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
  const [tempProfile, setTempProfile] = useState<ProfileData>({ ...profile });

  useEffect(() => {
    fetch('http://localhost:5001/api/personal-details')
      .then(response => response.json())
      .then(data => {
        setProfile(data[0]);
        setTempProfile(data[0]);
      })
      .catch(error => {
        console.error('Error fetching personal details:', error);
      });
  }, []);

  const handleStartEditing = (section: keyof SectionEditState) => {
    setTempProfile({ ...profile });
    setEditSections({ ...editSections, [section]: true });
    setActiveSection(section);
  };

  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    setProfile(tempProfile);
    setShowSaveDialog(false);
    setEditSections({
      profile: false,
      contact: false,
      business: false,
      social: false
    });
    setActiveSection(null);
    toast.success("השינויים נשמרו בהצלחה!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({ ...tempProfile, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-lightblue-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => window.location.href = '/'} className="text-[#05baff] hover:text-[#05baff]">
            <ArrowRight className="mr-2 h-4 w-4" /> חזרה לדף הבית
          </Button>
          {activeSection && (
            <Button onClick={handleSaveClick} className="bg-[#05baff] hover:bg-[#05baff]/90">
              שמור שינויים
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center text-[#05baff]">
                  <User className="w-5 h-5 ml-2" /> פרטים אישיים
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStartEditing('profile')}
                  className="hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>

              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#05baff]">
                  {(editSections.profile ? tempProfile.profileImage : profile.profileImage) ? (
                    <img
                      src={editSections.profile ? tempProfile.profileImage : profile.profileImage}
                      alt="תמונת פרופיל"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                      <User className="w-12 h-12 text-[#05baff]" />
                    </div>
                  )}
                </div>
                {editSections.profile && (
                  <label className="absolute bottom-0 right-0 p-2 bg-[#05baff] rounded-full cursor-pointer hover:bg-[#05baff]/90 transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">שם משתמש</label>
                  <Input
                    disabled={!editSections.profile}
                    value={editSections.profile ? tempProfile.username : profile.username}
                    onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })}
                    className="text-right"
                    placeholder="שם משתמש"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">דוא״ל</label>
                  <Input
                    disabled={!editSections.profile}
                    value={editSections.profile ? tempProfile.contactEmail : profile.contactEmail}
                    onChange={(e) => setTempProfile({ ...tempProfile, contactEmail: e.target.value })}
                    className="text-right"
                    placeholder="דוא״ל"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">טלפון</label>
                  <Input
                    type="text"
                    disabled={!editSections.profile}
                    value={editSections.profile ? tempProfile.contactPhone : profile.contactPhone}
                    onChange={(e) => setTempProfile({ ...tempProfile, contactPhone: e.target.value })}
                    className="text-right"
                    placeholder="טלפון"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card className="lg:col-span-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center text-[#05baff]">
                  <Building2 className="w-5 h-5 ml-2" /> פרטי העסק
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStartEditing('business')}
                  className="hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">שם החברה</label>
                  <Input
                    disabled={!editSections.business}
                    value={editSections.business ? tempProfile.companyName : profile.companyName}
                    onChange={(e) => setTempProfile({ ...tempProfile, companyName: e.target.value })}
                    className="text-right font-medium"
                    placeholder="שם החברה"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">דוא״ל עסקי</label>
                    <Input
                      disabled={!editSections.business}
                      value={editSections.business ? tempProfile.businessEmail : profile.businessEmail}
                      onChange={(e) => setTempProfile({ ...tempProfile, businessEmail: e.target.value })}
                      className="text-right"
                      placeholder="דוא״ל עסקי"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">טלפון עסקי</label>
                    <Input
                      type="text"
                      disabled={!editSections.business}
                      value={editSections.business ? tempProfile.businessPhone : profile.businessPhone}
                      onChange={(e) => setTempProfile({ ...tempProfile, businessPhone: e.target.value })}
                      className="text-right"
                      placeholder="טלפון עסקי"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 mb-1 block">תיאור החברה</label>
                  <textarea
                    disabled={!editSections.business}
                    value={editSections.business ? tempProfile.companyDescription : profile.companyDescription}
                    onChange={(e) => setTempProfile({ ...tempProfile, companyDescription: e.target.value })}
                    placeholder="תיאור החברה"
                    className="w-full p-2 border rounded-md min-h-[187px] focus:outline-none focus:ring-2 focus:ring-[#05baff] text-right"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Panel */}
          <Card className="lg:col-span-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#05baff]">רשתות חברתיות</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleStartEditing('social')}
                  className="hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Linkedin className="w-5 h-5 ml-2" /> LinkedIn
                  </label>
                  <Input
                    disabled={!editSections.social}
                    value={editSections.social ? tempProfile.linkedin : profile.linkedin}
                    onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                    className="text-right"
                    placeholder="קישור ל-LinkedIn"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Instagram className="w-5 h-5 ml-2" /> Instagram
                  </label>
                  <Input
                    disabled={!editSections.social}
                    value={editSections.social ? tempProfile.instagram : profile.instagram}
                    onChange={(e) => setTempProfile({ ...tempProfile, instagram: e.target.value })}
                    className="text-right"
                    placeholder="קישור ל-Instagram"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Facebook className="w-5 h-5 ml-2" /> Facebook
                  </label>
                  <Input
                    disabled={!editSections.social}
                    value={editSections.social ? tempProfile.facebook : profile.facebook}
                    onChange={(e) => setTempProfile({ ...tempProfile, facebook: e.target.value })}
                    className="text-right"
                    placeholder="קישור ל-Facebook"
                  />
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-1 block flex items-center">
                    <Twitter className="w-5 h-5 ml-2" /> Twitter
                  </label>
                  <Input
                    disabled={!editSections.social}
                    value={editSections.social ? tempProfile.twitter : profile.twitter}
                    onChange={(e) => setTempProfile({ ...tempProfile, twitter: e.target.value })}
                    className="text-right"
                    placeholder="קישור ל-Twitter"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>האם אתה בטוח שברצונך לשמור את השינויים?</AlertDialogTitle>
            <AlertDialogDescription>
              פעולה זו תעדכן את פרטי הפרופיל שלך.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>שמור שינויים</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfilePage;