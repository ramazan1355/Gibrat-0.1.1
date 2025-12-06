// Модуль аватара — TTS, STT, управление ртом и запросы к DeepSeek

/* ------------------------------
    НАСТРОЙКА
-------------------------------- */
const API_KEY = "sk-e0cec48a37bc4588961174b33ce3d385";
const API_URL = "https://api.deepseek.com/chat/completions";

// Позиция рта – при необходимости подгоните под своё PNG
export const MOUTH = {
    left: "50%",
    top: "71%",
    width: "118px",
    height: "30px"
};


/* ------------------------------
    МАСТЕР-РОТ
-------------------------------- */
export function initMouth(mouthEl) {
    if (!mouthEl) return;
    mouthEl.style.position = 'absolute';
    mouthEl.style.left = MOUTH.left;
    mouthEl.style.top = MOUTH.top;
    mouthEl.style.width = MOUTH.width;
    mouthEl.style.height = MOUTH.height;
    mouthEl.style.transform = 'translate(-50%, -50%) scale(1,1)';
    mouthEl.style.borderRadius = '20px';
    mouthEl.style.background = '#8b0000';
}

export function mouthMove(mouthEl, level = 1) {
    if (!mouthEl) return;
    const base = parseInt(MOUTH.height, 10) || 30;
    mouthEl.style.height = (base * (1 + level)) + "px";
    mouthEl.style.transform = `translate(-50%, -50%) scale(1, ${1 + level})`;
}

export function mouthClose(mouthEl) {
    if (!mouthEl) return;
    mouthEl.style.height = MOUTH.height;
    mouthEl.style.transform = "translate(-50%, -50%) scale(1,1)";
}


/* ------------------------------
    TTS (мужской голос)
-------------------------------- */
export function speak(text, mouthEl) {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ru-RU";

    let maleVoice = speechSynthesis.getVoices().find(v =>
        v.lang === "ru-RU" && (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("alex") || v.name.toLowerCase().includes("yuri"))
    );
    if (maleVoice) u.voice = maleVoice;

    u.onstart = () => mouthMove(mouthEl, 0.6);
    u.onend = () => mouthClose(mouthEl);
    u.onboundary = () => {
        mouthMove(mouthEl, Math.random() * 0.6 + 0.3);
        setTimeout(() => mouthClose(mouthEl), 90);
    };

    speechSynthesis.speak(u);
}


/* ------------------------------
    STT – распознавание речи
-------------------------------- */
export function initSTT(callback) {
    const R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) {
        // браузер не поддерживает
        return null;
    }

    const rec = new R();
    rec.lang = "ru-RU";
    rec.interimResults = false;

    rec.onresult = e => {
        const text = e.results[0][0].transcript;
        callback(text);
    };

    return rec;
}


/* ------------------------------
    AI – логика DeepSeek
-------------------------------- */
export async function askAI(question) {
    try {
        const payload = {
            model: "deepseek-chat",
            messages: [
                {
                    role: "system",
                    content:
                        "Ты — русскоговорящий научный ассистент мирового уровня. " +
                        "Объясняй глубоко, точно, логично, как настоящий учёный. " +
                        "Избегай воды, пиши ясно и умно."
                },
                { role: "user", content: question }
            ]
        };

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        }
        return "Извините, я не могу сейчас ответить.";
    } catch (err) {
        console.error('askAI error', err);
        return "Ошибка при получении ответа от AI.";
    }
}

// Экспорт по умолчанию (необязательно)
export default {
    initMouth,
    mouthMove,
    mouthClose,
    speak,
    initSTT,
    askAI
};
