document.addEventListener('DOMContentLoaded', () => {
  const repoList = document.getElementById('repo-list');

  fetch('/repos')
    .then(response => response.json())
    .then(repos => {
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.url}" target="_blank">View on GitHub</a>
        `;
        repoList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
