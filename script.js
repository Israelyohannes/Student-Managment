document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentTable tbody');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const studentIdInput = document.getElementById('studentId');

    // Load students on page load
    loadStudents();

    //  submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateForm()) return;

    const formData = new FormData(form);
        const action = studentIdInput.value ? 'update' : 'create';
    formData.append('action', action);

        fetch('crud.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
    .then(data => {
            if (data.success) {
             loadStudents();
                resetForm();
            } else {
                alert('Operation failed!');
            }
     })
    .catch(error => console.error('Error:', error));
    });

    // Cancel update
    cancelBtn.addEventListener('click', resetForm);

    // Load students into table
    function loadStudents() {
     fetch('crud.php?action=read')
  .then(response => response.json())
        .then(students => {
            tableBody.innerHTML = '';
            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.id}</td>
              <td>${student.name}</td>
             <td>${student.email}</td>
                    <td>${student.phone || ''}</td>
                    <td>${student.course || ''}</td>
                    <td>
                        <button class="action-btn edit-btn" onclick="editStudent(${student.id})">Edit</button>
                   <button class="action-btn delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Edit student
    window.editStudent = function(id) {
        fetch(`crud.php?action=get&id=${id}`)
        .then(response => response.json())
        .then(student => {
            studentIdInput.value = student.id;
            document.getElementById('name').value = student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('phone').value = student.phone || '';
            document.getElementById('course').value = student.course || '';
            submitBtn.textContent = 'Update Student';
            cancelBtn.style.display = 'inline';
        })
        .catch(error => console.error('Error:', error));
    };

    // Delete student
    window.deleteStudent = function(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`crud.php?action=delete&id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadStudents();
                } else {
                    alert('Delete failed!');
                }
            })
            .catch(error => console.error('Error:', error));
        }
    };

    // Reset form
    function resetForm() {
        form.reset();
        studentIdInput.value = '';
        submitBtn.textContent = 'Add Student';
        cancelBtn.style.display = 'none';
    }

    // Basic validation
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        if (!name || !email) {
            alert('Name and Email are required!');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Invalid email format!');
            return false;
        }
        return true;
    }
});