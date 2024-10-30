function setThreatType() {
    const assetName = document.getElementById('assetName').value;
    const threatField = document.getElementById('threat');

    switch (assetName) {
        case "Server Aplikasi Web":
            threatField.value = "Tampering, DoS";
            break;
        case "Database Utama":
            threatField.value = "Information Disclosure, Elevation of Privilege";
            break;
        case "Server API Eksternal":
            threatField.value = "Spoofing, Tampering, Information Disclosure";
            break;
        case "Data Pengguna":
            threatField.value = "Information Disclosure, Repudiation";
            break;
        case "Jaringan Internal":
            threatField.value = "Denial of Service, Spoofing";
            break;
        case "Aplikasi Mobile":
            threatField.value = "Tampering, Repudiation";
            break;
        case "Sistem Monitoring":
            threatField.value = "Tampering, DoS";
            break;
        case "Backup dan Recovery System":
            threatField.value = "Information Disclosure, Tampering";
            break;
        default:
            threatField.value = "";
            break;
    }
}

function calculateTotalScore() {
    const damage = parseInt(document.getElementById('damage').value) || 0;
    const reproducibility = parseInt(document.getElementById('reproducibility').value) || 0;
    const exploitability = parseInt(document.getElementById('exploitability').value) || 0;
    const affectedUsers = parseInt(document.getElementById('affectedUsers').value) || 0;
    const discoverability = parseInt(document.getElementById('discoverability').value) || 0;

    const totalScore = damage + reproducibility + exploitability + affectedUsers + discoverability;
    return totalScore;
}
function goBack() {
    window.location.href = "../index.html"; 
}

function addAsset() {
    const assetName = document.getElementById('assetName').value;
    const threat = document.getElementById('threat').value;
    const damage = document.getElementById('damage').value;
    const reproducibility = document.getElementById('reproducibility').value;
    const exploitability = document.getElementById('exploitability').value;
    const affectedUsers = document.getElementById('affectedUsers').value;
    const discoverability = document.getElementById('discoverability').value;

    const totalScore = calculateTotalScore();

    let priority;
    let explanation = "";

    if (totalScore >= 35) {
        priority = 'Tinggi';
        explanation = "Aset ini memiliki total skor tinggi, yang menunjukkan bahwa ancaman dapat menyebabkan kerugian signifikan dan memiliki kemungkinan besar untuk dieksploitasi.";
    } else if (totalScore >= 20) {
        priority = 'Sedang';
        explanation = "Aset ini memiliki total skor sedang, yang berarti ada risiko moderat terkait dengan ancaman yang mungkin dihadapi.";
    } else {
        priority = 'Rendah';
        explanation = "Aset ini memiliki total skor rendah, menunjukkan bahwa risiko terkait ancaman adalah minimal dan kemungkinan dampaknya tidak signifikan.";
    }

    let mitigation = "";
    const threats = threat.split(", ").map(t => t.trim());

    threats.forEach(threatType => {
        if (threatType === "Tampering") {
            if (priority === 'Tinggi') {
                mitigation += "Terapkan kontrol akses yang ketat dan monitoring sistem secara aktif. ";
            } else if (priority === 'Sedang') {
                mitigation += "Lakukan patching rutin dan audit sistem. ";
            } else {
                mitigation += "Lakukan pelatihan keamanan untuk pengguna. ";
            }
        } else if (threatType === "DoS") {
            if (priority === 'Tinggi') {
                mitigation += "Terapkan sistem deteksi dan pencegahan DoS. ";
            } else if (priority === 'Sedang') {
                mitigation += "Pastikan redundansi server. ";
            } else {
                mitigation += "Lakukan monitoring lalu lintas. ";
            }
        } else if (threatType === "Information Disclosure") {
            if (priority === 'Tinggi') {
                mitigation += "Enkripsi data sensitif dan lakukan audit keamanan. ";
            } else if (priority === 'Sedang') {
                mitigation += "Terapkan kebijakan pengendalian akses. ";
            } else {
                mitigation += "Terapkan kebijakan kata sandi yang kuat. ";
            }
        } else if (threatType === "Repudiation") {
            if (priority === 'Tinggi') {
                mitigation += "Implementasikan logging yang baik untuk audit trail. ";
            } else if (priority === 'Sedang') {
                mitigation += "Lakukan verifikasi transaksi untuk tindakan penting. ";
            } else {
                mitigation += "Berikan pelatihan tentang tanggung jawab pengguna. ";
            }
        }
    });

    const assetData = {
        assetName,
        threat,
        damage,
        reproducibility,
        exploitability,
        affectedUsers,
        discoverability,
        totalScore,
        priority,
        mitigation,
        explanation
    };

    const existingAssets = JSON.parse(localStorage.getItem('assets')) || [];
    existingAssets.push(assetData);
    localStorage.setItem('assets', JSON.stringify(existingAssets));

    displayAsset(assetData);
    clearForm();
}

function displayAsset(assetData) {
    const tableBody = document.getElementById('assetTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();

    newRow.insertCell(0).innerText = assetData.assetName;
    newRow.insertCell(1).innerText = assetData.threat;
    newRow.insertCell(2).innerText = assetData.damage;
    newRow.insertCell(3).innerText = assetData.reproducibility;
    newRow.insertCell(4).innerText = assetData.exploitability;
    newRow.insertCell(5).innerText = assetData.affectedUsers;
    newRow.insertCell(6).innerText = assetData.discoverability;
    newRow.insertCell(7).innerText = assetData.totalScore;
    newRow.insertCell(8).innerText = assetData.priority;
    newRow.insertCell(9).innerText = assetData.mitigation;
    newRow.insertCell(10).innerText = assetData.explanation;

    const deleteCell = newRow.insertCell(11);
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Hapus';
    deleteButton.onclick = () => deleteAsset(assetData);
    deleteCell.appendChild(deleteButton);

    if (assetData.priority === 'Tinggi') {
        newRow.cells[8].classList.add('high-risk');
    } else if (assetData.priority === 'Sedang') {
        newRow.cells[8].classList.add('medium-risk');
    } else {
        newRow.cells[8].classList.add('low-risk');
    }
}

function loadData() {
    const existingAssets = JSON.parse(localStorage.getItem('assets')) || [];
    const tableBody = document.getElementById('assetTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    existingAssets.forEach(displayAsset);
}

function deleteAsset(assetData) {
    const existingAssets = JSON.parse(localStorage.getItem('assets')) || [];

    const updatedAssets = existingAssets.filter(asset => asset.assetName !== assetData.assetName || 
                                                         asset.threat !== assetData.threat || 
                                                         asset.damage !== assetData.damage ||
                                                         asset.reproducibility !== assetData.reproducibility ||
                                                         asset.exploitability !== assetData.exploitability ||
                                                         asset.affectedUsers !== assetData.affectedUsers ||
                                                         asset.discoverability !== assetData.discoverability ||
                                                         asset.totalScore !== assetData.totalScore ||
                                                         asset.priority !== assetData.priority ||
                                                         asset.mitigation !== assetData.mitigation);

    localStorage.setItem('assets', JSON.stringify(updatedAssets));
    
    loadData();
}

function clearForm() {
    document.getElementById('assetName').value = '';
    document.getElementById('threat').value = '';
    document.getElementById('damage').value = '';
    document.getElementById('reproducibility').value = '';
    document.getElementById('exploitability').value = '';
    document.getElementById('affectedUsers').value = '';
    document.getElementById('discoverability').value = '';
}

window.onload = function() {
    loadData();
};
