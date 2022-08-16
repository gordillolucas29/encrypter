const messageInput = document.getElementById("messageInput");
const encrypt = document.getElementById("encrypt");
const decrypt = document.getElementById("decrypt");
const copy = document.getElementById("copy");

const keys = {
	a: "ai",
	e: "enter",
	i: "imes",
	o: "ober",
	u: "ufat",
}

let messageOutput;

encrypt.onclick = () => {
	let inputValue = messageInput.value.trim();
	messageOutput = '';

	if (!inputValue) return popup("popup-encrypt");

	if (inputValue.match(/[^a-z\s]/g)) return popup("popup-only");

	for (let i = 0; i < inputValue.length; i++) {
		let string = inputValue.charAt(i);

		if (/^[aeiou]$/.test(string)) {
			string = keys[string];
		}
		messageOutput += string;
	}
	afterClick();
};

decrypt.onclick = () => {
	messageOutput = messageInput.value.trim();
	let string;

	if (!messageOutput) return popup("popup-decrypt");

	if (messageOutput.match(/[^a-z\s]/g)) return popup("popup-only");

	for (let i in keys) {
		if (messageOutput.includes(keys[i])) {
			string = messageOutput.replaceAll(keys[i], i);
		}
		messageOutput = string;
	}
	afterClick();
};

function popup(id) {
	const popupEncrypt = document.getElementById(id);
	popupEncrypt.classList.remove("hidden");
	setTimeout(() => {
		popupEncrypt.classList.add("hidden");
	}, 1000);
}

copy.onclick = () => {
	let copyText = document.getElementById("output-text");

	navigator.clipboard.writeText(copyText.value);
	popup("popup-copy")
	document.getElementById("popup-copy").style.left = "75px";
};

function afterClick() {
	messageInput.value = "";
	messageInput.focus();

	document.getElementById("no-message-container").setAttribute("hidden", "true");
	document.getElementById("img-output").setAttribute("hidden", "true");

	const element = document.getElementById("output-text");
	element.remove();

	const message = document.createElement("textarea");
	message.id = "output-text";
	message.setAttribute("readonly", "true");
	message.innerHTML = messageOutput;
	document.getElementById("message").appendChild(message);

	copy.removeAttribute("hidden");
}

// SCROLL REVEAL
function slide(slideTo) {
	return {
		distance: '150%',
		duration: 800,
		origin: slideTo,
	}
}

ScrollReveal().reveal('#logo', {
	distance: '150%',
	duration: 1000,
	origin: 'left',
	delay: 400,
});

ScrollReveal().reveal('#output-message', slide('right'));
ScrollReveal().reveal('#messageInput', slide('top'));
ScrollReveal().reveal('.buttons-input', slide('left'));
