const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Kullanıcı kaydı
const registerUser = async (req, res) => {
    // Kayıt işlemleri
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
    // Giriş işlemleri
};

// Şifre değiştirme
const changePassword = async (req, res) => {
    // Şifre değiştirme işlemleri
};

// Şifre sıfırlama isteği
const forgotPassword = async (req, res) => {
    // Şifre sıfırlama isteği işlemleri
};

// Şifre sıfırlama
const resetPassword = async (req, res) => {
    // Şifre sıfırlama işlemleri
};

module.exports = {
    registerUser,
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
