// 간단한 챗봇 기능 구현

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotWindow = document.getElementById("chatbotWindow");
const chatbotClose = document.getElementById("chatbotClose");
const chatbotMessages = document.getElementById("chatbotMessages");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotSend = document.getElementById("chatbotSend");

// 챗봇 열고 닫기
chatbotToggle.addEventListener("click", () => {
    chatbotWindow.style.display =
        chatbotWindow.style.display === "flex" ? "none" : "flex";
    if (chatbotWindow.style.display === "flex") {
        chatbotInput.focus();
        if (!chatbotMessages.dataset.initialized) {
            addBotMessage(
                "안녕하세요 🐶 콩이네 댕댕샵 챗봇입니다. 무엇을 도와드릴까요?"
            );
            chatbotMessages.dataset.initialized = "true";
        }
    }
});

chatbotClose.addEventListener("click", () => {
    chatbotWindow.style.display = "none";
});

// 메시지 전송
chatbotSend.addEventListener("click", sendUserMessage);
chatbotInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendUserMessage();
    }
});

function sendUserMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    chatbotInput.value = "";

    setTimeout(() => {
        const reply = getBotReply(text);
        addBotMessage(reply);
    }, 400);
}

function addUserMessage(text) {
    const msg = document.createElement("div");
    msg.className = "chatbot-message user";
    msg.innerHTML = `<div class="chatbot-bubble">${escapeHtml(text)}</div>`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(text) {
    const msg = document.createElement("div");
    msg.className = "chatbot-message bot";
    msg.innerHTML = `<div class="chatbot-bubble">${text}</div>`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// 아주 단순한 규칙기반 답변
function getBotReply(text) {
    const lower = text.toLowerCase();

    if (lower.includes("사료") || lower.includes("먹이")) {
        return "사료는 연령, 체중, 알러지 여부에 맞춰 추천해 드리고 있습니다. 매장 방문 시 상담해 드릴게요 😊";
    }

    if (lower.includes("간식")) {
        return "저지방/저알러지 간식부터 치석 제거용 간식까지 다양하게 준비되어 있어요!";
    }

    if (lower.includes("위치") || lower.includes("어디") || lower.includes("주소")) {
        return "저희 매장은 대구광역시 중구 동성로 1번지에 있습니다. 지도 섹션도 확인해 주세요 🗺️";
    }

    if (lower.includes("영업") || lower.includes("시간")) {
        return "영업시간은 매일 11:00 ~ 21:00 입니다 😊";
    }

    if (lower.includes("장난감")) {
        return "노즈워크, 공, 삑삑이 등 강아지 성향에 맞는 장난감을 추천해 드립니다!";
    }

    if (lower.includes("예약") || lower.includes("상담")) {
        return "전화(053-000-0000, 예시) 또는 이 챗봇으로 방문 예정 시간 남겨주시면 확인 후 연락드릴게요 🐾";
    }

    return "질문을 조금만 더 구체적으로 적어주시면 더 잘 도와드릴 수 있어요! 예) 사료 추천, 영업시간, 위치 등";
}

// XSS 방지용 간단 escape
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

