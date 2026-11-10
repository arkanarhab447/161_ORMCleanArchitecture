const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Failed to fetch komik' });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik by id:', err.message);
        res.status(500).json({ error: 'Failed to fetch komik' });
    }
}
async function createKomik(req, res) {
    const { title, description, author } = req.body;    
    try {
        const newKomik = await db.Komik.create({ title, description, author });
        res.status(201).json(newKomik);
    } catch (err) {
        console.error('Error creating komik:', err.message);
        res.status(500).json({ error: 'Failed to create komik' });
    }
}


async function updateKomik(req, res) {
    const { id } = req.params;
    const { title, description, author } = req.body;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        await komik.update({ title, description, author });
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error updating komik:', err.message);
        res.status(500).json({ error: 'Failed to update komik' });
    }
}