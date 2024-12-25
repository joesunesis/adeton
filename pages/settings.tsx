import { MenuItem, MenuSection, SettingsIcon, OrderIcon, NotificationIcon, CartIcon, RecentlyViewedIcon, LogoutIcon2, HelpIcon, PrivacyIcon, TermsIcon, ReportIcon, UserProfileIcon, AddAccountIcon } from '@/app/components';
import { useAuth } from '@/app/core/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';

export default function Settings() {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = React.useCallback((path: string, url?: string) => {
    return router.push(path, url);
  }, [router]);

  return (
    <div className="min-h-screen text-gray-900 p-4">
      {!user &&
        <div className="bg-white rounded-lg p-4 shadow-md mb-6">
          <h2 className="font-bold text-lg">Unlock everything there is to offer</h2>
          <p className="text-gray-600 text-sm mt-2">
            Sign in to place and track your orders, access Customer Support, and many more.
          </p>
          <button className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 font-semibold" onClick={() => router.push('/signin')}>
            Log in
          </button>
          <p className="text-center text-sm mt-2">
            Don't have an account yet? {" "}
            <span className="text-green-500 font-semibold cursor-pointer" onClick={() => router.push('/signup')}>Register </span> to get started!
          </p>
        </div>}

      <MenuSection title="Account">
        <MenuItem title="Profile" icon={UserProfileIcon} onclick={() => handleClick('/profile')} />
        <MenuItem title="Security" icon={SettingsIcon} onclick={() => handleClick('/reset-password', 'security')} />
        <MenuItem title="Address" icon={AddAccountIcon} onclick={() => handleClick('/address')} />
        {/* <MenuItem title="Notifications" icon={NotificationIcon} /> */}
      </MenuSection>

      <MenuSection title="Shop">
        <MenuItem title="Cart" icon={CartIcon} onclick={() => handleClick('/cart')} />
        {/* <MenuItem title="Recently Viewed" icon={RecentlyViewedIcon} onclick={() => handleClick('/search', 'recent')} /> */}
      </MenuSection>

      <MenuSection title="Support">
        {/* <MenuItem title="Customer Support" icon={HelpIcon} onclick={() => handleClick('/faqs', 'support')} /> */}
        <MenuItem title="Privacy" icon={PrivacyIcon} />
        <MenuItem title="Terms and Policies" icon={TermsIcon} />
        {/* <MenuItem title="Report a Problem" icon={ReportIcon} onclick={() => handleClick('/contact-us', 'report')} /> */}
      </MenuSection>

      {user &&
        <MenuSection title="Help">
          <MenuItem title="Log out" icon={LogoutIcon2} onclick={() => handleClick('/logout')} />
        </MenuSection>
      }
    </div>
  );
}