// frontend/components/footer.js
export function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class="container" style="background-color: #F1F8E9; padding: 20px; text-align: center;">
            <p>&copy; 2024 Mindfull. All rights reserved.</p>
            <nav>
                <ul style="list-style: none; padding: 0; margin: 10px 0; display: flex; justify-content: center; gap: 20px;">
                    <li><a href="#about" style="color: #333; text-decoration: none;">About Us</a></li>
                    <li><a href="#contact" style="color: #333; text-decoration: none;">Contact</a></li>
                    <li><a href="#terms" style="color: #333; text-decoration: none;">Terms of Service</a></li>
                    <li><a href="#privacy" style="color: #333; text-decoration: none;">Privacy Policy</a></li>
                </ul>
            </nav>
        </div>
    `;
}