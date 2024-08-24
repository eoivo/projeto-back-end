document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const createUserBtn = document.getElementById('createUserBtn');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const messageDiv = document.getElementById('message');

    let editingUserId = null;

    function fetchUsers() {
        fetch('/api/users/v1/users')
            .then(response => response.json())
            .then(data => {
                userTable.innerHTML = '';
                data.forEach(user => {
                    const row = userTable.insertRow();
                    row.insertCell().textContent = user.id;
                    row.insertCell().textContent = user.firstname;
                    row.insertCell().textContent = user.surname;
                    row.insertCell().textContent = user.email;

                    const actionsCell = row.insertCell();
                    actionsCell.innerHTML = `
                        <button class="editBtn" onclick="editUser(${user.id})">Editar</button>
                        <button class="deleteBtn" onclick="deleteUser(${user.id})">Excluir</button>
                    `;
                });
            })
            .catch(error => console.error('Erro ao buscar usuários:', error));
    }

    function showForm(user = {}) {
        document.getElementById('firstname').value = user.firstname || '';
        document.getElementById('surname').value = user.surname || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('password').value = '';
        document.getElementById('userId').value = user.id || '';
        userForm.style.display = 'block';
        createUserBtn.style.display = 'none';
    }

    function hideForm() {
        userForm.style.display = 'none';
        createUserBtn.style.display = 'block';
    }

    function showMessage(message) {
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000); 
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        const userId = document.getElementById('userId').value;
        const userData = {
            firstname: document.getElementById('firstname').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        const method = userId ? 'PUT' : 'POST';
        const url = userId ? `/api/users/v1/users/${userId}` : '/api/users/v1/users';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers();
            hideForm();
            showMessage(userId ? 'Usuário editado com sucesso!' : 'Usuário criado com sucesso!');
        })
        .catch(error => console.error('Erro ao salvar usuário:', error));
    }

    function handleCancel() {
        hideForm();
    }

    window.editUser = function (id) {
        fetch(`/api/users/v1/users/${id}`)
            .then(response => response.json())
            .then(user => showForm(user))
            .catch(error => console.error('Erro ao editar usuário:', error));
    };

    window.deleteUser = function (id) {
        fetch(`/api/users/v1/users/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchUsers();
                showMessage('Usuário deletado com sucesso!');
            })
            .catch(error => console.error('Erro ao excluir usuário:', error));
    };

    createUserBtn.addEventListener('click', () => showForm());
    submitBtn.addEventListener('click', handleFormSubmit);
    cancelBtn.addEventListener('click', handleCancel);

    fetchUsers();
});
