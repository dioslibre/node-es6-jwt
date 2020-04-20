const fs = require("fs");
const models = require("../../api/models/index");
const other = require("./other");
const User = require("../../api/models/User");

const properties = () => {
  fs.readFile("properties.csv", "utf8", async (err, data) => {
    try {
      if (err) throw err;
      const lines = data.split(/\r?\n/);
      const props = [];
      const unit_props = [];

      lines.forEach((line, index) => {
        const row = line.split(",");
        const unit_property = {
          name: row[2].trim(),
          UnitId: other.Unit.indexOf(row[0].trim()) + 1,
          PropertyId: index + 1,
        };
        unit_props.push(unit_property);

        const property = {
          id: index + 1,
          ConservationId: other.Conservation.indexOf(row[1].trim()) + 1 || null,
          regime: row[3].trim(),
          requisition: row[4].trim(),
          titre: row[5].trim(),
          OwnerId: other.Owner.indexOf(row[6].trim()) + 1 || null,
          ConsistanceId: other.Consistance.indexOf(row[7].trim()) + 1 || null,
          AssignmentId: other.Assignment.indexOf(row[8].trim()) + 1 || null,
          area: parseFloat(row[9].trim()),
          address: row[13].trim(),
        };
        if (property.regime && property.regime) props.push(property);
        else {
          if (property.titre) property.regime = "Titre foncier";
          else if (property.requisition) property.regime = "Réquisition";
          else property.regime = "Non immatriculé";
          props.push(property);
        }
      });

      const Property = models.Property;
      await Property.sync({ force: true });
      await Property.bulkCreate(props);
      console.log(`Propery is done.`);

      const UnitProperty = models.UnitProperty;
      await UnitProperty.sync({ force: true });
      await UnitProperty.bulkCreate(unit_props);
      console.log(`UnitPropery is done.`);

      await models.Document.sync({ force: true });
    } catch (error) {
      console.log(error.message);
    }
  });
};

(async () => {
  Object.keys(other).forEach(async (key) => {
    const all = other[key].map((value, index) => ({
      id: index + 1,
      name: value,
    }));

    try {
      const model = models[key];
      await model.sync({ force: true });
      await model.bulkCreate(all);
      console.log(`${key} is done.`);
    } catch (err) {
      console.error(`${key} already done.`);
    }
  });

  await properties();
})();

(async () => {
  const admin = {
    username: "admin",
    password: "admin",
    idAdmin: true,
  };

  try {
    await User.sync({ force: true });
    await User.create(admin);
    console.log(`User is done.`);
  } catch (err) {
    console.log(err);
  }
})();
