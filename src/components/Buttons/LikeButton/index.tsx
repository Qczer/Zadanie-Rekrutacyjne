import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useLikedProducts } from "../../../contexts/Liked";
import type { Product } from "../../../models/Product";

import './index.css'

type LikeButtonProps = {
  visible?: boolean;
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
  product?: Product;
  top?: number;
  right?: number;
};

const LikeButton = ({ visible = true, initialLiked = false, onToggle, product, top, right }: LikeButtonProps) => {
  const { likedProducts, addToLiked, removeFromLiked } = useLikedProducts();
  if(product && likedProducts.some(p => p.name === product.name)) initialLiked = true;

  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked((product && likedProducts.some(p => p.name === product.name)) ?? false);
  }, [likedProducts, product])

  if(!visible) return;

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
      onClick={(e) => {e.stopPropagation(); toggleLike()}}
      className="likeButton"
      style={{
        top: top ?? 5,
        right: right ?? 5,
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
