import React from "react";
import Error from "../assets/images/Error.jpg";

export default function Error404() {
	return (
		<div>
			<p className=" bg-danger text-center fs-1 text-white">
				Page not found
			</p>
			<img className="card-img" src={Error} alt="" />
		</div>
	);
}
