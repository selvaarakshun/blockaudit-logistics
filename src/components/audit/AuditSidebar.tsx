
import EventCategories from './EventCategories';
import RecentDocuments from './RecentDocuments';
import ExportSection from './ExportSection';

const AuditSidebar = () => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <EventCategories />
      <RecentDocuments />
      <ExportSection />
    </div>
  );
};

export default AuditSidebar;
