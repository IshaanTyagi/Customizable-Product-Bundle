const chocolates = [
  { id: 1, name: 'Milk Chocolate', price: 20 },
  { id: 2, name: 'Dark Chocolate', price: 50 },
  { id: 3, name: 'White Chocolate', price: 30 },
  { id: 4, name: 'Belgium Chocolate', price: 100 },
  { id: 5, name: 'Sweet German Chocolate', price: 150 },
  { id: 6, name: 'Hazelnut Chocolate', price: 120 },
  { id: 7, name: 'Hersheys Chocolate', price: 150 },
  { id: 8, name: 'Toblerone Chocolate', price: 100 },
  { id: 9, name: 'Protein Bar: Chocolate', price: 180 },
  { id: 10, name: 'Sugarfree Chocolate', price: 80 },
];

let selectedChocolates = [];
const totalPriceElement = document.getElementById('total-price');

function populateChocolates() {
  const chocolatesSection = document.getElementById('chocolates-section');

  chocolates.forEach((chocolate) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'chocolate';
    checkbox.value = chocolate.id;
    checkbox.addEventListener('change', updateTotalPrice);

    const quantityDropdown = document.createElement('select');
    for (let i = 0; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.text = i;
      quantityDropdown.add(option);
    }
    quantityDropdown.addEventListener('change', updateTotalPrice);

    const label = document.createElement('label');
    label.innerHTML = `${chocolate.name} - Rs. ${chocolate.price.toFixed(2)}`;

    const div = document.createElement('div');
    div.className = 'chocolate-item';
    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(quantityDropdown);

    chocolatesSection.appendChild(div);
  });
}

function updateTotalPrice() {
  selectedChocolates = [];
  let totalQuantity = 0;

  document
    .querySelectorAll('input[name="chocolate"]:checked')
    .forEach((checkbox) => {
      const chocolateId = parseInt(checkbox.value);
      const quantityDropdown = checkbox.parentNode.querySelector('select');
      const quantity = parseInt(quantityDropdown.value);

      const chocolate = chocolates.find((choc) => choc.id === chocolateId);
      if (chocolate && quantity > 0) {
        totalQuantity += quantity;
        if (totalQuantity <= 8) {
          selectedChocolates.push({ ...chocolate, quantity });
        } else {
          checkbox.checked = false;
          alert('You cannot select more than 8 chocolates.');
        }
      }
    });

  const totalPrice = selectedChocolates.reduce(
    (sum, chocolate) => sum + chocolate.price * chocolate.quantity,
    0
  );
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

function placeOrder() {
  console.log('Order Placed:', selectedChocolates);
  alert('Order Placed.');
}

populateChocolates();
