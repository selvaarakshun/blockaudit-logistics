
interface AboutStatItemProps {
  value: string;
  label: string;
}

const AboutStatItem = ({ value, label }: AboutStatItemProps) => {
  return (
    <div>
      <div className="about-stat">{value}</div>
      <p className="about-stat-label">{label}</p>
    </div>
  );
};

export default AboutStatItem;
