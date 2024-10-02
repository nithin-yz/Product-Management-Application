
    // Handle form submission
    document.getElementById('addProductForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        // Collect the variants
        const variants = [];
        document.querySelectorAll('#variants-container .variant').forEach(variant => {
            const ram = variant.querySelector(`[name^="ram"]`).value;
            const price = variant.querySelector(`[name^="price"]`).value;
            const qty = variant.querySelector(`[name^="qty"]`).value;
            variants.push({ ram, price, qty });
        });

        // Add variants to formData
        formData.append('variants', JSON.stringify(variants));

        // Send data to the server
        fetch('/add-product', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Product added successfully!');
                // Optionally, close the modal or reset the form here
            } else {
                alert('Error adding product: ' + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
