import Vendor from "../models/Vendor.js";

// @desc    Get all vendor profiles
// @route   GET /api/vendors
export const getVendors = async (req, res) => {
  try {
    const { category, city, search } = req.query;

    let query = {};
    if (category) {
      query.categories = { $in: [category] };
    }
    if (city || req.query.location) {
      const locTerm = (city || req.query.location).trim();
      query.$or = [
        { city: { $regex: locTerm, $options: "i" } },
        { location: { $regex: locTerm, $options: "i" } },
        { serviceArea: { $regex: locTerm, $options: "i" } },
      ];
    }
    if (search) {
      const searchOr = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchOr }];
        delete query.$or;
      } else {
        query.$or = searchOr;
      }
    }


    const vendors = await Vendor.find(query).sort({ rating: -1 });

    res.json({
      success: true,
      count: vendors.length,
      data: vendors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single vendor by ID
// @route   GET /api/vendors/:id
export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: "Vendor profile not found" });
    }
    res.json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create or update vendor profile
// @route   POST /api/vendors
export const createOrUpdateVendor = async (req, res) => {
  try {
    const { name, logo, description, categories, services, city, location, latitude, longitude, contact } = req.body;

    let vendor = await Vendor.findOne({ owner: req.user._id });

    if (vendor) {
      // Update existing vendor
      vendor = await Vendor.findByIdAndUpdate(
        vendor._id,
        { name, logo, description, categories, services, city, location, latitude, longitude, contact },
        { new: true, runValidators: true }
      );
    } else {
      // Create new vendor
      vendor = await Vendor.create({
        owner: req.user._id,
        name,
        logo,
        description,
        categories,
        services,
        city,
        location,
        latitude,
        longitude,
        contact,
      });
    }

    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
