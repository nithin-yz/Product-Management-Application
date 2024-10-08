document.getElementById('addSubcategoryForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const subcategoryName = document.getElementById('subcategory-name').value;
    const parentCategory = document.getElementById('parent-category').value;
console.log(subcategoryName,parentCategory)
    try {
        const response = await fetch('auth/addsubcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subcategoryName, parentCategory }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Subcategory added successfully!');
        } else {
            alert(data.error); // Show error message
        }
    } catch (error) {
        console.log('Error:', error);
        alert('An error occurred while adding the subcategory.');
    }
});
