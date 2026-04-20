const phoneNumber = "34600000000";
const message = "Hola, quiero informacion sobre venta o reparacion de moviles.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const topBtn = document.getElementById("whatsappTop");
const bottomBtn = document.getElementById("whatsappBottom");

if (topBtn) topBtn.href = whatsappUrl;
if (bottomBtn) bottomBtn.href = whatsappUrl;

const zoneSearchInput = document.getElementById("zonaBusqueda");
const showAllStoresBtn = document.getElementById("showAllStoresBtn");
const stores = Array.from(document.querySelectorAll(".store-card"));
const searchResult = document.getElementById("resultadoBusqueda");
const autocompleteHint = document.getElementById("autocompleteHint");
const storeInfoName = document.getElementById("storeInfoName");
const storeInfoAddress = document.getElementById("storeInfoAddress");
const storeInfoMapPreview = document.getElementById("storeInfoMapPreview");
const storeInfoHours = document.getElementById("storeInfoHours");
const storeInfoProducts = document.getElementById("storeInfoProducts");
const storeInfoPhone = document.getElementById("storeInfoPhone");
const storeInfoMap = document.getElementById("storeInfoMap");

const commonSchedule = "Lunes a sabado: 10:00-14:00 y 17:00-21:00 | Domingo: cerrado.";

const storeCatalog = {
  artesania: {
    products: [
      {
        name: "iPhone 12 reacondicionado",
        description: "128GB, bateria verificada y garantia.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
      },
      {
        name: "iPhone 13 128GB",
        description: "Equipo reacondicionado en excelente estado.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
      },
      {
        name: "Samsung Galaxy S22",
        description: "Version ideal para venta y recambios compatibles.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg",
      },
    ],
  },
  alberto: {
    products: [
      {
        name: "Samsung Galaxy S22",
        description: "Version 256GB libre de fabrica.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg",
      },
      {
        name: "Samsung Galaxy S22 (segunda unidad)",
        description: "Disponible para venta y reparacion express.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg",
      },
      {
        name: "Xiaomi Redmi Note 13",
        description: "Modelo nuevo con repuestos comunes en tienda.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/xiaomi-redmi-note-13-4g.jpg",
      },
    ],
  },
  garcilaso: {
    products: [
      {
        name: "Google Pixel 8",
        description: "Camara avanzada y software limpio.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8.jpg",
      },
      {
        name: "Google Pixel 8 (camara pro)",
        description: "Mismo modelo orientado a clientes de fotografia.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/google-pixel-8.jpg",
      },
      {
        name: "iPhone 13 128GB",
        description: "Disponible con garantia y revision completa.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
      },
    ],
  },
  burgos: {
    products: [
      {
        name: "iPhone 13 128GB",
        description: "Reacondicionado premium revisado.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg",
      },
      {
        name: "Samsung S22 256GB",
        description: "Excelente estado y libre de operadora.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s22-5g.jpg",
      },
      {
        name: "iPhone 12 reacondicionado",
        description: "Version revisada con bateria certificada.",
        image: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg",
      },
    ],
  },
};

