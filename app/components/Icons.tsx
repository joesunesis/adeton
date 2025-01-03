import { LucideProps } from "lucide-react";

const Icons = {
  underline: (props: LucideProps) => (
    <svg {...props} viewBox='0 0 687 155'>
      <g
        stroke='currentColor'
        strokeWidth='7'
        fill='none'
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path
          d='M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'
          opacity='.3'></path>
        <path d='M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20'></path>
      </g>
    </svg>
  )
}

const SettingsIcon = () => <span>⚙️</span>;
const OrderIcon = () => <span>📄</span>;
const NotificationIcon = () => <span>🔔</span>;
const HomeIcon = () => <span>🏠</span>;
const BlitzBuyIcon = () => <span>⚡</span>;
const CartIcon = () => <span>🛒</span>;
const BrandsIcon = () => <span>🏷️</span>;
const RecentlyViewedIcon = () => <span>⏱️</span>;
const CashIcon = () => <span>💰</span>;
const RewardsIcon = () => <span>🏆</span>;
const SupportIcon = () => <span>📞</span>;
const LogoutIcon = () => <span>🚪</span>;
const EditProfileIcon = () => <span>🖊️</span>;
const SecurityIcon = () => <span>🔒</span>;
const PrivacyIcon = () => <span>🔏</span>;
const HelpIcon = () => <span>💬</span>;
const TermsIcon = () => <span>📃</span>;
const ReportIcon = () => <span>🚨</span>;
const AddAccountIcon = () => <span>➕</span>;
const LogoutIcon2 = () => <span>⏻</span>;
const AddressIcon = () => <span>📍</span>;
const UserProfileIcon = () => <span>👤</span>;
const CategoriesIcon = () => <span>🗂️</span>;
const OrdersIcon = () => <span>📦</span>;
const ShoppingBagIcon = () => <span>🛍️</span>;
const MessageIcon = () => <span>💬</span>;

export { Icons, 
  SettingsIcon, 
  OrderIcon, 
  NotificationIcon, 
  HomeIcon, 
  BlitzBuyIcon, 
  CartIcon, 
  BrandsIcon, 
  RecentlyViewedIcon, 
  CashIcon, 
  RewardsIcon, 
  SupportIcon, 
  LogoutIcon, 
  LogoutIcon2,
  AddAccountIcon,
  ReportIcon,
  TermsIcon,
  HelpIcon,
  PrivacyIcon,
  SecurityIcon,
  EditProfileIcon,
  AddressIcon,
  UserProfileIcon,
  CategoriesIcon,
  OrdersIcon,
  ShoppingBagIcon,
  MessageIcon
};