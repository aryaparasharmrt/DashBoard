const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/repos', async (req, res) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const apiUrl = 'https://api.github.com/user/repos';

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    });

    const repos = response.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    }));

    res.json(repos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GitHub Dashboard</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }

        h1 {
          color: #333;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin-bottom: 20px;
        }

        a {
          color: #0366d6;
          text-decoration: none;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>GitHub Repositories</h1>
      <ul id="repo-list"></ul>
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const repoList = document.getElementById('repo-list');

          fetch('/repos')
            .then(response => response.json())
            .then(repos => {
              repos.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.innerHTML = \`
                  <h3>\${repo.name}</h3>
                  <p>\${repo.description}</p>
                  <a href="\${repo.url}" target="_blank">View on GitHub</a>
                \`;
                repoList.appendChild(listItem);
              });
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        });
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
