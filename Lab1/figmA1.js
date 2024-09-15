function changeButton() {
    const button = document.querySelector('.button');
    button.style.backgroundColor = "#ffffff";
    button.style.color = "#8B54FF";
    button.style.fontWeight = "bold";
    button.style.border = "1px solid #8B54FF";
    button.innerHTML = "Thank you for applying.";
}

window.onload = function() {
    // Показати вікно підказки після кліку на кнопку
    document.getElementById("hintButton").addEventListener("click", function(event) {
        var hintBox = document.getElementById("hintBox");
        var rect = event.target.getBoundingClientRect();
        hintBox.style.left = rect.left + 50 + "px";  // 50px праворуч
        hintBox.style.top = rect.top + 50 + "px";    // 50px вниз
        hintBox.style.display = "block"; // Показати вікно
    });

    // Закрити вікно підказки
    document.getElementById("closeHint").addEventListener("click", function() {
        document.getElementById("hintBox").style.display = "none"; // Сховати вікно
    });
};

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Отримання значень
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const jobLocation = document.getElementById("jobLocation").value.trim();

    let isValid = true;

    // Перевірка на порожність
    if (fullName === "") {
        alert("Full Name is required");
        isValid = false;
    }

    // Перевірка правильності email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        alert("Please enter a valid email address");
        isValid = false;
    }

    // Перевірка правильності телефонного номера (для прикладу: 10 цифр)
    const phonePattern = /^\d{10}$/;
    if (phone === "" || !phonePattern.test(phone)) {
        alert("Please enter a valid phone number (10 digits)");
        isValid = false;
    }

    // Перевірка на порожність поля Job Location
    if (jobLocation === "") {
        alert("Job Location is required");
        isValid = false;
    }

    // Якщо всі поля заповнені правильно
    if (isValid) {
        alert("Form submitted successfully!");
        // Тут можна виконати відправку форми або інші дії
    }
});