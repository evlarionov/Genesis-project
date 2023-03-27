import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/course.scss';
import ReactPlayer from 'react-player';
const Course = () => {
	const { id } = useParams();
	const [course, setCourse] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [lessonShowText, setLessonShowText] = useState('Show Lessons');
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const token =
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwODU3YzU4Yi0wZjYzLTQzOGMtYTk0ZC02ZTIwZDFhZjQ4YjAiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkwMDAyNjksImV4cCI6MTY3OTkwMDI2OX0.LxJfwY8l9I1UME5pzOzn7fHaEtB2kCmeDlBcIU1ZGLU';
				const response = await axios.get(
					`https://api.wisey.app/api/v1/core/preview-courses/${id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				);
				// console.log(response.data);
				setCourse(response.data);
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
				<Link to={'/'}>
					<div className="link-back">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
								fill="#f6f6f6"
							/>
						</svg>
						Go back
					</div>
				</Link>
				<div className="course__wrapper">
					<h1>Title: {course.title}</h1>
					<h2>Description: {course.description}</h2>
					<h3>Rating : {course.rating}</h3>
					<div className="video-player">
						<ReactPlayer
							light={
								<img
									height={'90%'}
									width={'90%'}
									src={course.previewImageLink + '/cover.webp'}
								/>
							}
							height="90%"
							width="100%"
							pip={true}
							controls={true}
							url={course?.lessons[0].link}
							config={{
								file: {
									forceHLS: true,
								},
							}}
						/>
					</div>
					<h4
						onClick={() => {
							setIsVisible((prev) => !prev);
							setLessonShowText((prev) => {
								return prev == 'Hide Lessons' ? 'Show Lessons' : 'Hide Lessons';
							});
						}}
					>
						{lessonShowText}
					</h4>
					<div className="lessons-block">
						{isVisible &&
							course.lessons.map((lesson, index) => {
								return (
									<div className="lessons-block__item" key={lesson.id}>
										<h5>{index + 1} Lesson</h5>
										<p>Duration : {lesson.duration} seconds</p>
										<p>Title : {lesson.title}</p>
										<img
											width={'500px'}
											src={
												lesson.previewImageLink +
												'/lesson-' +
												lesson.order +
												'.webp'
											}
										/>
									</div>
								);
							})}
					</div>
				</div>
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
				Loading...
			</div>
		);
	}
};

export default Course;
