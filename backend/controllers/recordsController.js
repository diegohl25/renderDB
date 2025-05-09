const prisma = require('../database');

exports.getAllRecords = async (req, res) => {
  const records = await prisma.record.findMany();
  res.json(records);
};

exports.getRecord = async (req, res) => {
  const { id } = req.params;
  const record = await prisma.record.findUnique({ where: { id: parseInt(id) } });
  record ? res.json(record) : res.status(404).json({ error: 'Not found' });
};

exports.createRecord = async (req, res) => {
  const { name, value } = req.body;
  const newRecord = await prisma.record.create({ data: { name, value } });
  res.status(201).json(newRecord);
};

exports.updateRecord = async (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  try {
    const updated = await prisma.record.update({
      where: { id: parseInt(id) },
      data: { name, value }
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.record.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(404).json({ error: 'Not found' });
  }
};
