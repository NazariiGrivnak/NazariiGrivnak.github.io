document.getElementById('add-item').addEventListener('click', function() {
    let inputField = document.getElementById('new-item');
    let newItemText = inputField.value.trim();

    if (newItemText === "") {
        alert("Please enter an item.");
        return;
    }

    let shoppingList = document.getElementById('shopping-list');
    let newListItem = document.createElement('li');
    let itemText = document.createElement('span');
    itemText.textContent = newItemText;

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    
    // Функція для редагування
    editButton.addEventListener('click', function() {
        let newText = prompt("Edit the item:", itemText.textContent);
        if (newText !== null && newText.trim() !== "") {
            itemText.textContent = newText;
        }
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    // Функція для видалення
    deleteButton.addEventListener('click', function() {
        shoppingList.removeChild(newListItem);
        
    });

    newListItem.appendChild(itemText);
    newListItem.appendChild(editButton);
    newListItem.appendChild(deleteButton);
    shoppingList.appendChild(newListItem);

    inputField.value = '';
    inputField.focus();
});
