import { login } from '../js/auth.js';

export function renderLogin() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <div class="auth-container">
            <form id="login-form" class="auth-form">
                <h2>Welcome Back</h2>
                
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter your email"
                        required
                    >
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password"
                        required
                    >
                </div>

                <button type="submit" class="btn">Sign In</button>

                <div class="form-divider">
                    <span>or</span>
                </div>

                <div class="auth-links">
                    <p>Don't have an account? <a href="#register">Create Account</a></p>
                </div>
            </form>
        </div>
    `;

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            await login(email, password);
            window.location.hash = 'dashboard';
        } catch (error) {
            alert(error.message);
        }
    });
}