import Image from "next/image";

interface HomeCardProps {
  icon: string;
  title: string;
  description: string;
}

const HomeCard = ({ icon, title, description }: HomeCardProps) => {
  return (
    <div className="card w-96 shadow-xl p-4 transform transition-transform duration-300 hover:scale-105" >
      <div className="text-start card-body space-y-2">
      <div className="flex flex-col items-start">
          <figure >
            <Image src={icon} alt="Icon" width={60} height={60} className="w-full h-full object-contain" />
          </figure>
        </div>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
