const Listing = require("../models/listing.js");
const axios = require("axios");

module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let filter = {};

    if (search && search.trim() !== "") {
        filter.$or = [
            { title:    { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { country:  { $regex: search, $options: "i" } },
        ];
    } else if (category) {
        filter.category = category;
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { 
        allListings, 
        searchQuery: search || "",
        activeCategory: category || ""
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    // Geocoding
    try {
        const geoResponse = await axios.get(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(req.body.listing.location)}&format=json&limit=1`,
            { headers: { "User-Agent": "NookAway/1.0" } }
        );
        const geoData = geoResponse.data[0];
        if (geoData) {
            newListing.geometry = {
                type: "Point",
                coordinates: [parseFloat(geoData.lon), parseFloat(geoData.lat)],
            };
        }
    } catch (err) {
        console.log("Geocoding failed:", err.message);
    }

    await newListing.save();
    req.flash("success", "new listing added");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalUrl });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
};