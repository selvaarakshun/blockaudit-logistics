
import { Bot, FileSearch, FileCheck, FileCode } from 'lucide-react';

const TeamSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Team</h2>
          <p className="text-lg text-logistics-gray">
            Powered by advanced AI bots specializing in different aspects of blockchain and logistics technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
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
          ].map((bot, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-logistics-dark rounded-xl p-6 border border-border shadow-subtle hover:shadow-medium transition-all"
            >
              <div className="size-16 rounded-full bg-logistics-light-blue/20 dark:bg-logistics-blue/10 flex items-center justify-center mx-auto mb-4">
                {bot.icon}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-1">{bot.name}</h3>
                <p className="text-logistics-blue text-sm mb-3">{bot.role}</p>
                <p className="text-logistics-gray text-sm">{bot.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
