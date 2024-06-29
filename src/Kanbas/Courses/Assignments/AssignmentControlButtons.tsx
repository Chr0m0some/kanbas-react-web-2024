import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { deleteAssignment } from "./reducer";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
export default function AssignmentControlButtons({ assignmentId, assignmentTitle }: { assignmentId: string; assignmentTitle: string; }) {
    const dispatch = useDispatch();
    // const id = assignmentId;
    return (
        <div className="float-end text-nowrap">
            <FaTrash data-bs-toggle="modal" data-bs-target={`#wd-delete-assignment-dialog-${assignmentId}`} className="text-danger me-3"/>
            <div id={`wd-delete-assignment-dialog-${assignmentId}`} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Delete Assignment: {assignmentTitle} </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this assignment?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                No </button>
                            <button onClick={(e) => dispatch(deleteAssignment(assignmentId))} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                                Yes </button>
                        </div>
                    </div>
                </div>
            </div>
            <GreenCheckmark />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}
