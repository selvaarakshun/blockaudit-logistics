
interface NavigationDotsProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
}

const NavigationDots = ({ activeSection, scrollToSection }: NavigationDotsProps) => {
  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
      {['Overview', 'Technology', 'Benefits', 'Map', 'Team'].map((label, index) => (
        <button
          key={index}
          onClick={() => scrollToSection(index)}
          className="group flex items-center gap-2"
        >
          <div 
            className={`size-3 rounded-full transition-all duration-300 ${
              activeSection === index 
                ? 'bg-logistics-blue size-4' 
                : 'bg-logistics-gray/50 group-hover:bg-logistics-gray'
            }`}
          ></div>
          <span 
            className={`text-sm opacity-0 group-hover:opacity-100 transition-opacity ${
              activeSection === index ? 'text-logistics-blue font-medium' : 'text-logistics-gray'
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default NavigationDots;
