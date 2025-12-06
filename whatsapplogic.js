document.addEventListener("DOMContentLoaded", () => {    
    const input = document.getElementById("Message");
    const list = document.getElementById("mylist")
    const addRight = document.getElementById("addRight");
    const addLeft = document.getElementById("addLeft");

    const chatField = document.querySelector(".chat-field");

    const responses = [
        "moi",
        "lol",
        "en ole kotona",
        "vois käydä pizzal",
        "joo hei",
        "ootko mis päin",
        "hei tuu tänne",
        "moi",
        "silleen joo",
        "en ole tyhmä",
        "tai mäkkäri",
        "joo hei",
        "ootko mis",
        "hei mennäää",
        "vai ootko vihanen",
        "vois mennä tyylii mäkkärii"
      ];

    let responseIndex = 0;



    addRight.addEventListener("click", (event) => {
        if(input.value.trim() !== "") {
            console.log(input.value);

            const li = document.createElement("li");
            li.classList.add("green-chat");
            li.textContent = input.value;
            list.appendChild(li);
            setTimeout(() => {
                chatField.scrollTop = chatField.scrollHeight;
            }, 0);
            input.value = "";
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addRight.click();
        }
      });

    addLeft.addEventListener("click", (event) => {
        if (responseIndex < responses.length) {

            setTimeout(() => {

            const typing = document.createElement("li");
            typing.classList.add("white-chat");
            typing.textContent = "Typing...";
            list.appendChild(typing);

            setTimeout(() => {
                chatField.scrollTop = chatField.scrollHeight;
            }, 0);

            let dots = 0;
            const typingInterval = setInterval(() => {
                dots = (dots + 1) % 4;
                typing.textContent = "Typing" + ".".repeat(dots);
                list.scrollTop = list.scrollHeight;
            }, 500);

            setTimeout(() => {
                clearInterval(typingInterval);
                typing.remove();
                const li = document.createElement("li");
                li.classList.add("white-chat");
                li.textContent = responses[responseIndex];
                list.appendChild(li);
                setTimeout(() => {
                    chatField.scrollTop = chatField.scrollHeight;
                }, 0);
                responseIndex++;
            }, 4000);

        }, 1000);
    }
    } );


    const incomingCall = document.getElementById("incomingCall");
    const fakeCallbutton = document.getElementById("fakeCallbutton");

    const personname = document.querySelector(".personname").textContent;

    const declineButton = document.getElementById("declinecall");
    const acceptButton = document.getElementById("acceptcall");

    const ongoingCall = document.getElementById("ongoingCall");
    const endcallbutton = document.getElementById("endcall");

    fakeCallbutton.addEventListener("click", () => {
        incomingCall.style.display = "block";

    });

    declineButton.addEventListener("click", () => {
        incomingCall.style.display = "none";
        ongoingCall.style.display = "none";
    });

    acceptButton.addEventListener("click", () => {
        incomingCall.style.display = "none";
        ongoingCall.style.display = "block";
    })

    endcallbutton.addEventListener("click", () => {
        ongoingCall.style.display = "none";

        const li = document.createElement("li");
        li.classList.add("white-chat");
        li.textContent = `Call with ${personname} ended`;
        list.appendChild(li);
        setTimeout(() => {
            chatField.scrollTop = chatField.scrollHeight;
        }, 0);
        
    });
});