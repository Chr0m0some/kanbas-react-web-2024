import React from "react";
import logo from './logo.svg'
import Labs from "./Labs";
import Kanbas from "./Kanbas"
import Dashboard from "./Dashboard";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
	return (
			<div id="wd-kanbas">
				<Dashboard />
			</div>
	);
}
