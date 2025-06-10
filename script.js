
document.getElementById('recordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('locationName').value;
    const coords = document.getElementById('coordinates').value;
    const note = document.getElementById('note').value;
    const photoInput = document.getElementById('photo');
    const reader = new FileReader();

    reader.onload = function() {
        const img = reader.result;
        const entry = { name, coords, note, img };
        const entries = JSON.parse(localStorage.getItem('ctvs_entries') || "[]");
        entries.push(entry);
        localStorage.setItem('ctvs_entries', JSON.stringify(entries));
        displayEntries();
        document.getElementById('recordForm').reset();
    };

    if (photoInput.files.length > 0) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        reader.onload();
    }
});

function displayEntries() {
    const container = document.getElementById('entries');
    const entries = JSON.parse(localStorage.getItem('ctvs_entries') || "[]");
    container.innerHTML = '';
    entries.forEach((entry, i) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${entry.name}</strong><br>
            <em>${entry.coords}</em><br>
            <p>${entry.note}</p>` +
            (entry.img ? `<img src="${entry.img}" style="max-width: 100%; border-radius: 5px;" />` : '');
        div.style.borderBottom = "1px solid #333";
        div.style.marginBottom = "1rem";
        container.appendChild(div);
    });
}

displayEntries();
