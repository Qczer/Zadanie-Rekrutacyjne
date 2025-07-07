import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikedProducts } from "../../contexts/Liked";
import type { Product } from "../../models/Product";

type LikeButtonProps = {
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  product?: Product;
};

const LikeButton = ({ initialLiked = false, onToggle, product }: LikeButtonProps) => {
  const { likedProducts, addToLiked, removeFromLiked } = useLikedProducts();
  if(product && likedProducts.some(p => p.name === product.name)) initialLiked = true;

  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    if (onToggle) onToggle(newLiked);
    if(newLiked && product) {
      addToLiked(product)
    }
    else if(!newLiked && product) {
      removeFromLiked(product)
    }
  };

  const iconSize = 24;
  const iconColor = liked ? "red" : "#9ca3af";

  return (
    <button
      onClick={toggleLike}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        top: 5,
        right: 5,
        position: 'absolute'
      }}
      aria-label={liked ? "Unlike" : "Like"}
    >
      {liked ? (
        <FaHeart color={iconColor} size={iconSize} />
      ) : (
        <FaRegHeart color={iconColor} size={iconSize} />
      )}
    </button>
  );
};

export default LikeButton;
