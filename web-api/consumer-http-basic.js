#!/usr/bin/env node

import server from 'fastify';
import fetch from 'node-fetch';
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || '127.0.0.1:4000';

const app = server();

app.get('/', async() => {
    const req = await fetch(`http://${TARGET}/recipes/42`)
    const producer_data = await req.json();

    return {
        consumer_pid: process.pid,
        producer_data
    };
});

app.listen(PORT, HOST, () => {
    console.log(`Consumer running at http://${HOST}:${PORT}/`);
});