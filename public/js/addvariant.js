document.addEventListener('DOMContentLoaded', function () {
    const variantsContainer = document.getElementById('variants-container');
    const addVariantButton = document.querySelector('.add-variant');

    let variantCount = 1; // To keep track of variant indices

    addVariantButton.addEventListener('click', function () {
        variantCount++; // Increment variant count
        const variantDiv = document.createElement('div');
        variantDiv.classList.add('variant');
        variantDiv.innerHTML = `
            <label for="ram-${variantCount}">Ram:</label>
            <input type="text" id="ram-${variantCount}" name="ram-${variantCount}" required />
            <label for="price-${variantCount}">Price:</label>
            <input type="text" id="price-${variantCount}" name="price-${variantCount}" required />
            <label for="qty-${variantCount}">QTY:</label>
            <input type="number" id="qty-${variantCount}" name="qty-${variantCount}" value="1" min="1" required />
            <button type="button" class="remove-variant">Remove</button>
        `;
        variantsContainer.appendChild(variantDiv);

        // Add event listener to remove button
        variantDiv.querySelector('.remove-variant').addEventListener('click', function () {
            variantsContainer.removeChild(variantDiv);
        });
    });
});
