import Tour from "../models/Tour.js";

export const create = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    return res
      .status(200)
      .json({ message: "Successfully created", data: tour });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByPk(id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    await Tour.update(req.body, { where: { id: tour.id } });
    const updated = await Tour.findByPk(id);
    return res
      .status(200)
      .json({ message: "Successfully updated", data: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByPk(id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    await Tour.destroy({ where: { id: tour.id } });

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findByPk(id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    return res.status(200).json({ data: tour });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTours = async (req, res) => {
  try {
    const tour = await Tour.findAll({});
    if (tour.length < 1)
      return res.status(404).json({ message: "No tours founds" });

    return res.status(200).json({ data: tour });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
