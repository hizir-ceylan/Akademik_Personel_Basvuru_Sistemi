const pool = require("../db")

const getAllAnnouncements = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ilanlar ORDER BY id DESC")
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: "Veriler alınamadı", details: err.message })
  }
}

const createAnnouncement = async (req, res) => {
  const { baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by = 1 } = req.body

  try {
    const result = await pool.query(
      `INSERT INTO ilanlar 
        (baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, created_by],
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error("🔴 PostgreSQL Hatası:", err)
    res.status(500).json({ error: "İlan eklenemedi", details: err.message })
  }
}

const deleteAnnouncement = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query("DELETE FROM ilanlar WHERE id = $1", [id])

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "İlan bulunamadı" })
    }

    res.json({ message: "İlan silindi" })
  } catch (err) {
    res.status(500).json({ error: "Silme hatası", details: err.message })
  }
}

const getAnnouncementById = async (req, res) => {
  const { id } = req.params

  try {
    const result = await pool.query("SELECT * FROM ilanlar WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "İlan bulunamadı" })
    }

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: "İlan alınamadı", details: err.message })
  }
}

const updateAnnouncement = async (req, res) => {
  const { id } = req.params
  const { baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi } = req.body

  try {
    const result = await pool.query(
      `UPDATE ilanlar 
       SET baslik = $1, kadro_turu = $2, fakulte = $3, baslangic_tarihi = $4, bitis_tarihi = $5, updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [baslik, kadro_turu, fakulte, baslangic_tarihi, bitis_tarihi, id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "İlan bulunamadı" })
    }

    res.json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: "İlan güncellenemedi", details: err.message })
  }
}

module.exports = {
  getAllAnnouncements,
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncementById,
  updateAnnouncement,
}
