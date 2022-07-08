const checkBoxes = document.body.querySelectorAll('.checkBox');

const imageInput = document.body.querySelector('#image');
const inputContainer = document.body.querySelector('.inputContainer');
const validationDiv = document.body.querySelector('#validation');
const invalideSignal = document.body.querySelector('#invalideSignal');

const validationPrice = document.body.querySelector('#validationPrice');
const invalidePrice = document.body.querySelector('#invalidePrice');
const priceInput = document.body.querySelector('#price');
const priceContainer = document.body.querySelector('#priceContainer');

const descriptionInput = document.body.querySelector('#description');
const invalideDescription = document.body.querySelector('#invalideDescription');
const descriptionContainer = document.body.querySelector('#descriptionContainer');
const validationDescription = document.body.querySelector('#validationDescription');

const validationTitle = document.body.querySelector('#validationTitle');
const titleContainer = document.body.querySelector('#titleContainer');
const titleInput = document.body.querySelector('#title');
const invalideTitle = document.body.querySelector('#invalideTitle');

const validationLocation = document.body.querySelector('#validationLocation');
const locationContainer = document.body.querySelector('#locationContainer');
const locationInput = document.body.querySelector('#location');
const invalideLocation = document.body.querySelector('#invalideLocation');

const updateButton = document.body.querySelector('.btn-success');



