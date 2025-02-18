document.addEventListener("DOMContentLoaded", async function () {
    try {
        const transactionList = document.querySelector(".transaction-list");
        const filterForm = document.querySelector("#filter-form");
        const paginationContainer = document.querySelector(".pagination");
        let currentPage = 1;
        const transactionsPerPage = 10;

        // Function to fetch transactions with pagination and filters
        async function fetchTransactions(page = 1, filters = {}) {
            transactionList.innerHTML = "<p>Loading transactions...</p>";
            
            let query = `page=${page}&limit=${transactionsPerPage}`;
            if (filters.dateFrom) query += `&dateFrom=${filters.dateFrom}`;
            if (filters.dateTo) query += `&dateTo=${filters.dateTo}`;
            if (filters.status) query += `&status=${filters.status}`;
            if (filters.type) query += `&type=${filters.type}`;
            
            const response = await fetch(`/api/transactions?${query}`);
            const { transactions, totalPages } = await response.json();
            
            renderTransactions(transactions);
            renderPagination(totalPages);
        }

        // Function to render transactions grouped by date
        function renderTransactions(transactions) {
            transactionList.innerHTML = "";
            if (transactions.length === 0) {
                transactionList.innerHTML = "<p>No transactions found.</p>";
                return;
            }
            
            let groupedTransactions = {};
            transactions.forEach(transaction => {
                const dateKey = new Date(transaction.createdAt).toLocaleDateString();
                if (!groupedTransactions[dateKey]) {
                    groupedTransactions[dateKey] = [];
                }
                groupedTransactions[dateKey].push(transaction);
            });
            
            for (const [date, transactions] of Object.entries(groupedTransactions)) {
                const dateHeader = document.createElement("h4");
                dateHeader.textContent = date;
                transactionList.appendChild(dateHeader);
                
                transactions.forEach(transaction => {
                    const transactionItem = document.createElement("div");
                    transactionItem.classList.add("transaction-item");

                    const transactionType = transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);
                    const transactionAmount = transaction.type === "credit" ? `+₦${transaction.amount}` : `-₦${transaction.amount}`;
                    const amountClass = transaction.type === "credit" ? "positive" : "negative";
                    
                    transactionItem.innerHTML = `
                        <div class="transaction-left">
                            <div class="transaction-icon">
                                <img src="assets/images/icons/${transaction.type}.svg" alt="${transaction.type}">
                            </div>
                            <div class="transaction-details">
                                <div class="transaction-title-amount">
                                    <p>${transactionType}</p>
                                    <span class="amount ${amountClass}">${transactionAmount}</span>
                                </div>
                                <div class="transaction-date-status">
                                    <span class="date">${new Date(transaction.createdAt).toLocaleString()}</span>
                                    <span class="status ${transaction.status === 'completed' ? 'success' : transaction.status}">${transaction.status}</span>
                                </div>
                            </div>
                        </div>
                    `;
                    transactionList.appendChild(transactionItem);
                });
            }
        }

        // Function to render pagination
        function renderPagination(totalPages) {
            paginationContainer.innerHTML = "";
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement("button");
                pageButton.textContent = i;
                pageButton.classList.add("pagination-button");
                if (i === currentPage) pageButton.classList.add("active");
                pageButton.addEventListener("click", () => {
                    currentPage = i;
                    fetchTransactions(currentPage);
                });
                paginationContainer.appendChild(pageButton);
            }
        }

        // Event listener for filtering
        filterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const filters = {
                dateFrom: document.querySelector("#dateFrom").value,
                dateTo: document.querySelector("#dateTo").value,
                status: document.querySelector("#status").value,
                type: document.querySelector("#type").value,
            };
            fetchTransactions(1, filters);
        });

        // Fetch initial transactions
        fetchTransactions();
    } catch (error) {
        console.error("Error fetching transaction history:", error);
    }
});
