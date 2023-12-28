const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/repos', async (req, res) => {
  try {
    const githubToken = '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';
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