const isNotDisplayed = (el) => {
    return el.classList.contains('noDisplay')
};
const disableUpdateButton = () => {
    const invalideSigns = [invalideTitle, invalideLocation, invalidePrice, invalideDescription, invalideSignal].map(isNotDisplayed);
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


let campgroundImagesLength = campground.images.length;
let rest = 5 - campground.images.length;

const validated = () => {
    imageInput.style.borderColor = "";
    imageInput.style.boxShadow = "";
    validationDiv.setAttribute("class", "form-label text-success mt-2 ");
    invalideSignal.classList.add('noDisplay');
    disableUpdateButton();
}

const invalidated = () => {
    imageInput.style.borderColor = "#dc3545";
    imageInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
    validationDiv.setAttribute("class", "form-label text-danger mt-2 ");
    invalideSignal.classList.remove('noDisplay');
    updateButton.disabled = true;
}

if (campgroundImagesLength >= 5) {
    const fileOverlay = document.createElement('div');
    inputContainer.appendChild(fileOverlay);
    inputContainer.setAttribute('style', 'position:relative');
    fileOverlay.setAttribute('style', 'background-color:transparent;color: transparent; border-color: transparent;z-index: 99;height: 38px;');
    fileOverlay.setAttribute('class', 'fileOverlay');
    imageInput.setAttribute('style', 'z-index: -1 ;position:absolute;width: 100%;')
    fileOverlay.addEventListener('click', () => {
        if (rest === 0) {
            fileOverlay.remove();
            imageInput.removeAttribute('style');
            imageInput.style.borderColor = "#dc3545";
            validationDiv.setAttribute('class', 'form-label text-danger mt-2 ');
            validationDiv.innerHTML = `Maximum allowed images! Delete images before adding more or ulpoad like this`;
            imageInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
            invalideSignal.classList.remove('noDisplay');
        } else {
            if (fileOverlay) {
                fileOverlay.remove();
                imageInput.removeAttribute('style');
            }
        }
    });
    for (let el of checkBoxes) {
        el.addEventListener('change', () => {
            if (el.checked) {
                campgroundImagesLength -= 1;
                rest = (5 - campgroundImagesLength);
                imageInput.style.borderColor = "#dc3545";
                validationDiv.setAttribute("class", "form-label text-success mt-2 ");
                validationDiv.innerHTML = `You can choose up to ${rest} ${(rest > 1 ? "images" : "image")} or upload like this`;
                invalideSignal.classList.add('noDisplay');
                fileOverlay.remove();
                imageInput.removeAttribute('style');
                updateButton.disabled = false;
                if (rest < imageInput.files.length) {
                    invalidated();
                    validationDiv.innerHTML = `You can only load ${rest} ${(rest > 1 ? "images" : "image")} ${imageInput.files.length > 5 ? '' : "or delete images before adding new"}`;
                }
            } else {
                campgroundImagesLength += 1;
                rest = (5 - campgroundImagesLength);
                validated();
                validationDiv.innerHTML = `You can choose up to ${rest} ${(rest > 1 ? "images" : "image")} and upload like this ${campgroundImagesLength === 5 ? 'or delete images before adding new' : ''}`;
                if (rest < imageInput.files.length) {
                    invalidated();
                    validationDiv.innerHTML = `You can only load ${rest} ${(rest > 1 ? "images" : "image")}${rest === 0 ? '. Delete images before adding new' : `${imageInput.files.length > 5 ? `` : " or delete images before adding new"}`}`;
                }
            }
        })
    }
    imageInput.addEventListener('change', () => {
        if (campgroundImagesLength + imageInput.files.length > 5) {
            invalidated();
            validationDiv.innerHTML = `You can only load ${rest} ${(rest > 1 ? "images" : "image")}${rest === 0 ? '. Delete images before adding new' : ' or delete images before adding new'}`;
        } else if (campgroundImagesLength + imageInput.files.length < 6) {
            validated();
            validationDiv.innerHTML = `looks good ! You can upload your new ${(Math.abs(imageInput.files.length) < 2 ? "image" : "images")}.`;
        }
    })
} else {
    for (let el of checkBoxes) {
        inputContainer.setAttribute('style', 'position:relative');
        el.addEventListener('change', () => {
            if (el.checked) {
                campgroundImagesLength -= 1;
                rest = (5 - campgroundImagesLength);
                if (rest < imageInput.files.length) {
                    invalidated();
                    validationDiv.innerHTML = `You can only load ${rest} ${(rest > 1 ? "images" : "image")} ${imageInput.files.length > 5 ? '' : "or delete images before adding new images"}`;
                } else {
                    validated();
                    validationDiv.innerHTML = `You can choose up to ${rest} ${(rest > 1 ? "images" : "image")} or upload like this`;
                }
            } else {
                campgroundImagesLength += 1;
                rest = (5 - campgroundImagesLength);
                validated()
                validationDiv.innerHTML = `You can choose up to ${rest} ${(rest > 1 ? "images" : "image")} and upload like this ${campgroundImagesLength === 5 ? 'or delete images before adding new ' : ''}`;
                if (rest < imageInput.files.length) {
                    invalidated();
                    validationDiv.innerHTML = `You can only load ${rest} ${(rest > 1 ? "images" : "image")} ${imageInput.files.length > 5 ? '' : "or delete images before adding new images"}`;
                }
            }
        })
    }
    imageInput.addEventListener('change', () => {
        if (campgroundImagesLength + imageInput.files.length > 5) {
            invalidated();
            validationDiv.innerHTML = `You can only load ${rest} ${(rest > 1 ? "images" : "image")} or delete images before adding new images.`;
        } else if (campgroundImagesLength + imageInput.files.length < 6) {
            validated();
            validationDiv.innerHTML = `looks good! You can upload your new ${(Math.abs(imageInput.files.length) < 2 ? "image" : "images")}.`;
        }
    })
};


const inputs = [titleInput, locationInput, priceInput, descriptionInput, imageInput];
const invalidsel = [invalideTitle, invalideLocation, invalidePrice, invalideDescription, invalideSignal];

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
        if (!invalidsel[index].classList.contains('noDisplay')) {
            ipt.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        }
    });
}


