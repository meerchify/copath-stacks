"use server";

import { TAGS } from "lib/constants";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart([{ merchandiseId: selectedVariantId, quantity: 1 }]);
    updateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      await removeFromCart([lineItem.id]);
      updateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  }
) {
  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart([lineItem.id]);
      } else {
        await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart([{ merchandiseId, quantity }]);
    }

    updateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout(_prevState?: string) {
  const cart = await getCart();
  // Headless Shopify hosts checkout, so we hand off to Shopify's secure
  // checkoutUrl. In demo mode (store not connected) or with an expired cart
  // there is no checkoutUrl — surface a message instead of crashing.
  if (!cart?.checkoutUrl) {
    return "Checkout isn't available yet — connect your Shopify store to enable it.";
  }
  redirect(cart.checkoutUrl);
}

// The storefront preview runs inside a cross-site iframe (CoPath App Details),
// so a default SameSite=Lax cookie is blocked by the browser and the cart never
// persists. SameSite=None + Secure + Partitioned (CHIPS) lets the cart cookie
// survive in the embedded preview while staying first-party-safe in production.
export const CART_COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "none",
  secure: true,
  partitioned: true,
} as const;

export async function createCartAndSetCookie() {
  try {
    const cart = await createCart();
    if (cart?.id) {
      (await cookies()).set("cartId", cart.id, CART_COOKIE_OPTIONS);
    }
  } catch {
    // Store not connected yet (demo mode) — nothing to create.
  }
}
