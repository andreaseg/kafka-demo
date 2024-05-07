let showNoMessage = false;
let children = new Set();

async function refresh() {
    const elem = document.getElementById("messages");
    let response
    try {
        response = await fetch("http://localhost:8080/messages");
    } catch (error) {
        console.error(error);
        return;
    }
    console.log("refresh");
    const messages = await response.json();

    // Show message if no rows received
    if (messages.length === 0 && !showNoMessage) {
        const noMessages = document.createElement("div");
        noMessages.className = "noMessages";
        noMessages.innerText = "Ingen meldinger mottatt";
        elem.appendChild(noMessages);
        showNoMessage = true;
    }

    // Remove message if number of rows are no longer zero
    if (messages.length > 0 && showNoMessage) {
        elem.innerHtml = '';
        showNoMessage = false;
    }

    // Add message rows
    messages.forEach((message) => {
        if (!children.has(message.hash)) {
            const li = document.createElement("li");
            const idToAdd = `message_${message.hash}`;
            console.log(`Adding row with id ${idToAdd}`);
            li.id = idToAdd;

            const messageElem = document.createElement("div");
            messageElem.innerText = message.message;
            li.appendChild(messageElem);

            const dateElem = document.createElement("div");
            dateElem.innerText = message.timestamp;
            li.appendChild(dateElem);

            children.add(message.hash);
            elem.appendChild(li);
        }
    });

    // Remove outdated message rows
    const messageHashes = new Set(messages.map((message) => { return message.hash; }));
    children.forEach((hash) => {
        if (!messageHashes.has(hash)) {
            const idToRemove = `message_${hash}`;
            console.log(`Removing row with id ${idToRemove}`);
            const nodeToBeRemoved = document.getElementById(idToRemove);
            elem.removeChild(nodeToBeRemoved);
        }
    });

}

window.addEventListener('load', () => {
    refresh();
    setInterval(() => { refresh(); }, 5000)
});