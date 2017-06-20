emojis = ["😁", "❤️", "😊"];

x = document.getElementbyId("project-tagline");
x.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
