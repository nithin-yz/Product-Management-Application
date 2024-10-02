

document.addEventListener("DOMContentLoaded", function () {
   const formwanted = document.getElementById("AddCategoryForm")
   console.log(formwanted)
   formwanted.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const categoryName = document.getElementById("category-name").value;

        try {
            const response = await fetch('auth/addcategory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryName }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Category added successfully!");
                document.getElementById("addCategoryModal").style.display = "none"; // Close the modal
            } else if (data.error) {
                alert(data.error); // Show the error if the category exists
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error adding the category. Please try again.");
        }
    });

    // Close modal and clear input when discarded
    document.getElementById("discardAddCategoryBtn").onclick = function () {
        document.getElementById("addCategoryModal").style.display = "none"; // Close the modal
        document.getElementById("category-name").value = ''; // Clear the input
    }
});
