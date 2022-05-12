async function getJSON() {
  const response = await fetch("../settings.json");
  const json = await response.json();
  return json;
}

async function fetchData() {
  const settings = await getJSON();

  fetch(
    "https://api.envato.com/v3/market/catalog/collection/?id=" +
      settings.collection_id,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + settings.authorization_bearer_token,
      },
    }
  )
    .then((response) => response.json())
    .then((json) => displayData(json))
    .catch((err) => console.log(err));

  function displayData(data) {
    const items = data.items;

    let html = `<table>
        <thead>
          <tr>
            <th>#</th>
            <th>Icon</th>
            <th>Title</th>
            <th>Sales</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < items.length; i++) {
      html += `<tr>
            <td>${i + 1}</td>
            <td><img src="${
              items[i].previews.icon_with_landscape_preview.icon_url
            }" alt="${items[i].name}" /></td>
            <td>${items[i].name}</td>
            <td>${items[i].number_of_sales}</td>
            <td>${items[i].rating}(${items[i].rating_count})</td>
          <tr>`;
    }
    html += `</tbody>
      </table>`;

    document.querySelector("#result").innerHTML = html;
  }
}

fetchData();