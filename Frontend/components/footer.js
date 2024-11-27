// frontend/components/footer.js
export function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <div class="container">
            <p>&copy; 2024 TeleMed. All rights reserved.</p>
        </div>
    `;
}