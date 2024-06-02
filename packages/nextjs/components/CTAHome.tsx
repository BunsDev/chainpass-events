import { ArrowUpIcon } from "lucide-react";

export const CTAHome = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScrollToTop}
      className="fixed bottom-4 right-4 bg-purple-500 text-white p-2 rounded-full shadow-md hover:bg-purple-400 focus:outline-none focus:ring-2 focus:bg-purple-500 focus:ring-opacity-50"
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  );
};
