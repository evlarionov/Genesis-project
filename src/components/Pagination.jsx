import '../styles/pagintaion.scss';
const Pagination = ({ coursesPerPage, totalCourses, setCurrentPage }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
		pageNumbers.push(i);
	}
	// console.log(pageNumbers);
	return (
		<div className="pagination">
			{pageNumbers.map((number) => {
				return (
					<button
						onClick={() => setCurrentPage(number)}
						key={number}
						className="page-item"
					>
						{number}
					</button>
				);
			})}
		</div>
	);
};

export default Pagination;
