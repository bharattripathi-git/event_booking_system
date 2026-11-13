import Event from "../models/Event.js";

// GET /api/events
// optional query params: ?search=music&category=Concert
const getEvents = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (search) filter.name = { $regex: search, $options: "i" };
  if (category && category !== "All") filter.category = category;

  const events = await Event.find(filter).sort({ date: 1 });
  res.json(events);
};

// GET /api/events/:id
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.json(event);
};

export { getEvents, getEventById };
