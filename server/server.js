import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const ORDERS_FILE = path.join(__dirname, 'orders.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read orders
async function getOrders() {
  try {
    const data = await fs.readFile(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Helper function to save orders
async function saveOrders(orders) {
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

// ─── ROUTES ──────────────────────────────────────────────────────────────────

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Justice Solar Backend API is running!' });
});

// GET all orders (useful for an admin dashboard later)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve orders.' });
  }
});

// POST new order (called by frontend checkout page)
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;

    if (!orderData.name || !orderData.email || !orderData.phone || !orderData.items) {
      return res.status(400).json({ error: 'Missing required order fields.' });
    }

    const orders = await getOrders();

    const newOrder = {
      id: 'JGS-' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      ...orderData,
      status: 'pending'
    };

    orders.push(newOrder);
    await saveOrders(orders);

    console.log(`[Order Saved] ID: ${newOrder.id} - Customer: ${newOrder.name}`);

    res.status(201).json({
      success: true,
      message: 'Order received and saved successfully.',
      orderId: newOrder.id
    });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal server error while placing order.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
