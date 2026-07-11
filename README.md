# CSCE477 HW3 - OWASP Juice Shop Security Assignment

## Project Overview

- A simple login form (HTML + JavaScript)
- Client-side validation
- Server-side validation
- One intentionally insecure endpoint (`/api/login-insecure`) to demonstrate SQL Injection-style bypass
- One secure endpoint (`/api/login-secure`) with strict validation and hashed password verification

## File Structure

- `server.js` - Node.js server and login endpoints
- `public/index.html` - Login page UI
- `public/script.js` - Client-side form validation and submit logic
- `public/style.css` - Basic styling

## Run Instructions

1. Open a terminal in this folder.
2. Run:

```bash
node server.js
```

3. Open `http://localhost:3000` in a browser.

## Test Credentials

- Secure endpoint:
  - Email: `user@example.com`
  - Password: `password123`
- Insecure endpoint:
  - Email: `admin@juice.local`
  - Password: `admin1234`

## Part 2 Validation Behavior

### Client-side checks

- Email and password cannot be empty
- Email must include `@`
- Password must be at least 8 characters

### Server-side checks (`/api/login-secure`)

- Rejects empty inputs
- Validates email format using regex
- Enforces password length >= 8
- Compares password hash using constant-time comparison

## Part 3 Demonstration (SQL Injection-style Bypass)

Use the intentionally insecure endpoint for the exploit demonstration:

1. Check the box: `Use intentionally insecure endpoint`.
2. Enter this payload in email:

```text
attacker@demo.com' OR '1'='1' --
```

3. Enter any password with length >= 8, for example:

```text
anything8
```

4. Click login.

Expected result: the app reports successful login as admin via injection bypass.
