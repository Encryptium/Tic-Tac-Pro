'use strict';

// This script handles all the communication with the user: mainly displaying errors

// if (document.querySelector("#error-footer p").innerHTML == "") {
// 	document.getElementById("error-footer").style.display = 'none';
// }

if (document.querySelector("#error-footer p").innerHTML != "") {
	document.getElementById("error-footer").style.display = 'block';
}

function showError(error) {
	document.getElementById("error-footer").style.display = 'block';
	document.querySelector("#error-footer p").innerHTML = error;
}

console.log(`
████████████████████████████████████████████████████████
█░░░░░░░░██░░░░░░░░██████████████████████░░░░░░░░░░░░░░█
█░░▄▀▄▀░░██░░▄▀▄▀░░██████████████████████░░▄▀▄▀▄▀▄▀▄▀░░█
█░░░░▄▀░░██░░▄▀░░░░████████░░░░░░████████░░▄▀░░░░░░▄▀░░█
███░░▄▀▄▀░░▄▀▄▀░░██████████░░▄▀░░████████░░▄▀░░██░░▄▀░░█
███░░░░▄▀▄▀▄▀░░░░██████░░░░░░▄▀░░░░░░████░░▄▀░░██░░▄▀░░█
█████░░▄▀▄▀▄▀░░████████░░▄▀▄▀▄▀▄▀▄▀░░████░░▄▀░░██░░▄▀░░█
███░░░░▄▀▄▀▄▀░░░░██████░░░░░░▄▀░░░░░░████░░▄▀░░██░░▄▀░░█
███░░▄▀▄▀░░▄▀▄▀░░██████████░░▄▀░░████████░░▄▀░░██░░▄▀░░█
█░░░░▄▀░░██░░▄▀░░░░████████░░░░░░████████░░▄▀░░░░░░▄▀░░█
█░░▄▀▄▀░░██░░▄▀▄▀░░██████████████████████░░▄▀▄▀▄▀▄▀▄▀░░█
█░░░░░░░░██░░░░░░░░██████████████████████░░░░░░░░░░░░░░█
████████████████████████████████████████████████████████
`);