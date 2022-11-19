import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function CategoriesSection({ productCategories }) {
  const navigate = useNavigate();
  console.log("Product Categories------", productCategories);
  const image = {
    Basins:
      "https://lh6.googleusercontent.com/gWlrGILnzCR1Fs941IzBH00T8857Ta86dEqnUGigh4xUv4oyWtTJm6XVHhMPXzWCBc-bvM7TYD-d4R-7b1xZ3rH6IyOTRVuBG29uPGEBXfWQT3oRgr4-Re6oDz4qqm1AJml4eKYa=s0",
    Sinks: "https://m.media-amazon.com/images/I/71D59wHhMQL._AC_SL1500_.jpg",
    "Bath Tubs":
      "http://cdn.home-designing.com/wp-content/uploads/2020/03/ultra-luxury-high-end-hammock-bathtub-artistic-designer-bathtub-for-modern-interiors.jpg",
    Showers:
      "http://res.cloudinary.com/american-bath-group/image/upload/v1629683659/websites-product-info-and-content/laurelmountain/content/products/category/showers/laurelmountain-showers-onepieceunit2.jpg",
    Urinals:
      "https://www.commercialwashroomsltd.co.uk/media/wysiwyg/Untitled_design_5.jpg",
    "Squat Toilets":
      "https://live.staticflickr.com/1235/619269710_a81d183e4f_b.jpg",
    "Toilet Seats":
      "https://www.duravit.in/photomanager-duravit/file/8a8a818d619f59460161ba255dd97761/category_wall-hung_toilets.jpg",
    Mirrors:
      "https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2020/08/How-to-Choose-the-Right-Mirrors-for-Your-Walls-Body-A-080320-1024x640.jpg",
  };
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {productCategories.map(ctg => (
        <div
          onClick={() => navigate(`categoryProduct/${ctg.name}`)}
          className="relative group overflow-hidden cursor-pointer "
        >
          <img
            className="w-full h-full object-cover group-hover:scale-110 trnasition transform duration-500 ease-in-out"
            src={image[ctg.name]}
          />
          <h6 className="absolute bottom-2 left-2 bg-black/80 text-white font-medium text-xs px-3 py-2 rounded-md">
            {ctg.name}
          </h6>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    productCategories: state.categories.productCategories,
  };
};

export default connect(mapStateToProps)(CategoriesSection);
