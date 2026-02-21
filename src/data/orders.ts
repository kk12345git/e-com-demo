import { Product, products } from "./products";

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    date: string;
    total: number;
    status: "Processing" | "In Transit" | "Delivered" | "Cancelled";
    items: OrderItem[];
    shippingAddress: {
        name: string;
        street: string;
        city: string;
        postalCode: string;
    };
    paymentMethod: string;
}

export const orders: Order[] = [
    {
        id: "ORD-9921",
        date: "Feb 05, 2026",
        total: 124999,
        status: "Delivered",
        items: [
            {
                productId: "1",
                name: products[0].name,
                price: products[0].price,
                quantity: 1,
                image: products[0].images[0]
            },
            {
                productId: "3",
                name: products[2].name,
                price: products[2].price,
                quantity: 1,
                image: products[2].images[0]
            }
        ],
        shippingAddress: {
            name: "Aura User",
            street: "Chennai Tech Park, OMR",
            city: "Chennai",
            postalCode: "600001"
        },
        paymentMethod: "Visa ending in 4242"
    },
    {
        id: "ORD-8542",
        date: "Jan 28, 2026",
        total: 24999,
        status: "In Transit",
        items: [
            {
                productId: "2",
                name: products[1].name,
                price: products[1].price,
                quantity: 1,
                image: products[1].images[0]
            }
        ],
        shippingAddress: {
            name: "Aura User",
            street: "Chennai Tech Park, OMR",
            city: "Chennai",
            postalCode: "600001"
        },
        paymentMethod: "Visa ending in 4242"
    }
];
