import { register } from "../js/auth.js";

export function renderRegister() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = `
    <div class= "auth-container">
        <form id = "register-form" class = "auth-form">
            <h2>Create Account</h2>

            <div class="form-group">
                    <label for="firstname">First Name</label>
                    <input 
                        type="text" 
                        id="firstname" 
                        placeholder="Enter your first name"
                        required
                    >
            </div>

            <div class="form-group">
                <label for="lastname">Last Name</label>
                <input 
                    type="text" 
                    id="lastname" 
                    placeholder="Enter your last name"
                    required
                >
            </div>

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
                <label for="phone">Phone Number</label>
                <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter your phone number"
                    required
                >
            </div>

            <div class="form-group">
                <label for="dob">Date of Birth</label>
                <input 
                    type="date" 
                    id="dob" 
                    required
                >
            </div>

            <div class="form-group">
                <label for="gender">Gender</label>
                <select id="gender" required>
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Create a password"
                    required
                >
            </div>

            <button type="submit" class="btn">Create Account</button>

            <div class="form-divider">
                <span>or</span>
            </div>

            <div class="auth-links">
                <p>Already have an account? <a href="#login">Sign In</a></p>
            </div>

        </form>
    </div>`;

    document.getElementById("register-form").addEventListener('submit', async(e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstname').value;
        const lastName = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value; // Capture phone
        const dateOfBirth = document.getElementById('dob').value; // Capture date of birth
        const gender = document.getElementById('gender').value; // Capture gender
        const password = document.getElementById('password').value;

        try {
            await register(firstName, lastName, email, phone, dateOfBirth, gender, password);
            alert('Registration successfull. Please login.');
            window.location.hash = 'login'
        } catch (error) {
            alert(error.message);
        }
    })
}