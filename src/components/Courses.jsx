import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/courses.css';
import Footer from './Footer';
import Pagination from './Pagination';
const Courses = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [coursesPerPage] = useState(10);
	const [courses, setCourses] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const token =
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwODU3YzU4Yi0wZjYzLTQzOGMtYTk0ZC02ZTIwZDFhZjQ4YjAiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkwMDAyNjksImV4cCI6MTY3OTkwMDI2OX0.LxJfwY8l9I1UME5pzOzn7fHaEtB2kCmeDlBcIU1ZGLU';
				const response = await axios.get(
					`https://api.wisey.app/api/v1/core/preview-courses`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				// console.log(response.data.courses);
				setCourses(response.data.courses);
				setIsLoaded(true);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCourses();
	}, []);
	//pagination variables
	const lastCourseIndex = currentPage * coursesPerPage;
	const firstCourseIndex = lastCourseIndex - coursesPerPage;
	const currentCourses = courses.slice(firstCourseIndex, lastCourseIndex);
	// console.log(courses.length);
	if (isLoaded) {
		return (
			<>
				<h1 style={{ textTransform: 'uppercase', marginTop: '80px' }}>All courses</h1>
				<div className="wrapper">
					{currentCourses.map((course, index) => {
						if (index <= 9) {
							return (
								<Link key={course.id} to={'/course/' + course.id}>
									<div className="courses__item">
										<p className="course__rating">Рейтинг {course.rating}</p>
										<img
											width={400}
											src={`${course.previewImageLink}/cover.webp`}
											alt=""
										/>
										<p className="course__title">{course.title}</p>
									</div>
								</Link>
							);
						}
					})}
				</div>
				<Pagination
					setCurrentPage={setCurrentPage}
					coursesPerPage={coursesPerPage}
					totalCourses={courses.length}
				/>
				<Footer />
			</>
		);
	}
	if (!isLoaded) {
		return <img width={'100vw'} height={'100vh'} src={CoursesLoading} />;
	}
};

export default Courses;
