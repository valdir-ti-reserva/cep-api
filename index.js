const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());

app.get('/', (_, res) => {
    res.status(200).json({message: 'Welcome to MyCEP API!'});
})

//GET My CEP
app.get('/mycep/:cep', async (req, res) => {
    const { cep } = req.params
    try {
        const response = await request(`https://viacep.com.br/ws/${cep}/json`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err)
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
