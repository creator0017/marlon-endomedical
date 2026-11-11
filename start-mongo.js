const { MongoMemoryServer } = require('mongodb-memory-server');
const net = require('net');
const fs = require('fs');
const path = require('path');

const checkPort = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
    server.once('listening', () => {
      server.close();
      resolve(false);
    });
    server.listen(port, '127.0.0.1');
  });
};

async function start() {
  const port = 27017;
  const isPortInUse = await checkPort(port);

  if (isPortInUse) {
    console.log(`[MongoLauncher] Port ${port} is already in use. Assuming MongoDB is running.`);
    setInterval(() => {}, 1000);
    return;
  }

  console.log(`[MongoLauncher] Port ${port} is free. Starting local persistent MongoDB (v7.0.24)...`);
  
  const dbPath = path.join(__dirname, 'data', 'db');
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
  }

  try {
    const mongod = await MongoMemoryServer.create({
      binary: {
        version: '7.0.24',
      },
      instance: {
        port: port,
        dbPath: dbPath,
        storageEngine: 'wiredTiger',
      },
    });

    console.log(`✓ [MongoLauncher] Local MongoDB started successfully on ${mongod.getUri()}`);
    console.log(`  Database path: ${dbPath}`);

    process.on('SIGINT', async () => {
      console.log('[MongoLauncher] Stopping MongoDB...');
      await mongod.stop();
      process.exit(0);
    });
    process.on('SIGTERM', async () => {
      console.log('[MongoLauncher] Stopping MongoDB...');
      await mongod.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error('✗ [MongoLauncher] Failed to start MongoDB:', error);
    process.exit(1);
  }
}

start();
