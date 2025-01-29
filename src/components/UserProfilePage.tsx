import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowRight, User, Upload, Linkedin, Instagram, Facebook, Twitter, Building2, Mail, Phone } from 'lucide-react';
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
  const [profile, setProfile] = useState<ProfileData>({
    profileImage: '',
    username: 'Example User',
    contactEmail: 'user@example.com',
    contactPhone: 501234567,
    companyName: 'Example Company',
    businessEmail: 'business@example.com',
    businessPhone: 39876543,
    companyDescription: 'Example Company Specializing in Advanced Software Solutions',
    linkedin: 'https://linkedin.com/in/example',
    instagram: 'https://instagram.com/example',
    facebook: 'https://facebook.com/example',
    twitter: 'https://twitter.com/example'
  });
  const [tempProfile, setTempProfile] = useState<ProfileData>({ ...profile });

  const handleStartEditing = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setShowSaveDialog(true);
  };

  const confirmSave = () => {
    setProfile(tempProfile);
    setShowSaveDialog(false);
    setIsEditing(false);
    toast.success("Changes saved successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => window.location.href = '/'} className="text-purple-600 hover:text-purple-700">
            <ArrowRight className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <Button
            onClick={isEditing ? handleSaveClick : handleStartEditing}
            className={`${isEditing ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-purple-200">
                  {(isEditing ? tempProfile.profileImage : profile.profileImage) ? (
                    <img
                      src={isEditing ? tempProfile.profileImage : profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                      <User className="w-12 h-12 text-purple-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              <div className="space-y-4 text-center">
                <Input
                  disabled={!isEditing}
                  value={isEditing ? tempProfile.username : profile.username}
                  onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })}
                  className="text-xl font-semibold text-center"
                  placeholder="Username"
                />
                <div className="flex justify-center space-x-4">
                  {[
                    { icon: Linkedin, link: 'linkedin', color: 'text-blue-600' },
                    { icon: Instagram, link: 'instagram', color: 'text-pink-600' },
                    { icon: Facebook, link: 'facebook', color: 'text-blue-700' },
                    { icon: Twitter, link: 'twitter', color: 'text-blue-400' },
                  ].map(({ icon: Icon, link, color }) => (
                    <a
                      key={link}
                      href={profile[link as keyof ProfileData]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${color} hover:opacity-75 transition-opacity`}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
                  <Mail className="w-5 h-5 mr-2" /> Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Email</label>
                      <Input
                        disabled={!isEditing}
                        value={isEditing ? tempProfile.contactEmail : profile.contactEmail}
                        onChange={(e) => setTempProfile({ ...tempProfile, contactEmail: e.target.value })}
                        placeholder="Contact Email"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                      <Input
                        type="number"
                        disabled={!isEditing}
                        value={isEditing ? tempProfile.contactPhone : profile.contactPhone}
                        onChange={(e) => setTempProfile({ ...tempProfile, contactPhone: Number(e.target.value) })}
                        placeholder="Contact Phone"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
                  <Building2 className="w-5 h-5 mr-2" /> Business Information
                </h3>
                <div className="space-y-4">
                  <Input
                    disabled={!isEditing}
                    value={isEditing ? tempProfile.companyName : profile.companyName}
                    onChange={(e) => setTempProfile({ ...tempProfile, companyName: e.target.value })}
                    placeholder="Company Name"
                    className="font-medium"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Business Email</label>
                      <Input
                        disabled={!isEditing}
                        value={isEditing ? tempProfile.businessEmail : profile.businessEmail}
                        onChange={(e) => setTempProfile({ ...tempProfile, businessEmail: e.target.value })}
                        placeholder="Business Email"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Business Phone</label>
                      <Input
                        type="number"
                        disabled={!isEditing}
                        value={isEditing ? tempProfile.businessPhone : profile.businessPhone}
                        onChange={(e) => setTempProfile({ ...tempProfile, businessPhone: Number(e.target.value) })}
                        placeholder="Business Phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Company Description</label>
                    <textarea
                      disabled={!isEditing}
                      value={isEditing ? tempProfile.companyDescription : profile.companyDescription}
                      onChange={(e) => setTempProfile({ ...tempProfile, companyDescription: e.target.value })}
                      placeholder="Company Description"
                      className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to save these changes?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will update your profile information.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserProfilePage;