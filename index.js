const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());

const generateUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.get('/', (_, res) => {
    res.status(200).send('Welcome to MyCEP API!');
})

//GET My CEP
app.get('/mycep/:cep', async (req, res) => {
    const { cep } = req.params
    const { api_key } = req.query
    try {
        const response = await request(`${generateUrl(api_key)}&url=https://viacep.com.br/ws/${cep}/json`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err)
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
