import PageLayout from "@/components/PageLayout";
import ProductDetail from "@/components/ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const productName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: productName,
    description: `Shop ${productName} from Martinonoir's luxury collection.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <PageLayout>
      <ProductDetail slug={slug} />
    </PageLayout>
  );
}
