document.getElementById('formss').addEventListener("submit", async (e) => {
    
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    console.log(username, password);

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

});


