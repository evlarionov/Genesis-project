import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../styles/сoursesScroll.css';
const CoursesScroll = () => {
	const responsive = {
		superLargeDesktop: {
			
			breakpoint: { max: 4000, min: 3000 },
			items: 2,
			slidesToSlide: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			slidesToSlide: 2,
		},
		tablet: {
			breakpoint: { max: 1024, min: 468 },
			items: 2,
			slidesToSlide: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 2,
		},
	};
	const [isLoaded, setIsLoaded] = useState(false);
	const [lastTenCourses, setLastTenCourses] = useState([]);
	useEffect(() => {
		const fetchLastTenCourses = async () => {
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
				setLastTenCourses(() => {
					const result = [];
					// console.log(response.data.courses);
					for (let i = 0; i < 10; i++) {
						result.push(response.data.courses[response.data.courses.length - 1 - i]);
					}
					return result;
				});
				setIsLoaded(true);
			} catch (err) {
				console.error(err);
			}
		};
		fetchLastTenCourses();
	}, []);
	return (
		<>
			<h1 className="tape__title">The last 10 courses </h1>
			{isLoaded ? (
				<>
					<Carousel
						responsive={responsive}
						draggable={false}
						sliderClass={'tape__wrapper'}
					>
						{lastTenCourses.map((cource) => {
							return (
								<Link
									className="tape__item"
									key={cource.id}
									to={'/course/' + cource.id}
								>
									<img src={`${cource.previewImageLink}/cover.webp`} alt="" />
									<p>{cource.title}</p>
								</Link>
							);
						})}
					</Carousel>
				</>
			) : (
				<img width={'100vw'} height={'100vh'} src={CoursesScrollLoading} />
			)}
		</>
	);
};

export default CoursesScroll;
