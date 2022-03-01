import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./HomePage.css";
import { movies$ } from "../movies";
import { Link } from "react-router-dom";

export default function HomePage() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		movies$.then((data) => {
			setMovies(data);
		});
		// console.log(movies);
	}, []);
	// console.log(`movies`, movies);

	const deleteMovie = (id) => {
		console.log(id);
		const newMoviesList = movies.filter((movie) => movie.id !== id);
		setMovies(newMoviesList);
	};

	return (
		<>
			<h1 className="text-center">Movies</h1>
			<div className="d-flex justify-content-evenly flex-wrap">
				{/* {console.log(movies)} */}
				{movies?.map((movie) => (
					<div
						className="card mt-5 mx-2"
						style={{ width: "18rem" }}
						key={movie.id}
					>
						<div className="container card-body mt-4">
							<h4 className="card-title text-center ">
								<b>{movie.title}</b>
							</h4>
							<p className="card-text">{movie.category}</p>
							<div className="d-flex justify-content-evenly flex-wrap">
								<button className="btn-success">
									<ion-icon name="thumbs-up"></ion-icon>
									{movie.likes}
								</button>
								<button className="btn-danger">
									<ion-icon name="thumbs-down"></ion-icon>
									{movie.dislikes}
								</button>
								<button
									className="btn btn-danger "
									onClick={() => deleteMovie(movie.id)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<Link className="page-link" key="" to="/">
							Previous
						</Link>
					</li>

					<li className="page-item">
						<Link className="page-link" key="" to="/">
							Next
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
