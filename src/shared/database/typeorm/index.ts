import { createConnections } from 'typeorm';

createConnections().then(() =>
  console.log('🟡 Servidor conectado ao banco de dados'),
);
