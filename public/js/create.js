document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    fetch("../../books", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const responseDiv = document.querySelector("#response");
        if (data.error) {
          responseDiv.innerHTML = `<p>${data.error}</p>`;
        } else {
          responseDiv.innerHTML = "<p>Libro creado con éxito</p>";
        }
        responseDiv.style.display = "block";
      })
      .catch((err) => {
        document.querySelector("#response").innerHTML = `<p>${err}</p>`;
      });
  });
});