if (zoneSearchInput && stores.length && searchResult) {
  let showAllMode = false;

  const resetStoreInfo = () => {
    if (storeInfoName) storeInfoName.textContent = "Selecciona una tienda";
    if (storeInfoAddress) storeInfoAddress.textContent = "Haz clic en un local para ver su direccion y productos.";
    if (storeInfoMapPreview) {
      storeInfoMapPreview.src = "";
      storeInfoMapPreview.style.display = "none";
    }
    if (storeInfoHours) storeInfoHours.textContent = "Horario: --";
    if (storeInfoProducts) storeInfoProducts.innerHTML = "<p>No hay productos para mostrar.</p>";
    if (storeInfoPhone) storeInfoPhone.textContent = "Telefono: --";
    if (storeInfoMap) storeInfoMap.href = "#";
  };

  const hideAllStores = () => {
    stores.forEach((storeCard) => {
      storeCard.style.display = "none";
      storeCard.classList.remove("is-active");
      const addressElement = storeCard.querySelector(".store-address");
      if (addressElement) addressElement.style.display = "none";
    });
    if (showAllStoresBtn) showAllStoresBtn.textContent = "Mostrar todas las tiendas";
  };

  const showStoreInfo = (storeCard) => {
    const storeName = storeCard.dataset.storeName || "Tienda";
    const storeId = storeCard.dataset.storeId || "";
    const storeAddress = storeCard.dataset.storeAddress || "Direccion no disponible.";
    const phone = storeCard.dataset.storePhone || "No disponible";
    const phoneUri = phone.replace(/[^\d+]/g, "");
    const detail = storeCatalog[storeId];
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeAddress)}`;
    const mapPreviewUrl = `https://www.google.com/maps?q=${encodeURIComponent(storeAddress)}&output=embed`;

    if (storeInfoName) storeInfoName.textContent = storeName;
    if (storeInfoAddress) storeInfoAddress.textContent = `Direccion: ${storeAddress}`;
    if (storeInfoHours) storeInfoHours.textContent = `Horario: ${commonSchedule}`;
    if (storeInfoMapPreview) {
      storeInfoMapPreview.src = mapPreviewUrl;
      storeInfoMapPreview.style.display = "block";
    }
    if (storeInfoProducts) {
      const items = detail?.products || [];
      if (!items.length) {
        storeInfoProducts.innerHTML = "<p>No hay productos para mostrar.</p>";
      } else {
        storeInfoProducts.innerHTML = items
          .map(
            (item) => `
              <article class="store-product-item">
                <img src="${item.image}" alt="${item.name}" loading="lazy" />
                <h4>${item.name}</h4>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("");
      }
    }
    if (storeInfoPhone) storeInfoPhone.innerHTML = `Telefono: <a href="tel:${phoneUri}">${phone}</a>`;
    if (storeInfoMap) storeInfoMap.href = mapsUrl;

    stores.forEach((item) => item.classList.remove("is-active"));
    storeCard.classList.add("is-active");
  };

  const getBestAutocomplete = (query) => {
    if (!query) return null;
    const cleanQuery = query.toLowerCase().trim();
    const queryTokens = cleanQuery.split(/\s+/).filter(Boolean);
    let best = null;

    stores.forEach((storeCard) => {
      const name = storeCard.dataset.storeName || "";
      const zone = storeCard.dataset.storeZone || "";
      const address = storeCard.dataset.storeAddress || "";
      const searchable = `${name} ${zone} ${address}`.toLowerCase();
      if (!searchable.includes(cleanQuery)) return;

      let score = 0;
      if (name.toLowerCase().startsWith(cleanQuery)) score += 80;
      if (zone.toLowerCase().startsWith(cleanQuery)) score += 60;
      if (address.toLowerCase().startsWith(cleanQuery)) score += 40;
      if (searchable.startsWith(cleanQuery)) score += 25;

      queryTokens.forEach((token) => {
        if (searchable.includes(token)) score += 10;
      });

      if (!best || score > best.score) {
        best = { score, suggestion: name, storeCard };
      }
    });

    return best;
  };

  const updateStoreResults = () => {
    const query = zoneSearchInput.value.trim().toLowerCase();
    let visibleCount = 0;
    let firstVisibleStore = null;

    if (!query && !showAllMode) {
      hideAllStores();
      searchResult.textContent = 'Escribe en la barra o pulsa "Mostrar todas las tiendas".';
      if (autocompleteHint) autocompleteHint.textContent = "";
      zoneSearchInput.dataset.autocomplete = "";
      resetStoreInfo();
      return;
    }

    stores.forEach((storeCard) => {
      const zone = (storeCard.dataset.storeZone || "").toLowerCase();
      const storeName = (storeCard.querySelector("h3")?.textContent || "").toLowerCase();
      const address = (storeCard.dataset.storeAddress || "").toLowerCase();
      const isMatch = showAllMode || zone.includes(query) || storeName.includes(query) || address.includes(query);
      const addressElement = storeCard.querySelector(".store-address");

      storeCard.style.display = isMatch ? "" : "none";
      if (addressElement) {
        addressElement.style.display = query && isMatch ? "" : "none";
      }
      if (isMatch) {
        visibleCount += 1;
        if (!firstVisibleStore) firstVisibleStore = storeCard;
      }
    });

    if (!query && showAllMode) {
      searchResult.textContent = "Mostrando todas las tiendas.";
      if (autocompleteHint) autocompleteHint.textContent = "";
      if (firstVisibleStore) showStoreInfo(firstVisibleStore);
      return;
    }

    if (visibleCount === 0) {
      searchResult.textContent = `No hay tiendas para "${zoneSearchInput.value.trim()}".`;
      if (autocompleteHint) autocompleteHint.textContent = "";
      if (storeInfoName) storeInfoName.textContent = "Sin resultados";
      if (storeInfoAddress) storeInfoAddress.textContent = "Prueba con otra zona o calle.";
      if (storeInfoHours) storeInfoHours.textContent = "Horario: --";
      if (storeInfoProducts) storeInfoProducts.innerHTML = "<p>Productos: --</p>";
      if (storeInfoPhone) storeInfoPhone.textContent = "Telefono: --";
      if (storeInfoMap) storeInfoMap.href = "#";
      if (storeInfoMapPreview) {
        storeInfoMapPreview.src = "";
        storeInfoMapPreview.style.display = "none";
      }
      stores.forEach((item) => item.classList.remove("is-active"));
      return;
    }

    const suffix = visibleCount === 1 ? "tienda encontrada" : "tiendas encontradas";
    searchResult.textContent = `${visibleCount} ${suffix}.`;

    const bestMatch = getBestAutocomplete(query);
    if (autocompleteHint && bestMatch && bestMatch.suggestion.toLowerCase() !== query) {
      autocompleteHint.textContent = `Sugerencia: ${bestMatch.suggestion} (pulsa Tab para autocompletar)`;
      zoneSearchInput.dataset.autocomplete = bestMatch.suggestion;
    } else {
      if (autocompleteHint) autocompleteHint.textContent = "";
      zoneSearchInput.dataset.autocomplete = "";
    }

    if (firstVisibleStore) showStoreInfo(firstVisibleStore);
  };

  zoneSearchInput.addEventListener("input", () => {
    showAllMode = false;
    updateStoreResults();
  });
  if (showAllStoresBtn) {
    showAllStoresBtn.addEventListener("click", () => {
      if (showAllMode) {
        showAllMode = false;
        zoneSearchInput.value = "";
        zoneSearchInput.dataset.autocomplete = "";
        updateStoreResults();
        zoneSearchInput.focus();
        return;
      }

      showAllMode = true;
      zoneSearchInput.value = "";
      zoneSearchInput.dataset.autocomplete = "";
      showAllStoresBtn.textContent = "Ocultar tiendas";
      updateStoreResults();
      zoneSearchInput.focus();
    });
  }

  zoneSearchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const suggestion = zoneSearchInput.dataset.autocomplete || "";
    if (!suggestion) return;

    event.preventDefault();
    zoneSearchInput.value = suggestion;
    updateStoreResults();
  });

  if (autocompleteHint) {
    autocompleteHint.addEventListener("click", () => {
      const suggestion = zoneSearchInput.dataset.autocomplete || "";
      if (!suggestion) return;
      zoneSearchInput.value = suggestion;
      zoneSearchInput.focus();
      updateStoreResults();
    });
  }

  stores.forEach((storeCard) => {
    storeCard.addEventListener("click", () => showStoreInfo(storeCard));
    storeCard.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showStoreInfo(storeCard);
      }
    });
  });

  hideAllStores();
  resetStoreInfo();
}
