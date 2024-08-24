document.addEventListener('DOMContentLoaded', () => {
    const categoryForm = document.getElementById('categoryForm');
    const categoryTable = document.getElementById('categoryTable').getElementsByTagName('tbody')[0];
    const createCategoryBtn = document.getElementById('createCategoryBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const messageDiv = document.getElementById('message');

    let editingCategoryId = null;

    function fetchCategories() {
        fetch('/api/categories/v1/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar categorias');
                }
                return response.text(); // Obtém a resposta como texto
            })
            .then(text => {
                // Verifica se a resposta não está vazia antes de tentar parsear
                const data = text ? JSON.parse(text) : [];
                categoryTable.innerHTML = '';
                data.forEach(category => {
                    const row = categoryTable.insertRow();
                    row.insertCell().textContent = category.id;
                    row.insertCell().textContent = category.name;
                    row.insertCell().textContent = category.slug;
                    row.insertCell().textContent = category.use_in_menu ? 'Sim' : 'Não';
                    const actionsCell = row.insertCell();
                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Editar';
                    editBtn.classList.add('editBtn');
                    editBtn.onclick = () => editCategory(category);
                    actionsCell.appendChild(editBtn);
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Excluir';
                    deleteBtn.classList.add('deleteBtn');
                    deleteBtn.onclick = () => deleteCategory(category.id);
                    actionsCell.appendChild(deleteBtn);
                });
            })
            .catch(error => {
                showMessage('Erro ao buscar categorias: ' + error.message);
            });
    }

    function showMessage(message) {
        messageDiv.textContent = message;
        messageDiv.classList.add('show');
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 500);
        }, 3000);
    }

    function editCategory(category) {
        document.getElementById('categoryId').value = category.id;
        document.getElementById('name').value = category.name;
        document.getElementById('slug').value = category.slug;
        document.getElementById('use_in_menu').checked = category.use_in_menu;
        document.getElementById('categoryFormSection').style.display = 'block';
        createCategoryBtn.style.display = 'none';
        categoryForm.querySelector('#submitBtn').textContent = 'Atualizar';
    }

    function deleteCategory(id) {
        fetch(`/api/categories/v1/categories/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir categoria');
                }
                return response.text(); // Obtém a resposta como texto
            })
            .then(text => {
                // Verifica se a resposta não está vazia antes de tentar parsear
                if (text) {
                    JSON.parse(text);
                }
                showMessage('Categoria excluída com sucesso!');
                fetchCategories();
            })
            .catch(error => {
                showMessage('Erro ao excluir categoria: ' + error.message);
            });
    }

    categoryForm.onsubmit = (e) => {
        e.preventDefault();

        const id = document.getElementById('categoryId').value;
        const name = document.getElementById('name').value;
        const slug = document.getElementById('slug').value;
        const useInMenu = document.getElementById('use_in_menu').checked;

        const url = id ? `/api/categories/v1/categories/${id}` : '/api/categories/v1/categories';
        const method = id ? 'PUT' : 'POST';
        const data = { name, slug, use_in_menu: useInMenu };

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar dados para a API');
                }
                return response.text(); // Obtém a resposta como texto
            })
            .then(text => {
                // Verifica se a resposta não está vazia antes de tentar parsear
                if (text) {
                    JSON.parse(text);
                }
                showMessage(id ? 'Categoria atualizada com sucesso!' : 'Categoria criada com sucesso!');
                categoryForm.reset();
                document.getElementById('categoryFormSection').style.display = 'none';
                createCategoryBtn.style.display = 'block';
                fetchCategories();
            })
            .catch(error => {
                showMessage('Erro ao processar a solicitação: ' + error.message);
            });
    };

    cancelBtn.onclick = () => {
        categoryForm.reset();
        document.getElementById('categoryFormSection').style.display = 'none';
        createCategoryBtn.style.display = 'block';
    };

    createCategoryBtn.onclick = () => {
        document.getElementById('categoryFormSection').style.display = 'block';
        createCategoryBtn.style.display = 'none';
        categoryForm.querySelector('#submitBtn').textContent = 'Criar';
        editingCategoryId = null;
    };

    fetchCategories();
});
