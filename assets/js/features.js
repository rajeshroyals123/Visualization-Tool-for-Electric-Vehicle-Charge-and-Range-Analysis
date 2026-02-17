
document.addEventListener('DOMContentLoaded', function() {
    // Charging Time Calculator
    const calcBtn = document.getElementById('calculate-charging');
    if (calcBtn) {
        calcBtn.addEventListener('click', function() {
            const capacity = parseFloat(document.getElementById('battery-capacity').value);
            const currentCharge = parseFloat(document.getElementById('current-charge').value);
            const desiredCharge = parseFloat(document.getElementById('desired-charge').value);
            const power = parseFloat(document.getElementById('charging-power').value);

            if (isNaN(capacity) || isNaN(currentCharge) || isNaN(desiredCharge) || isNaN(power) || power <= 0) {
                alert('Please enter valid numbers');
                return;
            }

            if (desiredCharge <= currentCharge) {
                alert('Desired charge must be greater than current charge');
                return;
            }

            const energyNeeded = capacity * (desiredCharge - currentCharge) / 100;
            const timeHours = energyNeeded / power;
            
            const hours = Math.floor(timeHours);
            const minutes = Math.round((timeHours - hours) * 60);

            document.getElementById('charging-result').innerHTML = `Estimated Charging Time: <strong>${hours}h ${minutes}m</strong>`;
        });
    }

    // Range Chart with Real Data from ElectricCarData_Clean.csv
    const ctx = document.getElementById('rangeChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Tesla Model 3 LR', 'VW ID.3 Pure', 'Polestar 2', 'BMW iX3', 'Honda e', 
                    'Lucid Air', 'VW e-Golf', 'Peugeot e-208', 'Audi Q4 e-tron', 'Mercedes EQC',
                    'Nissan Leaf', 'Hyundai Kona 64', 'BMW i4', 'Porsche Taycan', 'MG ZS EV'
                ],
                datasets: [{
                    label: 'Range (km)',
                    data: [450, 270, 400, 360, 170, 610, 190, 275, 400, 370, 220, 400, 450, 375, 220],
                    backgroundColor: 'rgba(65, 84, 241, 0.5)',
                    borderColor: 'rgba(65, 84, 241, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Top Speed (km/h)',
                    data: [233, 160, 210, 180, 145, 250, 150, 150, 180, 180, 144, 167, 200, 260, 140],
                    backgroundColor: 'rgba(255, 153, 102, 0.5)',
                    borderColor: 'rgba(255, 153, 102, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Charging Station Search
    const searchInput = document.getElementById('station-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const filter = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('#station-table tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(filter) ? '' : 'none';
            });
        });
    }
});
