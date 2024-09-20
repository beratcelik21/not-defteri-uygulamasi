const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { errorHandler } = require('./utils/errorHandler');

// Çevresel değişkenleri yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

const app = express();

// Middleware ayarları
app.use(express.json());
app.use(cors());

// Rotalar
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Hata yönetimi
app.use(errorHandler);

// Sunucu port ayarı
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
