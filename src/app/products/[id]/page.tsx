import { notFound } from "next/navigation"
import { products } from "@/data/products"
import ProductDetailContent from "@/components/ProductDetailContent"

// Generate static params for all products
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }))
}

interface ProductDetailPageProps {
    params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const resolvedParams = await params
    const product = products.find(p => p.id === resolvedParams.id)

    if (!product) {
        notFound()
    }

    return <ProductDetailContent product={product} />
}
