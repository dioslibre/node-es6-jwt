const Data = require("../models/index");

function load(req, res, next, id) {
  const model = req.body.model;
  Data[model]
    .findByPk(id, { attributes: { exclude: req.body.exclude || [] } })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "Data[model] not found" });
      } else {
        req.dbData[model] = user;
        next();
      }
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
}

function get(req, res) {
  const model = req.body.model;
  return res.status(200).json(req.dbData[model]);
}

function create(req, res) {
  const model = req.body.model;
  Data[model]
    .create(req.body.create)
    .then((newData) => {
      res.status(201).json(newData[model]);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
}

function update(req, res) {
  const model = req.body.model;
  req.dbData[model]
    .update(req.body.update)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
}

function list(req, res) {
  const {
    model,
    offset = 0,
    limit = 50,
    exclude = [],
    nested = false,
    all = false,
  } = req.body;
  console.log(req.body);
  Data[model]
    .findAll({
      offset: offset,
      limit: limit,
      attributes: { exclude },
      include: all && [{ all, nested }],
    })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((e) => {
      res.status(500).json({ error: e.message });
    });
}

async function remove(req, res) {
  const model = req.body.model;
  await req.dbData[model].destroy();
  res.sendStatus(204);
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
};
