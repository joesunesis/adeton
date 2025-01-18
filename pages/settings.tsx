import { MenuItem, MenuSection, SettingsIcon, CartIcon, LogoutIcon2, PrivacyIcon, TermsIcon, UserProfileIcon, AddressIcon } from '@/app/components';
import { useAuth } from '@/app/core/AuthContext';
import { useCart } from '@/app/core/OrderContext';
import { useRouter } from 'next/router';
import React from 'react';

export default function Settings() {
  const { user, setRedirect } = useAuth();
  const { cart } = useCart();
  const router = useRouter();

  const handleClick = React.useCallback((path: string) => {
    setRedirect(path);
    return router.push(path);
  }, [router]);

  const cartCount = user ? cart.length : '';

  return (
    <div className="p-4">
      {!user &&
        <div className="bg-white rounded-lg p-3 shadow-md mb-3">
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
        <MenuItem title="Security" icon={SettingsIcon} onclick={() => handleClick('/reset-password')} />
        <MenuItem title="Address" icon={AddressIcon} onclick={() => handleClick('/address')} />
        {/* <MenuItem title="Notifications" icon={NotificationIcon} /> */}
      </MenuSection>

      <MenuSection title="Shop">
        <MenuItem title="Cart" icon={CartIcon} onclick={() => handleClick('/cart')} badge={String(cartCount)} />
        {/* <MenuItem title="Recently Viewed" icon={RecentlyViewedIcon} onclick={() => handleClick('/search')} /> */}
      </MenuSection>

      <MenuSection title="Support">
        {/* <MenuItem title="Customer Support" icon={HelpIcon} onclick={() => handleClick('/faqs')} /> */}
        <MenuItem title="Privacy" icon={PrivacyIcon} />
        <MenuItem title="Terms and Policies" icon={TermsIcon} />
        {/* <MenuItem title="Report a Problem" icon={ReportIcon} onclick={() => handleClick('/contact-us'} /> */}
      </MenuSection>

      {user &&
        <MenuSection title="Help">
          <MenuItem title="Log out" icon={LogoutIcon2} onclick={() => handleClick('/logout')} />
        </MenuSection>
      }
    </div>
  );
}