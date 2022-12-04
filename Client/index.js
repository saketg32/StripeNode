const button = document.getElementById("button");
button.addEventListener("click", async () => {
    try {
        const response = await fetch("http://localhost:8000/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                items: [
                    { id: 1, quantity: 2 },
                    { id: 2, quantity: 1 }
                ]
            })
        })
        if(response.ok){
            const res = await response.json();
            window.location = res.url;
        }
        else{
            console.log("failed")
        }
    } catch (error) {
        console.log(`error : ${error}`)
    }
});