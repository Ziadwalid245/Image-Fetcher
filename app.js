    const input = document.getElementById("keywords");
    const results = document.getElementById("results");
    const button = document.getElementById("go");

    async function findImages() {
      const words = input.value
        .split(",")
        .map(w => w.trim())
        .filter(Boolean)
        .slice(0, 5);

      results.innerHTML = "";
      if (words.length === 0) return;

      for (const word of words) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img alt=""><div class="label">${word}</div>`;
        results.appendChild(card);

        try {
          const res = await fetch(`/api/search?query=${encodeURIComponent(word)}`);
          const data = await res.json();
          const photo = data.photos && data.photos[0];

          if (photo) {
            const img = card.querySelector("img");
            img.src = photo.src.large;
            img.alt = photo.alt || word;
            img.style.cursor = "pointer";
            const credit = document.createElement("div");
            credit.className = "credit";
            credit.innerHTML = `Photo by <a href="${photo.photographer_url}" target="_blank">${photo.photographer}</a>`;
            card.appendChild(credit);
            img.addEventListener("click", () => {
              window.open(photo.src.large2x,"_blank", "width=1000,height=700,left=200,top=100,resizable=yes,scrollbars=yes")

            });
          } else {
            const msg = document.createElement("div");
            msg.className = "empty";
            msg.textContent = "No image found";
            card.appendChild(msg);
          }
        } catch (e) {
          const msg = document.createElement("div");
          msg.className = "empty";
          msg.textContent = "Error fetching";
          card.appendChild(msg);
        }
      }
    }
    button.addEventListener("click", findImages);
    input.addEventListener("keydown", e => { if (e.key === "Enter") findImages(); });



