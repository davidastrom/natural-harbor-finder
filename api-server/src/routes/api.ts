import express from 'express';

const api = express.Router();

api.get('/', (req, res) => res.send('Natural harbor finder API'));

export default api;
