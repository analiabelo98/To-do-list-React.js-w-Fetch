import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [ToDo, setToDo] = useState([]);
	const [input, setInput] = useState("");
	const [placeholder, setPlaceholder] = useState("What needs to be done?");
	const [style, setStyle] = useState("d-block");
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	let addItem = e => {
		e.preventDefault();
		if (input != "") {
			let newInput = {
				label: input,
				done: false
			};
			let itemsCopy = [...ToDo];
			itemsCopy.push(newInput);
			setToDo(itemsCopy);
			updateData(itemsCopy);
			setInput("");
			setPlaceholder("Add a task");
		}
	};

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/analia")
			.then(resp => resp.json())
			.then(data => setToDo(data))
			.catch(error => setShowError(true));
	};

	const updateData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"Content-Type": "application/json"
			}
		};

		console.log(updatedListToSend);
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/analia",
			options
		)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	let removeItem = element => {
		let ToDoCopy = [...ToDo];
		setToDo(ToDoCopy.filter(input => input !== element));
		if (ToDo.length == 1) {
			//solucion para bug cuando la lista esta vacia
			let newInput = {
				label: "sample task",
				done: false
			};

			let ToDoCopy = [];
			ToDoCopy.push(newInput);
			setToDo(ToDoCopy);
			updateData(ToDoCopy);
			setPlaceholder("No tasks, add a task");
		} else {
			setPlaceholder("Add a task");
			updateData(ToDoCopy.filter(item => item !== element));
		}
	};

	let changeStyle = () => {
		setStyle("d-block");
	};

	return (
		<div className="text-center mt-5">
			<p className="display-1">to do&apos;s</p>
			<div className="container w-50">
				<form onSubmit={addItem}>
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
				<ul className="list-group list-group-flush">
					{ToDo.length === 0 ? (
						<li className="list-group-item">Cargando...</li>
					) : (
						ToDo.map((todo, index) => (
							<li
								key={index}
								className="list-group-item text-left text-secondary h-150 d-flex justify-content-between">
								{todo.label}
								<div className="row ">
									{/* <i
										type="button"
										className="fas fa-check text-right p-2"></i> */}
									<i
										type="button"
										className={
											"fas fa-trash text-right p-2 " +
											style
										}
										onClick={() => removeItem(todo)}></i>
								</div>
							</li>
						))
					)}

					<div className="list-group-item text-muted">
						{ToDo.length} item left
					</div>
				</ul>
			</div>
		</div>
	);
}
