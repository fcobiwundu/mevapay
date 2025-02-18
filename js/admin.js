// Fetch User Data for Admin Panel
document.addEventListener("DOMContentLoaded", () => {
    const userTableBody = document.getElementById("user-table").querySelector("tbody");

    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/admin/users");
            const users = await response.json();
            userTableBody.innerHTML = users.map(user => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>₦${user.walletBalance.toFixed(2)}</td>
                    <td>
                        <button class="btn-primary" onclick="blockUser(${user.id})">Block</button>
                    </td>
                </tr>
            `).join("");
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    fetchUsers();
});

// Block User Functionality
const blockUser = async (userId) => {
    try {
        const response = await fetch(`/api/admin/users/${userId}/block`, { method: "POST" });
        if (response.ok) {
            alert("User blocked successfully.");
            location.reload();
        } else {
            alert("Error blocking user.");
        }
    } catch (error) {
        console.error("Error blocking user:", error);
    }
};




// // public/js/admin.js
// document.addEventListener('DOMContentLoaded', async () => {
//     const userTableBody = document.getElementById('user-table').querySelector('tbody');

//     try {
//         const response = await fetch('/api/admin/users', {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         const users = await response.json();

//         // Populate table
//         users.forEach((user) => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${user.fullName}</td>
//                 <td>${user.email}</td>
//                 <td>₦${user.walletBalance.toFixed(2)}</td>
//                 <td>
//                     <button class="block-user" data-id="${user.id}">Block</button>
//                 </td>
//             `;
//             userTableBody.appendChild(row);
//         });
//     } catch (error) {
//         console.error('Error loading admin dashboard:', error.message);
//     }
// });
