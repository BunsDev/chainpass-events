import Link from "next/link";
import { Eye } from "lucide-react";

const SeeEventsButton = () => {
  return (
    <Link href={"/"}>
      <button className="btn btn-primary w-40">
        <span>
          {" "}
          <Eye width={25} height={25} />
        </span>
        See Events
      </button>
    </Link>
  );
};

export default SeeEventsButton;
