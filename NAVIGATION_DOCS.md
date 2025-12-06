# GIBRAT Navigation System - Documentation

## Overview
A complete navigation and authentication system has been implemented for your GIBRAT application with automatic page routing, login/registration handling, and session management.

## Files Created

### 1. **navigation.js** - Core Navigation Manager
- **Purpose**: Manages page routing and session handling
- **Key Features**:
  - Automatic active tab highlighting based on current page
  - Protected page access (requires login)
  - Session management with localStorage
  - Automatic redirects for unauthorized access

**Main Methods**:
```javascript
navManager.getCurrentPage()        // Gets current page filename
navManager.checkLoginStatus()      // Checks if user is logged in
navManager.setLoginStatus(true/false) // Sets login status
navManager.navigateToPage(page)    // Navigate to page with permission check
navManager.logout()                // Logout user and redirect to login
navManager.getUserData()           // Get stored user data
navManager.setUserData(data)       // Store user data
```

### 2. **auth.js** - Authentication Manager
- **Purpose**: Handles login and registration logic
- **Features**:
  - Email validation (checks for valid email format)
  - Password validation (minimum 6 characters)
  - Password confirmation matching
  - User data storage

**Main Methods**:
```javascript
authManager.login(email, password)                    // Login user
authManager.register(fullName, email, pass, confirm)  // Register new user
authManager.logout()                                  // Logout user
```

### 3. **form-handler.js** - Form Processing
- **Purpose**: Handles form submissions for login and registration pages
- **Features**:
  - Intercepts form submissions
  - Calls appropriate auth methods
  - Displays validation errors
  - Redirects on success

## Protected vs Public Pages

### Protected Pages (Require Login)
- `home.html` - Dashboard/Home page
- `проф.html` - Profile page
- `кур.html` - Courses page
- `урок.html` - Lesson page
- `рейтинг.html` - Rating page
- `мчат.html` - Mentor chat
- `чат.html` - Chat

### Public Pages (No Login Required)
- `login.html` - Login page
- `рег.html` - Registration page
- `вход.html` - Alternative login page (if used)

## How It Works

### User Flow:

1. **First Visit**
   - User lands on any page
   - If accessing protected page → redirected to `login.html`
   - If accessing public page → stays on that page

2. **Login Process**
   - User enters email and password
   - `form-handler.js` intercepts the form
   - `authManager.login()` validates the credentials
   - If valid: Sets `userLoggedIn = true` in localStorage and redirects to `home.html`
   - If invalid: Shows error alert

3. **Registration Process**
   - User fills in registration form
   - `form-handler.js` intercepts the submission
   - `authManager.register()` validates all fields
   - If valid: Sets `userLoggedIn = true` and redirects to `home.html`
   - If invalid: Shows specific error message

4. **Navigation Between Pages**
   - All tab navigation uses the `NavigationManager`
   - Current page tab automatically highlighted with `active` class
   - Clicking tabs redirects while maintaining session
   - Protected pages check login status before allowing access

5. **Logout**
   - Call `navManager.logout()` to log out user
   - Clears all session data from localStorage
   - Redirects to `login.html`

## Data Stored in localStorage

```javascript
localStorage.userLoggedIn        // 'true' or 'false'
localStorage.loginTime           // ISO timestamp of login
localStorage.userData            // JSON: {email, fullName, theme, etc}
```

## Integration with Your HTML Files

Each HTML file now includes three scripts in this order:
```html
<script src="auth.js"></script>
<script src="form-handler.js"></script>
<script src="navigation.js"></script>
```

**Updated Files**:
- `login.html` - Login form with registration link
- `рег.html` - Registration form with login link
- `home.html` - Dashboard with navigation
- `проф.html` - Profile page with navigation
- `кур.html` - Courses page with navigation

## Adding Navigation to Other Pages

To add navigation to `урок.html`, `рейтинг.html`, or any other page:

1. Add the three script tags before `</body>`:
```html
<script src="auth.js"></script>
<script src="form-handler.js"></script>
<script src="navigation.js"></script>
```

2. Ensure your tab-bar navigation has correct hrefs:
```html
<nav class="tab-bar">
    <a href="проф.html" class="tab-item">...</a>
    <a href="кур.html" class="tab-item">...</a>
    <!-- etc -->
</nav>
```

## Testing the System

### Test Login
1. Open `login.html` in browser
2. Enter any email (e.g., `test@example.com`)
3. Enter any password (min 6 chars, e.g., `password123`)
4. Click Login
5. Should redirect to `home.html`
6. Check browser DevTools → Application → localStorage

### Test Registration
1. Open `рег.html`
2. Fill in all fields
3. Click "sing up"
4. Should redirect to `home.html`

### Test Protected Access
1. Clear localStorage
2. Try to open `home.html` directly
3. Should redirect to `login.html`

### Test Tab Navigation
1. Login successfully
2. Click different tabs in the bottom navigation
3. Active tab should highlight correctly
4. Page should change accordingly

## Security Notes

⚠️ **Current Implementation**:
- Uses localStorage for session (not secure for production)
- Password hashing is basic (Base64 encoding)
- No backend validation

⚠️ **For Production**:
- Implement proper backend authentication (JWT tokens)
- Use secure password hashing (bcrypt)
- Use HTTPS only
- Implement CSRF protection
- Add rate limiting on login attempts
- Store session tokens in httpOnly cookies

## Customization

### Change Minimum Password Length
In `auth.js`:
```javascript
this.minPasswordLength = 8; // Change from 6 to 8
```

### Add More Protected Pages
In `navigation.js`, update the array:
```javascript
const protectedPages = ['home.html', '...new.html'];
```

### Change Login Redirect
In `navigation.js`:
```javascript
window.location.href = 'index.html'; // Change from 'login.html'
```

## Troubleshooting

### "Page not found" when clicking tabs
- Ensure all HTML files are in the same directory
- Check hrefs match exact filenames (case-sensitive on Linux)

### Login doesn't work
- Check browser console for errors
- Ensure `auth.js` and `form-handler.js` are loaded
- Clear localStorage and try again

### Not redirecting to login for protected pages
- Check that `navigation.js` is loaded last
- Verify localStorage keys are correct

---

Your GIBRAT application now has a fully functional navigation system! 🎉
