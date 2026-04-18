import PageLayout from "@/components/PageLayout";
import CategoryProducts from "@/components/CategoryProducts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: name,
    description: `Shop Martinonoir's ${name} collection — premium fashion.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  return (
    <PageLayout>
      <CategoryProducts slug={slug} />
    </PageLayout>
  );
}
