const MenuItem = ({
  title,
  icon: Icon,
  badge,
  onclick,
}: {
  title: string;
  icon: React.FC | React.ElementType;
  badge?: string;
  onclick?: () => void;
}) => (
  <div
    className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 cursor-pointer"
    onClick={() => onclick && onclick()}
  >
    <div className="flex items-center space-x-3">
      <div className="w-6 h-6 flex items-center justify-center text-gray-600">
        <Icon />
      </div>
      <span className="text-gray-800">{title}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

const MenuSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-3">
    <h3 className="text-xl text-gray-700 font-semibold mb-2">{title}</h3>
    <div className="bg-white rounded-lg shadow-md">{children}</div>
  </div>
);

export { MenuItem, MenuSection };