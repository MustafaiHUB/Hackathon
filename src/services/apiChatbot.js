export const BASE_URL = "http://localhost:8080";

export async function uploadFiles(files) {
    try {
        const formData = new FormData();

        // Handle both single file and array of files
        if (Array.isArray(files)) {
            // If an array is passed, append each file
            files.forEach(file => {
                formData.append("files[]", file);
            });
        } else {
            // If a single file is passed, append it
            formData.append("files[]", files);
        }

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log("Server response:", data);
        return data;
    } catch (err) {
        console.error("Upload error:", err);
        return null;
    }
}

export async function getAnswer(chatId, question, thread_id) {
    try {
        const response = await fetch(`${BASE_URL}/api/ask`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            credentials: "include",
            body: JSON.stringify({ conversationId: chatId, question, thread_id }),
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function getChatConversation(chatId) {
    try {
        const response = await fetch(`${BASE_URL}/history?id=${chatId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ Include JWT if required
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteConversation(id) {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ Include JWT if required
            },
            credentials: "include",
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function deleteAllConversation(userId) {
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}` // ✅ Include JWT if required
            },
            credentials: "include",
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Reset password (send email)
export async function resetPassword(email) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}

// Change password
export async function changePassword(password) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });

        if (!response.ok) {
            throw new Error("Network Response Error");
        }

        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}