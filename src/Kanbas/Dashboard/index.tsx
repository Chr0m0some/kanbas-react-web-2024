export default function Dashboard() {
	return (
		<div id="wd-dashboard">
			<h1 id="wd-dashboard-title">Dashboard</h1> <hr />
			<h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
			<div id="wd-dashboard-courses" className="row">
				<div className="row row-cols-1 row-cols-md-5 g-4">
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/5610tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/5610/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS5610 Web Development
								</a>
								<p className="wd-dashboard-course-title card-text">
									Web Development
								</p>
								<a href="#/Kanbas/Courses/5610/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/5100tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/5100/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS100 Artificial Intelligence
								</a>
								<p className="wd-dashboard-course-title card-text">
									Foundations of AI
								</p>
								<a href="#/Kanbas/Courses/5100/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/5800tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/5800/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS5800 Algorithms
								</a>
								<p className="wd-dashboard-course-title card-text">
									Algorithms
								</p>
								<a href="#/Kanbas/Courses/5800/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/1234tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/1234/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS1234 Computer Graphics
								</a>
								<p className="wd-dashboard-course-title card-text">
									Computer Graphics
								</p>
								<a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/1235tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/1235/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS1235 Networking
								</a>
								<p className="wd-dashboard-course-title card-text">
									Networking
								</p>
								<a href="#/Kanbas/Courses/1235/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/1236tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/1236/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS1236 Game Development
								</a>
								<p className="wd-dashboard-course-title card-text">
									Game Development
								</p>
								<a href="#/Kanbas/Courses/1236/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
					<div className="wd-dashboard-course col" style={{ width: "300px" }}>
						<div className="card">
							<img src="/images/1237tn.jpg" style={{ height: "150px" }} />
							<div className="card-body">
								<a className="wd-dashboard-course-link"
									href="#/Kanbas/Courses/1237/Home"
									style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
									CS1237 Cybersecurity
								</a>
								<p className="wd-dashboard-course-title card-text">
									Cybersecurity
								</p>
								<a href="#/Kanbas/Courses/1237/Home" className="btn btn-primary"> Go </a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}