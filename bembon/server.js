import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('--production');
const port = Number(process.env.PORT || 3000);
const dataDir = path.join(__dirname, 'data');
mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(path.join(dataDir, 'bembon.db'));
db.exec('PRAGMA journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER,
    image TEXT,
    category TEXT,
    is_available INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );

  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
  );
`);

const bookingColumns = db.prepare('PRAGMA table_info(bookings)').all().map((column) => column.name);
if (bookingColumns.length && bookingColumns.includes('name')) {
  db.transaction(() => {
    db.exec('ALTER TABLE bookings RENAME TO bookings_legacy');
    db.exec(`
      CREATE TABLE bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        guests TEXT NOT NULL,
        booking_date TEXT,
        booking_time TEXT,
        note TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      )
    `);
    const oldBookings = db.prepare('SELECT id, name, phone, email, guests, created_at FROM bookings_legacy').all();
    const findCustomer = db.prepare('SELECT id FROM customers WHERE phone = ?');
    const addCustomer = db.prepare('INSERT INTO customers (name, phone, email, created_at) VALUES (?, ?, ?, ?)');
    const addBooking = db.prepare('INSERT INTO bookings (customer_id, guests, status, created_at) VALUES (?, ?, ?, ?)');
    for (const old of oldBookings) {
      let customer = findCustomer.get(old.phone);
      if (!customer) {
        const inserted = addCustomer.run(old.name, old.phone, old.email || null, old.created_at);
        customer = { id: inserted.lastInsertRowid };
      }
      addBooking.run(customer.id, old.guests, 'pending', old.created_at);
    }
    db.exec('DROP TABLE bookings_legacy');
  })();
}

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    guests TEXT NOT NULL,
    booking_date TEXT,
    booking_time TEXT,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
  );
  CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
  CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);
`);

const app = express();
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/products', (_req, res) => {
  const products = db.prepare(`
    SELECT id, name, description, price, image, category, is_available AS isAvailable, created_at AS createdAt
    FROM products
    WHERE is_available = 1
    ORDER BY id DESC
  `).all();
  res.json({ ok: true, products });
});

app.post('/api/bookings', (req, res) => {
  const name = String(req.body?.name || '').trim();
  const phone = String(req.body?.phone || '').trim();
  const email = String(req.body?.email || '').trim();
  const guests = String(req.body?.guests || '').trim();
  const bookingDate = String(req.body?.bookingDate || '').trim();
  const bookingTime = String(req.body?.bookingTime || '').trim();
  const note = String(req.body?.note || '').trim();

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ ok: false, message: 'Vui lòng nhập họ tên hợp lệ.' });
  }
  if (!/^[0-9*+\s-]{7,20}$/.test(phone)) {
    return res.status(400).json({ ok: false, message: 'Vui lòng nhập số điện thoại hợp lệ.' });
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ ok: false, message: 'Email chưa đúng định dạng.' });
  }
  if (!guests) {
    return res.status(400).json({ ok: false, message: 'Vui lòng chọn số khách.' });
  }

  let result;
  db.exec('BEGIN');
  try {
    const existingCustomer = db.prepare('SELECT id FROM customers WHERE phone = ?').get(phone);
    let customerId = existingCustomer?.id;

    if (customerId) {
      db.prepare('UPDATE customers SET name = ?, email = ? WHERE id = ?')
        .run(name, email || null, customerId);
    } else {
      const customer = db.prepare(`
        INSERT INTO customers (name, phone, email) VALUES (?, ?, ?)
      `).run(name, phone, email || null);
      customerId = customer.lastInsertRowid;
    }

    const booking = db.prepare(`
      INSERT INTO bookings (customer_id, guests, booking_date, booking_time, note)
      VALUES (?, ?, ?, ?, ?)
    `).run(customerId, guests, bookingDate || null, bookingTime || null, note || null);

    result = { customerId, bookingId: booking.lastInsertRowid };
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
  return res.status(201).json({ ok: true, ...result });
});

if (isProduction) {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use((_req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({ server: { middlewareMode: true, hmr: true } });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Bembon đang chạy tại http://localhost:${port}`);
  console.log(`SQLite: ${path.join(dataDir, 'bembon.db')}`);
});
