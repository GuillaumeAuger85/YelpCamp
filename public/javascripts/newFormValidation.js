const updateButton = document.body.querySelector('.btn-success');

const imageInput = document.body.querySelector('#image');
const inputContainer = document.body.querySelector('#inputContainer');
const invalideSignal = document.body.querySelector('#invalideSignal');

const validationPrice = document.body.querySelector('#validationPrice');
const invalidePrice = document.body.querySelector('#invalidePrice');
const priceInput = document.body.querySelector('#price');
const priceContainer = document.body.querySelector('#priceContainer');

const descriptionInput = document.body.querySelector('#description');
const invalideDescription = document.body.querySelector('#invalideDescription');


const titleInput = document.body.querySelector('#title');
const invalideTitle = document.body.querySelector('#invalideTitle');

const locationInput = document.body.querySelector('#location');
const invalideLocation = document.body.querySelector('#invalideLocation');



const isNotDisplayed = (el) => {
    return el.classList.contains('noDisplay')
};
const disableUpdateButton = () => {
    const invalideSigns = [invalideSignal, invalidePrice].map(isNotDisplayed);
    let count = 0;
    invalideSigns.forEach(element => {
        if (!element) {
            count += 1;
        }
    })
    if (count > 0) {
        updateButton.disabled = true;
    } else {
        updateButton.disabled = false;
    }
};


imageInput.addEventListener('input', () => {
    if (imageInput.files.length > 5 || imageInput.files.length === 0) {
        if (document.body.querySelector('.div')) {
            document.body.querySelector('.div').remove();
        }
        inputContainer.setAttribute('style', 'position:relative');
        const div = document.createElement('div');
        inputContainer.appendChild(div);
        div.setAttribute('class', 'text-danger mt-1 div');
        div.setAttribute('style', 'font-size:0.875em');
        div.textContent = 'Too much images!!'
        imageInput.style.borderColor = "#dc3545";
        imageInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalideSignal.classList.remove('noDisplay');
        updateButton.disabled = true;
    } else {
        if (document.body.querySelector('.div')) {
            document.body.querySelector('.div').remove();
        }
        imageInput.style.borderColor = "";
        imageInput.style.boxShadow = "";
        invalideSignal.classList.add('noDisplay');
        disableUpdateButton();
    }
})

priceInput.addEventListener('input', () => {
    priceContainer.setAttribute('style', 'position:relative')
    const res = Number(priceInput.value);
    if (!isFinite(res) || priceInput.value === '') {
        priceInput.style.borderColor = "#dc3545";
        priceInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalidePrice.classList.remove('noDisplay');
        validationPrice.setAttribute('class', 'form-label text-danger mt-1');
        validationPrice.textContent = "Price must be a number. It can't be empty, contain letters or space.";
        updateButton.disabled = true;
    } else {
        priceInput.style.borderColor = "";
        priceInput.style.boxShadow = "";
        invalidePrice.classList.add('noDisplay');
        validationPrice.setAttribute('class', 'form-label text-success mt-1');
        validationPrice.textContent = "looks good!";
        disableUpdateButton();
    }
});



const inputs = [titleInput, locationInput, imageInput, priceInput, descriptionInput];
const invalidsel = [invalideTitle, invalideLocation, invalideSignal, invalidePrice, invalideDescription];


for (let input of inputs) {
    let index = inputs.indexOf(input);
    input.addEventListener('focus', () => {
        inputs.splice(index, 1);
        for (let inpt of inputs) {
            inpt.style.boxShadow = "";
        }
        inputs.push(input)
    })
}

for (let ipt of inputs) {
    let index = inputs.indexOf(ipt);
    ipt.addEventListener('click', () => {
        if (invalidsel[index] && !invalidsel[index].classList.contains('noDisplay')) {
            ipt.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        }
    });
};

updateButton.addEventListener('click', (event) => {
    if (priceInput.value === "") {
        validationPrice.setAttribute('class', 'form-label text-danger mt-1');
        validationPrice.textContent = "Price can't be empty!";
    }
    if (imageInput.files.length < 1) {
        if (document.body.querySelector('.div')) {
            document.body.querySelector('.div').remove();
        }
        inputContainer.setAttribute('style', 'position:relative');
        const div = document.createElement('div');
        inputContainer.appendChild(div);
        div.setAttribute('class', 'text-danger mt-1 div');
        div.setAttribute('style', 'font-size:0.875em');
        div.textContent = 'Please choose image(s)!'
        imageInput.style.borderColor = "#dc3545";
        imageInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalideSignal.classList.remove('noDisplay');
    } else {
        if (document.body.querySelector('.div')) {
            document.body.querySelector('.div').remove();
        }
        const div = document.createElement('div');
        inputContainer.appendChild(div);
        div.setAttribute('class', 'text-success mt-1 div');
        div.setAttribute('style', 'font-size:0.875em');
        div.textContent = 'looks good!'
    }
});