#!/usr/bin/env node

import server from 'fastify';
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;

const app = server();

console.log(`worker pid=${process.pid}`);

app.get('/recipes/:id', async (req, res) => {
    console.log(`worker request pid=${process.pid}`);
    const id = Number(req.params.id);

    if (id != 42) {
        res.statusCode = 404;
        
        return {
            error: 'not_found'
        };
    }

    return {
        producer_pid: process.pid,
        recipe: {
            id, name: "Chicken Tikka Masala",
            steps: "Throw it in a pot...",
            ingredients: [
                {
                    id: 1,
                    name: "Chicken",
                    quantity: "1 lb"
                },
                {
                    id: 2,
                    name: "Sauce",
                    quantity: "2 cups"
                }
            ]
        }
    };
});

app.listen(PORT, HOST, () => {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})