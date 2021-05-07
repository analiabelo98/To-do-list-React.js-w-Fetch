import React, { useState } from "react";

//create your first component
export function Home() {
	const [input, setInput] = useState("");
	const [ToDo, setToDo] = useState([]);
	const [placeholder, setPlaceholder] = useState("What needs to be done?");
	const [style, setStyle] = useState("d-block");

	let GetInput = e => {
		e.preventDefault();
		if (input != "") {
			let ToDoCopy = [...ToDo];
			ToDoCopy.push(input);
			setToDo(ToDoCopy);
			setInput("");
			setPlaceholder("");
		}
	};

	let removeItem = element => {
		let ToDoCopy = [...ToDo];
		setToDo(ToDoCopy.filter(input => input !== element));
		if (ToDo.length == 1) {
			setPlaceholder("No tasks, add a task");
		} else {
			setPlaceholder("");
		}
	};

	// let changeStyle = () => {
	// 	setStyle("d-block");
	// };

	return (
		<div className="text-center mt-5">
			<p className="display-1">to do&apos;s</p>
			<div className="container w-50">
				<form onSubmit={GetInput}>
					<div className=" row">
						<input
							type="text"
							className="list-group-item w-100 col-11"
							placeholder={placeholder}
							onChange={() => setInput(event.target.value)}
							value={input}
						/>

						<button type="submit" className="btn  col">
							<i className="far fa-plus-square"></i>
						</button>
					</div>
				</form>
				<ul className="list-group row">
					{ToDo.map((element, id) => (
						<li
							key={id}
							className="list-group-item text-left text-secondary h-150 d-flex justify-content-between">
							{element}
							<i
								type="button"
								className={"fas fa-trash text-right " + style}
								onClick={() => removeItem(element)}></i>
						</li>
					))}
					<div className="list-group-item text-muted">
						{ToDo.length} item left
					</div>
				</ul>
			</div>
		</div>
	);
}
