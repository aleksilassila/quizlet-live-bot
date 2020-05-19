(async function () {
	// document.getElementById("viewport").style.backgroundColor = "red";
	console.log("Injected");
	let first = {};
	let second = {};

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
	}

	let quizletId;
	while (true) {
		let cookie = getCookie("live_previous_game_instance");
		if (cookie) {
			quizletId = JSON.parse(decodeURIComponent(cookie)).itemId;
			break;
		}
		await new Promise((r) => setTimeout(r, 1000));
	}

	html = await fetch(`https://quizlet.com/${quizletId}`).then((res) =>
		res.text()
	);

	let el = document.createElement("html");
	el.innerHTML = html;

	let pairs = el.getElementsByClassName("SetPageTerm-content");

	for (let pair of pairs) {
		f = pair.getElementsByTagName("span")[0].innerText;
		s = pair.getElementsByTagName("span")[1].innerText;
		first[f] = s;
		second[s] = f;
	}

	while (true) {
		let question = false;
		try {
			question = document.getElementsByClassName("StudentPrompt-inner")[0]
				.childNodes[0].innerText;

			if (question) {
				let answer =
					question in first
						? first[question]
						: question in second
						? second[question]
						: "noanswerfound";

				let options = document
					.getElementsByClassName(
						"StudentTermGroup is-loggedInPlayer"
					)[0]
					.getElementsByClassName("StudentTermGroup-termWrapper");

				for (let optionI in options) {
					if (options[optionI].innerText === answer) {
						document
							.getElementsByClassName(
								"StudentTermGroup is-loggedInPlayer"
							)[0]
							.getElementsByClassName("is-clickable")
							[optionI].click();
					}
				}
				console.log(
					`Answer: ${
						question in first
							? first[question]
							: question in second
							? second[question]
							: "Not found"
					}`
				);
			}
		} catch {}
		await new Promise((r) => setTimeout(r, 500));
	}
})();
