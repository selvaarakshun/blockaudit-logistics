
interface TeamMemberCardProps {
  name: string;
  role: string;
  bio: string;
  icon: React.ReactNode;
}

const TeamMemberCard = ({ name, role, bio, icon }: TeamMemberCardProps) => {
  return (
    <div className="about-card">
      <div className="size-16 rounded-full bg-logistics-light-blue/20 dark:bg-logistics-blue/10 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-logistics-blue text-sm mb-3">{role}</p>
        <p className="text-logistics-gray text-sm">{bio}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
