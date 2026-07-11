const form = document.getElementById("loginForm");
const result = document.getElementById("result");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const insecureToggle = document.getElementById("useInsecure");

function validateClientSide(email, password) {
  if (!email || !password) {
    return "Email and password cannot be empty.";
  }
  if (!email.includes("@")) {
    return 'Email must contain "@".';
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null;
}

function showResult(message, ok) {
  result.textContent = message;
  result.className = ok ? "ok" : "error";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  const clientError = validateClientSide(email, password);
  if (clientError) {
    showResult(clientError, false);
    return;
  }

  const endpoint = insecureToggle.checked
    ? "/api/login-insecure"
    : "/api/login-secure";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    showResult(data.message, data.ok);

    if (data.debugQuery) {
      const info = document.createElement("pre");
      info.textContent = `Debug query: ${data.debugQuery}`;
      result.appendChild(document.createElement("br"));
      result.appendChild(info);
    }
  } catch (err) {
    showResult("Request failed. Is the server running?", false);
  }
});
