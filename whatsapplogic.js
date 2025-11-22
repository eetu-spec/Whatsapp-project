document.addEventListener("DOMContentLoaded", () => {    
    const input = document.getElementById("Message");
    const list = document.getElementById("mylist")
    const addRight = document.getElementById("addRight");
    const addLeft = document.getElementById("addLeft");

    const responses = [
        "moi",
        "ootko mua kaipaillu",
        "en ole slut",
        "mut vois tehdä joitai kivaa ;)",
        "joo, todellakin",
        "ootko mis",
        "hei tuu tänne",
        "vois mennä mäkkärii"
      ];

    let responseIndex = 0;



    addRight.addEventListener("click", (event) => {
        if(input.value.trim() !== "") {
            console.log(input.value);
            const li = document.createElement("li");
            li.classList.add("green-chat");
            li.textContent = input.value;
            list.appendChild(li);
            list.scrollTop = list.scrollHeight;
            input.value = "";
        }
      });

    addLeft.addEventListener("click", (event) => {
        if (responseIndex < responses.length) {

            setTimeout(() => {

            const typing = document.createElement("li");
            typing.classList.add("white-chat");
            typing.textContent = "Typing...";
            list.appendChild(typing);
            list.scrollTop = list.scrollHeight;

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
                list.scrollTop = list.scrollHeight;
                responseIndex++;
            }, 4000);

        }, 1000);
    }
    } );


    const incomingCall = document.getElementById("incomingCall");
    const fakeCallbutton = document.getElementById("fakeCallbutton");

    fakeCallbutton.addEventListener("click", () => {
        incomingCall.style.display = "block";

    });

    const declineButton = document.getElementById("declinecall");
    const acceptButton = document.getElementById("acceptcall");

    const ongoingCall = document.getElementById("ongoingCall");
    const endcallbutton = document.getElementById("endcall");

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
        li.textContent = "Call with Antti ended";
        list.appendChild(li);
        list.scrollTop = list.scrollHeight;
        
    });
});