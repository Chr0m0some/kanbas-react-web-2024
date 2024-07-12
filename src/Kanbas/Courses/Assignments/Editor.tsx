import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment, setAssignment } from "./reducer";
export default function AssignmentEditor() {
	const { id, cid } = useParams();
	const { assignments } = useSelector((state: any) => state.assignmentsReducer);
	let { assignment } = useSelector((state: any) => state.assignmentsReducer);
	const dispatch = useDispatch();
	if (assignments.find((assignment: any) => assignment._id === id)) {
		assignment = assignments.find((assignment: any) => assignment._id === id);
	}
	return (
		<div id="wd-assignments-editor">
			<script src="http://localhost:8097"></script>
			<div className="mb-3">
				<label htmlFor="wd-name" className="form-label">Assignment Name</label>
				<input id="wd-name" className="form-control"
					onChange={(e) => {
						if (assignment._id) {
							dispatch(updateAssignment({ ...assignment, title: e.target.value }));
						} else {
							dispatch(setAssignment({ ...assignment, title: e.target.value }));
						}
					}}
					value={assignment?.title}
				/>
			</div>
			<div className="mb-3">
				<textarea className="form-control"
					onChange={(e) => {
						if (assignment._id) {
							dispatch(updateAssignment({ ...assignment, description: e.target.value }));
						} else {
							dispatch(setAssignment({ ...assignment, description: e.target.value }));
						}
					}}
					id="wd-description" rows={7}>
					{assignment?.description}
				</textarea>
			</div>
			<div className="container">
				<div className="d-flex flex-column align-items-end">
					<div className="mb-3 w-100 d-flex justify-content-end">
						<label htmlFor="wd-points" className="form-label me-2">Points</label>
						<div className="flex-grow-1" style={{ maxWidth: '400px' }}>
							<input id="wd-points" className="form-control"
								onChange={(e) => {
									if (assignment._id) {
										dispatch(updateAssignment({ ...assignment, points: e.target.value }));
									} else {
										dispatch(setAssignment({ ...assignment, points: e.target.value }));
									}
								}}
								value={assignment?.points}
							/>
						</div>
					</div>
					<div className="mb-3 w-100 d-flex justify-content-end">
						<label htmlFor="wd-group" className="form-label me-2">Assignment Group</label>
						<div className="flex-grow-1" style={{ maxWidth: '400px' }}>
							<div className="dropdown w-100">
								<button className="btn bg-white dropdown-toggle w-100 border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Assignments
								</button>
								<ul className="dropdown-menu w-100">
									<li className="dropdown-item">Quizzes</li>
									<li className="dropdown-item">Exams</li>
									<li className="dropdown-item">Project</li>
									<li className="dropdown-item">Assignments</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="mb-3 w-100 d-flex justify-content-end">
						<label htmlFor="wd-display-grade-as" className="form-label me-2">Display Grade as</label>
						<div className="flex-grow-1" style={{ maxWidth: '400px' }}>
							<div className="dropdown w-100">
								<button className="btn bg-white dropdown-toggle w-100 border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Percentage
								</button>
								<ul className="dropdown-menu w-100">
									<li className="dropdown-item">Letter</li>
									<li className="dropdown-item">GPA</li>
									<li className="dropdown-item">Percentage</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="mb-3 w-100 d-flex justify-content-end">
						<label htmlFor="wd-submission-type" className="form-label me-2">Submission Type</label>
						<div className="mb-3 w-100 d-flex border rounded p-3 align-items-center flex-grow-1" style={{ maxWidth: '400px' }}>
							<div className="flex-grow-1" style={{ maxWidth: '400px' }}>
								<div className="dropdown w-100 mb-3">
									<button className="btn bg-white dropdown-toggle w-100 border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
										Online
									</button>
									<ul className="dropdown-menu w-100">
										<li className="dropdown-item">Written</li>
										<li className="dropdown-item">Online</li>
									</ul>
								</div>
								<div className="d-flex flex-column">
									<label className="form-label"><strong>Online Entry Options</strong></label>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="wd-text-entry" />
										<label className="form-check-label" htmlFor="wd-text-entry">
											Text Entry
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="wd-website-url" />
										<label className="form-check-label" htmlFor="wd-website-url">
											Website URL
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="wd-media-recordings" />
										<label className="form-check-label" htmlFor="wd-media-recordings">
											Media Recordings
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="wd-student-annotation" />
										<label className="form-check-label" htmlFor="wd-student-annotation">
											Student Annotation
										</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" value="" id="wd-file-upload" />
										<label className="form-check-label" htmlFor="wd-file-upload">
											File Uploads
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-3 w-100 d-flex justify-content-end">
						<label className="form-label me-2">Assign</label>
						<div className="mb-3 w-100 d-flex border rounded p-3 align-items-center flex-grow-1" style={{ maxWidth: '400px' }}>
							<div className="d-flex flex-column">
								<div className="mb-3">
									<label htmlFor="wd-assign-to" className="form-label"><strong>Assign to</strong></label>
									<input id="wd-assign-to" className="form-control" value="Everybody" />
								</div>
								<div className="mb-3">
									<label htmlFor="wd-due-date" className="form-label"><strong>Due</strong></label>
									<input id="wd-due-date" className="form-control" type="date"
										onChange={(e) => {
											if (assignment._id) {
												dispatch(updateAssignment({ ...assignment, due_date: e.target.value }));
											} else {
												dispatch(setAssignment({ ...assignment, due_date: e.target.value }));
											}
										}}
										value={assignment?.due_date}
										min="2024-05-13"
										max="2024-08-24"
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="wd-available-from" className="form-label"><strong>Available From</strong></label>
									<input id="wd-available-from" className="form-control" type="date"
										onChange={(e) => {
											if (assignment._id) {
												dispatch(updateAssignment({ ...assignment, available_date: e.target.value }));
											} else {
												dispatch(setAssignment({ ...assignment, available_date: e.target.value }));
											}
										}}
										value={assignment?.available_date}
										min="2024-05-06"
										max="2024-08-24"
									/>
								</div>
								<div>
									<label htmlFor="wd-available-until" className="form-label"><strong>Until</strong></label>
									<input id="wd-available-until" className="form-control" type="date"
										onChange={(e) => {
											if (assignment._id) {
												dispatch(updateAssignment({ ...assignment, due_date: e.target.value }));
											} else {
												dispatch(setAssignment({ ...assignment, due_date: e.target.value }));
											}
										}}
										value={assignment?.due_date}
										min="2024-05-06"
										max="2024-08-24"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div className="d-flex justify-content-end">
				<Link to={`/Kanbas/Courses/${cid}/Assignments`} className="col-auto btn btn-lg btn-secondary me-2">Cancel</Link>
				<Link to={`/Kanbas/Courses/${cid}/Assignments`}
					onClick={(e) => {
						if (assignment._id) {
							dispatch(updateAssignment({ ...assignment }));
						} else {
							dispatch(addAssignment({ ...assignment, course: cid }));
						}
					}}
					className="col-auto btn btn-lg btn-danger me-2">
					Save
				</Link>
			</div>
		</div>
	);
}
