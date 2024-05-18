document.addEventListener('DOMContentLoaded', () => {
    const data = [
        { name: 'Alice', age: 25, email: 'alice@example.com' },
        { name: 'Bob', age: 30, email: 'bob@example.com' },
        // Add more data here for testing
    ];

    const rowsPerPage = 5;
    let currentPage = 1;
    let filteredData = [...data];

    const tableBody = document.querySelector('#data-table tbody');
    const filterInput = document.getElementById('filter-input');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    function renderTable(data) {
        tableBody.innerHTML = '';
        const start = (currentPage - 1) * rowsPerPage;
        const end = currentPage * rowsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach(row => {
            const tr = document.createElement('tr');
            for (const key in row) {
                const td = document.createElement('td');
                td.textContent = row[key];
                tr.appendChild(td);
            }
            tableBody.appendChild(tr);
        });

        pageInfo.textContent = Page ${currentPage} of ${Math.ceil(data.length / rowsPerPage)};
    }

    function sortTable(column, order) {
        filteredData.sort((a, b) => {
            if (a[column] < b[column]) return order === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return order === 'asc' ? 1 : -1;
            return 0;
        });
        renderTable(filteredData);
    }

    function filterTable(query) {
        filteredData = data.filter(row => Object.values(row).some(value => value.toString().toLowerCase().includes(query.toLowerCase())));
        currentPage = 1;
        renderTable(filteredData);
    }

    document.querySelectorAll('#data-table th').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-column');
            const currentOrder = th.classList.contains('sort-asc') ? 'asc' : 'desc';
            const newOrder = currentOrder === 'asc' ? 'desc' : 'asc';

            document.querySelectorAll('#data-table th').forEach(th => th.classList.remove('sort-asc', 'sort-desc'));
            th.classList.add(sort-${newOrder});

            sortTable(column, newOrder);
        });
    });

    filterInput.addEventListener('input', () => {
        filterTable(filterInput.value);
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(filteredData);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
            currentPage++;
            renderTable(filteredData);
        }
    });

    renderTable(filteredData);
});