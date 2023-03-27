import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/style.css';
import Courses from '../components/Courses';
import CoursesScroll from '../components/CoursesScroll';
import Card from '../components/Card';
const Home = () => {
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
							'Access-Control-Allow-Origi': '*',
							preflightContinue: false,
						},
					},
				);
				// console.log(response.data.courses);
				setIsLoaded(true);
			} catch (err) {
				console.error(err);
			}
		};
		fetchCourses();
	}, []);
	if (isLoaded) {
		return (
			<>
				<CoursesScroll />
				{/* <Courses /> */}
				<Card />
			</>
		);
	} else {
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					alignContent: 'center',
					fontSize: '58px',
				}}
			>
				Loading... To acces to the site please ON CORS
			</div>
		);
	}
};

export default Home;
