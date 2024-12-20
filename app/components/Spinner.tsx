export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      <span className="ml-2 text-blue-500">Loading...</span>
    </div>
  );
}