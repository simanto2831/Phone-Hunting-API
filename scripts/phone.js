// step-1 : load all phone based on their name by fetching api
const loadPhone = async (searchText = "a", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// step-2: create a function and display the phone card on UI
const displayPhones = (phones, isShowAll) => {
  // step-3 : selecting the card container
  const phone_container = document.getElementById("phone_container");

  // step-10 : clear phone container cards before adding new card
  phone_container.textContent = "";

  // step-12: conditionally add or remove showAll button
  const show_more_btn_div = document.getElementById("show_more_btn_div");

  if (phones.length > 12 && !isShowAll) {
    show_more_btn_div.classList.remove("hidden");
  } else {
    show_more_btn_div.classList.add("hidden");
  }
  // console.log(isShowAll);

  // step-11:  conditional showing card not more than 12 by slice method
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  // console.log(phones.length);
  // console.log(phones);

  // step-4: loop all the phones to display
  phones.forEach((phone) => {
    // console.log(phone);

    // step - 5 : create a div element
    const div = document.createElement("div");

    // step - 6: add classlist in this div
    div.classList = `card bg-gray-100 shadow-xl p-6`;

    // step-7 : set innerhtml
    div.innerHTML = `
    <figure>
        <img
            src='${phone.image}'
            alt="Phone"
        />
    </figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        
        <div class="card-actions justify-center">
        <button onclick="handleShowDetails('${phone.slug}')" class="btn ">Show Details</button>
    </div>
  </div>
    `;

    // step -8 : append child
    phone_container.appendChild(div);
  });
  spinnerLoader(false);
};

// step-9 : handle search button
const handleSearch = (isShowAll) => {
  spinnerLoader(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;

  loadPhone(searchText, isShowAll);
};

// step-13: add spinner functionality
const spinnerLoader = (isLoading) => {
  const spinner_div = document.getElementById("spinner_div");
  if (isLoading) {
    spinner_div.classList.remove("hidden");
  } else {
    spinner_div.classList.add("hidden");
  }
};

// step-14 : handle showAll Button and its functionality
const handleShowAll = () => {
  handleSearch(true);
};

// step-15 : handle show details button
const handleShowDetails = async (id) => {
  // console.log("show details button clicked", id);
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

// step - 16 : handle showPhone details button with display modal
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phone_show_details_container = document.getElementById(
    "phone_show_details_container"
  );
  phone_show_details_container.innerHTML = `
    <img src= "${phone.image}" alt = "" class="mx-auto my-10">
    <h1 class="text-3xl font-bold">${phone.name}</h1>
    <h3 class="text-xl my-3"> <span>Brand : </span> ${phone.brand}</h3>
    <h3 class="text-xl my-3"> <span>ChipSet : </span> ${phone.mainFeatures.chipSet}</h3>
    <h3 class="text-xl my-3"> <span>Display Size : </span> ${phone.mainFeatures.displaySize}</h3>
    <h3 class="text-xl my-3"> <span>Memory : </span> ${phone.mainFeatures.memory}</h3>
    <h3 class="text-xl my-3"> <span>Storage : </span> ${phone.mainFeatures.storage}</h3>
    <h3 class="text-xl my-3"> <span>Bluetooth : </span> ${phone?.others?.Bluetooth}</h3>
    <h3 class="text-xl my-3"> <span>GPS : </span> ${phone?.others?.GPS}</h3>
    <h3 class="text-xl my-3"> <span>USB : </span> ${phone?.others?.USB}</h3>
    <h3 class="text-xl my-3"> <span>WLAN : </span> ${phone?.others?.WLAN}</h3>
    <h3 class="text-xl my-3"> <span>NFC : </span> ${phone?.others?.NFC}</h3>
    
    
    <h3 class="text-xl my-3"> <span>Release Date : </span> ${phone?.releaseDate}</h3>
  
  `;

  show_details_modal.showModal();
};

loadPhone();
