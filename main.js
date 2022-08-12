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

let messageOutput = "";

encrypt.onclick = () => {
	let messageValue = messageInput.value;
	if (messageValue !== "") {
		for (let i = 0; i < messageValue.length; i++) {
			let string = messageValue.charAt(i);

			if (/^[aeiou]$/.test(string)) {
				string = keys[string];
			}
			messageOutput += string;
		}
		afterClick();
	} else {
		popup("popup-encrypt")
	}
};


decrypt.onclick = () => {
	messageOutput = messageInput.value;
	let string;

	if (!messageOutput.match(/[^a-z\s]/g)) {
		if (messageOutput !== "") {
			for (let i in keys) {
				if (messageOutput.includes(keys[i])) {
					string = messageOutput.replaceAll(keys[i], i);
				}
				messageOutput = string;
			}
			afterClick();
		} else {
			popup("popup-decrypt")
		}
	} else {
		popup("popup-only")
	}
};


function popup(id) {
	const popupEncrypt = document.getElementById(id);
	popupEncrypt.classList.remove("hidden");
	setTimeout(() => {
		popupEncrypt.classList.add("hidden");
	}, 1000);
}

copy.onclick = copyToClipboard;


function copyToClipboard() {
	let copyText = document.getElementById("output-text");

	navigator.clipboard.writeText(copyText.value);

	popup("popup-copy")
}

function afterClick() {
	messageInput.value = "";
	messageInput.focus();


	document.getElementById("no-message-container").setAttribute("hidden", "true");

	const element = document.getElementById("output-text");
	element.remove();

	const message = document.createElement("textarea");
	message.id = "output-text";
	message.setAttribute("readonly", "true");
	message.innerHTML = messageOutput;
	document.getElementById("message").appendChild(message);

	copy.removeAttribute("hidden");
}

const slideRigth = {
	distance: '150%',
	duration: 800,
	origin: 'rigth',
};

const slideLeft = {
	distance: '150%',
	duration: 800,
	origin: 'left',
};
const slideDown = {
	distance: '150%',
	duration: 800,
	origin: 'top',
};

ScrollReveal().reveal('#logo', {
	distance: '150%',
	duration: 1000,
	origin: 'left',
	delay: 400,
});

ScrollReveal().reveal('#output-message', slideRigth);
ScrollReveal().reveal('#messageInput', slideDown);
ScrollReveal().reveal('#messageInput', { duration: 800 });
ScrollReveal().reveal('.buttons-input', slideLeft);