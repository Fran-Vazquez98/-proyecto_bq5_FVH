const selfsigned = require('selfsigned');
const fs = require('fs');

const attrs = [{ name: 'commonName', value: 'localhost' }];
// Añadimos keySize: 4096 para que Node.js no se queje de que es pequeña
const pems = selfsigned.generate(attrs, { 
    days: 365,
    keySize: 4096 
});

fs.writeFileSync('key.pem', pems.private);
fs.writeFileSync('cert.pem', pems.cert);

console.log(" Certificados de 4096 bits generados con éxito.");