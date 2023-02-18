const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
    const word = document.getElementById("word").value;
    const definition = document.getElementById("definition").value;
    let example = document.getElementById("example").value;
    const tokens = word.split(" ").filter(c => c != "someone" && c != "something"&& c != "SOMETHING"&& c != "SOMEONE");
    example = example.replaceAll("\r\n", "</br>");
    example = example.replaceAll("\r", "</br>");
    example = example.replaceAll("\n", "</br>");
    tokens.forEach(t => example = example.replaceAll(` ${t} `, " __ "));

    const front = `<b>${definition}</b></br></br>${example}`;

    const data = {
        action: "addNote",
        version: 6,
        params: {
            note: {
                deckName: "Customized",
                modelName: "Basic",
                fields: {
                    Front: front,
                    Back: word
                },
                options: {
                    allowDuplicate: false,
                    duplicateScope: "deck"
                }
            }
        }
    };
    return fetch('http://localhost:8765', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
});
