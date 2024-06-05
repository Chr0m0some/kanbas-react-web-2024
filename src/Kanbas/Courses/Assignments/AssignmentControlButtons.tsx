import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentControlButtons() {
    return (
        <div className="float-end">
            <span className="border border-black rounded-pill p-2 me-2 fs-6">40% of Total</span>
            <FaPlus />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
