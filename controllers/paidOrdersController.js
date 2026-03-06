const pool = require('../config/db');

const getPaidOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM paid_orders_view');
    res.json(rows);
  } catch (err) {
    // Fallback for setups where the view is missing.
    if (err && (err.code === 'ER_NO_SUCH_TABLE' || err.code === 'ER_VIEW_INVALID')) {
      try {
        const [rows] = await pool.query(
          "SELECT * FROM orders WHERE payment_status = 'paid'"
        );
        return res.json(rows);
      } catch (fallbackErr) {
        console.error('DB ERROR (fallback):', fallbackErr.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    console.error('DB ERROR:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getPaidOrders };
