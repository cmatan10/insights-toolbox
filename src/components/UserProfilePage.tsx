import { useState } from 'react';
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
    toast.success("Changes saved successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-lightblue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => window.location.href = '/'} className="text-[#05baff] hover:text-[#05baff]">
            <ArrowRight className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          {activeSection && (
            <Button onClick={handleSaveClick} className="bg-[#05baff] hover:bg-[#05baff]/90">
              Save Changes
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-end">
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
                      alt="Profile"
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
                <Input
                  disabled={!editSections.profile}
                  value={editSections.profile ? tempProfile.username : profile.username}
                  onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })}
                  className="text-xl font-semibold text-center"
                  placeholder="Username"
                />
              </div>
            </CardContent>
          </Card>

          {/* Details Cards */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center text-[#05baff]">
                    <Mail className="w-5 h-5 mr-2" /> Contact Information
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleStartEditing('contact')}
                    className="hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Email</label>
                      <Input
                        disabled={!editSections.contact}
                        value={editSections.contact ? tempProfile.contactEmail : profile.contactEmail}
                        onChange={(e) => setTempProfile({ ...tempProfile, contactEmail: e.target.value })}
                        placeholder="Contact Email"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Phone</label>
                      <Input
                        type="number"
                        disabled={!editSections.contact}
                        value={editSections.contact ? tempProfile.contactPhone : profile.contactPhone}
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
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold flex items-center text-[#05baff]">
                    <Building2 className="w-5 h-5 mr-2" /> Business Information
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
                  <Input
                    disabled={!editSections.business}
                    value={editSections.business ? tempProfile.companyName : profile.companyName}
                    onChange={(e) => setTempProfile({ ...tempProfile, companyName: e.target.value })}
                    placeholder="Company Name"
                    className="font-medium"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Business Email</label>
                      <Input
                        disabled={!editSections.business}
                        value={editSections.business ? tempProfile.businessEmail : profile.businessEmail}
                        onChange={(e) => setTempProfile({ ...tempProfile, businessEmail: e.target.value })}
                        placeholder="Business Email"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-1 block">Business Phone</label>
                      <Input
                        type="number"
                        disabled={!editSections.business}
                        value={editSections.business ? tempProfile.businessPhone : profile.businessPhone}
                        onChange={(e) => setTempProfile({ ...tempProfile, businessPhone: Number(e.target.value) })}
                        placeholder="Business Phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Company Description</label>
                    <textarea
                      disabled={!editSections.business}
                      value={editSections.business ? tempProfile.companyDescription : profile.companyDescription}
                      onChange={(e) => setTempProfile({ ...tempProfile, companyDescription: e.target.value })}
                      placeholder="Company Description"
                      className="w-full p-2 border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-[#05baff]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#05baff]">Social Media Links</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleStartEditing('social')}
                    className="hover:bg-gray-100"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-600" /> LinkedIn
                    </label>
                    <Input
                      disabled={!editSections.social}
                      value={editSections.social ? tempProfile.linkedin : profile.linkedin}
                      onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-pink-600" /> Instagram
                    </label>
                    <Input
                      disabled={!editSections.social}
                      value={editSections.social ? tempProfile.instagram : profile.instagram}
                      onChange={(e) => setTempProfile({ ...tempProfile, instagram: e.target.value })}
                      placeholder="Instagram URL"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <Facebook className="w-4 h-4 text-blue-700" /> Facebook
                    </label>
                    <Input
                      disabled={!editSections.social}
                      value={editSections.social ? tempProfile.facebook : profile.facebook}
                      onChange={(e) => setTempProfile({ ...tempProfile, facebook: e.target.value })}
                      placeholder="Facebook URL"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-blue-400" /> Twitter
                    </label>
                    <Input
                      disabled={!editSections.social}
                      value={editSections.social ? tempProfile.twitter : profile.twitter}
                      onChange={(e) => setTempProfile({ ...tempProfile, twitter: e.target.value })}
                      placeholder="Twitter URL"
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