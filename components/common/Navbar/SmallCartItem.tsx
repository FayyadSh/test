// ------------ Components ----------------
import Image from 'next/image';
// ------------ Types ----------------
import { TCourse } from '@/types';

const SmallCartItem = ({ cartItem }: { cartItem: TCourse}) => {
    return (
        <li className="flex gap-4"> {/* Container for the cart item with spacing */}

            {/* Display the image of the cart item */}
            <Image
                src={cartItem?.banner}  // Dynamic image source from the backend
                alt="cart item image"
                className="object-cover w-20 h-16 rounded" // Styling for image dimensions and rounded corners
                width={250}
                height={150}
            />

            {/* Container for cart item details */}
            <div>
                {/* Title of the cart item, with text clamping to prevent overflow */}
                <h3 className="text-sm text-primary font-bold line-clamp-2">
                  {cartItem?.title}
                </h3>

                {/* Cart item details such as category and price */}
                <dl className="mt-0.5 space-y-px text-sm text-light-color">
                  <dd>{cartItem?.category}</dd> 
                  <dd>{cartItem?.price} $</dd>
                </dl>
            </div>
        </li>
    );
}

export default SmallCartItem;
