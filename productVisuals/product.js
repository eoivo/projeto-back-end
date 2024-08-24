document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const createProductBtn = document.getElementById('createProductBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const messageDiv = document.getElementById('message');

    let editingProductId = null;

    function fetchProducts() {
        fetch('/api/products/v1/products')
            .then(response => response.json())
            .then(data => {
                productTable.innerHTML = '';
                data.forEach(product => {
                    const row = productTable.insertRow();
                    row.insertCell().textContent = product.id;
                    row.insertCell().textContent = product.name;
                    row.insertCell().textContent = product.description;
                    row.insertCell().textContent = product.price;
                    row.insertCell().textContent = product.price_with_discount || 'N/A'; 

                    const actionsCell = row.insertCell();
                    actionsCell.innerHTML = `
                    <button class="editBtn" onclick="editProduct(${product.id})">Editar</button>
                    <button class="deleteBtn" onclick="deleteProduct(${product.id})">Excluir</button>
                    `;
                });
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    function showForm(product = {}) {
        document.getElementById('name').value = product.name || '';
        document.getElementById('slug').value = product.slug || '';
        document.getElementById('stock').value = product.stock || '';
        document.getElementById('description').value = product.description || '';
        document.getElementById('price').value = product.price || '';
        document.getElementById('price_with_discount').value = product.price_with_discount || '';
        document.getElementById('enabled').checked = product.enabled || false;
        document.getElementById('productId').value = product.id || '';
        productForm.style.display = 'block';
        createProductBtn.style.display = 'none';
    }

    function hideForm() {
        productForm.reset();
        productForm.style.display = 'none';
        createProductBtn.style.display = 'block';
        editingProductId = null;
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

    function handleFormSubmit(event) {
        event.preventDefault();
        const productId = document.getElementById('productId').value;
        const productData = {
            enabled: document.getElementById('enabled').checked,
            name: document.getElementById('name').value,
            slug: document.getElementById('slug').value,
            stock: parseInt(document.getElementById('stock').value, 10),
            description: document.getElementById('description').value,
            price: parseFloat(document.getElementById('price').value),
            price_with_discount: parseFloat(document.getElementById('price_with_discount').value) || null 
        };

        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `/api/products/v1/products/${productId}` : '/api/products/v1/products';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json().catch(() => {}); 
        })
        .then(() => {
            fetchProducts();
            hideForm();
            showMessage(productId ? 'Produto editado com sucesso!' : 'Produto criado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao salvar produto:', error);
            showMessage('Erro ao salvar produto. Verifique o console para mais detalhes.');
        });
    }

    function handleCancel() {
        hideForm();
    }

    window.editProduct = function (id) {
        fetch(`/api/products/v1/products/${id}`)
            .then(response => response.json())
            .then(product => {
                editingProductId = id;
                showForm(product);
            })
            .catch(error => {
                console.error('Erro ao carregar produto para edição:', error);
                showMessage('Erro ao carregar produto para edição. Verifique o console para mais detalhes.');
            });
    };

    window.deleteProduct = function (id) {
        fetch(`/api/products/v1/products/${id}`, { method: 'DELETE' })
            .then(() => {
                fetchProducts();
                showMessage('Produto excluído com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
                showMessage('Erro ao excluir produto. Verifique o console para mais detalhes.');
            });
    };

    createProductBtn.addEventListener('click', () => showForm({}));
    productForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', handleCancel);

    fetchProducts();
});
