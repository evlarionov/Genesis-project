import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
								<Card key={course.id} sx={{ maxWidth: 345, bgcolor: '#E7EBF0' }}>
									<Link to={'/course/' + course.id}>
										<CardActionArea>
											<CardMedia
												component="img"
												height="140"
												image={`${course.previewImageLink}/cover.webp`}
											/>

											<CardContent>
												<Typography
													color="black"
													gutterBottom
													variant="h5"
													component="div"
												>
													{course.title}
												</Typography>
												<Typography variant="body2" color="text.secondary">
													{course.description}
												</Typography>
											</CardContent>
										</CardActionArea>
									</Link>
								</Card>
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
		return <img src={CoursesLoading} />;
	}
};

export default Courses;
