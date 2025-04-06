
import { Bot, FileSearch, FileCheck, FileCode } from 'lucide-react';
import TeamMemberCard from './TeamMemberCard';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'GuudzBot',
      role: 'Main AI Assistant',
      bio: 'Orchestrates the entire platform and handles primary user interactions',
      icon: <Bot className="size-10 text-logistics-blue" />
    },
    {
      name: 'AuditBot',
      role: 'Verification Specialist',
      bio: 'Monitors and verifies all blockchain transactions for compliance and accuracy',
      icon: <FileSearch className="size-10 text-logistics-blue" />
    },
    {
      name: 'BlockBot',
      role: 'Blockchain Manager',
      bio: 'Maintains the integrity of the blockchain and handles cross-chain operations',
      icon: <FileCheck className="size-10 text-logistics-blue" />
    },
    {
      name: 'ContractBot',
      role: 'Smart Contract Engineer',
      bio: 'Develops and deploys secure smart contracts for automated logistics processes',
      icon: <FileCode className="size-10 text-logistics-blue" />
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            Powered by advanced AI bots specializing in different aspects of blockchain and logistics technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              icon={member.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
