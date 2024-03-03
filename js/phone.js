const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}
const displayPhones = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    // Set condition if there is more than 12 phone in search result.
    const showAllContainer = document.getElementById('show-all-container');

    if (phones.length > 6) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    phones = phones.slice(0, 6);

    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList = 'card bg-gray-100 shadow-xl';
        phoneDiv.innerHTML = `
        <figure><img src="${phone.image}"
        alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center my-5">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    })
    toggleLoadingSpinner(false);
}

const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText);
    searchField.value = '';
}
const toggleLoadingSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

const handleShowDetails = async (id) => {
    // console.log('id paichi', id);

    // load single phone data by id
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    displayPhoneDetails(phone);
}

const displayPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailsPhoneName = document.getElementById('show-details-phone-name');
    showDetailsPhoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById('show-details-container');
    showDetailsContainer.innerHTML = `
        <img class="text-center" src="${phone.image}" alt="">
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span>GPS: </span>${phone?.others?.GPS || 'No'}</p>
    `
    // show the modal
    show_details_modal.showModal();
}
// loadPhone();