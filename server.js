const path = require('path');
const express = require('express');
const app = require('./backend/app');
const connectDatabase = require('./backend/config/database');
// const PORT = process.env.PORT || 4000;
const PORT = 4000;

connectDatabase();

const server = app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});

