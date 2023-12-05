/* SEARCH */
import getParameter from "";

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-input-button");
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  async function searchPosts() {
    let token = localStorage.getItem("token");
    const res = await fetch(
      "https://api.noroff.dev/api/v1/social/posts/?_author=true&_reactions=true&_comments=true",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
    checkForErrors(data);
    filterSearch(data);
  }
  searchPosts();
});
function filterSearch(data) {
  let filteredArray = [];
  let searchValue = searchInput.value;
  let filterTitle = data.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  let filterBody = data.filter((post) =>
    (post.body ? post.body.toLowerCase() : "").includes(
      searchValue.toLowerCase()
    )
  );
  let filterTag = data.filter((post) =>
    post.tags.some((item) =>
      item ? item.toLowerCase().includes(searchValue.toLowerCase()) : false
    )
  );
  filterTitle.forEach((item) => {
    filteredArray.push(item);
  });
  filterBody.forEach((item) => {
    filteredArray.push(item);
  });
  filterTag.forEach((item) => {
    filteredArray.push(item);
  });
  console.log(filteredArray);
  const uniqueArray = filteredArray.filter((item, index, self) => {
    return index === self.findIndex((t) => t.id === item.id);
  });
  let slicedData = uniqueArray.slice(startIndex, startIndex + postsPerPage);
  console.log(slicedData);
  buttonMorePosts.style.display =
    uniqueArray.length > startIndex + postsPerPage ? "flex" : "none";
  buttonMorePosts.addEventListener("click", () => {
    let slicedData = uniqueArray.slice(startIndex, startIndex + postsPerPage);
    startIndex += postsPerPage;
    slicedData.forEach((item) => {
      root.append(renderCard(item));
    });
    buttonMorePosts.style.display =
      uniqueArray.length > startIndex + postsPerPage ? "flex" : "none";
  });
  if (uniqueArray.length === 0) {
    root.innerHTML = '<h2 class="no-results">No results found</h2>';
  } else {
    slicedData.forEach((item) => {
      root.append(renderCard(item));
    });
  }
}
