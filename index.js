var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Tax calculation function
function calculateTax(overallIncome, ageGroup) {
    var tax = 0;

    if (overallIncome > 800000) {
        if (ageGroup === '<40') {
            tax = 0.3 * (overallIncome - 800000);
        } else if (ageGroup === '≥ 40 & < 60') {
            tax = 0.4 * (overallIncome - 800000);
        } else if (ageGroup === '≥ 60') {
            tax = 0.1 * (overallIncome - 800000);
        }
    }

    return tax;
}

// Input validation function
function validateInput() {
    var grossIncomeInput = document.getElementById('gross');
    var extraIncomeInput = document.getElementById('extra');
    var deductionsInput = document.getElementById('total');
    var ageGroupInput = document.getElementById('age');
    var submitButton = document.querySelector('input[type="submit"]');

    // Hide all error spans
    var errorSpans = document.querySelectorAll('.material-symbols-outlined.error');
    errorSpans.forEach(function(span) {
        span.style.display = 'none';
    });

    // Enable the submit button by default
    submitButton.disabled = false;

    // Show error span if input is invalid and disable the submit button
    if (!grossIncomeInput.value || isNaN(grossIncomeInput.value)) {
        grossIncomeInput.nextElementSibling.style.display = 'inline';
        submitButton.disabled = true;
    }

    // Treat empty extra income as valid, but disable the submit button if it's not a number
    if (extraIncomeInput.value && isNaN(extraIncomeInput.value)) {
        extraIncomeInput.nextElementSibling.style.display = 'inline';
        submitButton.disabled = true;
    }

    // Treat empty deductions as valid, but disable the submit button if it's not a number
    if (deductionsInput.value && isNaN(deductionsInput.value)) {
        deductionsInput.nextElementSibling.style.display = 'inline';
        submitButton.disabled = true;
    }

    if (!ageGroupInput.value) {
        // Show error icon for age group
    }
}

// Add event listeners to input fields
document.getElementById('gross').addEventListener('input', validateInput);
document.getElementById('extra').addEventListener('input', validateInput);
document.getElementById('total').addEventListener('input', validateInput);
// Populate age dropdown
var ageDropdown = document.getElementById('age');
ageDropdown.innerHTML = '<option value="<40">Under 40 years </option><option value="≥ 40 & < 60">40 and above and less than 60</option><option value="≥ 60"> 60 years and above</option>';

// Add event listener to submit button
document.querySelector('input[type="submit"]').addEventListener('click', function(e) {
    e.preventDefault();

    validateInput();

    var grossIncome = parseFloat(document.getElementById('gross').value);
    var extraIncome = parseFloat(document.getElementById('extra').value) || 0;
    var deductions = parseFloat(document.getElementById('total').value) || 0;
    var ageGroup = document.getElementById('age').value;

    var overallIncome = grossIncome + extraIncome - deductions;
    var tax = calculateTax(overallIncome, ageGroup);
    var incomeAfterTax = overallIncome - tax;

    // Show the result in the modal
    document.getElementById('resultText').textContent = incomeAfterTax;

    // Show the modal
    var resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
    resultModal.show();
});