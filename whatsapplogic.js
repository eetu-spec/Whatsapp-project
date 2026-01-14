document.addEventListener("DOMContentLoaded", () => {    
    const input = document.getElementById("Message");
    const list = document.getElementById("mylist")
    const addRight = document.getElementById("addRight");
    const addLeft = document.getElementById("addLeft");

    const chatField = document.querySelector(".chat-field");

    const responses = [
        "oh?",
        "do you want to meet me?",
        "going to eat soon",
        "my friend is leaving too",
        "are you near kamppi",
        "soundd goood",
        "you can show me around",
        "my private helsinki guide",
        "lol"
      ];

    let responseIndex = 0;

    function getCurrentTime() {
        const now = new Date();
        let h = now.getHours();
        let m = now.getMinutes();

        if (m < 10) m = "0" + m;

        return `${h}:${m}`;

    }

    function upgradeExistingMessages () {
        const allMessages = document.querySelectorAll("#mylist li");

        allMessages.forEach(li => {

            if (li.querySelector(".timestamp") || li.querySelector("ticks")) return;
            if (li.querySelector("img")) return;

            const time = getCurrentTime();
            const text = li.textContent.trim();

            if (li.classList.contains("green-chat")) {
                li.innerHTML = `
                <span class="msg-text">${text}</span>
                <span class="msg-meta">
                <span class="timestamp">${time}</span>
                <span class="ticks">✓✓</span
                </span>
                `;
            } else if (li.classList.contains("white-chat")) {
                li.innerHTML = `
                <span class="msg-text">${text}</span>
                <span class="msg-meta">
                <span class="timestamp">${time}</span>
                </span>
                `;
            }
        });
    }

    upgradeExistingMessages();



    addRight.addEventListener("click", (event) => {
        if(input.value.trim() !== "") {
            console.log(input.value);

            const li = document.createElement("li");
            li.classList.add("green-chat");

            const time = getCurrentTime();

            li.innerHTML = `

            <span class="msg-text">${input.value}</span>
            <span class="msg-meta">
            <span class="timestamp">${time}</span>
            <span class="ticks">✓✓</span>
            </span>
            `;

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

                const time = getCurrentTime();
                li.innerHTML = `
                <span class="msg-text">${responses[responseIndex]}</span>
                <span class="msg-meta">
                <span class="timestamp">${time}</span>
                </span>

                `;
                
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