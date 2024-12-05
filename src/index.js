const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const messageHandler = require('./handlers/messageHandler');

// Initialize WhatsApp client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// Generate QR Code for WhatsApp Web
client.on('qr', (qr) => {
    console.log('QR Code gerado. Escaneie-o com seu WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente WhatsApp conectado e pronto!');
});

// Handle incoming messages
client.on('message', async msg => {
    try {
        await messageHandler.handleMessage(msg);
    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
    }
});

// Initialize the client
client.initialize();