updateButton.addEventListener('click', (event) => {
    if (document.body.querySelector('.fileOverlay')) {
        document.body.querySelector('.fileOverlay').remove();
        imageInput.removeAttribute('style');
    };
    imageInput.style.borderColor = "";
    imageInput.style.boxShadow = "";
    validationDiv.setAttribute("class", "form-label text-success mt-2 ");
    validationDiv.textContent = "looks good!";
    if (!invalideSignal.classList.contains('noDisplay')) {
        invalideSignal.classList.add('noDisplay');
    }
    validationPrice.setAttribute('class', 'form-label text-success mt-2 ');
    validationPrice.textContent = "looks good!";
    validationDescription.setAttribute('class', 'form-label text-success mt-2 ');
    validationDescription.textContent = "looks good!";
    validationTitle.setAttribute('class', 'form-label text-success mt-2 ');
    validationTitle.textContent = "looks good!";
    validationLocation.setAttribute('class', 'form-label text-success mt-2 ');
    validationLocation.textContent = "looks good!";
});


priceInput.addEventListener('input', () => {
    priceContainer.setAttribute('style', 'position:relative')
    const res = Number(priceInput.value);
    if (!isFinite(res) || priceInput.value === '') {
        priceInput.style.borderColor = "#dc3545";
        priceInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalidePrice.classList.remove('noDisplay');
        validationPrice.setAttribute('class', 'form-label text-danger mt-2');
        validationPrice.textContent = "Price must be a number. It can't be empty, contain letters or space.";
        updateButton.disabled = true;
    } else {
        priceInput.style.borderColor = "";
        priceInput.style.boxShadow = "";
        invalidePrice.classList.add('noDisplay');
        validationPrice.setAttribute('class', 'form-label text-success mt-2');
        validationPrice.textContent = "looks good!";
        disableUpdateButton();
    }
});

descriptionInput.addEventListener('input', () => {
    if (descriptionInput.value === '') {
        descriptionContainer.setAttribute('style', 'position:relative')
        descriptionInput.style.borderColor = "#dc3545";
        descriptionInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalideDescription.classList.remove('noDisplay');
        validationDescription.setAttribute('class', 'form-label text-danger mt-2');
        validationDescription.textContent = "Description can't be empty";
        updateButton.disabled = true;
    } else {
        descriptionInput.style.borderColor = "";
        descriptionInput.style.boxShadow = "";
        invalideDescription.classList.add('noDisplay');
        validationDescription.setAttribute('class', 'form-label text-success mt-2');
        validationDescription.textContent = "looks good!";
        disableUpdateButton();
    }
});

titleInput.addEventListener('input', () => {
    if (titleInput.value === '') {
        titleContainer.setAttribute('style', 'position:relative')
        titleInput.style.borderColor = "#dc3545";
        titleInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalideTitle.classList.remove('noDisplay');
        validationTitle.setAttribute('class', 'form-labal text-danger mt-2');
        validationTitle.textContent = "Title can't be empty";
        updateButton.disabled = true;
    } else {
        titleInput.style.borderColor = "";
        titleInput.style.boxShadow = "";
        invalideTitle.classList.add('noDisplay');
        validationTitle.setAttribute('class', 'form-label text-success mt-2');
        validationTitle.textContent = "looks good!";
        disableUpdateButton();
    }
});

locationInput.addEventListener('input', () => {
    if (locationInput.value === '') {
        locationContainer.setAttribute('style', 'position:relative')
        locationInput.style.borderColor = "#dc3545";
        locationInput.style.boxShadow = "0 0 0 0.25rem rgb(220 53 69 / 25%)";
        invalideLocation.classList.remove('noDisplay');
        validationLocation.setAttribute('class', 'form-labal text-danger mt-2');
        validationLocation.textContent = "Location can't be empty";
        updateButton.disabled = true;
    } else {
        locationInput.style.borderColor = "";
        locationInput.style.boxShadow = "";
        invalideLocation.classList.add('noDisplay');
        validationLocation.setAttribute('class', 'form-label text-success mt-2');
        validationLocation.textContent = "looks good!";
        disableUpdateButton();
    }
}
);






