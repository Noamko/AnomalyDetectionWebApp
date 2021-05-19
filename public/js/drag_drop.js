const train_div = document.getElementById('train_div');
const detect_div = document.getElementById('detect_div');
const train_Tab = document.getElementById("trainTab");
const detect_Tab = document.getElementById("detectTab");

function trainTabClick() {
	train_div.style.display = "block";
	detect_div.style.display = "none";
	train_Tab.className = "tabButton left active"
	detect_Tab.className = "tabButton right";
}

function detectTabClick() {
	const train_div = document.getElementById('train_div');
	const detect_div = document.getElementById('detect_div');
	train_div.style.display = "none";
	detect_div.style.display = "block";
	train_Tab.className = "tabButton left"
	detect_Tab.className = "tabButton right active";
}

let dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragenter', handlerFunction, false);
dropArea.addEventListener('dragleave', handlerFunction, false);
dropArea.addEventListener('dragover', handlerFunction, false);
dropArea.addEventListener('drop', handlerFunction, false);