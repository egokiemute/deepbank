
interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tabs: React.FC<TabProps> = ({ label, isActive, onClick }) => {
  return (
    <div
      className={`h-8 cursor-pointer whitespace-nowrap rounded-[1000px] px-3 py-1 text-center text-paragraph-md duration-150 xs:px-4 ${
        isActive
          ? "bg-[#9327DB] text-text-strongInverse"
          : "bg-icon-strong-inverse text-[#9327DB]"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default Tabs;
