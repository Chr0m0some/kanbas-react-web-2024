import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
export default function AssignmentsControls() {
	return (
		<div className="wd-assigment-controls container row text-nowrap flex-nowrap">
			<div id="wd-search" className="col-auto input-group w-50 me-5 flex-nowrap">
				<span className="input-group-text rounded-start border border-0 p-2">
					<CiSearch className='fs-5' />
				</span>
				<input type="text" className="form-control rounded-end border border-0" placeholder="Search..." />
			</div>
			<button id="wd-add-assignment-group" type="button"
				className="col-auto btn btn-lg btn-secondary me-2">
				<FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
				Group</button>
			<button id="wd-add-assignment" type="button"
				className="col-auto btn btn-lg btn-danger justify-content-end me-2">
				<FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
				Assignment</button>
		</div>
	);
}
