import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./HomePage.css";
import { movies$ } from "./movies";
// import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function HomePage() {
	const [movies, setMovies] = useState([]);
	const [offset, setOffset] = useState(0);
	const [perPage] = useState(8);
	const [pageCount, setPageCount] = useState(0);
	// console.log(movies);

	useEffect(() => {
		movies$.then((data) => {
			const endOffset = offset + perPage;
			// console.log(`Loading data from ${offset} to ${endOffset}`);
			setMovies(data.slice(offset, endOffset));
			setPageCount(Math.ceil(data.length / perPage));
			// setMovies(data);
		});

		// console.log(movies);
	}, [offset, perPage]);
	// console.log(`movies`, movies);

	const handlePageClick = (event) => {
		console.log(`event`, event);
		const newOffset = event.selected * perPage;
		// console.log(
		// 	`User requested page number ${event.selected}, which is offset ${newOffset}`
		// );
		setOffset(newOffset);
	};

	const deleteMovie = (id) => {
		const newMoviesList = movies.filter((movie) => movie.id !== id);
		setMovies(newMoviesList);
	};
	const filterMovies = (category) => {
		const MoviesByCategory = movies.filter(
			(movie) => movie.category === category
		);
		setMovies(MoviesByCategory);
	};

	return (
		<>
			<h1 className=" text-center mt-3 fs-1">Movies</h1>
			<div className="d-flex justify-content-evenly flex-wrap">
				{/* {console.log(movies)} */}
				{movies?.map((movie) => (
					<div
						className="card mt-5 mx-2 bg-color"
						style={{ width: "18rem" }}
						key={movie.id}
					>
						<img
							className="rounded mx-auto my-2"
							src={movie.image}
							alt={movie.title}
						/>
						<div className="container justify-content-around card-body mt-2">
							<h4 className="card-title text-center ">
								<b>{movie.title}</b>
							</h4>
							<div className="d-flex justify-content-center m-3">
								<button
									onClick={() => filterMovies(movie.category)}
									className="btn btn-info "
								>
									{movie.category}
								</button>
							</div>
							<div className="d-flex justify-content-evenly flex-wrap">
								<button className=" btn btn-success">
									<ion-icon name="thumbs-up"></ion-icon>
									{movie.likes}
								</button>
								<button className="btn btn-danger">
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
			<div className=" d-flex justify-content-center mt-5">
				<ReactPaginate
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
					pageCount={pageCount}
					previousLabel="< previous"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					previousClassName="page-item"
					previousLinkClassName="page-link"
					nextClassName="page-item"
					nextLinkClassName="page-link"
					breakLabel="..."
					breakClassName="page-item"
					breakLinkClassName="page-link"
					containerClassName="pagination"
					activeClassName="active"
					renderOnZeroPageCount={null}
				/>
			</div>
		</>
	);
}
