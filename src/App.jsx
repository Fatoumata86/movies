import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Error404 from "./components/Error404";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<HomePage />}></Route>
				<Route path="*" element={<Error404 />}></Route>
			</Routes>
		</BrowserRouter>
	);
}
