import { Ticket } from "lucide-react";

interface ProductCardProps {
  title: string;
  descriptionOne: string;
  descriptionTwo?: string;
}

const ProductCard = ({ descriptionOne, descriptionTwo, title }: ProductCardProps) => {
  return (
    <div className="card shadow-xl transform transition-transform duration-300 hover:scale-105">
      <div className="text-center card-body space-y-2">
        <div className="flex flex-col items-center">
          <figure>
            <Ticket width={40} height={40} />
          </figure>
        </div>
        <div className="card-title">
          <p>{title}</p>
        </div>
        <ul>
          <li>
            <p>{descriptionOne}</p>
          </li>
          <li>
            <p>{descriptionTwo}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
